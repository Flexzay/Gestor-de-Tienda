import { X, Upload, Trash2, Plus, ShoppingCart } from "lucide-react";
import { useCategories } from "../../../hooks/bashboard/useCategories";
import useProduct from "../../../hooks/bashboard/useProduct";
import CustomTimeline from "../shop/Timeline";
import { useState } from "react";

const ProductForm = ({ onClose, onSubmit, initialData }) => {
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

    dispatch({
      type: "ADD_INGREDIENT",
      ingredient: newIngredient,
    });

    setNewIngredient({ item: "", value: "" });
  };

  const handleRemoveIngredient = (index: number) => {
    dispatch({
      type: "REMOVE_INGREDIENT",
      index,
    });
  };

  const updateIngredient = (index: number, field: string, value: string) => {
    const updatedIngredient = {
      ...formData.data_table[index],
      [field]: value,
    };

    dispatch({
      type: "UPDATE_INGREDIENT",
      index,
      ingredient: updatedIngredient,
    });
  };


  return (
    <div className="fixed inset-0 bg-gray-100 bg-opacity-90 backdrop-blur-md flex justify-center items-center px-4 z-50 overflow-y-auto">
      <div className="bg-white p-6 rounded-2xl shadow-2xl w-full max-w-3xl relative">
        <button onClick={onClose} className="absolute top-3 right-3 text-gray-400 hover:text-gray-700">
          <X size={24} />
        </button>

        <div className="flex justify-center mb-6">
          <CustomTimeline currentStep={step} />
        </div>

        <div className="p-6 max-h-[80vh] overflow-y-auto">
          {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

          <form onSubmit={handleSubmit} className="space-y-4">
            {step === 0 && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Nombre del producto</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                      placeholder="Ej: Hamburguesa Clásica"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Categoría</label>
                    <select
                      name="category_id"
                      value={formData.category_id}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
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
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
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
                        className="w-full pl-7 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
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
                          onChange={(e) =>
                            handleChange({ target: { name: "available", value: e.target.checked } })
                          }
                          className="sr-only"
                        />
                        <div
                          className={`block w-14 h-8 rounded-full transition-colors ${formData.available ? "bg-green-500" : "bg-red-400"
                            }`}
                        ></div>
                        <div
                          className={`dot absolute left-1 top-1 w-6 h-6 bg-white rounded-full transition duration-300 ease-in-out shadow ${formData.available ? "transform translate-x-6" : ""
                            }`}
                        ></div>
                      </div>
                      <span
                        className={`ml-3 text-sm font-medium ${formData.available ? "text-green-600" : "text-red-600"
                          }`}
                      >
                        {formData.available ? "Activo" : "Inactivo"}
                      </span>
                    </label>
                  </div>
                </div>

                {/* SECCIÓN DE INGREDIENTES */}
                <div className="space-y-4">
                  <button
                    type="button"
                    onClick={() => setShowIngredientForm((prev) => !prev)}
                    className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
                  >
                    <Plus className="inline mr-2" size={16} />
                    {showIngredientForm ? "Ocultar Ingredientes" : "Agregar Ingredientes"}
                  </button>

                  {showIngredientForm && (
                    <div className="space-y-4">
                      <div className="flex gap-4">
                        <input
                          type="text"
                          value={newIngredient.item}
                          onChange={(e) => setNewIngredient({ ...newIngredient, item: e.target.value })}
                          placeholder="Ingrediente"
                          className="w-2/3 px-3 py-2 border border-gray-300 rounded-md"
                        />
                        <input
                          type="text"
                          value={newIngredient.value}
                          onChange={(e) => setNewIngredient({ ...newIngredient, value: e.target.value })}
                          placeholder="Cantidad"
                          className="w-1/3 px-3 py-2 border border-gray-300 rounded-md"
                        />
                        <button
                          type="button"
                          onClick={handleAddIngredient}
                          className="px-3 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                        >
                          <Plus size={16} />
                        </button>
                      </div>

                      {formData.data_table?.length > 0 && (
                        <div className="space-y-2">
                          {formData.data_table.map((ing, i) => (
                            <div key={i} className="flex items-center gap-4">
                              <input
                                type="text"
                                value={ing.item}
                                onChange={(e) => updateIngredient(i, "item", e.target.value)}
                                className="w-2/3 px-3 py-2 border border-gray-300 rounded-md"
                                placeholder="Ingrediente"
                              />
                              <input
                                type="text"
                                value={ing.value}
                                onChange={(e) => updateIngredient(i, "value", e.target.value)}
                                className="w-1/3 px-3 py-2 border border-gray-300 rounded-md"
                                placeholder="Cantidad"
                              />
                              <button
                                type="button"
                                onClick={() => handleRemoveIngredient(i)}
                                className="p-2 text-red-500 hover:text-red-700"
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

                <div className="grid grid-cols-3 gap-4">
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

            {/* BOTONES */}
            <div className="flex justify-between mt-8">
              {step > 0 && (
                <button type="button" onClick={handlePrevStep} className="px-4 py-2 bg-gray-400 text-white rounded-lg">
                  Atrás
                </button>
              )}
              {step < 2 ? (
                <button type="button" onClick={handleNextStep} className="px-4 py-2 bg-blue-500 text-white rounded-lg">
                  Siguiente
                </button>
              ) : (
                <button type="submit" disabled={loading} className="px-4 py-2 bg-green-500 text-white rounded-lg">
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
