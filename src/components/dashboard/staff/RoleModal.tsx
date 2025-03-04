import { motion } from "framer-motion";
import { X, Trash2 } from "lucide-react";
import {RoleModalProps} from "../../../interface/staff";



export function RoleModal({
  show,
  onClose,
  roles,
  newRole,
  setNewRole,
  handleAddRole,
  handleDeleteRole,
  error,
}: RoleModalProps) {
  if (!show) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-opacity-50 backdrop-blur-sm">
      <motion.div className="bg-white p-6 rounded-xl shadow-xl w-96 text-center relative">
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-500 hover:text-gray-800">
          <X size={24} />
        </button>
        <h3 className="text-2xl font-bold mb-4">Administrar Roles</h3>
        {error && <p className="text-red-500">{error}</p>}
        <input
          type="text"
          placeholder="Nombre del Rol"
          className="w-full p-3 mb-4 border rounded-xl"
          value={newRole}
          onChange={(e) => setNewRole(e.target.value)}
        />
        <button onClick={handleAddRole} className="px-6 py-2 bg-blue-500 text-white rounded-xl hover:bg-blue-700 transition">
          Guardar Rol
        </button>
        <ul className="mt-4 text-left">
          {roles.map((role) => (
            <li key={role} className="flex justify-between items-center p-2 border-b">
              {role}
              <button onClick={() => handleDeleteRole(role)} className="text-red-500 hover:text-red-700">
                <Trash2 size={18} />
              </button>
            </li>
          ))}
        </ul>
      </motion.div>
    </div>
  );
}
