import Category from './category';

export interface ProductImage {
  id: number;
  url: string;
  path?: string;
}

export interface ProductIngredient {
  item: string;  
  value: string; 
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
  data_table?: ProductIngredient[]; 
  images: (string |ProductImage| File)[];
  existingImages?: ProductImage[];
  deletedImages?: ProductImage[];
  previews?: string[];
}