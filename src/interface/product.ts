import Category from './category'; 

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
  existingImages?: string[];
  previews?: string[];
}