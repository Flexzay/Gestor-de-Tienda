export interface ProductFormData {
  id?: number;
  name: string;
  category: { id: number; name: string };
  brand: string;
  stock: number;
  expirationDate?: string;
  available : boolean;
  price: number;
  description: string;
  image: string | null;
}

export default ProductFormData;
