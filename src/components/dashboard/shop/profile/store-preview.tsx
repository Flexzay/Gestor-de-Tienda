import { Clock, MapPin, Phone, Star, Truck } from "lucide-react"

export function StorePreview({ storeData, mainImagePreview, avatarImagePreview }) {
  // Formatear los horarios en una sola línea
  const formattedHours = (storeData.timetable || [])
    .filter(item => item.dia && item.hora)
    .map(item => `${item.dia}: ${item.hora}`)
    .join(" • ")

  return (
    <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-lg font-semibold text-gray-800">Vista previa</h2>
      </div>

      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        {/* Imagen de portada */}
        <div className="relative h-48 w-full bg-gradient-to-r from-gray-200 to-gray-300">
          {mainImagePreview && (
            <img
              src={mainImagePreview}
              alt="Portada de tienda"
              className="absolute inset-0 w-full h-full object-cover"
            />
          )}
        </div>

        {/* Información de la tienda */}
        <div className="relative px-6 pt-8 pb-6">
          {/* Avatar */}
          <div className="absolute -top-10 left-6 rounded-full border-4 border-white bg-white shadow-md">
            <div className="w-20 h-20 rounded-full bg-gray-200 overflow-hidden">
              {avatarImagePreview ? (
                <img
                  src={avatarImagePreview}
                  alt="Avatar de tienda"
                  className="object-cover w-full h-full rounded-full"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <span className="text-gray-400 text-2xl font-bold">
                    {storeData.name?.charAt(0) || "?"}
                  </span>
                </div>
              )}
            </div>
          </div>

          <div className="ml-24">
            <h3 className="text-xl font-bold text-gray-800">{storeData.name || "Nombre de la Tienda"}</h3>
            <div className="flex items-center mt-1 text-sm text-yellow-500">
              <Star className="h-4 w-4 fill-current" />
              <Star className="h-4 w-4 fill-current" />
              <Star className="h-4 w-4 fill-current" />
              <Star className="h-4 w-4 fill-current" />
              <Star className="h-4 w-4" />
              <span className="ml-1 text-gray-600">(4.0)</span>
            </div>
          </div>

          <div className="mt-4 space-y-3">
            <p className="text-gray-600">
              {storeData.description?.trim() || "Descripción de la tienda..."}
            </p>

            {storeData.location?.trim() && (
              <div className="flex items-start text-sm">
                <MapPin className="h-4 w-4 text-gray-500 mt-0.5 mr-2" />
                <span>{storeData.location}</span>
              </div>
            )}

            {formattedHours && (
              <div className="flex items-start text-sm">
                <Clock className="h-4 w-4 text-gray-500 mt-0.5 mr-2" />
                <span>{formattedHours}</span>
              </div>
            )}
            {(storeData.phone?.trim() || storeData.whatsapp?.trim()) && (
              <div className="flex items-start text-sm">
                <Phone className="h-4 w-4 text-gray-500 mt-0.5 mr-2" />
                <span>
                  {storeData.phone?.trim() && `Tel: ${storeData.phone}`}
                  {storeData.phone && storeData.whatsapp && " • "}
                  {storeData.whatsapp?.trim() && `WhatsApp: ${storeData.whatsapp}`}
                </span>
              </div>
            )}

            {storeData.latitud && storeData.longitud && (
              <div>
                <div className="flex items-start text-sm mb-2">
                  <MapPin className="h-4 w-4 text-gray-500 mt-0.5 mr-2" />
                  <span>
                    Lat: {Number(storeData.latitud).toFixed(6)}, Lng: {Number(storeData.longitud).toFixed(6)}
                  </span>
                </div>
                <div className="rounded-md overflow-hidden border border-gray-200">
                  <iframe
                    title="Ubicación de la tienda"
                    width="100%"
                    height="200"
                    loading="lazy"
                    style={{ border: 0 }}
                    src={`https://www.google.com/maps?q=${storeData.latitud},${storeData.longitud}&z=15&output=embed`}
                  />
                </div>
              </div>
            )}

            {storeData.ownDelivery && (
              <div className="flex items-center text-sm text-green-600 font-medium">
                <Truck className="h-4 w-4 mr-2" />
                <span>Servicio de entrega propio</span>
              </div>
            )}
          </div>
        </div>

        {/* Información de pedido */}
        {(storeData.deliveryFee || storeData.minOrderValue) && (
          <div className="px-6 py-4 bg-gray-50 border-t">
            <div className="flex justify-between text-sm">
              {storeData.deliveryFee && (
                <div>
                  <span className="text-gray-500">Costo de envío:</span>{" "}
                  <span className="font-medium">${storeData.deliveryFee}</span>
                </div>
              )}
              {storeData.minOrderValue && (
                <div>
                  <span className="text-gray-500">Pedido mínimo:</span>{" "}
                  <span className="font-medium">${storeData.minOrderValue}</span>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
