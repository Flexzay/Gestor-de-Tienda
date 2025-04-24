import { Camera, Upload } from "lucide-react";
import { StoreImagesProps } from "../../../../interface/profile";

export function StoreImages({
  mainImagePreview,
  avatarImagePreview,
  setMainImagePreview,
  setAvatarImagePreview,
  updateStoreData
}: StoreImagesProps) {
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>, type: 'main' | 'avatar') => {
    if (!e.target.files || !e.target.files[0]) return;
    
    const file = e.target.files[0];
    const validTypes = ['image/jpeg', 'image/png', 'image/webp'];
    
    if (!validTypes.includes(file.type)) {
      alert('Por favor sube una imagen válida (JPEG, PNG o WEBP)');
      return;
    }
    
    if (file.size > 5 * 1024 * 1024) {
      alert('La imagen no debe exceder los 5MB');
      return;
    }
    
    const reader = new FileReader();
    reader.onload = (event) => {
      const result = event.target?.result as string;
      if (type === 'main') {
        setMainImagePreview(result);
        updateStoreData("mainImage", file);
      } else {
        setAvatarImagePreview(result);
        updateStoreData("avatarImage", file);
      }
    };
    reader.readAsDataURL(file);
  };

  const removeImage = (type: 'main' | 'avatar') => {
    if (type === 'main') {
      setMainImagePreview(null);
      updateStoreData("mainImage", null);
      const input = document.getElementById("mainImage") as HTMLInputElement;
      if (input) input.value = "";
    } else {
      setAvatarImagePreview(null);
      updateStoreData("avatarImage", null);
      const input = document.getElementById("avatarImage") as HTMLInputElement;
      if (input) input.value = "";
    }
  };

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
                  src={avatarImagePreview}
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
  );
}