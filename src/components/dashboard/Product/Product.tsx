import { useReducer, useState } from "react";
import { X, Upload, Trash2 } from "lucide-react";
import { ProductFormData } from "../../../interface/product";
import { useCategories } from "../../../hooks/bashboard/useCategories";
import { compressImage } from "../../../hooks/bashboard/useProduct";
import CustomTimeline from "../Timeline";
import Category from "../../../interface/category";

const formReducer = (state: any, action: any) => {
  switch (action.type) {
    case "CHANGE_INPUT":
      return { ...state, [action.field]: action.value };
    case "ADD_IMAGES":
      return {
        ...state,
        images: [...state.images, ...action.files],
        previews: [...state.previews, ...action.previews],
      };
    case "REMOVE_IMAGE":
      const newImages = state.images.filter((_img: any, index: number) => index !== action.index);
      const newPreviews = state.previews.filter((_preview: any, index: number) => index !== action.index);
      return { ...state, images: newImages, previews: newPreviews };
    default:
      return state;
  }
};

interface ProductFormProps {
  onClose: () => void;
  onSubmit: (product: ProductFormData) => void;
  initialData?: ProductFormData | null;
}

const ProductForm: React.FC<ProductFormProps> = ({ onClose, onSubmit, initialData }) => {
  const { filteredCategories } = useCategories();
  // Modifica el useReducer inicial para incluir las imágenes existentes
  const [formData, dispatch] = useReducer(formReducer, {
    name: initialData?.name || "",
    description: initialData?.description || "",
    price: initialData?.price || "",
    category_id: initialData?.category_id|| "",
    available: initialData?.available ?? true,
    images: [],
    previews: initialData?.images?.length ? initialData.images : [], // Mostrar imágenes existentes
    existingImages: initialData?.images || [], // Guardar imágenes existentes
  });

  const [step, setStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<{ [key: string]: string }>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    dispatch({ type: "CHANGE_INPUT", field: e.target.name, value: e.target.value });
    setFieldErrors({ ...fieldErrors, [e.target.name]: "" }); // Elimina errores al escribir
  };

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files ? Array.from(e.target.files) : [];
    if (files.length > 0) {
      try {
        const compressedFiles = await Promise.all(files.map(file => compressImage(file)));
        const previews = compressedFiles.map(file => URL.createObjectURL(file));
        dispatch({ type: "ADD_IMAGES", files: compressedFiles, previews });
        setFieldErrors({ ...fieldErrors, images: "" }); // Elimina errores al subir imágenes
      } catch (error) {
        setError("Algunas imágenes no pudieron comprimirse.");
      }
    }
  };

  const removeImage = (index: number) => {
    dispatch({ type: "REMOVE_IMAGE", index });
  };

  const validateStep = () => {
    let errors: { [key: string]: string } = {};

    if (step === 0) {
      if (!formData.name) errors.name = "El nombre es obligatorio.";
      if (!formData.description) errors.description = "La descripción es obligatoria.";
      if (!formData.price) errors.price = "El precio es obligatorio.";
      if (!formData.category_id) errors.category_id = "Selecciona una categoría.";
    }

    if (step === 1 && formData.images.length === 0) {
      errors.images = "Debes subir al menos una imagen.";
    }

    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleNextStep = () => {
    if (validateStep()) {
      setStep(step + 1);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      onSubmit(formData);
      onClose();
    } catch (error) {
      setError("Hubo un error al guardar el producto. Inténtalo de nuevo.");
    } finally {
      setLoading(false);
    }
  };

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
                  <select
                    name="category_id"
                    value={formData.category_id}
                    onChange={handleChange}
                    className="w-full p-3 border rounded-lg"
                  >
                    <option value="">Selecciona una categoría</option>
                    {filteredCategories.map((category: Category) => (
                      <option key={category.id} value={category.id}>
                        {category.name}
                        {category.count_products && ` (${category.count_products})`}
                      </option>
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

                <div className="mt-4">
                  {/* Mostrar las imágenes cargadas */}
                  <div className="grid grid-cols-3 gap-4">
                    {formData.previews.map((preview, index) => (
                      <div key={index} className="relative">
                        <img src={preview} alt={`Imagen previa ${index}`} className="w-full h-32 object-cover rounded-lg" />
                        <button
                          type="button"
                          onClick={() => removeImage(index)}
                          className="absolute top-0 right-0 p-1 bg-red-500 text-white rounded-full"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}


            <div className="flex justify-between mt-6">
              {step > 0 && <button type="button" onClick={() => setStep(step - 1)} className="px-4 py-2 bg-gray-400 text-white rounded-lg">Atrás</button>}
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
