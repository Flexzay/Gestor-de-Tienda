import { ProductDetailView } from "./ProductDatailView";
import { ProductFormData } from "../../../interface/product";
import Domiduck from "../../../assets/img/domiduck.svg";
import { environment } from "../../../config/environmet";

interface Props {
  product: ProductFormData;
  onBack: () => void;
}

const getImageUrl = (img?: string) => {
  if (!img) return Domiduck;
  return img.startsWith("http") ? img : `${environment.s3Storage}${img}`;
};

const ProductDetail: React.FC<Props> = ({ product, onBack }) => {
  const handleDelete = async () => {
    // lógica de eliminación si quieres aquí, o puedes pasarlo desde el padre
    console.log("Eliminar producto", product.id);
  };

  const handleEdit = (id: string) => {
    // redirigir a edición
    console.log("Editar producto", id);
  };

  return (
    <ProductDetailView
      product={product}
      loading={false}
      error={null}
      onBack={onBack}
      onDelete={handleDelete}
      onEdit={handleEdit}
      getImageUrl={getImageUrl}
    />
  );
};

export default ProductDetail;
