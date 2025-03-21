export interface ProductFormData {
  name: string;
  category: { id: number; name: string };
  brand: string;
  stock: number;
  expirationDate?: string;
  price: number;
  description: string;
  image: string | null;
}

export default ProductFormData;
