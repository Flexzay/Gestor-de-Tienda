import { motion } from "framer-motion";
import { Edit2, Trash2 } from "lucide-react";
import { StaffCardProps } from "../../../interface/staff"; 

export function StaffCard({ member, onEdit, onDelete }: StaffCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="bg-white rounded-xl shadow-lg p-6 text-center border border-gray-300 hover:shadow-2xl hover:scale-105 transition"
    >
      <img src={member.image} alt={member.name} className="w-28 h-28 mx-auto rounded-full mb-4 shadow-md" />
      <h3 className="text-xl font-semibold text-[#301940]">{member.name}</h3>
      <p className="text-gray-600 text-lg">{member.role}</p>
      <p className="text-gray-600 text-lg">{member.phone}</p>
      <div className="flex justify-center mt-4 space-x-4">
        <button onClick={() => onEdit(member)} className="text-blue-500 hover:text-blue-700">
          <Edit2 size={18} />
        </button>
        <button onClick={() => onDelete(member.id)} className="text-red-500 hover:text-red-700">
          <Trash2 size={18} />
        </button>
      </div>
    </motion.div>
  );
}
