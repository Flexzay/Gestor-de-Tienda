import { useState, useEffect, useCallback } from "react";
import type { Table } from "../../interface/table";

interface UseOnsiteTableProps {
  shopId: string;
  selectedTableId?: string;
}

export const useOnsiteTable = ({ shopId, selectedTableId }: UseOnsiteTableProps) => {
  const [selected, setSelected] = useState<string | null>(selectedTableId || null);
  const [searchTerm, setSearchTerm] = useState<string>("");

  // Sincroniza selección externa si cambia
  useEffect(() => {
    if (selectedTableId) setSelected(selectedTableId);
  }, [selectedTableId]);

  const handleSelect = useCallback((table: Table, onSelect: (table: Table | null) => void) => {
    setSelected(table.id);
    onSelect(table);
  }, []);

  const handleClearSelection = useCallback((onSelect: (table: Table | null) => void) => {
    setSelected(null);
    onSelect(null);
  }, []);

  const filterTables = useCallback((tables: Table[], term: string): Table[] => {
    if (!tables) return [];
    return tables
      .filter((t) => t.status) // Solo mesas activas
      .filter((t) => t.name.toLowerCase().includes(term.toLowerCase()));
  }, []);

  return {
    selected,
    searchTerm,
    setSearchTerm,
    handleSelect,
    handleClearSelection,
    filterTables
  };
};