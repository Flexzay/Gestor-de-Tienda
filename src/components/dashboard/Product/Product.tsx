import { X, Upload, Trash2 } from "lucide-react";
import { useCategories } from "../../../hooks/bashboard/useCategories";
import useProduct from "../../../hooks/bashboard/useProduct";
import CustomTimeline from "../shop/Timeline";
import { useState } from "react";
import { ProductIngredient } from "../../../interface/product";

// Definir tipos para las props
interface ProductFormProps {
  onClose: () => void;
  onSubmit: (data: any) => Promise<void>; // Podés cambiar `any` por un tipo más específico si lo conocés
  initialData?: any; // Lo mismo con `initialData`, si sabes qué tipo es, usa ese tipo en lugar de `any`
}

const ProductForm: React.FC<ProductFormProps> = ({ onClose, onSubmit, initialData }) => {
  const { filteredCategories } = useCategories();
  const {
    formData,
    step,
    loading,
    error,
    fieldErrors,
    dispatch,
    handleChange,
    handleImageChange,
    removeImage,
    handleNextStep,
    handlePrevStep,
    handleSubmit,
  } = useProduct({ onSubmit, initialData, onClose });

  const [showIngredientForm, setShowIngredientForm] = useState(false);
  const [newIngredient, setNewIngredient] = useState({ item: "", value: "" });

  const handleAddIngredient = () => {
    if (!newIngredient.item || !newIngredient.value) return;
    dispatch({ type: "ADD_INGREDIENT", ingredient: newIngredient });
    setNewIngredient({ item: "", value: "" });
  };

  const handleRemoveIngredient = (index: number) => {
    dispatch({ type: "REMOVE_INGREDIENT", index });
  };

  const updateIngredient = (index: number, field: string, value: string) => {
    const updatedIngredient = {
      ...formData.data_table?.[index],
      [field]: value,
    } as ProductIngredient; // Ensure it matches the required type
    if (updatedIngredient.item && updatedIngredient.value) {
      dispatch({ type: "UPDATE_INGREDIENT", index, ingredient: updatedIngredient });
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-100 bg-opacity-90 backdrop-blur-md flex justify-center items-center px-2 sm:px-4 z-50 overflow-y-auto">
      <div className="bg-white p-4 sm:p-6 rounded-2xl shadow-2xl w-full max-w-3xl relative max-h-screen overflow-y-auto">
        <button onClick={onClose} className="absolute top-3 right-3 text-gray-400 hover:text-gray-700">
          <X size={24} />
        </button>

        <div className="flex justify-center mb-6">
          <CustomTimeline currentStep={step} />
        </div>

        <div className="p-2 sm:p-4 max-h-[80vh] overflow-y-auto">
          {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

          <form onSubmit={handleSubmit} className="space-y-4">
            {step === 0 && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Nombre del producto</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 text-sm"
                      placeholder="Ej: Hamburguesa Clásica"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Categoría</label>
                    <select
                      name="category_id"
                      value={formData.category_id}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 text-sm"
                    >
                      <option value="">Selecciona una categoría</option>
                      {filteredCategories.map((cat) => (
                        <option key={cat.id} value={cat.id}>
                          {cat.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Descripción</label>
                    <textarea
                      name="description"
                      value={formData.description}
                      onChange={handleChange}
                      rows={3}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 text-sm"
                      placeholder="Describe tu producto..."
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Precio</label>
                    <div className="relative">
                      <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-500">$</span>
                      <input
                        type="number"
                        name="price"
                        value={formData.price}
                        onChange={handleChange}
                        className="w-full pl-7 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 text-sm"
                        placeholder="0.00"
                      />
                    </div>
                  </div>    
                  

                  <div className="flex items-center justify-between py-4">
                    <label className="flex items-center cursor-pointer">
                      <div className="relative">
                        <input
                          type="checkbox"
                          checked={formData.available}
                          onChange={(e) => {
                            const event = {
                              target: {
                                name: "available",
                                value: e.target.checked.toString(),
                              },
                            } as React.ChangeEvent<HTMLInputElement>;
                            handleChange(event);
                          }}
                          className="sr-only"
                        />
                        <div className={`block w-14 h-8 rounded-full transition-colors ${formData.available ? "bg-green-500" : "bg-red-400"}`} />
                        <div className={`dot absolute left-1 top-1 w-6 h-6 bg-white rounded-full transition duration-300 ease-in-out shadow ${formData.available ? "transform translate-x-6" : ""}`} />
                      </div>
                      <span className={`ml-3 text-sm font-medium ${formData.available ? "text-green-600" : "text-red-600"}`}>
                        {formData.available ? "Activo" : "Inactivo"}
                      </span>
                    </label>
                  </div>
                </div>

                {/* Ingredientes */}
                <div className="space-y-4">
                  <button
                    type="button"
                    onClick={() => setShowIngredientForm((prev) => !prev)}
                    className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 w-full sm:w-auto"
                  >
                    {showIngredientForm ? "Ocultar Ingredientes" : "Agregar Ingredientes al Producto"}
                  </button>

                  {showIngredientForm && (
                    <div className="space-y-4 border border-gray-300 rounded-md p-4">
                      <p className="text-sm text-gray-600 mb-2">Agrega los ingredientes del producto con sus cantidades:</p>

                      <div className="flex flex-col sm:flex-row gap-2 items-stretch">
                        <input
                          type="text"
                          value={newIngredient.item}
                          onChange={(e) => setNewIngredient({ ...newIngredient, item: e.target.value })}
                          placeholder="Ej: Carne"
                          className="w-full sm:w-1/2 px-3 py-2 border border-gray-300 rounded-md text-sm"
                        />
                        <input
                          type="text"
                          value={newIngredient.value}
                          onChange={(e) => setNewIngredient({ ...newIngredient, value: e.target.value })}
                          placeholder="Ej: 200gr"
                          className="w-full sm:w-1/2 px-3 py-2 border border-gray-300 rounded-md text-sm"
                        />
                        <button
                          type="button"
                          onClick={handleAddIngredient}
                          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 w-full sm:w-auto"
                        >
                          Agregar ingrediente
                        </button>
                      </div>

                      {formData.data_table && formData.data_table.length > 0 && (
                        <div className="mt-4 space-y-2">
                          <p className="text-sm font-medium text-gray-700">Ingredientes agregados:</p>
                          {formData.data_table.map((ing, i) => (
                            <div key={i} className="flex flex-col sm:flex-row gap-2 items-center">
                              <input
                                type="text"
                                value={ing.item}
                                onChange={(e) => updateIngredient(i, "item", e.target.value)}
                                className="w-full sm:w-1/2 px-3 py-2 border border-gray-300 rounded-md text-sm"
                              />
                              <input
                                type="text"
                                value={ing.value}
                                onChange={(e) => updateIngredient(i, "value", e.target.value)}
                                className="w-full sm:w-1/2 px-3 py-2 border border-gray-300 rounded-md text-sm"
                              />
                              <button
                                type="button"
                                onClick={() => handleRemoveIngredient(i)}
                                className="text-red-600 hover:text-red-800"
                              >
                                <Trash2 />
                              </button>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            )}

            {step === 1 && (
              <div className="space-y-4">
                <label className="block text-center border-2 border-dashed p-4 cursor-pointer rounded-lg">
                  <input type="file" accept="image/*" multiple onChange={handleImageChange} className="hidden" />
                  <Upload size={40} className="mx-auto mb-2" />
                  <span className="text-sm font-medium">Haz clic o arrastra para subir imágenes</span>
                </label>

                {fieldErrors.images && <p className="text-red-500 text-sm mt-2">{fieldErrors.images}</p>}

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                  {formData.existingImages?.map((img, index) => (
                    <div key={index} className="relative">
                      <img
                        src={img.url.startsWith("http") ? img.url : `/uploads/${img.url}`}
                        className="w-full h-32 object-cover rounded-lg"
                      />
                      <button
                        type="button"
                        onClick={() => removeImage(index, true)}
                        className="absolute top-1 right-1 p-1 bg-red-500 text-white rounded-full"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  ))}
                  {formData.previews?.map((preview, index) => (
                    <div key={index} className="relative">
                      <img src={preview} className="w-full h-32 object-cover rounded-lg" />
                      <button
                        type="button"
                        onClick={() => removeImage(index, false)}
                        className="absolute top-1 right-1 p-1 bg-red-500 text-white rounded-full"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Botones */}
            <div className="flex flex-col sm:flex-row justify-between gap-4 mt-8">
              {step > 0 && (
                <button type="button" onClick={handlePrevStep} className="w-full sm:w-auto px-4 py-2 bg-gray-400 text-white rounded-lg">
                  Atrás
                </button>
              )}
              {step < 2 ? (
                <button type="button" onClick={handleNextStep} className="w-full sm:w-auto px-4 py-2 bg-blue-500 text-white rounded-lg">
                  Siguiente
                </button>
              ) : (
                <button type="submit" disabled={loading} className="w-full sm:w-auto px-4 py-2 bg-green-500 text-white rounded-lg">
                  Guardar
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProductForm;
