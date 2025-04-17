import { Truck } from "lucide-react"

export function OrderConfig({ storeData, updateStoreData }) {
  const handleInputChange = (e) => {
    const { name, value } = e.target
    updateStoreData(name, value)
  }

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <label htmlFor="deliveryFee" className="block text-sm font-medium text-gray-700">
          Valor de domicilio
        </label>
        <div className="relative">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">$</span>
          <input
            id="deliveryFee"
            name="deliveryFee"
            value={storeData.deliveryFee}
            onChange={handleInputChange}
            type="number"
            placeholder="0.00"
            className="w-full pl-8 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-rose-500"
          />
        </div>
      </div>

      <div className="space-y-2">
        <label htmlFor="minOrderValue" className="block text-sm font-medium text-gray-700">
          Valor mínimo de pedido
        </label>
        <div className="relative">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">$</span>
          <input
            id="minOrderValue"
            name="minOrderValue"
            value={storeData.minOrderValue}
            onChange={handleInputChange}
            type="number"
            placeholder="0.00"
            className="w-full pl-8 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-rose-500"
          />
        </div>
      </div>

      <div className="flex items-center space-x-2 pt-4">
        <label className="inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            className="sr-only peer"
            checked={storeData.ownDelivery}
            onChange={(e) => updateStoreData("ownDelivery", e.target.checked)}
          />
          <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-rose-300 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-rose-600"></div>
          <div className="ml-3">
            <span className="text-sm font-medium text-gray-900">Activar domicilio propio</span>
            <p className="text-xs text-gray-500">
              Habilite esta opción si su tienda cuenta con servicio de entrega propio
            </p>
          </div>
        </label>
        <Truck className="w-5 h-5 ml-auto text-rose-400" />
      </div>
    </div>
  )
}
