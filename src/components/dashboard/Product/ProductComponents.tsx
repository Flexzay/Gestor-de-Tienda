import React, { useState } from "react";
import ProductForm from "./Product";
import ProductList from "./ProductList";
import { ProductFormData } from "../../../interface/product";
import useProduct from "../../../hooks/bashboard/useProduct";

const ProductComponents: React.FC = () => {
  const { products, loading, error, createProduct, updateProduct } = useProduct();
  const [showForm, setShowForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState<ProductFormData | null>(null);

  const handleProductAdded = (updatedProduct: ProductFormData) => {
    if (editingProduct) {
      updateProduct(editingProduct.id, updatedProduct);
    } else {
      createProduct(updatedProduct);
    }
    setShowForm(false);
    setEditingProduct(null);
  };

  const handleEditProduct = (product: ProductFormData) => {
    setEditingProduct(product);
    setShowForm(true);
  };

  return (
    <div>
      <button onClick={() => setShowForm(true)} className="bg-green-500 text-white p-2 rounded">
        Agregar Producto
      </button>

      {showForm && (
        <ProductForm
          onClose={() => {
            setShowForm(false);
            setEditingProduct(null);
          }}
          onSubmit={handleProductAdded}
          initialData={editingProduct}
        />
      )}

      <ProductList products={products} onEdit={handleEditProduct} onDelete={() => {}} />
    </div>
  );
};

export default ProductComponents;