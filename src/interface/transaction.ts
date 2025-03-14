export interface Transaction {
    id: number
    type: "Gastos" | "Ingresos"
    amount: number
    category: string
    description: string
    date: string
  }
  
  export default Transaction
  
  