export interface Product {
    id: number;
    name: string;
    observations: string | null;
    price: string;
    amount: number;
    total: number;
    images : any[];
  }
  
  export interface OrderState {
    id: number;
    bill_id: number;
    status: number;
    description: string;
    observations: string | null;
    created_at: string;
    updated_at: string;
    label: string;
    svg : string;
  }
  
  export interface StatusAvailable {
    lable: string;
    status:number;
  }

  interface Delivery {
    name: string;
    id : number;
    avatar : {
      id: number;
      path: string;
    }
  }
  
  export interface Order {
    code: string;
    id: number;
    shop_id: number;
    sub_total: number;
    domicilio: number;
    total: number;
    observations: string | null;
    status: number;
    status_available: StatusAvailable[];
    approved_voucher: boolean;
    states: OrderState[];
    products: Product[];
    vouchers: any[];
    user: {
      id: number;
      phone: string;
      name: string;
      birth_date: string | null;
    };
    delivery? : Delivery;
    type_bill: TypeBill
  }

  export interface NewOrder {
    phone?: number;
    value?: number;
  }

  export interface TypeBill {
    label : string;
    description: string;
  }
  