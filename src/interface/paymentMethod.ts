export interface PaymentMethod {
    id: number
    entidad: string
    name_account: string
    type_account: string
    nit_cc: string
    account?: string
    link_payment?: string
    qr_code?: string
    status: boolean
  }
  
  export default PaymentMethod
  
  