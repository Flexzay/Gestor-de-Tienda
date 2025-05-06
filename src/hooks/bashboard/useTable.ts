import { useEffect, useState } from "react";
import { spacesService } from "../../Services/spaces.service";
import {Table} from "../../interface/table";

export const useTable = (shopId: string) => {
  const [tables, setTables] = useState<Table[]>([]);
  const [newTableName, setNewTableName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [actionLoading, setActionLoading] = useState<string | null>(null);
  const [editingTableId, setEditingTableId] = useState<string | null>(null);
  const [editedTableName, setEditedTableName] = useState<string>('');

  useEffect(() => {
    if (!shopId) {
      setError("No se ha proporcionado un ID de tienda válido");
      return;
    }
    getSpaces();
  }, [shopId]);

  const getSpaces = async () => {
    try {
      setIsLoading(true);
      setError(null);

      const response = await spacesService.GetSpaces(shopId);
      let tablesData = response?.data || response || [];

      if (!Array.isArray(tablesData)) throw new Error("La respuesta no es un array de mesas");

      const validTables = tablesData.map(table => ({
        id: table.id?.toString() || Math.random().toString(36).substr(2, 9),
        name: table.name || "Mesa sin nombre",
        status: typeof table.status === 'boolean' ? table.status : true,
        delivery: typeof table.delivery === 'boolean' ? table.delivery : false
      }));

      setTables(validTables);
    } catch (err: any) {
      setError(err.message || "Error al cargar las mesas");
    } finally {
      setIsLoading(false);
    }
  };

  const addTable = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTableName.trim()) {
      setError("El nombre de la mesa no puede estar vacío");
      return;
    }
    setActionLoading('add');
    try {
      const newTable = {
        name: newTableName.trim(),
        status: true,
        delivery: false
      };
      const created = await spacesService.CreateSpace(shopId, newTable);
      setTables(prev => [...prev, {
        id: created.id,
        name: created.name || newTableName.trim(),
        status: created.status ?? true,
        delivery: created.delivery ?? false
      }]);
      setNewTableName('');
    } catch (err: any) {
      setError(err.message || "Error al crear la mesa");
    } finally {
      setActionLoading(null);
    }
  };

  const toggleStatus = async (table: Table) => {
    if (!table?.id) return;
    setActionLoading(`status-${table.id}`);
    try {
      const updatedStatus = !table.status;
      setTables(prev => prev.map(t => t.id === table.id ? { ...t, status: updatedStatus } : t));
      const updated = await spacesService.UpdateSpace(shopId, table.id, { status: updatedStatus });
      setTables(prev => prev.map(t => t.id === table.id ? {
        ...t,
        status: typeof updated.status === 'boolean' ? updated.status : updatedStatus,
        name: updated.name || t.name,
        delivery: typeof updated.delivery === 'boolean' ? updated.delivery : t.delivery
      } : t));
    } catch (err: any) {
      setTables(prev => prev.map(t => t.id === table.id ? { ...t, status: table.status } : t));
      setError(err.message || "Error al actualizar el estado");
    } finally {
      setActionLoading(null);
    }
  };

  const toggleDelivery = async (table: Table) => {
    if (!table?.id) return;
    setActionLoading(`delivery-${table.id}`);
    try {
      const updatedDelivery = !table.delivery;
      setTables(prev => prev.map(t => t.id === table.id ? { ...t, delivery: updatedDelivery } : t));
      const updated = await spacesService.UpdateSpace(shopId, table.id, { delivery: updatedDelivery });
      setTables(prev => prev.map(t => t.id === table.id ? {
        ...t,
        delivery: typeof updated.delivery === 'boolean' ? updated.delivery : updatedDelivery,
        name: updated.name || t.name,
        status: typeof updated.status === 'boolean' ? updated.status : t.status
      } : t));
    } catch (err: any) {
      setTables(prev => prev.map(t => t.id === table.id ? { ...t, delivery: table.delivery } : t));
      setError(err.message || "Error al actualizar domicilio");
    } finally {
      setActionLoading(null);
    }
  };

  const saveEditedTableName = async (table: Table) => {
    if (!editedTableName.trim()) return;
    setActionLoading(`edit-${table.id}`);
    try {
      const updated = await spacesService.UpdateSpace(shopId, table.id, { name: editedTableName.trim() });
      setTables(prev => prev.map(t => t.id === table.id ? {
        ...t,
        name: updated.name || editedTableName.trim()
      } : t));
      setEditingTableId(null);
      setEditedTableName('');
    } catch (err: any) {
      setError(err.message || "Error al editar nombre de la mesa");
    } finally {
      setActionLoading(null);
    }
  };

  return {
    tables,
    newTableName,
    setNewTableName,
    isLoading,
    error,
    setError,
    actionLoading,
    addTable,
    toggleStatus,
    toggleDelivery,
    editingTableId,
    setEditingTableId,
    editedTableName,
    setEditedTableName,
    saveEditedTableName
  };
};

export default useTable;