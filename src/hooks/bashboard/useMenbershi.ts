import { useEffect, useState } from "react"
import { membershipService } from "../../Services/membership.service"
import { shopService } from "../../Services/shop.service"
import { Compra } from "../../interface/membership"

export function useMembership() {
  const [creditos, setCreditos] = useState(0)
  const [creditosSeleccionados, setCreditosSeleccionados] = useState(50000)
  const [historialCompras, setHistorialCompras] = useState<Compra[]>([])
  const [isLoadingHistorial, setIsLoadingHistorial] = useState(true)

  const fetchInitialData = async () => {
    try {
      // Cargar balance inicial
      const balance = await shopService.getBalance()
      if (balance !== null) setCreditos(balance)
      
      // Cargar historial
      const response = await membershipService.getHistoryCharges()
      if (response.status === 200) {
        setHistorialCompras(response.data?.history || [])
      }
    } catch (error) {
      console.error("Error loading initial data:", error)
    } finally {
      setIsLoadingHistorial(false)
    }
  }

  const handleRecargar = async (comprobante: File | null) => {
    if (!comprobante) {
      alert("Debes subir un comprobante antes de recargar.")
      return
    }

    const formData = new FormData()
    formData.append("amount", creditosSeleccionados.toString())
    formData.append("receipt", comprobante)

    try {
      await membershipService.buyDucks(formData)
      alert("Recarga enviada. Será revisada por un administrador.")
      // Actualización optimista
      setCreditos(prev => prev + creditosSeleccionados)
      fetchInitialData() // Refrescar datos
    } catch (error) {
      alert("Error al procesar recarga. Verifica en el historial más tarde.")
    }
  }

  useEffect(() => {
    fetchInitialData()
  }, [])

  return {
    creditos,
    setCreditos,
    creditosSeleccionados,
    setCreditosSeleccionados,
    historialCompras,
    isLoadingHistorial,
    handleRecargar,
  }
}