import { useState, useEffect } from "react"
import { Save, ArrowLeft } from "lucide-react"
import { StoreInfo } from "./store-info"
import { StoreImages } from "./store-images"
import { OrderConfig } from "./order-config"
import { StorePreview } from "./store-preview"
import { Link } from "react-router-dom"
import { shopService } from "../../../../Services/shop.service"

export default function StoreProfile() {
  const [activeTab, setActiveTab] = useState("info")
  const [storeData, setStoreData] = useState({
    name: "",
    phone: "",
    whatsapp: "",
    location: "",
    description: "",
    hours: "",
    mainImage: null,
    avatarImage: null,
    deliveryFee: "",
    minOrderValue: "",
    ownDelivery: false,
    latitud: "",
    longitud: "",
    timetable: []
  })

  const [mainImagePreview, setMainImagePreview] = useState(null)
  const [avatarImagePreview, setAvatarImagePreview] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [saveMessage, setSaveMessage] = useState("")

  useEffect(() => {
    loadShopData()
  }, [])

  const loadShopData = async () => {
    setIsLoading(true)
    try {
      const response = await shopService.getShop()
      if (response.data?.data) {
        const shop = response.data.data
        setStoreData({
          name: shop.name || "",
          phone: shop.phone || "",
          whatsapp: shop.whatsapp || "",
          location: shop.location || "",
          description: shop.description || "",
          hours: formatTimetable(shop.timetable),
          mainImage: shop.media?.front || null,
          avatarImage: shop.media?.avatar || null,
          deliveryFee: shop.val_own_delivery || "",
          minOrderValue: shop.val_min_bills || "",
          ownDelivery: shop.own_delivery || false,
          latitud: shop.latitud || "",
          longitud: shop.longitud || "",
          timetable: shop.timetable || []
        })

        if (shop.media?.front?.path) {
          setMainImagePreview(`${import.meta.env.VITE_S3_URL}${shop.media.front.path}`)
        }
        if (shop.media?.avatar?.path) {
          setAvatarImagePreview(`${import.meta.env.VITE_S3_URL}${shop.media.avatar.path}`)
        }
      }
    } catch (error) {
      alert("Error al cargar los datos de la tienda")
      console.error(error)
    } finally {
      setIsLoading(false)
    }
  }

  const formatTimetable = (timetable) => {
    if (!timetable || !Array.isArray(timetable)) return ""
    return timetable.map(time => `${time.day}: ${time.open} - ${time.close}`).join(", ")
  }

  const updateStoreData = (field, value) => {
    setStoreData(prev => ({
      ...prev,
      [field]: value,
    }))
  }

  const saveProfile = async () => {
    setIsLoading(true)
    setSaveMessage("")
    
    try {
      // Guardar datos generales
      await shopService.updateShop({
        name: storeData.name,
        description: storeData.description,
        phone: storeData.phone,
        whatsapp: storeData.whatsapp,
        latitud: storeData.latitud,
        longitud: storeData.longitud,
        timetable: storeData.timetable
      })

      // Guardar configuración de delivery
      await shopService.updateDeliverySettings({
        own_delivery: storeData.ownDelivery,
        val_own_delivery: storeData.deliveryFee,
        val_min_bills: storeData.minOrderValue
      })

      // Guardar imágenes si hay nuevas
      if (storeData.mainImage instanceof File) {
        const formData = new FormData()
        formData.append('image', storeData.mainImage)
        await shopService.updateImageShop('front', formData)
      }

      if (storeData.avatarImage instanceof File) {
        const formData = new FormData()
        formData.append('image', storeData.avatarImage)
        await shopService.updateImageShop('avatar', formData)
      }

      setSaveMessage("Perfil guardado correctamente")
    } catch (error) {
      setSaveMessage("Error al guardar los cambios")
      console.error(error)
    } finally {
      setIsLoading(false)
      setTimeout(() => setSaveMessage(""), 3000)
    }
  }

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
          <div className={`mb-4 p-3 rounded-md ${saveMessage.includes("Error") ? "bg-red-100 text-red-700" : "bg-green-100 text-green-700"}`}>
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