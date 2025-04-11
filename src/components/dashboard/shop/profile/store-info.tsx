import { Clock, MapPin, Phone, MessageCircle } from "lucide-react"

export function StoreInfo({ storeData, updateStoreData }) {
  const handleInputChange = (e) => {
    const { name, value } = e.target
    updateStoreData(name, value)
  }

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <label htmlFor="name" className="block text-sm font-medium text-gray-700">
          Nombre de tienda
        </label>
        <input
          id="name"
          name="name"
          value={storeData.name}
          onChange={handleInputChange}
          placeholder="Ingrese el nombre de su tienda"
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-rose-500"
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
          Celular
        </label>
        <div className="flex items-center">
          <span className="inline-flex items-center px-3 py-2 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500">
            <Phone className="w-4 h-4" />
          </span>
          <input
            id="phone"
            name="phone"
            value={storeData.phone}
            onChange={handleInputChange}
            placeholder="Ingrese su número de celular"
            type="tel"
            className="flex-1 px-3 py-2 border border-gray-300 rounded-r-md shadow-sm focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-rose-500"
          />
        </div>
      </div>

      <div className="space-y-2">
        <label htmlFor="whatsapp" className="block text-sm font-medium text-gray-700">
          WhatsApp
        </label>
        <div className="flex items-center">
          <span className="inline-flex items-center px-3 py-2 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500">
            <MessageCircle className="w-4 h-4" />
          </span>
          <input
            id="whatsapp"
            name="whatsapp"
            value={storeData.whatsapp}
            onChange={handleInputChange}
            placeholder="Ingrese su número de WhatsApp"
            type="tel"
            className="flex-1 px-3 py-2 border border-gray-300 rounded-r-md shadow-sm focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-rose-500"
          />
        </div>
      </div>

      <div className="space-y-2">
        <label htmlFor="location" className="block text-sm font-medium text-gray-700">
          Ubicación
        </label>
        <input
          id="location"
          name="location"
          value={storeData.location}
          onChange={handleInputChange}
          placeholder="Ingrese la dirección de su tienda"
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-rose-500"
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="hours" className="block text-sm font-medium text-gray-700">
          Horarios de atención
        </label>
        <input
          id="hours"
          name="hours"
          value={storeData.hours}
          onChange={handleInputChange}
          placeholder="Ej: Lun-Vie: 9am-6pm, Sáb: 10am-2pm"
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-rose-500"
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="description" className="block text-sm font-medium text-gray-700">
          Descripción
        </label>
        <textarea
          id="description"
          name="description"
          value={storeData.description}
          onChange={handleInputChange}
          placeholder="Describa su tienda"
          rows={4}
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-rose-500"
        />
      </div>
    </div>
  )
}