import type React from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"

interface PaginatorProps {
  currentPage: number
  totalItems: number
  itemsPerPage: number
  onPageChange: (page: number) => void
  onItemsPerPageChange: (itemsPerPage: number) => void
}

const Paginator: React.FC<PaginatorProps> = ({
  currentPage,
  totalItems,
  itemsPerPage,
  onPageChange,
  onItemsPerPageChange,
}) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage)

  if (totalPages <= 1) return null

  return (
    <div className="flex flex-col lg:flex-row lg:justify-between items-center w-full mt-8 gap-6 p-6 bg-white rounded-2xl shadow-lg border border-gray-300">
      {/* Items per page selector */}
      <div className="flex items-center space-x-3 bg-white rounded-xl p-4 shadow-md border border-gray-300">
        <label className="text-gray-700 text-sm font-medium">Mostrar:</label>
        <select
          value={itemsPerPage}
          onChange={(e) => onItemsPerPageChange(Number(e.target.value))}
          className="border-2 border-gray-300 rounded-lg px-4 py-2 text-sm bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-rose-500 transition-all duration-200 cursor-pointer hover:border-rose-400"
        >
          {[4, 8, 12, 16].map((value) => (
            <option key={value} value={value}>
              {value}
            </option>
          ))}
        </select>
        <span className="text-gray-700 text-sm font-medium">productos por página</span>
      </div>

      {/* Pagination controls */}
      <div className="flex items-center space-x-4">
        {/* Previous button */}
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="group flex items-center justify-center h-12 w-12 rounded-xl bg-gradient-to-r from-rose-500 to-purple-600 hover:from-rose-600 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none disabled:shadow-md"
          aria-label="Página anterior"
        >
          <ChevronLeft className="h-5 w-5 group-hover:scale-110 transition-transform duration-200" />
        </button>

        {/* Page info */}
        <div className="flex items-center px-6 py-3 bg-white rounded-xl shadow-md border border-gray-300">
          <span className="text-sm font-medium text-gray-600">
            Página{" "}
            <span className="inline-flex items-center justify-center min-w-[2rem] h-8 px-3 mx-1 text-white bg-gradient-to-r from-rose-500 to-purple-600 rounded-lg font-bold text-sm shadow-md">
              {currentPage}
            </span>{" "}
            de <span className="font-bold text-gray-800">{totalPages}</span>
          </span>
        </div>

        {/* Next button */}
        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="group flex items-center justify-center h-12 w-12 rounded-xl bg-gradient-to-r from-rose-500 to-purple-600 hover:from-rose-600 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none disabled:shadow-md"
          aria-label="Página siguiente"
        >
          <ChevronRight className="h-5 w-5 group-hover:scale-110 transition-transform duration-200" />
        </button>
      </div>

      {/* Progress bar */}
      <div className="w-full lg:w-auto lg:min-w-[200px] mt-4 lg:mt-0">
        <div className="flex items-center space-x-3">
          <span className="text-xs font-medium text-gray-600 whitespace-nowrap">Progreso</span>
          <div className="flex-1 bg-gray-200 rounded-full h-2 overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-rose-500 to-purple-600 rounded-full transition-all duration-500 ease-out"
              style={{ width: `${(currentPage / totalPages) * 100}%` }}
            />
          </div>
          <span className="text-xs font-medium text-rose-600 whitespace-nowrap">
            {Math.round((currentPage / totalPages) * 100)}%
          </span>
        </div>
      </div>
    </div>
  )
}

export default Paginator
