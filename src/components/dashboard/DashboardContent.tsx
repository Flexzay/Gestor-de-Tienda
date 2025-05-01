import React, { useState } from "react";
import AddProductForm from "./Product/Product";
import DashboardCard from "./DashboardCard";
import DashboardImageCard from "./DashboardImageCard";
import ProductList from "./Product/ProductList";
import { Package, Tag, Wallet, Plus } from "lucide-react";
import { ProductFormData } from "../../interface/product";
import useProduct from "../../hooks/bashboard/useProduct";
import usePaymentMethods from "../../hooks/bashboard/usePaymentMethods";
import useCategories from "../../hooks/bashboard/useCategories";

const DashboardContent: React.FC = () => {
  const [isAdding, setIsAdding] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<ProductFormData | null>(null);

  const handleClose = () => {
    setIsAdding(false);
    setSelectedProduct(null);
  };

  const handleAddProduct = async (product: ProductFormData) => {
    if (selectedProduct?.id !== undefined) {
      await updateProduct(selectedProduct.id, product);
    } else {
      await createProduct(product);
    }
    await fetchProducts();
    handleClose();
  };


  const { products, createProduct, updateProduct, fetchProducts } = useProduct({
    onSubmit: handleAddProduct,
    onClose: handleClose,
    initialData: selectedProduct || undefined,
  });

  const { paymentMethods } = usePaymentMethods();
  const { categories } = useCategories();

  const handleEditProduct = (product: ProductFormData) => {
    setSelectedProduct(product);
    setIsAdding(true);
  };

  return (
    <main className="p-6 bg-gray-100 min-h-screen overflow-x-hidden ml-0 lg:ml-72">
      <button
        onClick={() => setIsAdding(true)}
        className="group mb-6 flex items-center gap-3 px-6 py-3 text-lg font-semibold text-white bg-gradient-to-r from-[#ff204e] to-[#ff4b70] rounded-xl shadow-md hover:shadow-xl transition-transform duration-300 transform hover:scale-105"
      >
        <Plus className="w-5 h-5 group-hover:rotate-90 transition-transform duration-300" />
        Agregar Producto
      </button>

      {isAdding && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96 relative">
            <button onClick={handleClose}
              className="absolute top-2 right-2 text-gray-500 hover:text-red-500">
              ✖
            </button>
            <AddProductForm
              onClose={handleClose}
              onSubmit={handleAddProduct}
              initialData={selectedProduct}
            />
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
          title="Total de Categorias"
          value= {categories.length.toString()}
          icon={<Tag size={20} />}
        />
        <DashboardCard
          title="Métodos de Pago"
          value={paymentMethods.length.toString()}
          icon={<Wallet size={20} />}
        />
        <DashboardImageCard />
      </div>

      <ProductList products={products} onEdit={handleEditProduct} />
    </main>
  );
};

export default DashboardContent;
