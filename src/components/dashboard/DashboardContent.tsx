import type React from "react";
import { useState, useEffect } from "react";
import AddProductForm from "./Product";
import { Package, Pencil, Trash2, Truck , Wallet} from "lucide-react";
import { ProductFormData } from "../../interface/product";
import  Provider  from "../../interface/suppliets";

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
  const [selectedProduct, setSelectedProduct] = useState<ProductFormData | null>(null);
  
  const [providers, setProviders] = useState<Provider[]>([
    { id: 1, name: "TechSupply Co.", products: 25 },
    { id: 2, name: "Global Gadgets", products: 18 },
    { id: 3, name: "Eco Essentials", products: 30 },
    { id: 4, name: "Quality Electronics", products: 22 },
    { id: 5, name: "Innovative Imports", products: 15 },
  ]);

  const handleAddProduct = (newProduct: ProductFormData) => {
    if (selectedProduct) {
      setProducts((prev) =>
        prev.map((product) => (product === selectedProduct ? newProduct : product))
      );
    } else {
      setProducts((prev) => [...prev, newProduct]);
    }
    setIsAdding(false);
    setSelectedProduct(null);
  };

  const handleDeleteProduct = (productToDelete: ProductFormData) => {
    setProducts(products.filter((product) => product !== productToDelete));
  };

  const handleEditProduct = (product: ProductFormData) => {
    setSelectedProduct(product);
    setIsAdding(true);
  };

  return (
    <main className="p-6 bg-gray-100 w-full overflow-hidden">
      <button onClick={() => setIsAdding(true)} className="mb-4 px-4 py-2 text-white bg-[#ff204e] rounded-md hover:bg-[#ff3b61]">
        {selectedProduct ? "Editar Producto" : "Agregar Producto"}
      </button>

      {isAdding && (
        <AddProductForm
          onClose={() => {
            setIsAdding(false);
            setSelectedProduct(null);
          }}
          onSubmit={handleAddProduct}
          initialData={selectedProduct} 
        />
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {/* Tarjeta Total Productos */}
        <DashboardCard title="Total Productos" value={products.length.toString()} icon={<Package className="text-[#ff204e]" size={24} />} />

        {/* Tarjeta Total Proveedores */}
        <DashboardCard title="Total Proveedores" value={providers.length.toString()} icon={<Truck className="text-[#ff204e]" size={24} />} />

        {/* Tarjeta Total Metodos de pago */}
        <DashboardCard title="Total Metodos de Pago" value={providers.length.toString()} icon={<Wallet className="text-[#ff204e]" size={24} />} />
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
                <p className="text-sm text-gray-500">Categoría: {product.category} - Precio: ${product.price}</p>
                <p className="text-sm text-gray-500">Stock: {product.stock} - Marca: {product.brand}</p>
                <p className="text-sm text-gray-500">Fecha de vencimiento: {product.expirationDate}</p> 
              </div>
              <button onClick={() => handleEditProduct(product)} className="text-gray-500 hover:text-[#ff204e] transition-colors">
                <Pencil size={18} />
              </button>
              <button onClick={() => handleDeleteProduct(product)} className="text-gray-500 hover:text-[#ff204e] transition-colors">
                <Trash2 size={18} />
              </button>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
};

export default DashboardContent;
