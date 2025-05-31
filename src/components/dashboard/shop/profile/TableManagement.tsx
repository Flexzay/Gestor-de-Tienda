import type React from "react"
import useTable from "../../../../hooks/bashboard/useTable"
import type { TableManagementProps } from "../../../../interface/table"
import { AlertCircle, Check, Edit, Loader2, Plus, X } from "lucide-react"

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
  } = useTable(shopId)

  if (!shopId) {
    return (
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="p-6">
          <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-md">
            <div className="flex items-center">
              <AlertCircle className="h-5 w-5 text-red-500 mr-2" />
              <p className="text-red-700 font-medium">Error</p>
            </div>
            <p className="text-red-700 mt-1">No se ha proporcionado un ID de tienda válido</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="p-6 border-b">
        <h2 className="text-xl font-bold text-gray-800">Gestión de Mesas</h2>
        <p className="text-gray-500 mt-1">Administra las mesas de tu establecimiento</p>
      </div>

      <div className="p-6 space-y-6">
        {error && (
          <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-md mb-4">
            <div className="flex justify-between items-start">
              <div className="flex items-center">
                <AlertCircle className="h-5 w-5 text-red-500 mr-2" />
                <p className="text-red-700 font-medium">Error</p>
              </div>
              <button onClick={() => setError(null)} className="text-gray-500 hover:text-gray-700 transition-colors">
                <X className="h-4 w-4" />
              </button>
            </div>
            <p className="text-red-700 mt-1">{error}</p>
          </div>
        )}

        <form onSubmit={addTable} className="flex flex-col sm:flex-row gap-2">
          <input
            value={newTableName}
            onChange={(e) => setNewTableName(e.target.value)}
            placeholder="Nombre de la mesa"
            className="flex-grow px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
            required
            disabled={!!actionLoading}
          />
          <button
            type="submit"
            disabled={!!actionLoading}
            className="px-4 py-2 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
          >
            {actionLoading === "add" ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                <span>Agregando...</span>
              </>
            ) : (
              <>
                <Plus className="mr-2 h-4 w-4" />
                <span>Agregar Mesa</span>
              </>
            )}
          </button>
        </form>

        <div className="border-t border-gray-200 my-6"></div>

        {isLoading && tables.length === 0 ? (
          <div className="space-y-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="border border-gray-200 rounded-lg p-4 animate-pulse">
                <div className="flex justify-between items-center">
                  <div className="h-5 bg-gray-200 rounded w-[200px]"></div>
                  <div className="h-5 bg-gray-200 rounded w-[100px]"></div>
                </div>
                <div className="flex justify-between mt-4">
                  <div className="h-10 bg-gray-200 rounded w-[48%]"></div>
                  <div className="h-10 bg-gray-200 rounded w-[48%]"></div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4">
            {tables.length === 0 && !isLoading && !error ? (
              <div className="text-center py-8">
                <div className="mx-auto bg-gray-100 rounded-full w-12 h-12 flex items-center justify-center mb-3">
                  <AlertCircle className="h-6 w-6 text-gray-500" />
                </div>
                <h3 className="text-lg font-medium text-gray-800">No hay mesas registradas</h3>
                <p className="text-gray-500 mt-1">Agrega una mesa para comenzar</p>
              </div>
            ) : (
              tables.map((table) => (
                <div key={`table-${table.id}`} className="border border-gray-200 rounded-lg overflow-hidden">
                  <div className="p-4 bg-gray-50">
                    {editingTableId === table.id ? (
                      <div className="flex flex-col sm:flex-row w-full gap-2">
                        <input
                          value={editedTableName}
                          onChange={(e) => setEditedTableName(e.target.value)}
                          className="flex-grow px-3 py-1.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          autoFocus
                        />
                        <div className="flex gap-2">
                          <button
                            onClick={() => saveEditedTableName(table)}
                            disabled={!!actionLoading}
                            className="px-3 py-1.5 bg-green-600 text-white font-medium rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 transition-colors disabled:opacity-50 flex items-center"
                          >
                            <Check className="h-4 w-4 mr-1" />
                            <span>Guardar</span>
                          </button>
                          <button
                            onClick={() => {
                              setEditingTableId(null)
                              setEditedTableName("")
                            }}
                            className="px-3 py-1.5 border border-gray-300 text-gray-700 font-medium rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500 transition-colors flex items-center"
                          >
                            <X className="h-4 w-4 mr-1" />
                            <span>Cancelar</span>
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div className="flex justify-between w-full items-center">
                        <div className="flex items-center gap-3 flex-wrap">
                          <h3 className="text-lg font-semibold text-gray-800 truncate">{table.name}</h3>
                          <span
                            className={`px-2.5 py-0.5 text-xs font-semibold rounded-full ${
                              table.status ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                            }`}
                          >
                            {table.status ? "Activa" : "Inactiva"}
                          </span>
                          {table.delivery && (
                            <span className="px-2.5 py-0.5 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
                              Domicilio
                            </span>
                          )}
                        </div>
                        <button
                          onClick={() => {
                            setEditingTableId(table.id)
                            setEditedTableName(table.name)
                          }}
                          className="p-1.5 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-full transition-colors"
                          disabled={!!actionLoading}
                          title="Editar nombre"
                        >
                          <Edit className="h-4 w-4" />
                        </button>
                      </div>
                    )}
                  </div>
                  <div className="p-4 flex flex-col sm:flex-row gap-4">
                    <div className="flex items-center justify-between w-full sm:w-auto sm:justify-start gap-3">
                      <span className="text-sm font-medium text-gray-700">Estado:</span>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          className="sr-only peer"
                          checked={table.status}
                          onChange={() => toggleStatus(table)}
                          disabled={actionLoading === `status-${table.id}` || !!actionLoading}
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                      </label>
                      <span className="text-sm text-gray-500">
                        {actionLoading === `status-${table.id}` ? (
                          <span className="flex items-center">
                            <Loader2 className="mr-1 h-3 w-3 animate-spin" />
                            {table.status ? "Desactivando..." : "Activando..."}
                          </span>
                        ) : table.status ? (
                          "Activa"
                        ) : (
                          "Inactiva"
                        )}
                      </span>
                    </div>
                    <div className="sm:hidden border-t border-gray-200 my-1"></div>
                    <div className="flex items-center justify-between w-full sm:w-auto sm:justify-start gap-3">
                      <span className="text-sm font-medium text-gray-700">Domicilio:</span>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          className="sr-only peer"
                          checked={table.delivery}
                          onChange={() => toggleDelivery(table)}
                          disabled={actionLoading === `delivery-${table.id}` || !!actionLoading}
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                      </label>
                      <span className="text-sm text-gray-500">
                        {actionLoading === `delivery-${table.id}` ? (
                          <span className="flex items-center">
                            <Loader2 className="mr-1 h-3 w-3 animate-spin" />
                            {table.delivery ? "Quitando..." : "Estableciendo..."}
                          </span>
                        ) : table.delivery ? (
                          "Habilitado"
                        ) : (
                          "Deshabilitado"
                        )}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  )
}

export default TableManagement
