export interface OnsiteOrder {
    code: string;
    id: number;
    shop_id: number;
    sub_total: number;
    type_bill: {
      id: number;
      label: string;
      description: string;
    };
    domicilio: number;
    total: number;
    observations: string | null;
    status: number;
    status_available: {
      status: number;
      lable: string;
    }[];
    approved_voucher: boolean;
    states: {
      id: number;
      status: number;
      bill_id: number;
      label: string;
      description: string;
      svg: string;
      color: {
        red: number;
        green: number;
        blue: number;
      };
      created_at: string;
    }[];
    products: {
      id: number;
      name: string;
      observations: string | null;
      price: string;
      amount: number;
      total: number;
      images: {
        id: number;
        path: string;
      }[];
    }[];
    vouchers: any[];
    user: {
      id: number;
      phone: string;
      name: string;
      birth_date: string;
    };
    delivery?: {
      name: string;
      id: number;
      phone: string;
      avatar: {
        id: number;
        path: string;
      };
    };
    shop: {
      id: number;
      name: string;
      phone: string;
      media: {
        avatar: {
          id: number;
          path: string;
        };
        front: {
          id: number;
          path: string;
        };
      };
    };
    space: {
      id: number;
      name: string;
      status: boolean;
      delivery: boolean;
    };
  }
  
  export interface Product {
    id: number;
    name: string;
    price: number;
    description: string;
    available: boolean;
    category_id: number;
    category: {
      id: number;
      name: string;
      count_products: number;
    };
    image?: string;
  }
  
  export interface OrderItem {
    product: Product;
    quantity: number;
  }
  
  export interface Category {
    id: number;
    name: string;
    products: Product[];
  }
  
  export interface Client {
    phoneNumber: string;
    name: string;
    birthDate: string;
  }
  
  export interface Table {
    id: number;
    name: string;
    status: boolean;
    delivery: boolean;
  }
  
  
  export interface NewOrder {
    id: number |null;
    client_id?: number;
    space_id?: number;
    products:
    {
      id: number;
      amount: number;
      price: number;
    }[];
    quantity: number;
  
  }
  export interface Order {
    id: number;
    items: OrderItem[];
    total: number;
    status: 'pending' | 'paid' | 'processing' | 'delivered';
    createdAt: Date;
    isExpanded?: boolean;
    isEditing?: boolean;
    client?: Client;
    table?: Table;
    paymentMethod?: string;
    cashAmount?: number;
  }
  