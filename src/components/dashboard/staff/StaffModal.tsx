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
    <div className="fixed inset-0 flex items-center justify-center bg-opacity-50 backdrop-blur-sm">
      <motion.div className="bg-white p-6 rounded-xl shadow-xl w-96 text-center relative">
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-500 hover:text-gray-800">
          <X size={24} />
        </button>
        <h3 className="text-2xl font-bold mb-4">Agregar Personal</h3>
        {error && <p className="text-red-500">{error}</p>}

        <input
          type="text"
          placeholder="Nombre"
          className="w-full p-3 mb-4 border rounded-xl"
          value={newMember.name}
          onChange={(e) => setNewMember({ ...newMember, name: e.target.value })}
        />

        <input
          type="text"
          placeholder="Teléfono"
          className="w-full p-3 mb-4 border rounded-xl"
          value={newMember.phone}
          onChange={(e) => {
            const numericValue = e.target.value.replace(/\D/g, "");
            if (numericValue.length <= 10) {
              setNewMember({ ...newMember, phone: numericValue });
            }
          }}
          maxLength={10}
        />

        <select
          className="w-full p-3 mb-4 border rounded-xl"
          value={newMember.role}
          onChange={(e) => setNewMember({ ...newMember, role: e.target.value })}
        >
          <option value="">Seleccione un rol</option>
          {roles.map((role) => (
            <option key={role} value={role}>{role}</option>
          ))}
        </select>

        <input
          type="file"
          accept="image/*"
          className="w-full p-3 mb-4 border rounded-xl"
          onChange={handleImageChange}
        />
        {imagePreview && <img src={imagePreview} alt="Vista previa" className="w-28 h-28 mx-auto rounded-full mb-4" />}

        <button onClick={handleAddMember} className="px-6 py-2 bg-green-500 text-white rounded-xl hover:bg-green-700 transition">
          Agregar Personal
        </button>
      </motion.div>
    </div>
  );
}
