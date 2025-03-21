import { useReducer, useState } from "react";
import { X, Image as ImageIcon, Loader2 } from "lucide-react";
import { productService } from "../../../Services/product.service";
import { useCategories } from "../../../hooks/bashboard/useCategories";
import { ProductFormData } from "../../../interface/product";

// Definir el tipo de acción para el reducer
type Action =
  | { type: "CHANGE_INPUT"; field: string; value: string | boolean }
  | { type: "CHANGE_IMAGE"; file: File | null; preview: string | null }
  | { type: "RESET"; initialData: ProductFormData | null };

// Reducer para manejar el estado del formulario
const formReducer = (state: any, action: Action) => {
  switch (action.type) {
    case "CHANGE_INPUT":
      return { ...state, [action.field]: action.value };
    case "CHANGE_IMAGE":
      return { ...state, image: action.file, preview: action.preview };
    case "RESET":
      return {
        name: action.initialData?.name || "",
        description: action.initialData?.description || "",
        price: action.initialData?.price || "",
        category_id: action.initialData?.category?.id || "",
        available: action.initialData?.available ?? true,
        image: null,
        preview: action.initialData?.image || null,
      };
    default:
      return state;
  }
};

interface ProductFormProps {
  onClose: () => void;
  onSubmit: (product: any) => void;
  initialData?: ProductFormData | null;
}

const ProductForm: React.FC<ProductFormProps> = ({ onClose, onSubmit, initialData }) => {
  const { filteredCategories } = useCategories(); // Obtener categorías desde el hook personalizado

  // Estado del formulario usando useReducer
  const [formData, dispatch] = useReducer(formReducer, {
    name: initialData?.name || "",
    description: initialData?.description || "",
    price: initialData?.price || "",
    category_id: initialData?.category?.id || "",
    available: initialData?.available ?? true,
    image: null as File | null,
    preview: initialData?.image || null,
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Manejar cambios en los inputs
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    dispatch({ type: "CHANGE_INPUT", field: e.target.name, value: e.target.value });
  };

  // Manejar cambios en la imagen seleccionada
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      dispatch({ type: "CHANGE_IMAGE", file, preview: URL.createObjectURL(file) });
    }
  };

  // Manejar el envío del formulario
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    // Validación básica
    if (!formData.name || !formData.description || !formData.price || !formData.category_id) {
      setError("Todos los campos son obligatorios.");
      setLoading(false);
      return;
    }

    // Crear objeto FormData para enviar al backend
    const formDataObj = new FormData();
    formDataObj.append("name", formData.name);
    formDataObj.append("description", formData.description);
    formDataObj.append("price", formData.price.toString());
    formDataObj.append("category_id", formData.category_id.toString());
    formDataObj.append("available", formData.available.toString());

    if (formData.image) {
      formDataObj.append("image", formData.image);
    }

    try {
      let response;
      if (initialData) {
        response = await productService.updateProduct(initialData.id, formDataObj);
      } else {
        response = await productService.createProduct(formDataObj);
      }

      onSubmit(response.data); // Notificar al padre el nuevo producto
      onClose(); // Cerrar el modal
    } catch (error) {
      setError("Hubo un error al guardar el producto. Inténtalo de nuevo.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-white bg-opacity-40 backdrop-blur-md flex justify-center items-center px-4 z-50">
      <div className="bg-white p-6 rounded-2xl shadow-2xl w-full max-w-lg relative">
        {/* Botón para cerrar el formulario */}
        <button onClick={onClose} className="absolute top-3 right-3 text-gray-400 hover:text-gray-700">
          <X size={24} />
        </button>

        <h2 className="text-2xl font-semibold mb-6 text-gray-900">
          {initialData ? "✏️ Editar Producto" : "➕ Agregar Nuevo Producto"}
        </h2>

        {error && <p className="text-red-500 text-sm">{error}</p>}

        {/* Formulario */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <label className="block">
            Nombre del producto
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full p-3 border rounded-lg"
            />
          </label>

          <label className="block">
            Descripción
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
              className="w-full p-3 border rounded-lg h-24"
            />
          </label>

          <div className="grid grid-cols-2 gap-4">
            <label>
              Precio
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                required
                className="w-full p-3 border rounded-lg"
              />
            </label>

            <label>
              Categoría
              <select
                name="category_id"
                value={formData.category_id}
                onChange={handleChange}
                required
                className="w-full p-3 border rounded-lg bg-white"
              >
                <option value="">Selecciona una categoría</option>
                {filteredCategories.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </label>
          </div>

          {/* Carga de imagen */}
          <label className="block text-center border-2 border-dashed p-3 cursor-pointer">
            <input type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
            <ImageIcon size={40} />
            <span>Subir imagen</span>
          </label>

          {formData.preview && <img src={formData.preview} className="w-32 h-32 object-cover rounded-lg mx-auto" />}

          <button type="submit" disabled={loading} className="w-full bg-red-500 text-white p-3 rounded-lg">
            {loading ? <Loader2 className="animate-spin mr-2" size={20} /> : "Guardar Producto"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ProductForm;
