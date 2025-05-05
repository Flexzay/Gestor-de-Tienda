export interface Producto {
    id: number
    nombre: string
    precio: number
    categoria: string
  }
  
  export interface ItemPedido {
    producto: Producto
    cantidad: number
  }
  
  export interface Mesa {
    id: number
    numero: number
    cliente: string
    items: ItemPedido[]
    total: number
    fecha: string
  }
  