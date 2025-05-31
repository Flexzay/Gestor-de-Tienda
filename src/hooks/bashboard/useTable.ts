import { useEffect, useState, useCallback } from "react";
import { spacesService } from "../../Services/spaces.service";
import { Table } from "../../interface/table";

const useTable = (shopId: string) => {
  const [tables, setTables] = useState<Table[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [newTableName, setNewTableName] = useState("");
  const [editedTableName, setEditedTableName] = useState("");
  const [editingTableId, setEditingTableId] = useState<string | null>(null);
  const [actionLoading, setActionLoading] = useState<string | null>(null);

  const getSpaces = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);

      if (!shopId) {
        setError("No se ha proporcionado un ID de tienda válido");
        return;
      }

      const response = await spacesService.GetSpaces(shopId);
      const tablesData = response?.data || response || [];

      if (!Array.isArray(tablesData)) {
        throw new Error("La respuesta no es un array de mesas");
      }

      const validTables = tablesData.map((table: any) => ({
        id: table.id?.toString() || Math.random().toString(36).substr(2, 9),
        name: table.name || "Mesa sin nombre",
        status: typeof table.status === "boolean" ? table.status : true,
        delivery: typeof table.delivery === "boolean" ? table.delivery : false,
      }));

      setTables(validTables);
    } catch (err: any) {
      setError(err.message || "Error al cargar las mesas");
    } finally {
      setIsLoading(false);
    }
  }, [shopId]);

  useEffect(() => {
    getSpaces();
  }, [getSpaces]);

  const addTable = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTableName.trim()) return;

    try {
      setActionLoading("add");

      const newTable = {
        name: newTableName,
        status: true,
        delivery: false,
      };

      const response = await spacesService.CreateSpace(shopId, newTable);
      const addedTable = response?.data || response;

      setTables((prev) => [
        ...prev,
        {
          id: addedTable.id?.toString() || Math.random().toString(36).substr(2, 9),
          name: addedTable.name,
          status: addedTable.status,
          delivery: addedTable.delivery,
        },
      ]);
      setNewTableName("");
    } catch (err: any) {
      setError(err.message || "Error al agregar la mesa");
    } finally {
      setActionLoading(null);
    }
  };

  const toggleStatus = async (table: Table) => {
    try {
      setActionLoading(`status-${table.id}`);
      const updated = { ...table, status: !table.status };
      await spacesService.UpdateSpace(shopId, table.id, updated);

      setTables((prev) =>
        prev.map((t) => (t.id === table.id ? { ...t, status: !t.status } : t))
      );
    } catch (err: any) {
      setError(err.message || "Error al actualizar el estado");
    } finally {
      setActionLoading(null);
    }
  };

  const toggleDelivery = async (table: Table) => {
    try {
      setActionLoading(`delivery-${table.id}`);
      const updated = { ...table, delivery: !table.delivery };
      await spacesService.UpdateSpace(shopId, table.id, updated);

      setTables((prev) =>
        prev.map((t) => (t.id === table.id ? { ...t, delivery: !t.delivery } : t))
      );
    } catch (err: any) {
      setError(err.message || "Error al actualizar el domicilio");
    } finally {
      setActionLoading(null);
    }
  };

  const saveEditedTableName = async (table: Table) => {
    if (!editedTableName.trim()) return;
    try {
      setActionLoading(`edit-${table.id}`);
      const updated = { ...table, name: editedTableName };
      await spacesService.UpdateSpace(shopId, table.id, updated);

      setTables((prev) =>
        prev.map((t) => (t.id === table.id ? { ...t, name: editedTableName } : t))
      );
      setEditingTableId(null);
      setEditedTableName("");
    } catch (err: any) {
      setError(err.message || "Error al editar el nombre de la mesa");
    } finally {
      setActionLoading(null);
    }
  };

  return {
    tables,
    newTableName,
    setNewTableName,
    editedTableName,
    setEditedTableName,
    editingTableId,
    setEditingTableId,
    isLoading,
    error,
    setError,
    addTable,
    toggleStatus,
    toggleDelivery,
    saveEditedTableName,
    actionLoading,
  };
};

export default useTable;
