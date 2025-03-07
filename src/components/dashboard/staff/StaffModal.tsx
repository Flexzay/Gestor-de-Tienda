import { motion } from "framer-motion";
import { X } from "lucide-react";
import { StaffModalProps } from "../../../interface/staff";

export function StaffModal({ 
  show, 
  onClose, 
  newMember, 
  setNewMember, 
  roles, 
  handleAddMember, 
  handleImageChange, 
  imagePreview, 
  error 
}: StaffModalProps) {
  if (!show) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center  bg-opacity-50 backdrop-blur-md">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        transition={{ duration: 0.2, ease: "easeOut" }}
        className="bg-white p-8 sm:p-10 rounded-2xl shadow-2xl w-[90%] max-w-md relative"
      >
        {/* Botón de cerrar */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 transition"
        >
          <X size={24} />
        </button>

        {/* Título */}
        <h3 className="text-2xl font-bold text-gray-800 text-center mb-6">Agregar Personal</h3>

        {/* Mensaje de error */}
        {error && <p className="text-red-500 text-center text-sm mb-4">{error}</p>}

        {/* Campo de entrada: Nombre */}
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">Nombre</label>
          <input
            type="text"
            placeholder="Ingrese el nombre"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none text-gray-700"
            value={newMember.name}
            onChange={(e) => setNewMember({ ...newMember, name: e.target.value })}
          />
        </div>

        {/* Campo de entrada: Teléfono */}
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">Teléfono</label>
          <input
            type="text"
            placeholder="Ingrese el teléfono"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none text-gray-700"
            value={newMember.phone}
            onChange={(e) => {
              const numericValue = e.target.value.replace(/\D/g, "");
              if (numericValue.length <= 10) {
                setNewMember({ ...newMember, phone: numericValue });
              }
            }}
            maxLength={10}
          />
        </div>

        {/* Selector de rol */}
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">Rol</label>
          <select
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none text-gray-700"
            value={newMember.role}
            onChange={(e) => setNewMember({ ...newMember, role: e.target.value })}
          >
            <option value="">Seleccione un rol</option>
            {roles.map((role) => (
              <option key={role} value={role}>
                {role}
              </option>
            ))}
          </select>
        </div>

        {/* Subir Imagen */}
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">Foto</label>
          <input
            type="file"
            accept="image/*"
            className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none text-gray-700"
            onChange={handleImageChange}
          />
        </div>

        {/* Vista previa de imagen */}
        {imagePreview && (
          <div className="flex justify-center mb-4">
            <img
              src={imagePreview}
              alt="Vista previa"
              className="w-28 h-28 rounded-full border-4 border-gray-300 shadow-lg"
            />
          </div>
        )}

        {/* Botón para agregar */}
        <button
          onClick={handleAddMember}
          className="w-full py-3 text-xl font-semibold text-white bg-green-500 rounded-lg shadow-md transition-all hover:bg-green-600 hover:shadow-lg hover:scale-105"
        >
          Agregar Personal
        </button>
      </motion.div>
    </div>
  );
}
