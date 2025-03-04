import { StaffCard } from "./StaffCard";
import { StaffListProps } from "../../../interface/staff"; 

export function StaffList({ staff, onEdit, onDelete }: StaffListProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {staff.map((member) => (
        <StaffCard key={member.id} member={member} onEdit={onEdit} onDelete={onDelete} />
      ))}
    </div>
  );
}
