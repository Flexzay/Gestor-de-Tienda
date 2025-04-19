
import React, { useState } from 'react';
import PedidoCard from './cardOrders';
import PedidoModal from './seeOrders';

const Orders = () => {
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isPendingOpen, setIsPendingOpen] = useState(true);
  const [isAcceptedOpen, setIsAcceptedOpen] = useState(true);
  const [isDispatchedOpen, setIsDispatchedOpen] = useState(true);

  const exampleOrders = [
    {
      id: 1,
      code: 'PED-001',
      status: 5,
      delivery_type: 'domicilio',
      user: { name: 'Juan Pérez', phone: '123456789', address: 'Calle Falsa 123' },
      total: 15000,
      observations: 'Entregar sin contacto',
      vouchers: [{ method: { label: 'Transferencia', img: '/metodo.png' } }],
      states: [
        { id: 1, label: 'Recibido', created_at: new Date(), svg: '/recibido.svg', observations: 'Pedido recibido' },
      ],
      products: [
        { id: 1, name: 'Pizza Margarita', price: 5000, amount: 2, total: 10000, images: [{ path: '/pizza.png' }] },
        { id: 2, name: 'Coca-Cola', price: 2500, amount: 2, total: 5000, images: [{ path: '/coca.png' }] }
      ]
    }
  ];

  const toggleAccordion = (section) => {
    if (section === 'pending') setIsPendingOpen(!isPendingOpen);
    if (section === 'accepted') setIsAcceptedOpen(!isAcceptedOpen);
    if (section === 'dispatched') setIsDispatchedOpen(!isDispatchedOpen);
  };

  const Section = ({ title, color, isOpen, toggle, label }) => (
    <div className={`flex-1 bg-${color}-100 rounded-lg shadow-lg p-6`}>
      <h2 className={`text-md font-semibold mb-4 text-gray-800 flex items-center uppercase`}>
        <svg className={`h-6 w-6 mr-2 text-${color}-800`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3" />
        </svg>
        {title}
        <span className="ml-1 bg-white rounded-full px-1.5 py-0.5 text-xs">{exampleOrders.length}</span>
      </h2>

      <button
        className={`lg:hidden w-full flex justify-between items-center py-2 px-4 bg-${color}-200 rounded-md mb-4`}
        onClick={toggle}
      >
        <span>{`Ver ${label}`}</span>
        <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
          <path
            fillRule="evenodd"
            d={isOpen
              ? "M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z"
              : "M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"}
            clipRule="evenodd"
          />
        </svg>
      </button>

      <div className={`lg:block ${!isOpen ? 'hidden' : ''}`}>
        <div className="space-y-4 max-h-[calc(100vh-200px)] overflow-y-auto">
          {exampleOrders.map((order) => (
            <PedidoCard key={order.id} order={order} onView={() => setSelectedOrder(order)} onContinue={() => alert('Continuar')} />
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <>
      <div className="flex flex-col lg:flex-row gap-4">
        <Section title="Pedidos nuevos" color="indigo" isOpen={isPendingOpen} toggle={() => toggleAccordion('pending')} label="pedidos nuevos" />
        <Section title="Pedidos aceptados / Preparación" color="blue" isOpen={isAcceptedOpen} toggle={() => toggleAccordion('accepted')} label="pedidos aceptados" />
        <Section title="Pedidos listos para despachar" color="green" isOpen={isDispatchedOpen} toggle={() => toggleAccordion('dispatched')} label="pedidos listos para despachar" />
      </div>

      {selectedOrder && (
        <PedidoModal order={selectedOrder} onClose={() => setSelectedOrder(null)} />
      )}
    </>
  );
};

export default Orders;
