import { useState, useEffect } from "react";
import { Clock, MapPin, Phone, MessageCircle } from "lucide-react";
import { MapPicker } from "./MapPicker";

const defaultCenter = {
  lat: 2.5686,
  lng: -72.6406
};

export function StoreInfo({ storeData, updateStoreData }) {
  const [showMap, setShowMap] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState<{ lat: number; lng: number } | null>(null);

  useEffect(() => {
    const lat = parseFloat(storeData.latitud);
    const lng = parseFloat(storeData.longitud);
    if (!isNaN(lat) && !isNaN(lng)) {
      setSelectedLocation({ lat, lng });
    } else {
      setSelectedLocation(defaultCenter);
    }
  }, [storeData.latitud, storeData.longitud]);

  useEffect(() => {
    if (showMap) {
      const lat = parseFloat(storeData.latitud);
      const lng = parseFloat(storeData.longitud);
      if (!isNaN(lat) && !isNaN(lng)) {
        setSelectedLocation({ lat, lng });
      } else {
        setSelectedLocation(defaultCenter);
      }
    }
  }, [showMap]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    updateStoreData(name, value);
  };

  const handleTimetableChange = (index, field, value) => {
    const newTimetable = [...storeData.timetable];
    newTimetable[index][field] = value;
    updateStoreData("timetable", newTimetable);
  };

  const handleAddTimetable = () => {
    const newTimetable = [...(storeData.timetable || [])];
    newTimetable.push({ dia: "", hora: "" });
    updateStoreData("timetable", newTimetable);
  };

  const handleRemoveTimetable = (index) => {
    const newTimetable = [...storeData.timetable];
    newTimetable.splice(index, 1);
    updateStoreData("timetable", newTimetable);
  };

  const handleLocationChange = (location: { lat: number; lng: number }) => {
    setSelectedLocation(location);
  };

  const confirmLocation = () => {
    if (selectedLocation) {
      updateStoreData("latitud", selectedLocation.lat.toString());
      updateStoreData("longitud", selectedLocation.lng.toString());
    }
    setShowMap(false);
  };

  return (
    <div className="space-y-4 px-4 sm:px-6 md:px-8">
      {/* Nombre de la tienda */}
      <div className="space-y-2">
        <label htmlFor="name" className="block text-sm font-medium text-gray-700">
          Nombre de tienda*
        </label>
        <input
          id="name"
          name="name"
          value={storeData.name || ""}
          onChange={handleInputChange}
          placeholder="Ingrese el nombre de su tienda"
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-rose-500"
          required
        />
      </div>

      {/* Teléfono */}
      <div className="space-y-2">
        <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
          Celular*
        </label>
        <div className="flex items-center">
          <span className="inline-flex items-center px-3 py-2 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500">
            <Phone className="w-4 h-4" />
          </span>
          <input
            id="phone"
            name="phone"
            value={storeData.phone || ""}
            onChange={handleInputChange}
            placeholder="Ingrese su número de celular"
            type="tel"
            className="flex-1 px-3 py-2 border border-gray-300 rounded-r-md shadow-sm focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-rose-500"
            required
          />
        </div>
      </div>

      {/* WhatsApp */}
      <div className="space-y-2">
        <label htmlFor="whatsapp" className="block text-sm font-medium text-gray-700">
          WhatsApp*
        </label>
        <div className="flex items-center">
          <span className="inline-flex items-center px-3 py-2 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500">
            <MessageCircle className="w-4 h-4" />
          </span>
          <input
            id="whatsapp"
            name="whatsapp"
            value={storeData.whatsapp || ""}
            onChange={handleInputChange}
            placeholder="Ingrese su número de WhatsApp"
            type="tel"
            className="flex-1 px-3 py-2 border border-gray-300 rounded-r-md shadow-sm focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-rose-500"
            required
          />
        </div>
      </div>

      {/* Ubicación con mapa */}
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">
          Ubicación*
        </label>
        <button
          type="button"
          onClick={() => setShowMap(true)}
          className="w-full px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          <div className="flex items-center justify-center">
            <MapPin className="w-4 h-4 mr-2" />
            Seleccionar Ubicación en el Mapa
          </div>
        </button>

        {storeData.latitud && storeData.longitud ? (
          <div className="mt-2 text-sm text-gray-600">
            Ubicación seleccionada:
            <span className="font-medium ml-1">
              Lat: {Number(storeData.latitud).toFixed(6)}, Lng: {Number(storeData.longitud).toFixed(6)}
            </span>
          </div>
        ) : (
          <p className="mt-1 text-sm text-red-600">Debes seleccionar una ubicación</p>
        )}
      </div>

      {/* Modal del mapa */}
      {showMap && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-4 w-full max-w-full sm:max-w-screen-sm md:max-w-screen-md">
            <h2 className="text-xl font-bold mb-4">Selecciona la ubicación de tu tienda</h2>

            <div className="h-96 w-full mb-4 rounded-lg overflow-hidden border border-gray-300">
              {selectedLocation && (
                <MapPicker
                  selectedLocation={selectedLocation}
                  onLocationChange={handleLocationChange}
                />
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Latitud</label>
                <input
                  type="number"
                  value={selectedLocation?.lat || ""}
                  onChange={(e) =>
                    setSelectedLocation((prev) => ({
                      ...(prev || defaultCenter),
                      lat: parseFloat(e.target.value) || 0
                    }))
                  }
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Longitud</label>
                <input
                  type="number"
                  value={selectedLocation?.lng || ""}
                  onChange={(e) =>
                    setSelectedLocation((prev) => ({
                      ...(prev || defaultCenter),
                      lng: parseFloat(e.target.value) || 0
                    }))
                  }
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
            </div>

            <div className="flex justify-end space-x-3 mt-6">
              <button
                onClick={() => setShowMap(false)}
                className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Cancelar
              </button>
              <button
                onClick={confirmLocation}
                className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Confirmar Ubicación
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Horarios de atención */}
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">
          Horarios de atención*
        </label>

        {storeData.timetable?.map((item, index) => (
          <div key={index} className="flex flex-col md:flex-row gap-2 items-stretch md:items-center">
            <input
              type="text"
              value={item.dia || ""}
              onChange={(e) => handleTimetableChange(index, "dia", e.target.value)}
              placeholder="Día (ej: Lunes)"
              className="flex-1 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-rose-500 focus:border-rose-500"
              required
            />
            <input
              type="text"
              value={item.hora || ""}
              onChange={(e) => handleTimetableChange(index, "hora", e.target.value)}
              placeholder="Horario (ej: 9:00 - 18:00)"
              className="flex-1 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-rose-500 focus:border-rose-500"
              required
            />
            <button
              type="button"
              onClick={() => handleRemoveTimetable(index)}
              className="text-red-600 font-bold hover:underline self-start md:self-auto"
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

      {/* Descripción */}
      <div className="space-y-2">
        <label htmlFor="description" className="block text-sm font-medium text-gray-700">
          Descripción*
        </label>
        <textarea
          id="description"
          name="description"
          value={storeData.description || ""}
          onChange={handleInputChange}
          placeholder="Describa su tienda"
          rows={4}
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-rose-500"
          required
        />
      </div>
    </div>
  );
}
