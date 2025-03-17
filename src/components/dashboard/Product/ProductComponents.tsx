import { useState, useEffect } from "react";
import ProductForm from "./Product";
import ProductList from "./ProductList";
import { productService } from "../../../Services/product.service";
import { ProductFormData } from "../../../interface/product";

const ProductComponents: React.FC = () => {
  const [products, setProducts] = useState<ProductFormData[]>([]);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await productService.getProducts();
      if (response.status === 200 && response.data) {
        setProducts(Array.isArray(response.data) ? response.data : response.data.data || []);
      } else {
        setProducts([]);
      }
    } catch (error) {
      setProducts([]);
    }
  };
  

  const handleProductAdded = () => {
    console.log("✅ Producto agregado con éxito, recargando lista...");
    fetchProducts();
    setShowForm(false);
  };

  return (
    <div>
      <button onClick={() => setShowForm(true)} className="bg-green-500 text-white p-2 rounded">
        Agregar Producto
      </button>

      {showForm && <ProductForm onClose={() => setShowForm(false)} onProductAdded={handleProductAdded} />}

      <ProductList products={products} onEdit={() => {}} onDelete={() => {}} />
    </div>
  );
};

export default ProductComponents;
