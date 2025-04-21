export interface PaymentMethod {
  [x: string]: any;
  id: number;
  entidad: string;
  name_account: string;
  type_account: string;
  nit_cc: string;
  account?: string;
  link_payment?: string;
  image_qr: string;
  status: boolean;
}
