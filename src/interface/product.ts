import Category from './category'; 

interface ProductImage {
  id: number | null;
  url: string;
}

export interface ProductFormData {
  id?: number;
  name: string;
  category_id: number;
  category?: Category;
  brand: string;
  stock: number;
  expirationDate?: string;
  available: boolean;
  price: number;
  description: string;
  images: (string | File)[];
  existingImages?: ProductImage[];
  deletedImages?: ProductImage[];
  previews?: string[];
}
