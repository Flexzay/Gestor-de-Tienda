import { motion } from "framer-motion";
import { X } from "lucide-react";
import { StaffModalProps } from "../../../interface/staff";
import { useEffect, useRef } from "react";

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
  const modalRef = useRef<HTMLDivElement>(null);

  // Cerrar modal con "Escape"
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (show) window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [show, onClose]);

  // Manejo de cambios en inputs
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setNewMember((prev) => ({
      ...prev,
      [name]: name === "phone" ? value.replace(/\D/g, "").slice(0, 10) : value
    }));
  };

  // Cerrar al hacer clic fuera del modal
  const handleOutsideClick = (e: React.MouseEvent) => {
    if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
      onClose();
    }
  };

  if (!show) return null;

  return (
    <div
      className="fixed inset-0 flex items-center justify-center  bg-opacity-40 backdrop-blur-md"
      onClick={handleOutsideClick}
      aria-modal="true"
      role="dialog"
    >
      <motion.div
        ref={modalRef}
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
          aria-label="Cerrar modal"
        >
          <X size={24} />
        </button>

        {/* Título */}
        <h3 className="text-2xl font-bold text-gray-800 text-center mb-6">Agregar Personal</h3>

        {/* Mensaje de error */}
        {error && <p className="text-red-500 text-center text-sm mb-4" aria-live="polite">{error}</p>}

        {/* Campos de entrada */}
        {[
          { label: "Nombre", name: "name", type: "text", placeholder: "Ingrese el nombre" },
          { label: "Teléfono", name: "phone", type: "text", placeholder: "Ingrese el teléfono", maxLength: 10 }
        ].map(({ label, name, type, placeholder, maxLength }) => (
          <div className="mb-4" key={name}>
            <label className="block text-gray-700 font-medium mb-2">{label}</label>
            <input
              type={type}
              name={name}
              placeholder={placeholder}
              maxLength={maxLength}
              value={(newMember as any)[name]}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none text-gray-700"
            />
          </div>
        ))}

        {/* Selector de rol */}
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">Rol</label>
          <select
            name="role"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none text-gray-700"
            value={newMember.role}
            onChange={handleChange}
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
