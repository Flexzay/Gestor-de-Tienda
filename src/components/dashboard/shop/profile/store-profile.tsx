import { useState } from "react"
import { Save } from "lucide-react"
import { StoreInfo } from "./store-info"
import { StoreImages } from "./store-images"
import { OrderConfig } from "./order-config"
import { StorePreview } from "./store-preview"

export default function StoreProfile() {
  const [activeTab, setActiveTab] = useState("info")
  const [storeData, setStoreData] = useState({
    name: "Mi Tienda",
    phone: "",
    whatsapp: "",
    location: "",
    description: "Descripción de la tienda...",
    hours: "",
    mainImage: null,
    avatarImage: null,
    deliveryFee: "",
    minOrderValue: "",
    ownDelivery: false,
  })

  const [mainImagePreview, setMainImagePreview] = useState(null)
  const [avatarImagePreview, setAvatarImagePreview] = useState(null)

  const updateStoreData = (field, value) => {
    setStoreData({
      ...storeData,
      [field]: value,
    })
  }

  const saveProfile = () => {
    console.log("Guardando perfil:", storeData)
    alert("Perfil guardado con éxito")
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <header className="border-b bg-white sticky top-0 z-10 shadow-sm">
        <div className="max-w-7xl mx-auto py-4 px-4 flex justify-between items-center">
          <h1 className="text-xl font-bold text-gray-800">Perfil de Tienda</h1>
          <button
            onClick={saveProfile}
            className="flex items-center bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition-colors"
          >
            <Save className="mr-2 h-4 w-4" />
            Guardar Cambios
          </button>
        </div>
      </header>

      <main className="flex-1 max-w-7xl mx-auto py-6 px-4">
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Panel de edición */}
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
              <div className="flex border-b">
                <button
                  onClick={() => setActiveTab("info")}
                  className={`flex-1 py-3 px-4 text-center font-medium ${
                    activeTab === "info"
                      ? "text-blue-600 border-b-2 border-blue-600"
                      : "text-gray-600 hover:text-gray-800"
                  }`}
                >
                  Información
                </button>
                <button
                  onClick={() => setActiveTab("config")}
                  className={`flex-1 py-3 px-4 text-center font-medium ${
                    activeTab === "config"
                      ? "text-blue-600 border-b-2 border-blue-600"
                      : "text-gray-600 hover:text-gray-800"
                  }`}
                >
                  Configuración
                </button>
              </div>

              <div className="p-6">
                {activeTab === "info" && (
                  <div className="space-y-6">
                    <StoreInfo storeData={storeData} updateStoreData={updateStoreData} />
                    <StoreImages
                      mainImagePreview={mainImagePreview}
                      avatarImagePreview={avatarImagePreview}
                      setMainImagePreview={setMainImagePreview}
                      setAvatarImagePreview={setAvatarImagePreview}
                      updateStoreData={updateStoreData}
                    />
                  </div>
                )}

                {activeTab === "config" && <OrderConfig storeData={storeData} updateStoreData={updateStoreData} />}
              </div>
            </div>
          </div>

          {/* Vista previa */}
          <StorePreview
            storeData={storeData}
            mainImagePreview={mainImagePreview}
            avatarImagePreview={avatarImagePreview}
          />
        </div>
      </main>
    </div>
  )
}

