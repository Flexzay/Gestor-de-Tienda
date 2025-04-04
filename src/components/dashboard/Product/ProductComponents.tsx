import React, { useState, useCallback, useEffect } from "react";
import ProductForm from "./Product";
import ProductList from "./ProductList";
import ProductDetail from "./ProductDatailView";
import { ProductFormData } from "../../../interface/product";
import useProduct from "../../../hooks/bashboard/useProduct";

const ProductComponents: React.FC = () => {
  const { products, loading, error, createProduct, updateProduct } = useProduct();
  const [showForm, setShowForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState<ProductFormData | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<ProductFormData | null>(null);

  const handleProductAdded = useCallback(
    (updatedProduct: ProductFormData) => {
      if (editingProduct?.id !== undefined) {
        updateProduct(editingProduct.id, updatedProduct);
      } else {
        createProduct(updatedProduct);
      }
      setShowForm(false);
      setEditingProduct(null);
    },
    [editingProduct, createProduct, updateProduct]
  );

  const handleEditProduct = useCallback((product: ProductFormData) => {
    setEditingProduct(product);
    setShowForm(true);
  }, []);

  const handleCloseForm = useCallback(() => {
    setShowForm(false);
    setEditingProduct(null);
  }, []);

  const handleSelectProduct = useCallback((product: ProductFormData) => {
    
    setSelectedProduct(product);
  }, []);

  useEffect(() => {
    
  }, [selectedProduct]);

  return (
    <div className="p-4">
      <button
        onClick={() => setShowForm(true)}
        className="bg-green-500 text-white p-2 rounded hover:bg-green-600 transition"
      >
        ➕ Agregar Producto
      </button>

      {loading && <p className="text-gray-600 mt-4">Cargando productos...</p>}
      {error && <p className="text-red-500 mt-4">❌ Error al cargar los productos</p>}

      {showForm && (
        <ProductForm
          onClose={handleCloseForm}
          onSubmit={handleProductAdded}
          initialData={editingProduct}
        />
      )}

      {/* Mostrar detalle del producto si se ha seleccionado uno */}
      {selectedProduct ? (
        <ProductDetail
          product={selectedProduct}
          onBack={() => setSelectedProduct(null)}
        />
      ) : (
        <ProductList
          products={products}
          onEdit={handleEditProduct}
          onDelete={() => {}}
          onSelectProduct={handleSelectProduct}
        />
      )}
    </div>
  );
};

export default ProductComponents;
