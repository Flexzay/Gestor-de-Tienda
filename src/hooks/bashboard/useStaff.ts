import { useState } from "react";

export const useStaffLogic = () => {
  const initialStaff = [
    { id: 1, name: "Andres Duarte", role: "Contador", phone: "3143920230", image: "https://personapersonapersona.com/wp-content/uploads/2022/04/20240910_Polas_Persona00049-265x398.jpg" },
    { id: 2, name: "Maycol Mendez", role: "Cajero", phone: "3143920230", image: "https://personapersonapersona.com/wp-content/uploads/2023/10/DSCF9644-17-5-265x398.jpg" },
    { id: 3, name: "Charlie Brown", role: "Surtidor", phone: "3143920230", image: "https://personapersonapersona.com/wp-content/uploads/2024/07/DSCF1613-33-265x398.jpg" },
  ];

  const initialRoles = ["Contador", "Cajero", "Surtidor"];

  const [search, setSearch] = useState("");
  const [staff, setStaff] = useState(initialStaff);
  const [roles, setRoles] = useState(initialRoles);
  const [showStaffModal, setShowStaffModal] = useState(false);
  const [showRoleModal, setShowRoleModal] = useState(false);
  const [newMember, setNewMember] = useState({ id: 0, name: "", role: "", image: "", phone: "" });
  const [newRole, setNewRole] = useState("");
  const [error, setError] = useState("");
  const [roleError, setRoleError] = useState("");
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState(false);

  const filteredStaff = staff.filter((member) =>
    member.name.toLowerCase().includes(search.toLowerCase())
  );

  const resetModal = () => {
    setNewMember({ id: 0, name: "", role: "", image: "", phone: "" });
    setImagePreview(null);
    setError("");
    setIsEditing(false);
  };

  const handleCloseStaffModal = () => {
    resetModal();
    setShowStaffModal(false);
  };

  const handleAddMember = () => {
    if (!newMember.name || !newMember.role || !newMember.image || !newMember.phone) {
      setError("Todos los campos son requeridos.");
      return;
    }

    if (isEditing) {
      setStaff(staff.map(member => (member.id === newMember.id ? newMember : member)));
    } else {
      setStaff([...staff, { ...newMember, id: staff.length + 1 }]);
    }

    resetModal();
    setShowStaffModal(false);
  };

  const handleDeleteMember = (id: number) => {
    setStaff(staff.filter(member => member.id !== id));
  };

  const handleEditMember = (member: { id: number; name: string; role: string; image: string; phone: string }) => {
    setNewMember(member);
    setImagePreview(member.image);
    setShowStaffModal(true);
    setIsEditing(true);
  };

  const handleAddRole = () => {
    if (!newRole) {
      setRoleError("El nombre del rol es obligatorio.");
      return;
    }
    if (roles.includes(newRole)) {
      setRoleError("Este rol ya existe.");
      return;
    }
    setRoles([...roles, newRole]);
    setNewRole("");
    setRoleError("");
    setShowRoleModal(false);
  };

  const handleDeleteRole = (roleToDelete: string) => {
    const isRoleInUse = staff.some((member) => member.role === roleToDelete);
    if (isRoleInUse) {
      setRoleError(`El rol "${roleToDelete}" está en uso y no puede ser eliminado.`);
      return;
    }
    setRoles(roles.filter((role) => role !== roleToDelete));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setNewMember({ ...newMember, image: URL.createObjectURL(file) });
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleGoToDashboard = () => {
    window.location.href = "/dashboard";
  };

  return {
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
    handleDeleteMember,
    handleEditMember,
    handleCloseStaffModal, 
  };
};