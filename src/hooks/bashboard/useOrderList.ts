import { useState, useEffect, useCallback } from "react";
import { orderService } from "../../Services/orderInSite.service";
import { CheckCircle, Clock, XCircle, AlertCircle } from "lucide-react";

interface Order {
  id: string;
  status: string | { label?: string };
  states?: Array<{ label?: string }>;
  amount: number;
  total: number;
  created_at: string;
  code?: string;
  user?: { name: string };
  space?: { name: string };
  items?: Array<any>; 
}

type StatusColorClass = 
  | "bg-green-100 text-green-800 border-green-200"
  | "bg-yellow-100 text-yellow-800 border-yellow-200"
  | "bg-red-100 text-red-800 border-red-200"
  | "bg-blue-100 text-blue-800 border-blue-200";

type IconComponent = React.ComponentType<{ className?: string }>;

export const useOrderList = (refreshKey?: number) => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const getStatusText = useCallback((status: any): string => {
    if (typeof status === "string") return status;
    if (status?.label) return status.label;
    return "pendiente";
  }, []);

  const fetchOrders = useCallback(async () => {
    setLoading(true);
    try {
      const response = await orderService.getOnSiteOrders();
      const rawOrders = response.data || [];

      const formattedOrders: Order[] = rawOrders.map((order: any) => ({
        ...order,
        items: order.items || order.products || [],
      }));

      setOrders(formattedOrders);
      setError(null);
    } catch (err) {
      console.error("Error fetching orders:", err);
      setError(err instanceof Error ? err.message : "Error al cargar pedidos");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders, refreshKey]);

  const getStatusColor = useCallback((status: any): StatusColorClass => {
    const statusText = getStatusText(status).toLowerCase();

    if (statusText.includes("completado") || statusText.includes("entregado")) {
      return "bg-green-100 text-green-800 border-green-200";
    }
    if (statusText.includes("preparando") || statusText.includes("proceso")) {
      return "bg-yellow-100 text-yellow-800 border-yellow-200";
    }
    if (statusText.includes("cancelado") || statusText.includes("rechazado")) {
      return "bg-red-100 text-red-800 border-red-200";
    }
    return "bg-blue-100 text-blue-800 border-blue-200";
  }, [getStatusText]);

  const getStatusIconComponent = useCallback((status: any): IconComponent => {
    const statusText = getStatusText(status).toLowerCase();

    if (statusText.includes("completado") || statusText.includes("entregado")) {
      return CheckCircle;
    }
    if (statusText.includes("preparando") || statusText.includes("proceso")) {
      return Clock;
    }
    if (statusText.includes("cancelado") || statusText.includes("rechazado")) {
      return XCircle;
    }
    return AlertCircle;
  }, [getStatusText]);

  const formatCurrency = useCallback((amount: number): string => {
    return new Intl.NumberFormat("es-MX", {
      style: "currency",
      currency: "MXN",
    }).format(amount);
  }, []);

  const formatDate = useCallback((dateString: string | null | undefined): string => {
    if (!dateString) return "Fecha no disponible";

    let date: Date | null = null;

    // Primer intento
    date = new Date(dateString);
    if (isNaN(date.getTime())) {
      // Segundo intento: cambiar espacio por T
      const fixed = dateString.replace(" ", "T");
      date = new Date(fixed);
    }

    // Tercer intento: usar timestamp
    if (isNaN(date.getTime())) {
      const parsed = Date.parse(dateString);
      if (!isNaN(parsed)) date = new Date(parsed);
    }

    if (!date || isNaN(date.getTime())) {
      console.warn("Fecha inválida recibida:", dateString);
      return "Fecha inválida";
    }

    return date.toLocaleString("es-MX", {
      day: "2-digit",
      month: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    });
  }, []);

  return {
    orders,
    loading,
    error,
    getStatusColor,
    getStatusIconComponent,
    formatCurrency,
    formatDate,
    refetch: fetchOrders,
  };
};
