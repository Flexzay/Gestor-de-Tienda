import React, { useState } from "react";
import useTable from "../../../hooks/bashboard/useTable";
import type { Table } from "../../../interface/table";
import { Loader2 } from "lucide-react";

interface SelectTableProps {
  shopId: string;
  onSelect: (table: Table) => void;
  selectedTableId?: string;
}

const SelectTable: React.FC<SelectTableProps> = ({ shopId, onSelect, selectedTableId }) => {
  const { tables, isLoading, error } = useTable(shopId);
  const [selected, setSelected] = useState<string | null>(selectedTableId || null);

  const handleSelect = (table: Table) => {
    setSelected(table.id);
    onSelect(table);
  };

  if (!shopId) {
    return (
      <div className="text-red-600 bg-red-50 border-l-4 border-red-500 p-4 rounded-md">
        Debes proporcionar un ID de tienda válido.
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      <h3 className="text-lg font-semibold mb-4">Selecciona una mesa</h3>

      {isLoading ? (
        <div className="flex justify-center items-center py-6">
          <Loader2 className="h-6 w-6 text-gray-500 animate-spin" />
          <span className="ml-2 text-gray-600">Cargando mesas...</span>
        </div>
      ) : error ? (
        <div className="text-red-600 bg-red-50 border-l-4 border-red-500 p-4 rounded-md">
          {error}
        </div>
      ) : tables.length === 0 ? (
        <p className="text-gray-500">No hay mesas disponibles.</p>
      ) : (
        <div className="flex flex-wrap gap-2">
          {tables
            .filter((t) => t.status) // mostrar solo mesas activas
            .map((table) => (
              <button
                key={table.id}
                onClick={() => handleSelect(table)}
                className={`px-4 py-2 rounded-md transition-all ${
                  selected === table.id
                    ? "bg-blue-600 text-white"
                    : "bg-gray-100 text-gray-800 hover:bg-gray-200"
                }`}
              >
                {table.name}
              </button>
            ))}
        </div>
      )}
    </div>
  );
};

export default SelectTable;