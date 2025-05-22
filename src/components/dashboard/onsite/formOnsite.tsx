import React, { useState } from "react"
import { Search, UserPlus, Calendar, Loader } from "lucide-react"
import { userService } from "../../../Services/user.Service"

interface ClientSearchFormProps {
  onUserFound: (userId: number) => void
}

const ClientSearchForm = ({ onUserFound }: ClientSearchFormProps) => {
  const [clientForm, setClientForm] = useState({ phoneNumber: "", name: "", birthDate: "" })
  const [userId, setUserId] = useState<number | null>(null)
  const [showRegisterButton, setShowRegisterButton] = useState(false)
  const [alertMessage, setAlertMessage] = useState("")
  const [alertType, setAlertType] = useState<"error" | "success" | null>(null)
  const [loading, setLoading] = useState(false)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setClientForm((prev) => ({ ...prev, [name]: value }))
  }

  const resetForm = () => {
    setClientForm({ phoneNumber: "", name: "", birthDate: "" })
    setUserId(null)
    setShowRegisterButton(false)
    setAlertMessage("")
    setAlertType(null)
  }

  const searchClient = async () => {
    const phone = clientForm.phoneNumber.trim()

    if (!/^\d{10}$/.test(phone)) {
      setAlertMessage("Ingrese un número telefónico válido (10 dígitos)")
      setAlertType("error")
      return
    }

    setLoading(true)
    setAlertMessage("")
    setAlertType(null)
    setShowRegisterButton(false)
    setUserId(null)

    try {
      const res = await userService.consultUser(phone)
      if (res.status === 200 && res.data) {
        const user = res.data

        setUserId(user.id)
        onUserFound(user.id)

        setClientForm({
          phoneNumber: phone,
          name: user.name || "",
          birthDate: user.birth_date || "",
        })

        if (user.name) {
          setAlertMessage("Cliente encontrado")
          setAlertType("success")
        } else {
          setShowRegisterButton(true)
          setAlertMessage("Cliente encontrado pero requiere completar información")
          setAlertType("success")
        }
      } else {
        setAlertMessage("No se encontró ningún cliente con ese número")
        setAlertType("error")
      }
    } catch (err) {
      console.error(err)
      setAlertMessage("Error al buscar cliente")
      setAlertType("error")
    } finally {
      setLoading(false)
    }
  }

  const registerUser = async () => {
    if (!userId) return

    if (!clientForm.name.trim() || !clientForm.birthDate) {
      setAlertMessage("Nombre y fecha de nacimiento son requeridos")
      setAlertType("error")
      return
    }

    setLoading(true)
    try {
      await userService.registerUser(userId, {
        name: clientForm.name,
        birth_date: clientForm.birthDate,
      })
      setAlertMessage("Cliente registrado exitosamente")
      setAlertType("success")
      setShowRegisterButton(false)
    } catch (err) {
      console.error(err)
      setAlertMessage("Error al registrar cliente")
      setAlertType("error")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="w-full max-w-2xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
      <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
        <h2 className="text-xl font-bold text-gray-800">Buscar Cliente</h2>
        <p className="text-sm text-gray-600 mt-1">Busque un cliente por número telefónico o registre uno nuevo</p>
      </div>

      <div className="p-6 space-y-6">
        <div className="space-y-2">
          <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700">Teléfono</label>
          <div className="flex">
            <input
              id="phoneNumber"
              name="phoneNumber"
              type="tel"
              value={clientForm.phoneNumber}
              onChange={handleInputChange}
              placeholder="Ingrese número telefónico"
              className="flex-grow px-4 py-2 border border-gray-300 rounded-l-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
            />
            <button
              type="button"
              onClick={searchClient}
              disabled={loading}
              className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-r-md hover:bg-blue-700 transition-colors disabled:opacity-70"
            >
              {loading ? <Loader className="h-4 w-4 animate-spin mr-2" /> : <Search className="h-4 w-4 mr-2" />}
              Buscar
            </button>
          </div>
          <p className="text-xs text-gray-500">Ingrese el número telefónico del cliente</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">Nombre</label>
            <input
              id="name"
              name="name"
              type="text"
              value={clientForm.name}
              onChange={handleInputChange}
              placeholder="Nombre completo"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="birthDate" className="block text-sm font-medium text-gray-700">Fecha de Nacimiento</label>
            <div className="relative">
              <input
                id="birthDate"
                name="birthDate"
                type="date"
                value={clientForm.birthDate}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
              />
              <Calendar className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            </div>
          </div>
        </div>

        {alertMessage && (
          <div className={`p-4 rounded-md text-sm border ${alertType === "error" ? "bg-red-50 text-red-800 border-red-200" : "bg-green-50 text-green-800 border-green-200"}`}>
            {alertMessage}
          </div>
        )}
      </div>

      <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 flex justify-between">
        <button
          onClick={resetForm}
          className="text-sm text-gray-600 hover:underline"
        >
          Limpiar
        </button>

        {showRegisterButton && (
          <button
            onClick={registerUser}
            disabled={loading}
            className="flex items-center px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors disabled:opacity-70"
          >
            {loading ? <Loader className="h-4 w-4 mr-2 animate-spin" /> : <UserPlus className="h-4 w-4 mr-2" />}
            Registrar Cliente
          </button>
        )}
      </div>
    </div>
  )
}

export default ClientSearchForm
