import { motion } from "framer-motion";
import { X, Trash2 } from "lucide-react";
import { RoleModalProps } from "../../../interface/staff";

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
    <div className="fixed inset-0 flex items-center justify-center bg-opacity-40 backdrop-blur-sm">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        transition={{ duration: 0.2, ease: "easeOut" }}
        className="bg-white p-6 sm:p-8 rounded-2xl shadow-2xl w-[90%] max-w-md relative"
      >
        {/* Botón de cierre */}
        <button
          onClick={onClose}
          aria-label="Cerrar modal"
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 transition"
        >
          <X size={24} />
        </button>

        {/* Título */}
        <h3 className="text-2xl font-bold text-gray-800 text-center mb-4">Administrar Roles</h3>

        {/* Mensaje de error */}
        {error && (
          <p className="text-red-500 text-center text-sm mb-4" aria-live="polite">
            {error}
          </p>
        )}

        {/* Campo de entrada */}
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Nombre del Rol"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none text-gray-700"
            value={newRole}
            onChange={(e) => setNewRole(e.target.value)}
          />
          <button
            onClick={handleAddRole}
            className="px-5 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
          >
            +
          </button>
        </div>

        {/* Lista de roles */}
        <ul className="mt-5 space-y-3">
          {roles.map((role) => (
            <li key={role} className="flex justify-between items-center p-3 bg-gray-100 rounded-lg">
              <span className="text-gray-800">{role}</span>
              <button
                onClick={() => handleDeleteRole(role)}
                aria-label={`Eliminar rol ${role}`}
                className="text-red-500 hover:text-red-700 transition"
              >
                <Trash2 size={20} />
              </button>
            </li>
          ))}
        </ul>
      </motion.div>
    </div>
  );
}
