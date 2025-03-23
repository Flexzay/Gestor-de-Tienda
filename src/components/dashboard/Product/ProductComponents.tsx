import React, { useState, useCallback } from "react";
import ProductForm from "./Product";
import ProductList from "./ProductList";
import { ProductFormData } from "../../../interface/product";
import useProduct from "../../../hooks/bashboard/useProduct";

const ProductComponents: React.FC = () => {
  const { products, loading, error, createProduct, updateProduct } = useProduct();
  const [showForm, setShowForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState<ProductFormData | null>(null);

  // Función para manejar la creación/edición de un producto
  const handleProductAdded = useCallback((updatedProduct: ProductFormData) => {
    if (editingProduct?.id !== undefined) {
      updateProduct(editingProduct.id, updatedProduct);
    } else {
      createProduct(updatedProduct);
    }
    setShowForm(false);
    setEditingProduct(null);
  }, [editingProduct, createProduct, updateProduct]);

  // Función para manejar la edición de un producto
  const handleEditProduct = useCallback((product: ProductFormData) => {
    setEditingProduct(product);
    setShowForm(true);
  }, []);

  // Función para cerrar el formulario
  const handleCloseForm = useCallback(() => {
    setShowForm(false);
    setEditingProduct(null);
  }, []);

  return (
    <div className="p-4">
      {/* Botón para abrir el formulario */}
      <button
        onClick={() => setShowForm(true)}
        className="bg-green-500 text-white p-2 rounded hover:bg-green-600 transition"
      >
        ➕ Agregar Producto
      </button>

      {/* Mostrar mensaje de carga o error */}
      {loading && <p className="text-gray-600 mt-4">Cargando productos...</p>}
      {error && <p className="text-red-500 mt-4">❌ Error al cargar los productos</p>}

      {/* Formulario de producto */}
      {showForm && (
        <ProductForm onClose={handleCloseForm} onSubmit={handleProductAdded} initialData={editingProduct} />
      )}

      {/* Lista de productos */}
      <ProductList products={products} onEdit={handleEditProduct} onDelete={() => {}} />
    </div>
  );
};

export default ProductComponents;
