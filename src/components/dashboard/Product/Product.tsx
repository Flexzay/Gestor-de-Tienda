import { useState } from "react";
import { X, Image as ImageIcon, Loader2 } from "lucide-react";
import { productService } from "../../../Services/product.service";
import { useCategories } from "../../../hooks/bashboard/useCategories"; 

interface ProductFormProps {
  onClose: () => void;
  onSubmit: () => void;
  initialData?: any;
}

const ProductForm: React.FC<ProductFormProps> = ({ onClose, onSubmit, initialData }) => {
  const { filteredCategories } = useCategories(); // Obtenemos las categorías disponibles

  const [formData, setFormData] = useState({
    name: initialData?.name || "",
    description: initialData?.description || "",
    price: initialData?.price || "",
    category: initialData?.category || "",
    available: initialData?.available || true,
    image: null as File | null,
  });

  const [preview, setPreview] = useState<string | null>(initialData?.image || null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setPreview(URL.createObjectURL(file));
      setFormData((prev) => ({ ...prev, image: file }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    if (!formData.name || !formData.description || !formData.price || !formData.category) {
      setError("Todos los campos son obligatorios.");
      setLoading(false);
      return;
    }

    const formDataObj = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      if (key === "image" && value instanceof File) {
        formDataObj.append(key, value);
      } else {
        formDataObj.append(key, value.toString());
      }
    });

    try {
      if (initialData) {
        await productService.updateProduct(initialData.id, formDataObj);
      } else {
        await productService.createProduct(formDataObj);
      }
      onSubmit();
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
        {/* Botón de cerrar */}
        <button onClick={onClose} className="absolute top-3 right-3 text-gray-400 hover:text-gray-700">
          <X size={24} />
        </button>
  
        <h2 className="text-2xl font-semibold mb-6 text-gray-900">
          {initialData ? "✏️ Editar Producto" : "➕ Agregar Nuevo Producto"}
        </h2>
  
        {/* Formulario */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="name"
            placeholder="Nombre del producto"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ff2c59] outline-none text-gray-900"
          />
  
          <textarea
            name="description"
            placeholder="Descripción"
            value={formData.description}
            onChange={handleChange}
            required
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ff2c59] outline-none h-24 text-gray-900"
          ></textarea>
  
          <div className="grid grid-cols-2 gap-4">
            <input
              type="number"
              name="price"
              placeholder="Precio"
              value={formData.price}
              onChange={handleChange}
              required
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ff2c59] outline-none text-gray-900"
            />

            {/* Selector de Categoría */}
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              required
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ff2c59] outline-none text-gray-900 bg-white"
            >
              <option value="">Selecciona una categoría</option>
              {filteredCategories.map((cat) => (
                <option key={cat.id} value={cat.name}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>
  
          <label className="w-full flex flex-col items-center p-3 border-2 border-dashed border-gray-400 rounded-lg cursor-pointer hover:border-[#ff2c59] transition">
            <input type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
            <div className="flex flex-col items-center justify-center text-gray-500">
              <ImageIcon size={40} />
              <span className="text-sm mt-2">Subir imagen</span>
            </div>
          </label>
  
          {preview && (
            <div className="w-full flex justify-center mt-4">
              <img src={preview} alt="Vista previa" className="w-32 h-32 object-cover rounded-lg shadow-lg border border-gray-300" />
            </div>
          )}
  
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#ff2c59] hover:bg-[#e0264f] text-white font-semibold p-3 rounded-lg flex items-center justify-center transition duration-300"
          >
            {loading ? (
              <>
                <Loader2 className="animate-spin mr-2" size={20} />
                Guardando...
              </>
            ) : (
              "Guardar Producto"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ProductForm;
