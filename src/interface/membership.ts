
export interface Compra {
  id: string;
  created_at: string;
  ducks: number;
  status: string;
}

export interface ResumenProps {
  creditosSeleccionados: number;
}

export interface MembershipContextType {
  creditos: number;
  creditosSeleccionados: number;
  setCreditosSeleccionados: (creditos: number) => void;
  historialCompras: Compra[];
  isLoadingHistorial: boolean;
  handleRecargar: () => void;
}
