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
    const [isLoader, setIsLoader] = useState(false);
  
    useEffect(() => {
      if (shopId) getSpaces();
    }, [shopId]);
  
    const getSpaces = async () => {
      try {
        const res = await spacesService.GetSpaces(shopId);
        setTables(res);
      } catch (error) {
        alert("Error al obtener las mesas");
        console.error(error);
      }
    };
  
    const addTable = async (e: React.FormEvent) => {
      e.preventDefault();
      if (!newTableName.trim()) return;
   
      setIsLoader(true);
      try {
        const newSpace = {
          name: newTableName.trim(),
          status: true,
          delivery: false,
        };
        const created = await spacesService.CreateSpace(shopId, newSpace);
        setTables(prev => [...prev, created]);
        setNewTableName('');
      } catch (err) {
        alert("Error al agregar la mesa");
      } finally {
        setIsLoader(false);
      }
    };
  
    const toggleDelivery = async (table: Table) => {
      setIsLoader(true);
      try {
        const updated = await spacesService.UpdateSpace(shopId, table.id, {
          delivery: !table.delivery,
        });
        setTables(prev =>
          prev.map(t => t.id === table.id ? { ...t, delivery: updated.delivery } : t)
        );
      } catch (err) {
        alert("Error al actualizar el estado de domicilio");
      } finally {
        setIsLoader(false);
      }
    };
  
    const toggleStatus = async (table: Table) => {
      setIsLoader(true);
      try {
        const updated = await spacesService.UpdateSpace(shopId, table.id, {
          status: !table.status,
        });
        setTables(prev =>
          prev.map(t => t.id === table.id ? { ...t, status: updated.status } : t)
        );
      } catch (err) {
        alert("Error al actualizar el estado de la mesa");
      } finally {
        setIsLoader(false);
      }
    };
  
    return (
      <div className="bg-white p-6 rounded-lg shadow-md space-y-6">
        <h2 className="text-xl font-bold text-gray-800">Gestión de Mesas</h2>
  
        <form onSubmit={addTable} className="flex space-x-2">
          <input
            value={newTableName}
            onChange={(e) => setNewTableName(e.target.value)}
            placeholder="Nombre de la mesa"
            className="flex-grow px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <button
            type="submit"
            className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700"
          >
            Agregar Mesa
          </button>
        </form>
  
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {tables.map((table) => (
            <div
              key={table.id}
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
                >
                  {table.status ? 'Desactivar' : 'Activar'}
                </button>
                <button
                  onClick={() => toggleDelivery(table)}
                  className={`flex-1 px-3 py-1 text-sm rounded-md ${
                    table.delivery
                      ? 'bg-blue-500 text-white hover:bg-blue-600'
                      : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
                  }`}
                >
                  {table.delivery ? 'Domicilio' : 'Establecer Domicilio'}
                </button>
              </div>
            </div>
          ))}
        </div>
  
        {isLoader && (
          <div className="text-center py-4 text-gray-500">Cargando...</div>
        )}
      </div>
    );
  };
  
  export default TableManagement;
  