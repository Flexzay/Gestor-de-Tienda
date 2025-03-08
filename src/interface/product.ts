export interface ProductFormData {
  name: string;
  category: string;
  brand: string;
  stock: number;
  expirationDate?: string;
  price: number;
  description: string;
  image: string | null;
}

export default ProductFormData;
