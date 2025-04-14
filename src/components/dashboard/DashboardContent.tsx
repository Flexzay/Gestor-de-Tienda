import React, { useState } from "react";
import AddProductForm from "./Product/Product";
import DashboardCard from "./DashboardCard";
import DashboardImageCard from "./DashboardImageCard";
import ProductList from "./Product/ProductList";
import { Package, Truck, Wallet } from "lucide-react";
import { ProductFormData } from "../../interface/product";
import useProduct from "../../hooks/bashboard/useProduct";

const DashboardContent: React.FC = () => {
  const { products, createProduct, updateProduct, fetchProducts } = useProduct({});


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
    <main className="p-6 bg-gray-100 min-h-screen overflow-x-hidden ml-0 lg:ml-72">


      <button
        onClick={() => setIsAdding(true)}
        className="mb-4 px-6 py-3 text-xl font-semibold text-white bg-[#ff204e] rounded-lg hover:bg-[#ff3b61] transition-all duration-300"
      >
        Agregar Producto
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

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 p-4">
        <DashboardCard
          title="Total Productos"
          value={products.length.toString()}
          icon={<Package size={20} />}
        />
        <DashboardCard
          title="Total Proveedores"
          value="2"
          icon={<Truck size={20} />}
        />
        <DashboardCard
          title="Métodos de Pago"
          value="3"
          icon={<Wallet size={20} />}
        />
        <DashboardImageCard />
      </div>


      <ProductList products={products} onEdit={handleEditProduct} />
      {/* onDelete={handleDeleteProduct} debe ir despues de onEdit={handleEditProduct} a la hora de implementar la funcion de eliminar producto */}
    </main>
  );
};

export default DashboardContent;