import React, { useState } from "react";
import AddProductForm from "./Product/Product";
import DashboardCard from "./DashboardCard";
import ProductList from "./Product/ProductList";
import { Package, Truck, Wallet } from "lucide-react";
import { ProductFormData } from "../../interface/product";
import useProduct from "../../hooks/bashboard/useProduct";

const DashboardContent: React.FC = () => {
  const { products, createProduct, updateProduct,  fetchProducts } = useProduct();
  // deleteProduct debe ir despues de createProduct y updateProduct a la hora de implementar la funcion de eliminar producto
  const [isAdding, setIsAdding] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<ProductFormData | null>(null);

  const handleAddProduct = async (product: ProductFormData) => {
    try {
      if (selectedProduct?.id !== undefined) { 
        await updateProduct(selectedProduct.id, product);
      } else {
        await createProduct(product);
      }
  
      // ✅ Llamar a fetchProducts para recargar la lista
      await fetchProducts();
  
      setIsAdding(false);
      setSelectedProduct(null);
    } catch (error) {
      console.error("Error al guardar producto:", error);
    }
  };
  

  // const handleDeleteProduct = async (productToDelete: ProductFormData) => {
  //   if (!window.confirm(`¿Seguro que deseas desactivar "${productToDelete.name}"?`)) return;
  //   await deleteProduct(productToDelete.id);
  // };

  const handleEditProduct = (product: ProductFormData) => {
    setSelectedProduct(product);
    setIsAdding(true);
  };

  return (
    <main className="p-6 bg-gray-100 w-full h-screen overflow-y-auto">
      <button onClick={() => setIsAdding(true)} className="mb-4 px-4 py-2 text-white bg-[#ff204e] rounded-md hover:bg-[#ff3b61]">
        {selectedProduct ? "Editar Producto" : "Agregar Producto"}
      </button>

      {isAdding && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96 relative">
            <button onClick={() => { setIsAdding(false); setSelectedProduct(null); }}
              className="absolute top-2 right-2 text-gray-500 hover:text-red-500">
              ✖
            </button>
            <AddProductForm onClose={() => { setIsAdding(false); setSelectedProduct(null); }}
              onSubmit={handleAddProduct} initialData={selectedProduct} />
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        <DashboardCard title="Total Productos" value={products.length.toString()} icon={<Package className="text-[#fff5f7]" size={24} />} />
        <DashboardCard title="Total Proveedores" value="2" icon={<Truck className="text-[#ffffff]" size={24} />} />
        <DashboardCard title="Total Métodos de Pago" value="3" icon={<Wallet className="text-[#ffffff]" size={24} />} />
      </div>

      <ProductList products={products} onEdit={handleEditProduct} />
      {/* onDelete={handleDeleteProduct} debe ir despues de onEdit={handleEditProduct} a la hora de implementar la funcion de eliminar producto */}
    </main>
  );
};

export default DashboardContent;