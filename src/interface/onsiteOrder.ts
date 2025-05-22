export interface NewOrderOnSite {
  client_id: number;
  space_id: number;
  products: Array<{
    id: number;
    amount: number;
    price: number;
    observation: string | null;
  }>;
}

export interface OrderProduct {
  id: number;
  name: string;
  price: number;
  quantity: number;
}

export interface OrderResponse {
  id: string;
  client: {
    id: number;
    name: string;
    phone?: string;
  };
  space: {
    id: number;
    name: string;
  };
  products: OrderProduct[];
  total: number;
  status: string;
  created_at: string;
}

