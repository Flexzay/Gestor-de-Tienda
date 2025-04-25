import { StaffCard } from "./StaffCard";
import { StaffListProps } from "../../../interface/staff";
import { useMemo } from "react";

export function StaffList({ staff, onEdit, onDelete }: StaffListProps) {
  // Memorizar lista de staff para evitar renderizados innecesarios
  const staffList = useMemo(() => staff, [staff]);

  return (
    <div className="mt-6" aria-live="polite">
      {staffList.length === 0 ? (
        <p className="text-center text-gray-500 text-lg">No hay miembros en el personal.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {staffList.map((member) => (
            <StaffCard key={member.id} member={member} onEdit={onEdit} onDelete={(id) => onDelete(Number(id))} />
          ))}
        </div>
      )}
    </div>
  );
}
