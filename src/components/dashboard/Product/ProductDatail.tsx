// pages/ProductDetail.tsx
import { useProductDetail } from "../../../hooks/bashboard/useProductDetail";
import { ProductDetailView } from "./ProductDatailView";
import Domiduck from "../../../assets/img/domiduck.svg";
import { environment } from "../../../config/environmet";

const getImageUrl = (img?: string) => {
  if (!img) return Domiduck;
  return img.startsWith("http") ? img : `${environment.s3Storage}${img}`;
};

export const ProductDetail: React.FC = () => {
  const { product, loading, error, handleDelete, navigate } = useProductDetail();

  return (
    <ProductDetailView
      product={product}
      loading={loading}
      error={error}
      onDelete={handleDelete}
      onEdit={(id) => navigate(`/product/edit/${id}`)}
      onBack={() => navigate(-1)}
      getImageUrl={getImageUrl}
    />
  );
};

export default ProductDetail;