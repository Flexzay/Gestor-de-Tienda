import { CheckCircle } from "lucide-react"

interface ResumenProps {
  creditosSeleccionados: number
}

export function Resumen({ creditosSeleccionados }: ResumenProps) {
  return (
    <div className="rounded-lg bg-white p-6 shadow-md">
      <div className="flex items-center gap-3">
        <CheckCircle className="h-6 w-6 text-purple-500" />
        <h2 className="text-xl font-semibold text-gray-800">Resumen</h2>
      </div>

      <div className="mt-4 space-y-3">
        <div className="flex justify-between border-b border-gray-100 pb-2">
          <span className="text-gray-600">Créditos Seleccionados:</span>
          <span className="font-medium">{creditosSeleccionados}</span>
        </div>
        <div className="flex justify-between border-b border-gray-100 pb-2">
          <span className="text-gray-600">Precio por Crédito:</span>
          <span className="font-medium">COP 100</span>
        </div>
        <div className="flex justify-between border-b border-gray-100 pb-2">
          <span className="text-gray-600">Subtotal:</span>
          <span className="font-medium">COP {creditosSeleccionados.toFixed(2)}</span>
        </div>
        <div className="flex justify-between pt-2">
          <span className="text-lg font-semibold text-gray-800">Total:</span>
          <span className="text-lg font-bold text-blue-600">COP {creditosSeleccionados.toFixed(2)}</span>
        </div>
      </div>
    </div>
  )
}

