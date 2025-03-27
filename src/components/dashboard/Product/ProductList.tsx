import React, { useState, useEffect, useMemo } from "react";
import { Pencil, Trash2 } from "lucide-react";
import { ProductFormData } from "../../../interface/product";
import Paginator from "../Paginator";
import Domiduck from "../../../assets/img/domiduck.svg";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination, Autoplay } from "swiper/modules";
import { environment } from "../../../config/environmet";

interface ProductListProps {
  products: ProductFormData[];
  onEdit?: (product: ProductFormData) => void;
  onDelete?: (productId: string | number) => void;
  showTitle?: boolean;
}

const getImageUrl = (img?: string) => {
  if (!img) return Domiduck;
  return img.startsWith("http") ? img : `${environment.s3Storage}${img}`;
};

const ProductList: React.FC<ProductListProps> = ({ products, onEdit, onDelete, showTitle = true }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(4);

  useEffect(() => {
    const updateItemsPerPage = () => {
      setItemsPerPage(window.innerWidth >= 1024 ? 8 : 3);
    };
    updateItemsPerPage();
    window.addEventListener("resize", updateItemsPerPage);
    return () => window.removeEventListener("resize", updateItemsPerPage);
  }, []);

  const currentProducts = useMemo(() => {
    const indexOfLastProduct = currentPage * itemsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - itemsPerPage;
    return products.slice(indexOfFirstProduct, indexOfLastProduct);
  }, [products, currentPage, itemsPerPage]);

  return (
    <div className="mt-8 w-full pb-30">
      {showTitle && <h3 className="text-3xl font-bold mb-6 text-gray-900">🛒 Nuestros Productos</h3>}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {currentProducts.map((product) => {
          const images = product.images?.length
            ? product.images.map((img) => (typeof img === "string" ? img : img.path))
            : [Domiduck];

          return (
            <div
              key={product.id}
              className="relative bg-white shadow-lg rounded-xl overflow-hidden transition-all hover:scale-[1.03] hover:shadow-2xl border border-gray-200"
            >
              <div className="relative w-full h-56 bg-gray-100">
                <Swiper
                  modules={[Pagination, Autoplay]}
                  pagination={{ clickable: true }}
                  autoplay={{ delay: 2500, disableOnInteraction: false }}
                  spaceBetween={10}
                  slidesPerView={1}
                  loop={images.length > 1} // ✅ Solo activa loop si hay más de 1 imagen
                  className="w-full h-full"
                >
                  {images.map((img, imgIndex) => (
                    <SwiperSlide key={imgIndex}>
                      <img
                        src={getImageUrl(img)}
                        className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                        alt={product.name}
                        onError={(e) => (e.currentTarget.src = Domiduck)}
                      />
                    </SwiperSlide>
                  ))}
                </Swiper>

                {product.category && product.category.name ? (
                  <span className="absolute bottom-3 left-3 bg-gray-800 text-white text-xs font-semibold px-3 py-1 rounded-full shadow-md z-10">
                    {product.category.name}
                  </span>
                ) : null}


              </div>

              <div className="px-6 py-4">
                <h4 className="text-lg font-bold text-gray-900 truncate">{product.name}</h4>
                <p className="text-sm text-gray-600 line-clamp-2">{product.description}</p>
              </div>

              <div className="flex items-center justify-between px-6 py-3 bg-white border-t">
                <span className="text-xl font-bold text-red-500">${product.price}</span>
                <div className="flex space-x-2">
                  <button
                    onClick={() => onEdit?.(product)}
                    className="bg-blue-500 text-white p-2 rounded-lg shadow-md hover:bg-blue-600 transition"
                  >
                    <Pencil size={18} />
                  </button>
                  <button
                    onClick={() => onDelete?.(product.id)}
                    className="bg-red-500 text-white p-2 rounded-lg shadow-md hover:bg-red-600 transition"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <Paginator
        currentPage={currentPage}
        totalItems={products.length}
        itemsPerPage={itemsPerPage}
        onPageChange={setCurrentPage}
        onItemsPerPageChange={(value) => {
          setItemsPerPage(value);
          setCurrentPage(1); // Reiniciar a la primera página
        }}
      />

    </div>
  );
};

export default ProductList;
