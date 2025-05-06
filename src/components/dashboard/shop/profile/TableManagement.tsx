import React, { useEffect, useState } from "react";
import { spacesService } from "../../../../Services/spaces.service";

interface Table {
  id: string;
  name: string;
  status: boolean;
  delivery: boolean;
}

interface TableManagementProps {
  shopId: string;
}

const TableManagement: React.FC<TableManagementProps> = ({ shopId }) => {
  const [tables, setTables] = useState<Table[]>([]);
  const [newTableName, setNewTableName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [actionLoading, setActionLoading] = useState<string | null>(null); // Para acciones específicas

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
      console.log("Respuesta completa:", response); // Depuración
      
      // Manejar diferentes formatos de respuesta
      let tablesData = response;
      if (response && response.data) {
        tablesData = response.data;
      }

      if (!Array.isArray(tablesData)) {
        throw new Error("La respuesta no es un array de mesas");
      }

      // Validar cada mesa
      const validTables = tablesData.map(table => ({
        id: table.id?.toString() || Math.random().toString(36).substr(2, 9),
        name: table.name || "Mesa sin nombre",
        status: typeof table.status === 'boolean' ? table.status : true,
        delivery: typeof table.delivery === 'boolean' ? table.delivery : false
      }));

      setTables(validTables);
    } catch (err: any) {
      console.error("Error al obtener mesas:", err);
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
      
      // Validar respuesta de creación
      if (!created || !created.id) {
        throw new Error("La mesa creada no tiene un ID válido");
      }

      setTables(prev => [...prev, {
        id: created.id,
        name: created.name || newTableName.trim(),
        status: created.status ?? true,
        delivery: created.delivery ?? false
      }]);
      
      setNewTableName('');
    } catch (err: any) {
      console.error("Error al agregar mesa:", err);
      setError(err.message || "Error al crear la mesa");
    } finally {
      setActionLoading(null);
    }
  };

  const toggleStatus = async (table: Table) => {
    if (!table?.id) {
      console.error("No se puede actualizar mesa sin ID", table);
      return;
    }

    setActionLoading(`status-${table.id}`);
    try {
      const updatedStatus = !table.status;
      
      // Optimistic update
      setTables(prev => prev.map(t => 
        t.id === table.id ? {...t, status: updatedStatus} : t
      ));

      const updated = await spacesService.UpdateSpace(shopId, table.id, {
        status: updatedStatus
      });

      // Validar respuesta
      if (!updated || updated.id !== table.id) {
        throw new Error("Respuesta de actualización inválida");
      }

      // Actualizar con datos reales del servidor
      setTables(prev => prev.map(t => 
        t.id === table.id ? {
          ...t,
          status: typeof updated.status === 'boolean' ? updated.status : updatedStatus,
          name: updated.name || t.name,
          delivery: typeof updated.delivery === 'boolean' ? updated.delivery : t.delivery
        } : t
      ));

    } catch (err: any) {
      console.error("Error al actualizar estado:", err);
      setError(err.message || "Error al actualizar el estado");
      
      // Revertir cambios si falla
      setTables(prev => prev.map(t => 
        t.id === table.id ? {...t, status: table.status} : t
      ));
    } finally {
      setActionLoading(null);
    }
  };

  const toggleDelivery = async (table: Table) => {
    if (!table?.id) {
      console.error("No se puede actualizar mesa sin ID", table);
      return;
    }

    setActionLoading(`delivery-${table.id}`);
    try {
      const updatedDelivery = !table.delivery;
      
      // Optimistic update
      setTables(prev => prev.map(t => 
        t.id === table.id ? {...t, delivery: updatedDelivery} : t
      ));

      const updated = await spacesService.UpdateSpace(shopId, table.id, {
        delivery: updatedDelivery
      });

      // Validar respuesta
      if (!updated || updated.id !== table.id) {
        throw new Error("Respuesta de actualización inválida");
      }

      // Actualizar con datos reales del servidor
      setTables(prev => prev.map(t => 
        t.id === table.id ? {
          ...t,
          delivery: typeof updated.delivery === 'boolean' ? updated.delivery : updatedDelivery,
          name: updated.name || t.name,
          status: typeof updated.status === 'boolean' ? updated.status : t.status
        } : t
      ));

    } catch (err: any) {
      console.error("Error al actualizar domicilio:", err);
      setError(err.message || "Error al actualizar domicilio");
      
      // Revertir cambios si falla
      setTables(prev => prev.map(t => 
        t.id === table.id ? {...t, delivery: table.delivery} : t
      ));
    } finally {
      setActionLoading(null);
    }
  };

  if (!shopId) {
    return (
      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="text-red-500">Error: No se ha proporcionado un ID de tienda válido</div>
      </div>
    );
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-md space-y-6">
      <h2 className="text-xl font-bold text-gray-800">Gestión de Mesas</h2>

      {error && (
        <div className="p-3 bg-red-100 text-red-700 rounded-md mb-4">
          {error}
          <button 
            onClick={() => setError(null)} 
            className="float-right font-bold"
          >
            ×
          </button>
        </div>
      )}

      <form onSubmit={addTable} className="flex space-x-2">
        <input
          value={newTableName}
          onChange={(e) => setNewTableName(e.target.value)}
          placeholder="Nombre de la mesa"
          className="flex-grow px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
          disabled={!!actionLoading}
        />
        <button
          type="submit"
          className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 disabled:opacity-50"
          disabled={!!actionLoading}
        >
          {actionLoading === 'add' ? (
            <span className="flex items-center">
              <span className="animate-spin mr-2">↻</span> Agregando...
            </span>
          ) : 'Agregar Mesa'}
        </button>
      </form>

      {isLoading && tables.length === 0 ? (
        <div className="text-center py-8">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-2 text-gray-600">Cargando mesas...</p>
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {tables.map((table) => (
            <div
              key={`table-${table.id}`}
              className="bg-gray-50 rounded-lg shadow p-4 hover:shadow-md transition-all"
            >
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-lg font-semibold text-gray-800">{table.name}</h3>
                <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                  table.status ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                }`}>
                  {table.status ? 'Activa' : 'Inactiva'}
                </span>
              </div>
              <div className="flex flex-wrap gap-2 mt-4">
                <button
                  onClick={() => toggleStatus(table)}
                  className={`flex-1 px-3 py-1 text-sm rounded-md ${
                    table.status ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'
                  }`}
                  disabled={actionLoading === `status-${table.id}` || !!actionLoading}
                >
                  {actionLoading === `status-${table.id}` ? (
                    <span className="flex items-center justify-center">
                      <span className="animate-spin mr-1">↻</span>
                      {table.status ? 'Desactivando...' : 'Activando...'}
                    </span>
                  ) : table.status ? 'Desactivar' : 'Activar'}
                </button>
                <button
                  onClick={() => toggleDelivery(table)}
                  className={`flex-1 px-3 py-1 text-sm rounded-md ${
                    table.delivery ? 'bg-blue-500 text-white hover:bg-blue-600' : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
                  }`}
                  disabled={actionLoading === `delivery-${table.id}` || !!actionLoading}
                >
                  {actionLoading === `delivery-${table.id}` ? (
                    <span className="flex items-center justify-center">
                      <span className="animate-spin mr-1">↻</span>
                      {table.delivery ? 'Quitando...' : 'Estableciendo...'}
                    </span>
                  ) : table.delivery ? 'Domicilio' : 'Establecer Domicilio'}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {tables.length === 0 && !isLoading && !error && (
        <div className="text-center py-8 text-gray-500">
          No hay mesas registradas aún
        </div>
      )}
    </div>
  );
};

export default TableManagement;