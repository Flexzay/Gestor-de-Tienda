import React, { useState, useEffect, useCallback } from "react";
import ProductForm from "./Product";
import ProductList from "./ProductList";
import ProductDetail from "./ProductDatail";
import { ProductFormData } from "../../../interface/product";
import { productService } from "../../../Services/product.service";

const ProductComponents: React.FC = () => {
  const [products, setProducts] = useState<ProductFormData[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState<ProductFormData | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<ProductFormData | null>(null);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const response = await productService.getProducts();
      setProducts(response.data);
    } catch (err) {
      setError("Error al obtener productos");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleProductAdded = useCallback(
    async (updatedProduct: ProductFormData) => {
      try {
        if (editingProduct?.id !== undefined) {
          await productService.updateProduct(editingProduct.id, updatedProduct);
        } else {
          await productService.createProduct(updatedProduct);
        }
        await fetchProducts();
        setShowForm(false);
        setEditingProduct(null);
      } catch (err) {
        console.error("Error al guardar producto", err);
      }
    },
    [editingProduct]
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

  return (
    <div className="p-4">
      <button
        onClick={() => setShowForm(true)}
        className="bg-green-500 text-white p-2 rounded hover:bg-green-600 transition"
      >
        ➕ Agregar Producto
      </button>

      {loading && <p className="text-gray-600 mt-4">Cargando productos...</p>}
      {error && <p className="text-red-500 mt-4">❌ {error}</p>}

      {showForm && (
        <ProductForm
          onClose={handleCloseForm}
          onSubmit={handleProductAdded}
          initialData={editingProduct || undefined}
        />
      )}

      {selectedProduct ? (
        <ProductDetail
          product={selectedProduct}
          onBack={() => setSelectedProduct(null)}
        />
      ) : (
        <ProductList
          products={products}
          onEdit={handleEditProduct}
          onSelectProduct={handleSelectProduct}
        />
      )}
    </div>
  );
};

export default ProductComponents;
