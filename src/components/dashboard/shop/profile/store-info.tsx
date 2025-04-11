import { useState } from "react";
import { Clock, MapPin, Phone, MessageCircle } from "lucide-react";
import { GoogleMap, Marker, LoadScript } from "@react-google-maps/api";

const defaultCenter = {
  lat: -12.0464,  // Latitud de Lima por defecto
  lng: -77.0428   // Longitud de Lima por defecto
};

const containerStyle = {
  width: '100%',
  height: '400px'
};

export function StoreInfo({ storeData, updateStoreData }) {
  const [showMap, setShowMap] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState({
    lat: storeData.latitud || defaultCenter.lat,
    lng: storeData.longitud || defaultCenter.lng
  });

  // Manejador para cambios en inputs normales
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    updateStoreData(name, value);
  };

  // Manejador para cambios en horarios
  const handleTimetableChange = (index, field, value) => {
    const newTimetable = [...storeData.timetable];
    newTimetable[index][field] = value;
    updateStoreData("timetable", newTimetable);
  };

  // Agregar nuevo horario
  const handleAddTimetable = () => {
    const newTimetable = [...(storeData.timetable || [])];
    newTimetable.push({ dia: "", hora: "" });
    updateStoreData("timetable", newTimetable);
  };

  // Eliminar horario
  const handleRemoveTimetable = (index) => {
    const newTimetable = [...storeData.timetable];
    newTimetable.splice(index, 1);
    updateStoreData("timetable", newTimetable);
  };

  // Cuando se hace clic en el mapa
  const handleMapClick = (e) => {
    const lat = e.latLng.lat();
    const lng = e.latLng.lng();
    setSelectedLocation({ lat, lng });
  };

  // Confirmar la ubicación seleccionada
  const confirmLocation = () => {
    updateStoreData("latitud", selectedLocation.lat);
    updateStoreData("longitud", selectedLocation.lng);
    setShowMap(false);
  };

  return (
    <div className="space-y-4">
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

      {/* Ubicación con selector de mapa */}
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

      {/* Modal del Mapa */}
      {showMap && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-6 w-full max-w-4xl">
            <h2 className="text-xl font-bold mb-4">Selecciona la ubicación de tu tienda</h2>
            
            <div className="h-96 w-full mb-4 rounded-lg overflow-hidden border border-gray-300">
              <LoadScript
                googleMapsApiKey="TU_API_KEY_DE_GOOGLE_MAPS"
                loadingElement={<div className="h-full w-full flex items-center justify-center">Cargando mapa...</div>}
              >
                <GoogleMap
                  mapContainerStyle={containerStyle}
                  center={selectedLocation}
                  zoom={15}
                  onClick={handleMapClick}
                  options={{
                    streetViewControl: false,
                    mapTypeControl: false,
                    fullscreenControl: false
                  }}
                >
                  <Marker 
                    position={selectedLocation} 
                    draggable={true}
                    onDragEnd={handleMapClick}
                  />
                </GoogleMap>
              </LoadScript>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Latitud</label>
                <input
                  type="text"
                  value={selectedLocation.lat}
                  onChange={(e) => setSelectedLocation(prev => ({
                    ...prev,
                    lat: parseFloat(e.target.value) || 0
                  }))}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Longitud</label>
                <input
                  type="text"
                  value={selectedLocation.lng}
                  onChange={(e) => setSelectedLocation(prev => ({
                    ...prev,
                    lng: parseFloat(e.target.value) || 0
                  }))}
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
          <div key={index} className="flex gap-2 items-center">
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