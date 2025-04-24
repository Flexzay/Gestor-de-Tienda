import { Save, ArrowLeft } from "lucide-react"
import { StoreInfo } from "./store-info"
import { StoreImages } from "./store-images"
import { OrderConfig } from "./order-config"
import { StorePreview } from "./store-preview"
import { Link } from "react-router-dom"
import { useProfile } from "../../../../hooks/bashboard/useProfile"

export default function StoreProfile() {
  const {
    activeTab,
    setActiveTab,
    storeData,
    updateStoreData,
    mainImagePreview,
    avatarImagePreview,
    setMainImagePreview,
    setAvatarImagePreview,
    isLoading,
    saveMessage,
    saveProfile
  } = useProfile()

  if (isLoading && !storeData.name) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div>Cargando datos de la tienda...</div>
      </div>
    )
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <header className="border-b bg-white sticky top-0 z-10 shadow-sm">
        <div className="max-w-7xl mx-auto py-4 px-4 flex justify-between items-center">
          <Link
            to="/dashboard"
            className="flex items-center text-gray-600 hover:text-[#ff204e] transition-colors duration-300"
          >
            <ArrowLeft className="mr-2" size={24} />
            <span className="font-medium">Volver al Dashboard</span>
          </Link>

          <h1 className="text-xl font-bold text-gray-800">Perfil de Tienda</h1>

          <button
            onClick={saveProfile}
            disabled={isLoading}
            className="flex items-center bg-rose-600 hover:bg-rose-700 text-white px-4 py-2 rounded-md transition-colors disabled:opacity-70"
          >
            {isLoading ? "Guardando..." : (
              <>
                <Save className="mr-2 h-4 w-4" />
                Guardar Cambios
              </>
            )}
          </button>
        </div>
      </header>

      <main className="flex-1 max-w-7xl mx-auto py-6 px-4">
        {saveMessage && (
          <div className={`mb-4 p-3 rounded-md ${
            saveMessage.includes("Error") 
              ? "bg-red-100 text-red-700" 
              : "bg-green-100 text-green-700"
          }`}>
            {saveMessage}
          </div>
        )}

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Panel de edición */}
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
              <div className="flex border-b">
                <button
                  onClick={() => setActiveTab("info")}
                  className={`flex-1 py-3 px-4 text-center font-medium ${
                    activeTab === "info"
                      ? "text-rose-600 border-b-2 border-rose-600"
                      : "text-gray-600 hover:text-gray-800"
                  }`}
                >
                  Información
                </button>
                <button
                  onClick={() => setActiveTab("config")}
                  className={`flex-1 py-3 px-4 text-center font-medium ${
                    activeTab === "config"
                      ? "text-rose-600 border-b-2 border-rose-600"
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

                {activeTab === "config" && (
                  <OrderConfig storeData={storeData} updateStoreData={updateStoreData} />
                )}
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