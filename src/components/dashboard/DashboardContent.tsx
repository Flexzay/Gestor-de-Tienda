
import React, { useState } from "react";
import AddProductForm from "./Product/Product";
import DashboardCard from "./DashboardCard";
import ProductList from "./ProductList";
import { Package, Truck, Wallet } from "lucide-react";
import { ProductFormData } from "../../interface/product";
import Provider from "../../interface/suppliets";

const DashboardContent: React.FC = () => {
  const [products, setProducts] = useState<ProductFormData[]>([]);
  const [isAdding, setIsAdding] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<ProductFormData | null>(null);
  const [providers] = useState<Provider[]>([ // Datos simulados para proveedores
    { id: 1, name: "TechSupply Co.", products: 25 },
    { id: 2, name: "Global Gadgets", products: 18 },
  ]);

  const handleAddProduct = (newProduct: ProductFormData) => {
    if (selectedProduct) {
      setProducts((prev) => prev.map((product) => (product === selectedProduct ? newProduct : product)));
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
        <DashboardCard title="Total Productos" value={products.length.toString()} icon={<Package className="text-[#fff5f7]" size={24} />} />
        <DashboardCard title="Total Proveedores" value={providers.length.toString()} icon={<Truck className="text-[#ffffff]" size={24} />} />
        <DashboardCard title="Total Métodos de Pago" value="3" icon={<Wallet className="text-[#ffffff]" size={24} />} />
      </div>
      <ProductList products={products} onEdit={handleEditProduct} onDelete={handleDeleteProduct} />
    </main>
  );
};

export default DashboardContent;