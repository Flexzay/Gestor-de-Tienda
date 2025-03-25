import { useReducer, useState } from "react";
import { X, Image as ImageIcon, CheckCircle, Trash2 } from "lucide-react";
import { ProductFormData } from "../../../interface/product";
import { useCategories } from "../../../hooks/bashboard/useCategories";
import { compressImage } from "../../../hooks/bashboard/useProduct";

const formReducer = (state: any, action: any) => {
  switch (action.type) {
    case "CHANGE_INPUT":
      return { ...state, [action.field]: action.value };
    case "ADD_IMAGES":
      return { 
        ...state, 
        images: [...state.images, ...action.files], 
        previews: [...state.previews, ...action.previews] 
      };
    case "REMOVE_IMAGE":
      return {
        ...state,
        images: state.images.filter((_img: any, index: number) => index !== action.index),
        previews: state.previews.filter((_preview: any, index: number) => index !== action.index),
      };
    case "RESET":
      return {
        name: action.initialData?.name || "",
        description: action.initialData?.description || "",
        price: action.initialData?.price || "",
        category_id: action.initialData?.category?.id || "",
        available: action.initialData?.available ?? true,
        images: [],
        previews: [],
      };
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
  const [formData, dispatch] = useReducer(formReducer, {
    name: initialData?.name || "",
    description: initialData?.description || "",
    price: initialData?.price || "",
    category_id: initialData?.category?.id || "",
    available: initialData?.available ?? true,
    images: [],
    previews: [],
  });
  
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    dispatch({ type: "CHANGE_INPUT", field: e.target.name, value: e.target.value });
  };

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files ? Array.from(e.target.files) : [];
    if (files.length > 0) {
      try {
        const compressedFiles = await Promise.all(files.map(file => compressImage(file)));
        const previews = compressedFiles.map(file => URL.createObjectURL(file));
        
        dispatch({ type: "ADD_IMAGES", files: compressedFiles, previews });
      } catch (error) {
        setError("Algunas imágenes no pudieron comprimirse.");
      }
    }
  };

  const removeImage = (index: number) => {
    dispatch({ type: "REMOVE_IMAGE", index });
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
    <div className="fixed inset-0 bg-white bg-opacity-40 backdrop-blur-md flex justify-center items-center px-4 z-50">
      <div className="bg-white p-6 rounded-2xl shadow-2xl w-full max-w-lg relative">
        <button onClick={onClose} className="absolute top-3 right-3 text-gray-400 hover:text-gray-700">
          <X size={24} />
        </button>

        <div className="flex justify-between items-center mb-6">
          {[1, 2, 3].map((num) => (
            <div key={num} className={`w-1/3 text-center ${step >= num ? 'text-red-500' : 'text-gray-300'}`}>
              {step > num ? <CheckCircle size={24} /> : <span className="font-semibold">{num}</span>}
            </div>
          ))}
        </div>

        {error && <p className="text-red-500 text-sm">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
          {step === 1 && (
            <>
              <label className="block">Nombre<input type="text" name="name" value={formData.name} onChange={handleChange} required className="w-full p-3 border rounded-lg" /></label>
              <label className="block">Descripción<textarea name="description" value={formData.description} onChange={handleChange} required className="w-full p-3 border rounded-lg" /></label>
              <label className="block">Precio<input type="number" name="price" value={formData.price} onChange={handleChange} required className="w-full p-3 border rounded-lg" /></label>
              <label className="block">Categoría<select name="category_id" value={formData.category_id} onChange={handleChange} required className="w-full p-3 border rounded-lg"><option value="">Selecciona una categoría</option>{filteredCategories.map(category => (<option key={category.id} value={category.id}>{category.name}</option>))}</select></label>
            </>
          )}

          {step === 2 && (
            <>
              <label className="block text-center border-2 border-dashed p-3 cursor-pointer">
                <input type="file" accept="image/*" multiple onChange={handleImageChange} className="hidden" />
                <ImageIcon size={40} />
                <span>Subir imágenes</span>
              </label>

              <div className="flex flex-wrap gap-2 justify-center">
                {formData.previews.map((preview: string, index: number) => (
                  <div key={index} className="relative">
                    <img src={preview} className="w-20 h-20 object-cover rounded-lg" />
                    <button 
                      type="button" 
                      onClick={() => removeImage(index)} 
                      className="absolute top-1 right-1 bg-red-600 text-white rounded-full p-1">
                      <Trash2 size={14} />
                    </button>
                  </div>
                ))}
              </div>
            </>
          )}

          {step === 3 && (
            <div>
              <h3 className="text-xl font-semibold">Confirmar Producto</h3>
              <p><strong>Nombre:</strong> {formData.name}</p>
              <p><strong>Descripción:</strong> {formData.description}</p>
              <p><strong>Precio:</strong> ${formData.price}</p>
              <p><strong>Categoría:</strong> {filteredCategories.find(c => c.id === formData.category_id)?.name}</p>
            </div>
          )}

          <div className="flex justify-between">
            {step > 1 && <button type="button" onClick={() => setStep(step - 1)} className="px-4 py-2 bg-gray-300 rounded-lg">Atrás</button>}
            {step < 3 ? <button type="button" onClick={() => setStep(step + 1)} className="px-4 py-2 bg-red-500 text-white rounded-lg">Siguiente</button> : <button type="submit" disabled={loading} className="px-4 py-2 bg-green-500 text-white rounded-lg">Guardar</button>}
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProductForm;
