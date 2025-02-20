import React from "react";
import { motion } from "framer-motion";
import { Home, PlusCircle, Trash2, X , Edit2} from "lucide-react";
import { useStaffLogic } from "../../hooks/bashboard/useStaff";

function StaffComponent () {
  const {
    search,
    setSearch,
    staff,
    roles,
    showStaffModal,
    setShowStaffModal,
    showRoleModal,
    setShowRoleModal,
    newMember,
    setNewMember,
    newRole,
    setNewRole,
    error,
    roleError,
    imagePreview,
    filteredStaff,
    handleAddMember,
    handleAddRole,
    handleDeleteRole,
    handleImageChange,
    handleGoToDashboard,
    handleEditMember,
    handleDeleteMember
  } = useStaffLogic();

  return (
    <div className="p-6 min-h-screen bg-[#F8F8F8] text-gray-800">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-6 space-y-4 md:space-y-0 w-full md:w-auto">
        <h2 className="text-4xl font-bold text-[#301940]">Miembros del Personal</h2>
        <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 md:ml-auto w-full sm:w-auto"> {/* Flex en columna en pantallas pequeñas y en fila en pantallas grandes */}
          <button
            onClick={() => setShowRoleModal(true)}
            className="flex items-center bg-blue-500 text-white px-6 py-3 rounded-xl shadow-md hover:bg-blue-700 transition w-full sm:w-auto"
          >
            <PlusCircle size={24} className="mr-2" /> Crear Rol
          </button>
          <button
            onClick={() => setShowStaffModal(true)}
            className="flex items-center bg-[#FF2C59] text-white px-6 py-3 rounded-xl shadow-md hover:bg-[#F29A2E] transition w-full sm:w-auto"
          >
            <PlusCircle size={24} className="mr-2" /> Agregar Personal
          </button>
          <button
            onClick={handleGoToDashboard}
            className="flex items-center bg-[#301940] text-white px-6 py-3 rounded-xl shadow-md hover:bg-[#FF2C59] transition w-full sm:w-auto"
          >
            <Home size={24} className="mr-2" /> Volver al Dashboard
          </button>
        </div>
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
            className="bg-white rounded-xl shadow-lg p-6 text-center border border-gray-300 hover:shadow-2xl hover:scale-105 transition"
          >
            <img src={member.image} alt={member.name} className="w-28 h-28 mx-auto rounded-full mb-4 shadow-md" />
            <h3 className="text-xl font-semibold text-[#301940]">{member.name}</h3>
            <p className="text-gray-600 text-lg">{member.role}</p>
            <p className="text-gray-600 text-lg">{member.phone}</p>
            <div className="flex justify-center mt-4 space-x-4">
              <button onClick={() => handleEditMember(member)} className="text-blue-500 hover:text-blue-700">
                <Edit2 size={18} />
              </button>
              <button onClick={() => handleDeleteMember(member.id)} className="text-red-500 hover:text-red-700">
                <Trash2 size={18} />
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Modal para Crear y Eliminar Roles */}
      {showRoleModal && (
        <div className="fixed inset-0 flex items-center justify-center  bg-opacity-50 backdrop-blur-sm">
          <motion.div className="bg-white p-6 rounded-xl shadow-xl w-96 text-center relative">
            <button onClick={() => setShowRoleModal(false)} className="absolute top-4 right-4 text-gray-500 hover:text-gray-800">
              <X size={24} />
            </button>
            <h3 className="text-2xl font-bold mb-4">Administrar Roles</h3>
            {roleError && <p className="text-red-500">{roleError}</p>}
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
                  <button
                    onClick={() => handleDeleteRole(role)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <Trash2 size={18} />
                  </button>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      )}

      {/* Modal para Agregar Personal */}
      {showStaffModal && (
        <div className="fixed inset-0 flex items-center justify-center  bg-opacity-50 backdrop-blur-sm">
          <motion.div className="bg-white p-6 rounded-xl shadow-xl w-96 text-center relative">
            <button onClick={() => setShowStaffModal(false)} className="absolute top-4 right-4 text-gray-500 hover:text-gray-800">
              <X size={24} />
            </button>
            <h3 className="text-2xl font-bold mb-4">Agregar Personal</h3>
            {error && <p className="text-red-500">{error}</p>}
            <input
              type="text"
              placeholder="Nombre"
              className="w-full p-3 mb-4 border rounded-xl"
              value={newMember.name}
              onChange={(e) => {
                setNewMember({ ...newMember, name: e.target.value });
              }}
            />

            <input
              type="text"
              placeholder="Teléfono"
              className="w-full p-3 mb-4 border rounded-xl"
              value={newMember.phone}
              onChange={(e) => {
                const numericValue = e.target.value.replace(/\D/g, ""); // Elimina cualquier carácter que no sea número
                if (numericValue.length <= 10) {
                  setNewMember({ ...newMember, phone: numericValue });
                }
              }}
              maxLength={10} // Asegura que el campo no tenga más de 10 caracteres
            />

            <select
              className="w-full p-3 mb-4 border rounded-xl"
              value={newMember.role}
              onChange={(e) => setNewMember({ ...newMember, role: e.target.value })}
            >
              <option value="">Seleccione un rol</option>
              {roles.map(role => <option key={role} value={role}>{role}</option>)}
            </select>
            <input
              type="file"
              accept="image/*"
              className="w-full p-3 mb-4 border rounded-xl"
              onChange={handleImageChange}
            />
            {imagePreview && <img src={imagePreview} alt="Vista previa" className="w-28 h-28 mx-auto rounded-full mb-4" />}
            <button
              onClick={handleAddMember}
              className="px-6 py-2 bg-green-500 text-white rounded-xl hover:bg-green-700 transition"
            >
              Agregar
            </button>
          </motion.div>
        </div>
      )}



    </div>
  );
};

export default StaffComponent;
