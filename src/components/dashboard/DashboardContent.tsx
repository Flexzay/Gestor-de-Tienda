import type React from "react";
import { useState } from "react";
import AddProductForm from "./Product";
import { TrendingUp, Users, DollarSign, Briefcase, Package } from "lucide-react";
import type { ProductFormData } from "../../interface/product"; 


const DashboardCard: React.FC<{ title: string; value: string; icon: React.ReactNode }> = ({
  title,
  value,
  icon,
}) => (
  <div className="bg-white rounded-xl shadow-lg p-6 transition-all duration-300 hover:shadow-xl hover:scale-105 flex flex-col min-w-0">
    <div className="flex justify-between items-center mb-4">
      <div className="p-3 rounded-full bg-[#ff204e]/10">{icon}</div>
    </div>
    <h3 className="text-lg font-semibold text-gray-700 mb-2">{title}</h3>
    <p className="text-3xl font-bold text-[#ff204e]">{value}</p>
  </div>
);

const DashboardContent: React.FC = () => {
  const [products, setProducts] = useState<ProductFormData[]>([]);
  const [isAdding, setIsAdding] = useState(false);

  const handleAddProduct = (newProduct: ProductFormData) => {
    console.log("Nuevo producto agregado:", newProduct); // Para depuración
    setProducts((prev) => [...prev, newProduct]); // Asegúrate de usar `prev` para evitar sobrescrituras
    setIsAdding(false);
  };
  

  return (
    <main className="p-6 bg-gray-100 w-full overflow-hidden">
      <button onClick={() => setIsAdding(true)} className="mb-4 px-4 py-2 text-white bg-[#ff204e] rounded-md hover:bg-[#ff3b61]">
        Agregar Producto
      </button>
      {isAdding && <AddProductForm onClose={() => setIsAdding(false)} onSubmit={handleAddProduct} />}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        <DashboardCard title="Total Productos" value={products.length.toString()} icon={<Package className="text-[#ff204e]" size={24} />} />
      </div>
      <div className="mt-8 bg-white rounded-xl shadow-lg p-6 w-full">
        <h3 className="text-xl font-semibold mb-4 text-gray-800">Productos Agregados</h3>
        <div className="space-y-4">
          {products.map((product, index) => (
            <div key={index} className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
              <div className="h-12 w-12 rounded-full bg-[#ff204e]/20 flex items-center justify-center">
                <Package className="text-[#ff204e]" size={24} />
              </div>
              <div>
                <p className="font-medium text-gray-800">{product.name}</p>
                <p className="text-sm text-gray-500">{product.category} - ${product.price}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
};

export default DashboardContent;