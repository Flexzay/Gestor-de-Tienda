import { StaffModal } from "./StaffModal";
import { StaffList } from "./StaffList";
import { RoleModal } from "./RoleModal";
import { SearchBar } from "../SearchBar";
import Sidebar from "../Sidebar";
import { useStaffLogic } from "../../../hooks/bashboard/useStaff";
import { useCallback } from "react";

// Definir tipos para los props del HeaderSection
interface HeaderSectionProps {
  onAddRole: () => void;
  onAddStaff: () => void;
}

export function StaffComponent() {
  const {
    search,
    setSearch,
    filteredStaff,
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
    handleAddMember,
    handleAddRole,
    handleDeleteRole,
    handleImageChange,
    handleDeleteMember,
    handleEditMember,
    handleCloseStaffModal,
  } = useStaffLogic();

  const closeRoleModal = useCallback(() => setShowRoleModal(false), [setShowRoleModal]);

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-[#F8F8F8] text-gray-800">
      {/* Sidebar fijo en pantallas grandes */}
      <Sidebar />

      {/* Contenido principal con margen izquierdo */}
      <div className="flex-1 p-6 w-full md:ml-72 md:pl-6">
        <HeaderSection
          onAddRole={() => setShowRoleModal(true)}
          onAddStaff={() => setShowStaffModal(true)}
        />

        <SearchBar
          value={search}
          placeholder="Buscar Personal"
          onChange={(e) => setSearch(e.target.value)}
          aria-label="Buscar en la lista de personal"
        />

        <StaffList
          staff={filteredStaff}
          onEdit={handleEditMember}
          onDelete={handleDeleteMember}
        />

        <RoleModal
          show={showRoleModal}
          onClose={closeRoleModal}
          roles={roles}
          newRole={newRole}
          setNewRole={setNewRole}
          handleAddRole={handleAddRole}
          handleDeleteRole={handleDeleteRole}
          error={roleError}
        />

        <StaffModal
          show={showStaffModal}
          onClose={handleCloseStaffModal}
          newMember={newMember}
          setNewMember={setNewMember}
          roles={roles}
          handleAddMember={handleAddMember}
          handleImageChange={handleImageChange}
          imagePreview={imagePreview}
          error={error}
        />
      </div>
    </div>
  );
}

/* Header separado para mayor claridad */
const HeaderSection: React.FC<HeaderSectionProps> = ({ onAddRole, onAddStaff }) => (
  <div className="flex flex-col md:flex-row md:justify-between items-center mb-6">
    <h2 className="text-4xl font-bold text-[#301940] text-center md:text-left">
      Miembros del Personal
    </h2>
    <div className="flex space-x-4 mt-4 md:mt-0">
      <button
        onClick={onAddRole}
        className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition-all"
        aria-label="Crear un nuevo rol"
      >
        Crear Rol
      </button>

      <button
        onClick={onAddStaff}
        className="px-6 py-2 bg-red-600 text-white font-semibold rounded-lg shadow-md hover:bg-red-700 transition-all"
        aria-label="Agregar nuevo personal"
      >
        Agregar Personal
      </button>
    </div>
  </div>
);