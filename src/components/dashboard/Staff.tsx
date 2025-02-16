import type React from "react";
import { useState } from "react";
import { motion } from "framer-motion";
import { PlusCircle, Trash2, Edit, X } from "lucide-react";

const initialStaff = [
  { id: 1, name: "Alice Johnson", role: "Project Manager", image: "https://personapersonapersona.com/wp-content/uploads/2022/04/20240910_Polas_Persona00049-265x398.jpg" },
  { id: 2, name: "Bob Smith", role: "UI/UX Designer", image: "https://personapersonapersona.com/wp-content/uploads/2023/10/DSCF9644-17-5-265x398.jpg" },
  { id: 3, name: "Charlie Brown", role: "Frontend Developer", image: "https://personapersonapersona.com/wp-content/uploads/2024/07/DSCF1613-33-265x398.jpg" },
];

const StaffComponent: React.FC = () => {
  const [search, setSearch] = useState("");
  const [staff, setStaff] = useState(initialStaff);
  const [showModal, setShowModal] = useState(false);
  const [newMember, setNewMember] = useState({ name: "", role: "", image: "" });

  const filteredStaff = staff.filter((member) =>
    member.name.toLowerCase().includes(search.toLowerCase())
  );

  const handleAddMember = () => {
    if (!newMember.name || !newMember.role || !newMember.image) return;
    setStaff([...staff, { ...newMember, id: staff.length + 1 }]);
    setNewMember({ name: "", role: "", image: "" });
    setShowModal(false);
  };

  return (
    <div className="p-6 min-h-screen bg-[#F8F8F8] text-gray-800">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-6 space-y-4 md:space-y-0">
        <h2 className="text-4xl font-bold text-[#301940]">Miembros del Personal</h2>
        <button 
          onClick={() => setShowModal(true)} 
          className="flex items-center bg-[#FF2C59] text-white px-6 py-3 rounded-xl shadow-md hover:bg-[#F29A2E] transition"
        >
          <PlusCircle size={24} className="mr-2" /> Agregar Personal
        </button>
      </div>

      {/* Buscador */}
      <input
        type="text"
        placeholder="Buscar staff..."
        className="w-full p-3 mb-6 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#05F2F2] focus:outline-none"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* Grid de Staff */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredStaff.map((member) => (
          <motion.div 
            key={member.id} 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.3 }} 
            className="bg-gradient-to-br from-[#F4F4F9] to-[#E0E0E5] rounded-xl shadow-lg p-6 text-center border border-gray-300 hover:shadow-2xl hover:scale-105 transition"
          >
            <img src={member.image} alt={member.name} className="w-28 h-28 mx-auto rounded-full mb-4 shadow-md border-4 border-white" />
            <h3 className="text-xl font-semibold text-[#301940]">{member.name}</h3>
            <p className="text-gray-600 text-lg">{member.role}</p>
            <div className="flex justify-center space-x-3 mt-4">
              <button className="p-3 bg-[#05F2F2] text-white rounded-xl shadow-md hover:bg-[#301940] transition">
                <Edit size={18} />
              </button>
              <button className="p-3 bg-[#FF2C59] text-white rounded-xl shadow-md hover:bg-[#F29A2E] transition">
                <Trash2 size={18} />
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Modal para Agregar Staff */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center  bg-opacity-50 backdrop-blur-sm">
          <motion.div 
            initial={{ scale: 0.8, opacity: 0 }} 
            animate={{ scale: 1, opacity: 1 }} 
            className="bg-white p-8 rounded-2xl shadow-xl w-96 text-center relative"
          >
            <button onClick={() => setShowModal(false)} className="absolute top-4 right-4 text-gray-500 hover:text-gray-800">
              <X size={24} />
            </button>
            <h3 className="text-3xl font-bold mb-6 text-[#301940]">Agregar Nuevo Staff</h3>
            <input 
              type="text" 
              placeholder="Nombre" 
              className="w-full p-3 mb-4 border rounded-xl focus:ring-2 focus:ring-[#05F2F2]" 
              value={newMember.name} 
              onChange={(e) => setNewMember({ ...newMember, name: e.target.value })} 
            />
            <input 
              type="text" 
              placeholder="Rol" 
              className="w-full p-3 mb-4 border rounded-xl focus:ring-2 focus:ring-[#05F2F2]" 
              value={newMember.role} 
              onChange={(e) => setNewMember({ ...newMember, role: e.target.value })} 
            />
            <input 
              type="text" 
              placeholder="Imagen URL" 
              className="w-full p-3 mb-6 border rounded-xl focus:ring-2 focus:ring-[#05F2F2]" 
              value={newMember.image} 
              onChange={(e) => setNewMember({ ...newMember, image: e.target.value })} 
            />
            <div className="flex justify-between">
              <button onClick={handleAddMember} className="px-6 py-3 bg-[#FF2C59] text-white rounded-xl hover:bg-[#F29A2E] transition">
                Agregar
              </button>
              <button onClick={() => setShowModal(false)} className="px-6 py-3 bg-gray-400 text-white rounded-xl hover:bg-gray-500 transition">
                Cancelar
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default StaffComponent;
