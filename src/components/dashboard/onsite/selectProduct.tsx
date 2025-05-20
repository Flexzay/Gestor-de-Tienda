import React, { useEffect, useState } from "react";
import { productService } from "../../../Services/product.service";
import { ProductFormData } from "../../../interface/product";

interface SelectProductProps {
  onSelect: (product: ProductFormData) => void;
  selectedProductId?: number;
}

const SelectProduct: React.FC<SelectProductProps> = ({ onSelect, selectedProductId }) => {
  const [products, setProducts] = useState<ProductFormData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await productService.getProducts();
        setProducts(res.data);
      } catch (err) {
        console.error("Error al obtener productos:", err);
        setError("No se pudieron cargar los productos.");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return <p className="text-gray-500">Cargando productos...</p>;
  }

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      {products.map((product) => {
        const imageUrl =
          product.images && product.images.length > 0 && typeof product.images[0] === "object"
            ? (product.images[0] as any).url
            : "";

        const isSelected = selectedProductId === product.id;

        return (
          <div
            key={product.id}
            className={`p-4 bg-white border rounded shadow cursor-pointer hover:bg-gray-50 ${
              isSelected ? "border-blue-500 ring-2 ring-blue-400" : ""
            }`}
            onClick={() => onSelect(product)}
          >
            {/* Imagen redonda */}
            {imageUrl ? (
              <img
                src={imageUrl}
                alt={product.name}
                className="w-24 h-24 object-cover rounded-full mx-auto mb-4"
              />
            ) : (
              <div className="w-24 h-24 bg-gray-200 rounded-full mx-auto mb-4 flex items-center justify-center text-gray-400">
                Sin imagen
              </div>
            )}

            <h3 className="text-lg font-semibold text-center">{product.name}</h3>
            <p className="text-center text-sm text-gray-800 font-medium">
              Precio: {product.price ?? "No disponible"}
            </p>
          </div>
        );
      })}
    </div>
  );
};

export default SelectProduct;
