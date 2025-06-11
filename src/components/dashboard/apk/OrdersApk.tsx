import { useEffect, useState } from "react";
import { Package, CheckCircle, Truck } from "lucide-react";
import { billService } from "../../../Services/bill.service";
import OrderCard from "./OrderCard";
import OrderModal from "./OrderModal";
import type { CardOrder } from "../../../interface/cardOrdes";
import { environment } from "../../../config/environment";


const getStatusText = (status: number) => {
  switch (status) {
    case 1: return "Nuevo";
    case 2: return "Preparación";
    case 3: return "Listo";
    case 5: return "Completado";
    default: return "Desconocido";
  }
};

const getStatusColor = (status: number) => {
  return status === 5
    ? "bg-green-100 text-green-800"
    : "bg-yellow-100 text-yellow-800";
};

const CardsDePedidos = () => {
  const [orders, setOrders] = useState<CardOrder[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState<CardOrder | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const shopData = localStorage.getItem("shop_data");
        const shopId = shopData ? JSON.parse(shopData).id : null;
        if (!shopId) throw new Error("No hay tienda seleccionada");

        const response = await billService.getBillsActive();
        const data = Array.isArray(response.data) ? response.data : [];
        setOrders(data);

      } catch (err) {
        console.error("Error al cargar pedidos:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const openModal = (order: CardOrder) => {
    setSelectedOrder(order);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedOrder(null);
    setIsModalOpen(false);
  };

  const onChangeStatus = async (orderId: number, newStatus: number) => {
    try {
      await billService.changeStatus(orderId, newStatus);
      setOrders((prev) =>
        prev.map((order) =>
          order.id === orderId ? { ...order, status: newStatus } : order
        )
      );
    } catch (err) {
      console.error("Error al cambiar estado:", err);
    }
  };

  const getTotalProducts = (order: CardOrder) =>
    order.products.reduce((total, prod) => total + prod.quantity, 0);

  const nuevos = orders.filter((o) => o.status === 1);
  const aceptados = orders.filter((o) => o.status === 2);
  const listos = orders.filter((o) => o.status === 3);

  if (loading) return <p className="p-6">Cargando pedidos...</p>;

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
        <CardOrderComponent
          title="Pedidos nuevos"
          color="bg-blue-500"
          icon={<Package className="h-5 w-5" />}
          orders={nuevos}
          getStatusText={getStatusText}
          getStatusColor={getStatusColor}
          getTotalProducts={getTotalProducts}
          onChangeStatus={onChangeStatus}
          openModal={openModal}
        />
        <CardOrderComponent
          title="En preparación"
          color="bg-green-500"
          icon={<CheckCircle className="h-5 w-5" />}
          orders={aceptados}
          getStatusText={getStatusText}
          getStatusColor={getStatusColor}
          getTotalProducts={getTotalProducts}
          onChangeStatus={onChangeStatus}
          openModal={openModal}
        />
        <CardOrderComponent
          title="Listos para despachar"
          color="bg-yellow-500"
          icon={<Truck className="h-5 w-5" />}
          orders={listos}
          getStatusText={getStatusText}
          getStatusColor={getStatusColor}
          getTotalProducts={getTotalProducts}
          onChangeStatus={onChangeStatus}
          openModal={openModal}
        />
      </div>

      <OrderModal
        order={selectedOrder}
        isOpen={isModalOpen}
        onClose={closeModal}
        onChangeStatus={onChangeStatus}
      />
    </>
  );
};

export default CardsDePedidos;

interface CardOrderComponentProps {
  title: string;
  color: string;
  icon: JSX.Element;
  orders: CardOrder[];
  getStatusText: (status: number) => string;
  getStatusColor: (status: number) => string;
  getTotalProducts: (order: CardOrder) => number;
  onChangeStatus: (id: number, newStatus: number) => void;
  openModal: (order: CardOrder) => void;
}

const CardOrderComponent = ({
  title,
  color,
  icon,
  orders,
  getStatusText,
  getStatusColor,
  getTotalProducts,
  onChangeStatus,
  openModal,
}: CardOrderComponentProps) => {
  return (
    <div className="bg-white shadow-lg rounded-2xl p-6 border border-gray-100 transition-all duration-200 hover:shadow-xl">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center gap-3">
          <div className={`p-2 rounded-lg ${color.replace("bg-", "bg-opacity-20 text-")}`}>
            {icon}
          </div>
          <h2 className="text-xl font-bold">{title}</h2>
        </div>
        <span className={`text-white text-sm font-medium px-3 py-1 rounded-full ${color}`}>
          {orders.length}
        </span>
      </div>
      {orders.length === 0 ? (
        <p className="text-gray-500 ml-12">No hay pedidos</p>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => (
            <OrderCard
              key={order.id}
              order={order}
              urlS3={environment.s3Storage}
              getStatusText={getStatusText}
              getStatusColor={getStatusColor}
              getTotalProducts={() => getTotalProducts(order)}
              onChangeStatus={onChangeStatus}
              openModal={openModal}
            />
          ))}
        </div>
      )}
    </div>
  );
};
