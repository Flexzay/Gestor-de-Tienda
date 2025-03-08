import type React from "react";
import { useState, useEffect } from "react";
import { Package, X, Image as ImageIcon, ArrowRight, ArrowLeft } from "lucide-react";
import { ProductFormData } from "../../../interface/product";
import { useCategories } from "../../../hooks/bashboard/useCategories";

interface AddProductFormProps {
  onClose: () => void;
  onSubmit: (product: ProductFormData) => void;
  initialData?: ProductFormData | null;
}

const AddProductForm: React.FC<AddProductFormProps> = ({ onClose, onSubmit, initialData }) => {
  const { categories } = useCategories();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<ProductFormData>(
    initialData || {
      name: "",
      category: "",
      brand: "",
      stock: 0,
      expirationDate: "",
      price: 0,
      description: "",
      image: null,
    }
  );
  const [preview, setPreview] = useState<string | null>(null);

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
      if (initialData.image) {
        setPreview(initialData.image);
      }
    }
  }, [initialData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "stock" || name === "price" ? Number(value) || "" : value,
    }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setPreview(imageUrl);
      setFormData((prev) => ({ ...prev, image: file }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center px-4">
  <div className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-lg relative">
    <button onClick={onClose} className="absolute top-4 right-4 text-gray-500 hover:text-gray-700">
      <X size={24} />
    </button>

    {step === 1 ? (
      <>
        <h2 className="text-2xl font-bold mb-6 text-gray-800 flex items-center gap-2">
          <Package className="text-[#ff204e]" size={28} />
          {initialData ? "Editar Producto" : "Agregar Nuevo Producto"}
        </h2>
        
        <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
          <div>
            <label className="label">Nombre</label>
            <input type="text" name="name" value={formData.name} onChange={handleChange} required className="input-field" />
          </div>

          <div>
            <label className="label">Categoría</label>
            <select name="category" value={formData.category} onChange={handleChange} required className="input-field">
              <option value="">Selecciona una categoría</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.name}>{cat.name}</option>
              ))} 
            </select>
          </div>

          <div>
            <label className="label">Marca</label>
            <input type="text" name="brand" value={formData.brand} onChange={handleChange} required className="input-field" />
          </div>

          <div>
            <label className="label">Stock</label>
            <input type="number" name="stock" value={formData.stock} onChange={handleChange} required className="input-field" />
          </div>

          <div>
            <label className="label">Fecha de Vencimiento</label>
            <input type="date" name="expirationDate" value={formData.expirationDate} onChange={handleChange} required className="input-field" />
          </div>

          <div>
            <label className="label">Precio</label>
            <input type="number" name="price" value={formData.price} onChange={handleChange} required className="input-field" />
          </div>

          <div>
            <label className="label">Descripción</label>
            <textarea name="description" value={formData.description} onChange={handleChange} required className="input-field h-24"></textarea>
          </div>

          <div className="flex justify-end mt-4">
            <button type="button" onClick={() => setStep(2)} className="btn-primary flex items-center">
              Siguiente <ArrowRight className="ml-2" size={18} />
            </button>
          </div>
        </form>
      </>
    ) : (
      <>
        <h2 className="text-2xl font-bold mb-8 text-gray-800 flex items-center gap-2">
          <ImageIcon className="text-[#ff204e]" size={28} />
          Subir Imagen
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex flex-col items-center gap-4">
            {preview ? (
              <img src={preview} alt="Vista previa" className="w-44 h-44 rounded-xl object-cover shadow-md border border-gray-300" />
            ) : (
              <div className="w-44 h-44 bg-gray-100 flex items-center justify-center rounded-xl shadow-md border border-gray-300">
                <ImageIcon size={50} className="text-gray-400" />
              </div>
            )}
            <input type="file" accept="image/*" onChange={handleImageChange} className="text-sm" />
          </div>

          <div className="flex justify-between">
            <button type="button" onClick={() => setStep(1)} className="btn-secondary flex items-center">
              <ArrowLeft className="mr-2" size={18} /> Anterior
            </button>
            <button type="submit" className="btn-primary">
              {initialData ? "Actualizar Producto" : "Agregar Producto"}
            </button>
          </div>
        </form>
      </>
    )}
  </div>
</div>

  );
};

export default AddProductForm;
