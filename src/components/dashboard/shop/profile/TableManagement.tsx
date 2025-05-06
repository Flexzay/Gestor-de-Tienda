import React from "react";
import useTable from "../../../../hooks/bashboard/useTable";
import {TableManagementProps} from "../../../../interface/table";


const TableManagement: React.FC<TableManagementProps> = ({ shopId }) => {
  const {
    tables,
    newTableName,
    isLoading,
    error,
    actionLoading,
    editingTableId,
    editedTableName,
    setNewTableName,
    setEditedTableName,
    setEditingTableId,
    addTable,
    toggleStatus,
    toggleDelivery,
    saveEditedTableName,
    setError,
  } = useTable(shopId);

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
          <button onClick={() => setError(null)} className="float-right font-bold">×</button>
        </div>
      )}

      <form onSubmit={addTable} className="flex flex-col sm:flex-row gap-2">
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
            <span className="flex items-center"><span className="animate-spin mr-2">↻</span> Agregando...</span>
          ) : 'Agregar Mesa'}
        </button>
      </form>

      {isLoading && tables.length === 0 ? (
        <div className="text-center py-8">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-2 text-gray-600">Cargando mesas...</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {tables.map((table) => (
            <div key={`table-${table.id}`} className="bg-gray-50 rounded-lg shadow p-4 hover:shadow-md transition-all">
              <div className="flex justify-between items-center mb-2">
                {editingTableId === table.id ? (
                  <div className="flex flex-col sm:flex-row w-full gap-2">
                    <input
                      value={editedTableName}
                      onChange={(e) => setEditedTableName(e.target.value)}
                      className="flex-grow px-2 py-1 border border-gray-300 rounded"
                      autoFocus
                    />
                    <div className="flex flex-wrap gap-2">
                      <button
                        onClick={() => saveEditedTableName(table)}
                        className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700 text-sm"
                        disabled={!!actionLoading}
                      >
                        Guardar
                      </button>
                      <button
                        onClick={() => {
                          setEditingTableId(null);
                          setEditedTableName('');
                        }}
                        className="px-3 py-1 text-gray-500 hover:text-gray-800 text-sm"
                      >
                        Cancelar
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="flex justify-between w-full items-center">
                    <h3 className="text-lg font-semibold text-gray-800 truncate">{table.name}</h3>
                    <button
                      onClick={() => {
                        setEditingTableId(table.id);
                        setEditedTableName(table.name);
                      }}
                      className="text-blue-600 text-sm hover:underline"
                      disabled={!!actionLoading}
                    >
                      Editar
                    </button>
                  </div>
                )}
              </div>

              <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                table.status ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
              }`}>
                {table.status ? 'Activa' : 'Inactiva'}
              </span>

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
        <div className="text-center py-8 text-gray-500">No hay mesas registradas aún</div>
      )}
    </div>
  );
};

export default TableManagement;
