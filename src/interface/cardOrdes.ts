export interface CardOrder {
  title: string;
  urlS3: string;
  count: number;
  message: string;
  color: string;
  icon: React.ReactNode;
  id: number;
  status: number;
  products: {
    id: number;
    name: string;
    quantity: number;
    description?: string;}[];
}