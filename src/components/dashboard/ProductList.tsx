
import React from "react";
import { Pencil, Trash2, Package } from "lucide-react";
import { ProductFormData } from "../../interface/product";

interface ProductListProps {
  products: ProductFormData[];
  onEdit: (product: ProductFormData) => void;
  onDelete: (product: ProductFormData) => void;
}

const ProductList: React.FC<ProductListProps> = ({ products, onEdit, onDelete }) => (
  <div className="mt-8 bg-white rounded-xl shadow-lg p-6 w-full">
    <h3 className="text-xl font-semibold mb-4 text-gray-800">Productos Agregados</h3>
    <div className="space-y-4">
      {products.map((product, index) => (
        <div key={index} className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
          <div className="h-12 w-12 rounded-full bg-[#ff204e]/20 flex items-center justify-center">
            <Package className="text-[#ff204e]" size={24} />
          </div>
          <div>
            <p className="font-medium text-gray-800">{product.name}</p>
            <p className="text-sm text-gray-500">Categoría: {product.category} - Precio: ${product.price}</p>
            <p className="text-sm text-gray-500">Stock: {product.stock} - Marca: {product.brand}</p>
            <p className="text-sm text-gray-500">Fecha de vencimiento: {product.expirationDate}</p>
          </div>
          <button onClick={() => onEdit(product)} className="text-gray-500 hover:text-[#ff204e] transition-colors">
            <Pencil size={18} />
          </button>
          <button onClick={() => onDelete(product)} className="text-gray-500 hover:text-[#ff204e] transition-colors">
            <Trash2 size={18} />
          </button>
        </div>
      ))}
    </div>
  </div>
);

export default ProductList;