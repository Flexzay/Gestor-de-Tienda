import { CheckCircle, CreditCard, DollarSign, ShoppingCart, Tag } from "lucide-react";
import { useEffect, useState } from "react";

interface ResumenProps {
  creditosSeleccionados: number;
}

export function Resumen({ creditosSeleccionados }: ResumenProps) {
  const [showAnimation, setShowAnimation] = useState(false);
  const precioPorCredito = 100;


  const subtotal = creditosSeleccionados 

  // Formato de moneda colombiana
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("es-CO", {
      style: "currency",
      currency: "COP",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  // Efecto de animación cuando cambia el número de créditos
  useEffect(() => {
    setShowAnimation(true);
    const timer = setTimeout(() => setShowAnimation(false), 300);
    return () => clearTimeout(timer);
  }, [creditosSeleccionados]);

  return (
    <div className="rounded-lg bg-white p-6 shadow-lg border border-gray-100 transition-all duration-300 hover:shadow-xl">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-purple-100 rounded-full">
          <ShoppingCart className="h-6 w-6 text-purple-600" />
        </div>
        <h2 className="text-xl font-bold text-gray-800">Resumen de Compra</h2>
      </div>

      <div className="mt-6 space-y-4">
        <div className="flex justify-between items-center py-3 px-4 bg-gray-50 rounded-lg">
          <div className="flex items-center gap-2">
            <Tag className="h-5 w-5 text-gray-500" />
            <span className="text-gray-700">Créditos:</span>
          </div>
          <span
            className={`font-medium text-lg ${showAnimation ? "scale-110 text-purple-600" : ""} transition-all duration-300`}
          >
            {creditosSeleccionados}
          </span>
        </div>

        <div className="flex justify-between items-center py-3 px-4">
          <div className="flex items-center gap-2">
            <DollarSign className="h-5 w-5 text-gray-500" />
            <span className="text-gray-700">Precio por Crédito:</span>
          </div>
          <span className="font-medium">{formatCurrency(precioPorCredito)}</span>
        </div>

        <div className="flex justify-between items-center py-3 px-4 border-t border-dashed border-gray-200">
          <div className="flex items-center gap-2">
            <CheckCircle className="h-5 w-5 text-gray-500" />
            <span className="text-gray-700">Subtotal:</span>
          </div>
          <span className="font-medium">{formatCurrency(subtotal)}</span>
        </div>

        <div className="mt-4 pt-4 border-t-2 border-gray-200">
          <div className="flex justify-between items-center bg-purple-50 py-4 px-5 rounded-lg">
            <span className="text-lg font-bold text-gray-800">Total a Pagar:</span>
            <div className="flex flex-col items-end">
              <span
                className={`text-xl font-bold text-purple-700 ${showAnimation ? "scale-110" : ""} transition-all duration-300`}
              >
                {formatCurrency(subtotal)} {/* Esto debería mostrar el total correctamente */}
              </span>
              <span className="text-xs text-gray-500 mt-1">IVA incluido</span>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 pt-4 border-t border-gray-100">
        <div className="flex items-center gap-2 text-sm text-gray-500">
          <CreditCard className="h-4 w-4 text-green-500" />
          <span>Pago seguro garantizado</span>
        </div>
      </div>
    </div>
  );
}
