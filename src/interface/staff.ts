export interface StaffMember {
    id: number;
    name: string;
    role: string;
    phone: string;
    image?: string; 
  }

export interface RoleModalProps {
    show: boolean;
    onClose: () => void;
    roles: string[];
    newRole: string;
    setNewRole: (role: string) => void;
    handleAddRole: () => void;
    handleDeleteRole: (role: string) => void;
    error?: string;
}

export interface StaffModalProps {
    show: boolean;
    onClose: () => void;
    newMember: StaffMember;
    setNewMember: (member: StaffMember) => void;
    roles: string[];
    handleAddMember: () => void;
    handleImageChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    imagePreview: string | null;
    error?: string;
}

export interface StaffListProps {
    staff: StaffMember[];
    onEdit: (member: StaffMember) => void;
    onDelete: (id: string) => void;
}

export interface SearchBarProps {
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export interface StaffCardProps {
    member: StaffMember;
    onEdit: (member: StaffMember) => void;
    onDelete: (id: string) => void;
}