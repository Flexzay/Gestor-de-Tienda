import { Order } from "./order";
import { OrderResponse } from "./onsiteOrder";

export interface Response {
  title: string;
  message: string;
  state: {
    id: number;
    status: number;
    label: string;
  };
  bill: number | Order | OrderResponse;
  vouchers?: any[];
}
