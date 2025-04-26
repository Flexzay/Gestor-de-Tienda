import ProductDetail from "../../components/dashboard/Product/ProductDatail";
import { useProductDetail } from "../../hooks/bashboard/useProductDetail"; 

const ProductDetailPage = () => {
  const { product, loading, error,  navigate } = useProductDetail();
  if (loading) return <div>Cargando...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!product) return <div>Producto no encontrado</div>;

  return (
    <ProductDetail 
      product={product} 
      onBack={() => navigate(-1)} 
      
    />
  );
};

export default ProductDetailPage;
