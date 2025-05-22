// Producto dentro de un pedido nuevo en sitio
export interface NewOrderOnSiteProduct {
  id: number;
  amount: number;
  price: number;
  observation: string | null;
}

// Petición para crear un pedido en sitio
export interface NewOrderOnSite {
  client_id: number;
  space_id: number;
  products: NewOrderOnSiteProduct[];
}

// Producto incluido en una orden ya creada (respuesta del backend)
export interface OrderProduct {
  id: number;
  name: string;
  price: number;
  quantity: number; // Asegúrate que el backend usa 'quantity'; si usa 'amount', cámbialo
}

// Respuesta de un pedido en sitio ya procesado
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
  status: string; // puede ser number o string según backend
  created_at: string;
}
