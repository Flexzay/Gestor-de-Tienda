import React, { useMemo } from "react";
import { Loader2, AlertCircle, CheckCircle2, Coffee, Search } from "lucide-react";
import useTable from "../../../hooks/bashboard/useTable";
import { useOnsiteTable } from "../../../hooks/bashboard/useOnsiteTable";
import type { Table } from "../../../interface/table";

interface SelectTableProps {
  shopId: string;
  onSelect: (table: Table | null) => void;
  selectedTableId?: string;
}

const SelectTable: React.FC<SelectTableProps> = ({ shopId, onSelect, selectedTableId }) => {
  const { tables, isLoading, error } = useTable(shopId);
  const {
    selected,
    searchTerm,
    setSearchTerm,
    handleSelect,
    handleClearSelection,
    filterTables
  } = useOnsiteTable({ shopId, selectedTableId });

  const filteredTables = useMemo(() => {
    return filterTables(tables || [], searchTerm);
  }, [tables, searchTerm, filterTables]);

  if (!shopId) {
    return (
      <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-md shadow-sm ">
        <div className="flex items-center">
          <AlertCircle className="h-5 w-5 text-red-500 mr-2" />
          <p className="text-red-700 font-medium">Debes proporcionar un ID de tienda válido.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md border border-gray-100 mb-8">
      <div className="p-4 border-b border-gray-100">
        <h3 className="text-lg font-semibold text-gray-800">Selecciona una mesa</h3>
        <p className="text-sm text-gray-500 mt-1">Elige una mesa para continuar con la orden</p>
      </div>

      {tables && tables.length > 0 && (
        <div className="px-4 py-3 border-b border-gray-100">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-4 w-4 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Buscar mesa..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 w-full py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
            />
          </div>
        </div>
      )}

      <div className="p-4">
        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-8">
            <Loader2 className="h-8 w-8 text-blue-500 animate-spin mb-2" />
            <span className="text-gray-600">Cargando mesas...</span>
          </div>
        ) : error ? (
          <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-md">
            <div className="flex items-center">
              <AlertCircle className="h-5 w-5 text-red-500 mr-2" />
              <p className="text-red-700">{error}</p>
            </div>
          </div>
        ) : filteredTables.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-8 text-center">
            <Coffee className="h-12 w-12 text-gray-300 mb-2" />
            <p className="text-gray-500 font-medium">No hay mesas disponibles{searchTerm ? " con ese nombre" : ""}.</p>
            {searchTerm && (
              <button
                onClick={() => setSearchTerm("")}
                className="mt-2 text-blue-500 hover:text-blue-700 text-sm font-medium"
              >
                Limpiar búsqueda
              </button>
            )}
          </div>
        ) : (
          <>
            {searchTerm && (
              <p className="text-sm text-gray-500 mb-3">
                {filteredTables.length} {filteredTables.length === 1 ? "resultado" : "resultados"} encontrados
              </p>
            )}

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
              {filteredTables.map((table) => (
                <button
                  key={table.id}
                  onClick={() => handleSelect(table, onSelect)}
                  className={`flex flex-col items-center justify-center p-3 rounded-lg border transition-all duration-200 ${
                    selected === table.id
                      ? "bg-blue-50 border-blue-500 ring-2 ring-blue-200"
                      : "bg-white border-gray-200 hover:bg-gray-50 hover:border-gray-300"
                  }`}
                  aria-pressed={selected === table.id}
                >
                  <span className={`text-lg font-medium ${selected === table.id ? "text-blue-700" : "text-gray-700"}`}>
                    {table.name}
                  </span>
                  {selected === table.id && <CheckCircle2 className="h-5 w-5 text-blue-500 mt-1" />}
                </button>
              ))}
            </div>

            {selected && (
              <div className="mt-4 text-right">
                <button
                  onClick={() => handleClearSelection(onSelect)}
                  className="text-sm text-gray-500 hover:underline"
                >
                  Quitar selección
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default SelectTable;