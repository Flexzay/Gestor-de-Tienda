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
      className="bg-white rounded-2xl shadow-xl p-6 text-center border border-gray-200 hover:shadow-2xl transition"
    >
      {/* Imagen del miembro */}
      <div className="relative w-28 h-28 mx-auto mb-4">
        <img 
          src={member.image} 
          alt={member.name} 
          className="w-full h-full object-cover rounded-full shadow-md border-4 border-gray-100"
        />
      </div>

      {/* Información del miembro */}
      <h3 className="text-xl font-semibold text-gray-800">{member.name}</h3>
      <p className="text-gray-500 text-sm">{member.role}</p>
      <p className="text-gray-600 font-medium mt-1">{member.phone}</p>

      {/* Acciones */}
      <div className="flex justify-center mt-4 space-x-4">
        <button 
          onClick={() => onEdit(member)} 
          className="p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
        >
          <Edit2 size={18} />
        </button>
        <button 
          onClick={() => onDelete(member.id)} 
          className="p-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
        >
          <Trash2 size={18} />
        </button>
      </div>
    </motion.div>
  );
}
