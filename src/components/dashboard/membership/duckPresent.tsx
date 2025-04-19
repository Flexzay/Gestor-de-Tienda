"use client"

import { useEffect, useState } from "react"
import { CreditCard, TrendingUp, RefreshCw } from "lucide-react"
import { shopService } from "../../../Services/shop.service"

export function CreditosActuales() {
  const [creditos, setCreditos] = useState<number | null>(null)
  const [prevCreditos, setPrevCreditos] = useState<number | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [showAnimation, setShowAnimation] = useState(false)

  const fetchBalance = async () => {
    try {
      setIsRefreshing(true)
      const balance = await shopService.getBalance()

      // Guardamos el valor anterior para poder animar el cambio
      if (creditos !== null && balance !== creditos) {
        setPrevCreditos(creditos)
        setShowAnimation(true)

        // Quitamos la animación después de un tiempo
        setTimeout(() => setShowAnimation(false), 2000)
      }

      setCreditos(balance ?? 0)
    } catch (error) {
      console.error("Error al obtener el balance:", error)
    } finally {
      setIsLoading(false)
      setIsRefreshing(false)
    }
  }

  useEffect(() => {
    fetchBalance()
    const interval = setInterval(fetchBalance, 30000)
    return () => clearInterval(interval)
  }, [])

  // Función para formatear los créditos con separador de miles
  const formatCreditos = (value: number) => {
    return value.toLocaleString("es-CO")
  }

  // Calcular la diferencia para mostrar cuando hay cambios
  const creditosDiff = prevCreditos !== null && creditos !== null ? creditos - prevCreditos : 0

  return (
    <div className="rounded-lg bg-white p-6 shadow-lg border border-gray-100 transition-all duration-300 hover:shadow-xl">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-amber-100 rounded-full">
            <CreditCard className="h-6 w-6 text-amber-600" />
          </div>
          <h2 className="text-xl font-bold text-gray-800">Ducks Actuales</h2>
        </div>

        <button
          onClick={() => fetchBalance()}
          disabled={isRefreshing}
          className="p-2 rounded-full hover:bg-gray-100 transition-colors duration-200 relative"
          aria-label="Actualizar balance"
        >
          <RefreshCw className={`h-5 w-5 text-gray-500 ${isRefreshing ? "animate-spin" : ""}`} />
        </button>
      </div>

      {isLoading ? (
        <div className="mt-6 flex items-center justify-center h-16">
          <div className="w-8 h-8 border-t-2 border-b-2 border-amber-500 rounded-full animate-spin"></div>
        </div>
      ) : (
        <>
          <div className="mt-6 bg-gradient-to-r from-amber-50 to-amber-100 rounded-lg p-5 border border-amber-200">
            <div className="flex flex-col">
              <div className="flex items-baseline">
                <span
                  className={`text-4xl font-bold text-amber-600 tabular-nums ${showAnimation ? "animate-pulse" : ""}`}
                >
                  {creditos !== null ? formatCreditos(creditos) : "0"}
                </span>
                <span className="ml-2 text-amber-700">créditos</span>
              </div>

              {showAnimation && creditosDiff !== 0 && (
                <div className={`flex items-center mt-2 ${creditosDiff > 0 ? "text-green-600" : "text-red-600"}`}>
                  <TrendingUp className={`h-4 w-4 mr-1 ${creditosDiff < 0 ? "transform rotate-180" : ""}`} />
                  <span className="text-sm font-medium">
                    {creditosDiff > 0 ? "+" : ""}
                    {formatCreditos(creditosDiff)} créditos
                  </span>
                </div>
              )}
            </div>
          </div>

          <div className="mt-4 grid grid-cols-2 gap-3">
            <div className="bg-gray-50 rounded-md p-3 border border-gray-200">
              <div className="text-xs text-gray-500 mb-1">Última actualización</div>
              <div className="text-sm font-medium">
                {new Date().toLocaleTimeString("es-CO", { hour: "2-digit", minute: "2-digit" })}
              </div>
            </div>

            <div className="bg-gray-50 rounded-md p-3 border border-gray-200">
              <div className="text-xs text-gray-500 mb-1">Actualización automática</div>
              <div className="text-sm font-medium text-green-600">Activada</div>
            </div>
          </div>
        </>
      )}
    </div>
  )
}
