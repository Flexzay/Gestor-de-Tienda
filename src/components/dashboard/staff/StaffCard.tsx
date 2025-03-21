import { motion } from "framer-motion";
import { Edit2, Trash2 } from "lucide-react";
import { StaffCardProps } from "../../../interface/staff"; 

export function StaffCard({ member, onEdit, onDelete }: StaffCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.05 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="bg-white rounded-3xl shadow-lg p-6 text-center border border-gray-200 
                 hover:shadow-2xl hover:border-gray-300 transition-all transform hover:-translate-y-1"
    >
      {/* Imagen del miembro con borde en #FF2C59 */}
      <div className="relative w-28 h-28 mx-auto mb-4">
        <div className="absolute inset-0 bg-[#FF2C59] rounded-full p-1">
          <img 
            src={member.image || "/default-avatar.png"} 
            alt={`Foto de perfil de ${member.name}`} 
            className="w-full h-full object-cover rounded-full border-4 border-white shadow-md"
          />
        </div>
      </div>

      {/* Información del miembro */}
      <h3 className="text-2xl font-semibold text-gray-900">{member.name}</h3>
      <p className="text-[#FF2C59] text-sm font-medium uppercase tracking-wide">{member.role}</p>
      <p className="text-gray-600 font-medium mt-2 text-lg">{member.phone}</p>

      {/* Acciones */}
      <div className="flex justify-center mt-5 space-x-5">
        <motion.button 
          onClick={() => onEdit(member)}
          whileTap={{ scale: 0.95 }}
          aria-label={`Editar a ${member.name}`}
          className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg 
                     hover:bg-indigo-700 transition shadow-md text-sm font-medium focus:ring-2 
                     focus:ring-indigo-400 focus:ring-offset-2"
        >
          <Edit2 size={20} /> Editar
        </motion.button>
        <motion.button 
          onClick={() => onDelete(member.id)}
          whileTap={{ scale: 0.95 }}
          aria-label={`Eliminar a ${member.name}`}
          className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg 
                     hover:bg-red-700 transition shadow-md text-sm font-medium focus:ring-2 
                     focus:ring-red-400 focus:ring-offset-2"
        >
          <Trash2 size={20} /> Eliminar
        </motion.button>
      </div>
    </motion.div>
  );
}
