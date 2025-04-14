import { X, Upload, Trash2, Plus, Minus } from "lucide-react";
import { useCategories } from "../../../hooks/bashboard/useCategories";
import useProduct from "../../../hooks/bashboard/useProduct";
import CustomTimeline from "../shop/Timeline";

const ProductForm = ({ onClose, onSubmit, initialData }) => {
  const { filteredCategories } = useCategories();
  const {
    formData,
    step,
    loading,
    error,
    fieldErrors,
    handleChange,
    handleImageChange,
    removeImage,
    handleNextStep,
    handlePrevStep,
    handleSubmit,
    updateIngredient,
    addIngredient,
    removeIngredient,
    toggleAvailable
  } = useProduct({ onSubmit, initialData, onClose });

  return (
    <div className="fixed inset-0 bg-gray-100 bg-opacity-90 backdrop-blur-md flex justify-center items-center px-4 z-50">
      <div className="bg-white p-6 rounded-2xl shadow-2xl w-full max-w-3xl relative">
        <button onClick={onClose} className="absolute top-3 right-3 text-gray-400 hover:text-gray-700">
          <X size={24} />
        </button>

        <div className="flex justify-center mb-6">
          <CustomTimeline currentStep={step} />
        </div>

        <div className="p-6">
          {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

          <form onSubmit={handleSubmit} className="space-y-4">
            {step === 0 && (
              <>
                <label className="block">
                  Nombre
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full p-3 border rounded-lg"
                  />
                  {fieldErrors.name && <p className="text-red-500 text-sm">{fieldErrors.name}</p>}
                </label>

                <label className="block">
                  Descripción
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    className="w-full p-3 border rounded-lg"
                  ></textarea>
                  {fieldErrors.description && (
                    <p className="text-red-500 text-sm">{fieldErrors.description}</p>
                  )}
                </label>

                <label className="block">
                  Precio
                  <input
                    type="number"
                    name="price"
                    value={formData.price}
                    onChange={handleChange}
                    className="w-full p-3 border rounded-lg"
                  />
                  {fieldErrors.price && <p className="text-red-500 text-sm">{fieldErrors.price}</p>}
                </label>

                <label className="block">
                  Categoría
                  <select
                    name="category_id"
                    value={formData.category_id}
                    onChange={handleChange}
                    className="w-full p-3 border rounded-lg"
                  >
                    <option value="">Selecciona una categoría</option>
                    {filteredCategories.map((category) => (
                      <option key={category.id} value={category.id}>
                        {category.name}
                      </option>
                    ))}
                  </select>
                  {fieldErrors.category_id && (
                    <p className="text-red-500 text-sm">{fieldErrors.category_id}</p>
                  )}
                </label>

                {/* Campo de Disponibilidad */}
                <div className="flex items-center justify-between py-2">
                  <label htmlFor="available" className="flex items-center cursor-pointer">
                    <div className="relative">
                      <input
                        type="checkbox"
                        id="available"
                        name="available"
                        checked={formData.available}
                        onChange={toggleAvailable}
                        className="sr-only"
                      />
                      <div
                        className={`block w-14 h-8 rounded-full transition ${
                          formData.available ? "bg-green-500" : "bg-gray-300"
                        }`}
                      ></div>
                      <div
                        className={`dot absolute left-1 top-1 w-6 h-6 bg-white rounded-full transition shadow ${
                          formData.available ? "transform translate-x-6" : ""
                        }`}
                      ></div>
                    </div>
                    <span
                      className={`ml-3 text-sm font-medium ${
                        formData.available ? "text-green-600" : "text-gray-700"
                      }`}
                    >
                      {formData.available ? "Disponible" : "No disponible"}
                    </span>
                  </label>
                </div>

                {/* Sección de Ingredientes */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-700">Ingredientes (opcionales)</h3>
                  {formData.ingredients?.map((ingredient, index) => (
                    <div key={index} className="flex items-center gap-4">
                      <input
                        type="text"
                        value={ingredient.name}
                        onChange={(e) => updateIngredient(index, 'name', e.target.value)}
                        placeholder="Nombre del ingrediente"
                        className="flex-1 p-3 border rounded-lg"
                      />
                      <input
                        type="text"
                        value={ingredient.quantity}
                        onChange={(e) => updateIngredient(index, 'quantity', e.target.value)}
                        placeholder="Cantidad"
                        className="w-1/3 p-3 border rounded-lg"
                      />
                      {index > 0 && (
                        <button
                          type="button"
                          onClick={() => removeIngredient(index)}
                          className="p-2 text-red-500 hover:text-red-700"
                        >
                          <Minus size={20} />
                        </button>
                      )}
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={addIngredient}
                    className="mt-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 flex items-center gap-2"
                  >
                    <Plus size={16} />
                    Agregar Ingrediente
                  </button>
                </div>
              </>
            )}

            {step === 1 && (
              <div>
                <label className="block text-center border-2 border-dashed p-3 cursor-pointer">
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handleImageChange}
                    className="hidden"
                  />
                  <Upload size={40} />
                  <span>Subir imágenes</span>
                </label>

                {fieldErrors.images && <p className="text-red-500 text-sm">{fieldErrors.images}</p>}

                <div className="mt-4 space-y-6">
                  {formData.existingImages?.length > 0 && (
                    <div>
                      <h4 className="text-sm font-semibold mb-2">Imágenes guardadas</h4>
                      <div className="grid grid-cols-3 gap-4">
                        {formData.existingImages.map((img, index) => (
                          <div key={img.id || index} className="relative">
                            <img
                              src={img.url.startsWith("http") ? img.url : `/uploads/${img.url}`}
                              alt={`Imagen ${index}`}
                              className="w-full h-32 object-cover rounded-lg"
                            />
                            <button
                              type="button"
                              onClick={() => removeImage(index, true)}
                              className="absolute top-0 right-0 p-1 bg-red-500 text-white rounded-full"
                            >
                              <Trash2 size={16} />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {formData.previews?.length > 0 && (
                    <div>
                      <h4 className="text-sm font-semibold mb-2">Nuevas imágenes</h4>
                      <div className="grid grid-cols-3 gap-4">
                        {formData.previews.map((preview, index) => (
                          <div key={`preview-${index}`} className="relative">
                            <img
                              src={preview}
                              alt={`Preview ${index}`}
                              className="w-full h-32 object-cover rounded-lg"
                            />
                            <button
                              type="button"
                              onClick={() => removeImage(index, false)}
                              className="absolute top-0 right-0 p-1 bg-red-500 text-white rounded-full"
                            >
                              <Trash2 size={16} />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            <div className="flex justify-between mt-6">
              {step > 0 && (
                <button
                  type="button"
                  onClick={handlePrevStep}
                  className="px-4 py-2 bg-gray-400 text-white rounded-lg"
                >
                  Atrás
                </button>
              )}
              {step < 1 ? (
                <button
                  type="button"
                  onClick={handleNextStep}
                  className="px-4 py-2 bg-blue-500 text-white rounded-lg"
                >
                  Siguiente
                </button>
              ) : (
                <button
                  type="submit"
                  disabled={loading}
                  className="px-4 py-2 bg-green-500 text-white rounded-lg"
                >
                  {loading ? "Guardando..." : "Guardar"}
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