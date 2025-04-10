import { Camera, Upload } from "lucide-react"

export function StoreImages({
  mainImagePreview,
  avatarImagePreview,
  setMainImagePreview,
  setAvatarImagePreview,
  updateStoreData,
}) {
  const handleMainImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader()
      reader.onload = (event) => {
        setMainImagePreview(event.target?.result)
        updateStoreData("mainImage", e.target.files[0])
      }
      reader.readAsDataURL(e.target.files[0])
    }
  }

  const handleAvatarImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader()
      reader.onload = (event) => {
        setAvatarImagePreview(event.target?.result)
        updateStoreData("avatarImage", e.target.files[0])
      }
      reader.readAsDataURL(e.target.files[0])
    }
  }

  return (
    <div className="grid gap-6 md:grid-cols-2">
      {/* Imagen principal */}
      <div className="space-y-4">
        <label className="block text-sm font-medium text-gray-700">Imagen Principal</label>
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
          {mainImagePreview ? (
            <div className="relative w-full h-48">
              <img
                src={mainImagePreview}
                alt="Imagen principal"
                className="w-full h-full object-cover rounded-md"
              />
              <button
                className="absolute bottom-2 right-2 bg-white text-gray-700 px-2 py-1 text-sm rounded-md shadow-sm border border-gray-300 hover:bg-gray-50 flex items-center"
                onClick={() => document.getElementById("mainImage").click()}
              >
                <Camera className="h-4 w-4 mr-1" />
                Cambiar
              </button>
            </div>
          ) : (
            <div className="py-8 flex flex-col items-center">
              <Upload className="h-10 w-10 text-gray-400 mb-2" />
              <p className="text-sm text-gray-500 mb-2">Seleccione una imagen principal</p>
              <button
                className="bg-white text-gray-700 px-3 py-1.5 text-sm rounded-md shadow-sm border border-gray-300 hover:bg-gray-50"
                onClick={() => document.getElementById("mainImage").click()}
              >
                Seleccionar Imagen
              </button>
            </div>
          )}
          <input id="mainImage" type="file" accept="image/*" className="hidden" onChange={handleMainImageChange} />
        </div>
      </div>

      {/* Imagen avatar */}
      <div className="space-y-4">
        <label className="block text-sm font-medium text-gray-700">Imagen Avatar</label>
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
          {avatarImagePreview ? (
            <div className="flex flex-col items-center">
              <div className="w-32 h-32 mb-4 relative">
                <img
                  src={avatarImagePreview}
                  alt="Avatar"
                  className="w-32 h-32 object-cover rounded-full"
                />
              </div>
              <button
                className="bg-white text-gray-700 px-2 py-1 text-sm rounded-md shadow-sm border border-gray-300 hover:bg-gray-50 flex items-center"
                onClick={() => document.getElementById("avatarImage").click()}
              >
                <Camera className="h-4 w-4 mr-1" />
                Cambiar
              </button>
            </div>
          ) : (
            <div className="py-8 flex flex-col items-center">
              <div className="w-32 h-32 rounded-full bg-gray-200 mb-4 flex items-center justify-center">
                <Camera className="h-8 w-8 text-gray-400" />
              </div>
              <button
                className="bg-white text-gray-700 px-3 py-1.5 text-sm rounded-md shadow-sm border border-gray-300 hover:bg-gray-50"
                onClick={() => document.getElementById("avatarImage").click()}
              >
                Seleccionar Avatar
              </button>
            </div>
          )}
          <input id="avatarImage" type="file" accept="image/*" className="hidden" onChange={handleAvatarImageChange} />
        </div>
      </div>
    </div>
  )
}
