import { X, Upload, Trash2 } from "lucide-react";
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
                <label className="block">Nombre
                  <input type="text" name="name" value={formData.name} onChange={handleChange} className="w-full p-3 border rounded-lg" />
                  {fieldErrors.name && <p className="text-red-500 text-sm">{fieldErrors.name}</p>}
                </label>

                <label className="block">Descripción
                  <textarea name="description" value={formData.description} onChange={handleChange} className="w-full p-3 border rounded-lg"></textarea>
                  {fieldErrors.description && <p className="text-red-500 text-sm">{fieldErrors.description}</p>}
                </label>

                <label className="block">Precio
                  <input type="number" name="price" value={formData.price} onChange={handleChange} className="w-full p-3 border rounded-lg" />
                  {fieldErrors.price && <p className="text-red-500 text-sm">{fieldErrors.price}</p>}
                </label>

                <label className="block">Categoría
                  <select name="category_id" value={formData.category_id} onChange={handleChange} className="w-full p-3 border rounded-lg">
                    <option value="">Selecciona una categoría</option>
                    {filteredCategories.map(category => (
                      <option key={category.id} value={category.id}>{category.name}</option>
                    ))}
                  </select>
                  {fieldErrors.category_id && <p className="text-red-500 text-sm">{fieldErrors.category_id}</p>}
                </label>
              </>
            )}

            {step === 1 && (
              <div>
                <label className="block text-center border-2 border-dashed p-3 cursor-pointer">
                  <input type="file" accept="image/*" multiple onChange={handleImageChange} className="hidden" />
                  <Upload size={40} />
                  <span>Subir imágenes</span>
                </label>

                {fieldErrors.images && <p className="text-red-500 text-sm">{fieldErrors.images}</p>}

                {/* Imágenes existentes + nuevas separadas */}
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
              {step > 0 && <button type="button" onClick={handlePrevStep} className="px-4 py-2 bg-gray-400 text-white rounded-lg">Atrás</button>}
              {step < 2
                ? <button type="button" onClick={handleNextStep} className="px-4 py-2 bg-blue-500 text-white rounded-lg">Siguiente</button>
                : <button type="submit" disabled={loading} className="px-4 py-2 bg-green-500 text-white rounded-lg">Guardar</button>}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProductForm;
