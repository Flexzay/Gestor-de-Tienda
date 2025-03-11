import { useState } from "react";
import { X, Image as ImageIcon } from "lucide-react";
import { productService } from "../../../Services/product.service";

interface ProductFormProps {
  onClose: () => void;
  onSubmit: () => void; // ✅ Se ejecutará después de agregar el producto
  initialData?: any;
}

const ProductForm: React.FC<ProductFormProps> = ({ onClose, onSubmit, initialData }) => {
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
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
      onSubmit(); // ✅ Se ejecuta para actualizar la lista en `DashboardContent.tsx`
      onClose();
    } catch (error) {
      console.error("Error al agregar el producto:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center px-4">
      <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-md relative">
        <button onClick={onClose} className="absolute top-3 right-3 text-gray-500 hover:text-gray-700">
          <X size={24} />
        </button>

        <h2 className="text-xl font-bold mb-4 text-gray-800">{initialData ? "Editar Producto" : "Agregar Nuevo Producto"}</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input type="text" name="name" placeholder="Nombre" value={formData.name} onChange={handleChange} required className="w-full p-2 border rounded" />
          <textarea name="description" placeholder="Descripción" value={formData.description} onChange={handleChange} required className="w-full p-2 border rounded h-20"></textarea>
          <input type="number" name="price" placeholder="Precio" value={formData.price} onChange={handleChange} required className="w-full p-2 border rounded" />
          <input type="text" name="category" placeholder="Categoría" value={formData.category} onChange={handleChange} required className="w-full p-2 border rounded" />
          <input type="file" accept="image/*" onChange={handleImageChange} className="w-full" />
          {preview && <img src={preview} alt="Vista previa" className="w-32 h-32 object-cover mt-2 rounded-md" />}

          <button type="submit" disabled={loading} className="w-full bg-blue-500 text-white p-2 rounded">
            {loading ? "Guardando..." : "Guardar Producto"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ProductForm;
