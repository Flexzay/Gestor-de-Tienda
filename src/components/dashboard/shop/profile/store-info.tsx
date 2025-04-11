import { Clock, MapPin, Phone, MessageCircle } from "lucide-react"

export function StoreInfo({ storeData, updateStoreData }) {
  const handleInputChange = (e) => {
    const { name, value } = e.target
    updateStoreData(name, value)
  }
  const handleTimetableChange = (index, field, value) => {
    const newTimetable = [...storeData.timetable]
    newTimetable[index][field] = value
    updateStoreData("timetable", newTimetable)
  }

  const handleAddTimetable = () => {
    const newTimetable = [...(storeData.timetable || [])]
    newTimetable.push({ dia: "", hora: "" })
    updateStoreData("timetable", newTimetable)
  }

  const handleRemoveTimetable = (index) => {
    const newTimetable = [...storeData.timetable]
    newTimetable.splice(index, 1)
    updateStoreData("timetable", newTimetable)
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
        <label className="block text-sm font-medium text-gray-700">
          Horarios de atención
        </label>

        {storeData.timetable?.map((item, index) => (
          <div key={index} className="flex gap-2 items-center">
            <input
              type="text"
              name={`dia-${index}`}
              value={item.dia}
              onChange={(e) => handleTimetableChange(index, "dia", e.target.value)}
              placeholder="Día (ej: lunes)"
              className="flex-1 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-rose-500 focus:border-rose-500"
            />
            <input
              type="text"
              name={`hora-${index}`}
              value={item.hora}
              onChange={(e) => handleTimetableChange(index, "hora", e.target.value)}
              placeholder="Horario (ej: 9:00 - 18:00)"
              className="flex-1 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-rose-500 focus:border-rose-500"
            />
            <button
              type="button"
              onClick={() => handleRemoveTimetable(index)}
              className="text-red-600 font-bold hover:underline"
            >
              ✖
            </button>
          </div>
        ))}

        <button
          type="button"
          onClick={handleAddTimetable}
          className="mt-2 text-sm text-rose-600 font-semibold hover:underline"
        >
          + Agregar día
        </button>
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