import { Camera, Upload } from "lucide-react"
export function StoreImages({
  mainImagePreview,
  avatarImagePreview,
  setMainImagePreview,
  setAvatarImagePreview,
  updateStoreData,
}) {
  // Función para manejar cambios en las imágenes
  const handleImageChange = (e, type) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0]
      
      // Validaciones básicas
      if (!file.type.startsWith('image/')) {
        alert('Por favor seleccione un archivo de imagen válido')
        return
      }

      const reader = new FileReader()
      reader.onload = (event) => {
        if (type === 'main') {
          setMainImagePreview(event.target.result)
          updateStoreData("mainImage", file) // Guardamos el File para el upload
        } else {
          setAvatarImagePreview(event.target.result)
          updateStoreData("avatarImage", file) // Guardamos el File para el upload
        }
      }
      reader.readAsDataURL(file)
    }
  }

  // Función para eliminar imágenes
  const removeImage = (type) => {
    if (type === 'main') {
      setMainImagePreview(null)
      updateStoreData("mainImage", null)
      // Limpiar input file
      const input = document.getElementById("mainImage")
      if (input) input.value = ""
    } else {
      setAvatarImagePreview(null)
      updateStoreData("avatarImage", null)
      // Limpiar input file
      const input = document.getElementById("avatarImage")
      if (input) input.value = ""
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
                src={typeof mainImagePreview === 'string' ? 
                     mainImagePreview : 
                     URL.createObjectURL(mainImagePreview)}
                alt="Imagen principal"
                className="w-full h-full object-cover rounded-md"
              />
              <div className="absolute inset-0 flex items-end justify-end p-2">
                <button
                  onClick={() => removeImage('main')}
                  className="bg-white text-gray-700 p-1 rounded-full shadow hover:bg-gray-100"
                >
                  ✖
                </button>
              </div>
            </div>
          ) : (
            <div className="py-8 flex flex-col items-center">
              <Upload className="h-10 w-10 text-gray-400 mb-2" />
              <p className="text-sm text-gray-500 mb-2">Seleccione una imagen principal</p>
              <button
                className="bg-white text-gray-700 px-3 py-1.5 text-sm rounded-md shadow-sm border border-gray-300 hover:bg-gray-50"
                onClick={() => document.getElementById("mainImage")?.click()}
              >
                Seleccionar Imagen
              </button>
            </div>
          )}
          <input
            id="mainImage"
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => handleImageChange(e, 'main')}
          />
        </div>
      </div>

      {/* Imagen avatar */}
      <div className="space-y-4">
        <label className="block text-sm font-medium text-gray-700">Imagen Avatar</label>
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
          {avatarImagePreview ? (
            <div className="flex flex-col items-center">
              <div className="relative w-32 h-32 mb-4">
                <img
                  src={typeof avatarImagePreview === 'string' ? 
                       avatarImagePreview : 
                       URL.createObjectURL(avatarImagePreview)}
                  alt="Avatar"
                  className="w-32 h-32 object-cover rounded-full"
                />
                <button
                  onClick={() => removeImage('avatar')}
                  className="absolute -top-2 -right-2 bg-white text-gray-700 p-1 rounded-full shadow hover:bg-gray-100"
                >
                  ✖
                </button>
              </div>
            </div>
          ) : (
            <div className="py-8 flex flex-col items-center">
              <div className="w-32 h-32 rounded-full bg-gray-200 mb-4 flex items-center justify-center">
                <Camera className="h-8 w-8 text-gray-400" />
              </div>
              <button
                className="bg-white text-gray-700 px-3 py-1.5 text-sm rounded-md shadow-sm border border-gray-300 hover:bg-gray-50"
                onClick={() => document.getElementById("avatarImage")?.click()}
              >
                Seleccionar Avatar
              </button>
            </div>
          )}
          <input
            id="avatarImage"
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => handleImageChange(e, 'avatar')}
          />
        </div>
      </div>
    </div>
  )
}