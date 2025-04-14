import Category from './category';

export interface ProductImage {
  id: number | null;
  url: string;
}

interface Ingredient {
  name: string;
  quantity: string;
}

export interface ProductFormData {
  id?: number;
  name: string;
  category_id: number;
  category?: Category;
  price: number;
  description: string;
  available: boolean;
  brand: string;
  stock: number;
  expirationDate?: string;
  ingredients?: Ingredient[];
  images: (string | File)[];
  existingImages?: ProductImage[];
  deletedImages?: ProductImage[];
  previews?: string[];
}