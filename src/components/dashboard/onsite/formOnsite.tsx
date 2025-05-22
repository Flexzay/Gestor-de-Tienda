import type React from "react"
import { useState } from "react"
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

  const searchClient = async () => {
    if (!clientForm.phoneNumber.trim()) {
      setAlertMessage("Por favor ingrese un número telefónico")
      setAlertType("error")
      return
    }

    setLoading(true)
    setAlertMessage("")
    setAlertType(null)
    setShowRegisterButton(false)
    setUserId(null)

    try {
      const res = await userService.consultUser(clientForm.phoneNumber)
      if (res.status === 200 && res.data) {
        if (res.data.name) {
          setUserId(res.data.id)
          onUserFound(res.data.id)
          setClientForm({
            ...clientForm,
            name: res.data.name,
            birthDate: res.data.birth_date || "",
          })
          setAlertMessage("Cliente encontrado")
          setAlertType("success")
          setShowRegisterButton(false)
        } else if (res.data.id) {
          setShowRegisterButton(true)
          setUserId(res.data.id)
          onUserFound(res.data.id)
          setAlertMessage("Cliente encontrado pero requiere completar información")
          setAlertType("success")
        }
      } else {
        setAlertMessage("No se encontró ningún cliente con ese número")
        setAlertType("error")
        setShowRegisterButton(false)
        setUserId(null)
      }
    } catch (err) {
      console.error(err)
      setAlertMessage("Error al buscar cliente")
      setAlertType("error")
      setShowRegisterButton(false)
      setUserId(null)
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
      {/* Header */}
      <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
        <h2 className="text-xl font-bold text-gray-800">Buscar Cliente</h2>
        <p className="text-sm text-gray-600 mt-1">Busque un cliente por número telefónico o registre uno nuevo</p>
      </div>

      {/* Content */}
      <div className="p-6">
        <div className="space-y-6">
          {/* Phone Number Search */}
          <div className="space-y-2">
            <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700">
              Teléfono
            </label>
            <div className="flex">
              <div className="relative flex-grow">
                <input
                  id="phoneNumber"
                  name="phoneNumber"
                  type="tel"
                  value={clientForm.phoneNumber}
                  onChange={handleInputChange}
                  placeholder="Ingrese número telefónico"
                  className="w-full px-4 py-2 border border-gray-300 rounded-l-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
                />
              </div>
              <button
                type="button"
                onClick={searchClient}
                disabled={loading}
                className="flex items-center justify-center px-4 py-2 bg-blue-600 text-white rounded-r-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {loading ? <Loader className="h-4 w-4 animate-spin mr-2" /> : <Search className="h-4 w-4 mr-2" />}
                Buscar
              </button>
            </div>
            <p className="text-xs text-gray-500">Ingrese el número telefónico del cliente</p>
          </div>

          {/* Form Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Name */}
            <div className="space-y-2">
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                Nombre
              </label>
              <input
                id="name"
                name="name"
                type="text"
                value={clientForm.name}
                onChange={handleInputChange}
                placeholder="Nombre completo"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
              />
            </div>

            {/* Birth Date */}
            <div className="space-y-2">
              <label htmlFor="birthDate" className="block text-sm font-medium text-gray-700">
                Fecha de Nacimiento
              </label>
              <div className="relative">
                <input
                  id="birthDate"
                  name="birthDate"
                  type="date"
                  value={clientForm.birthDate}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
                />
                <Calendar className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
              </div>
            </div>
          </div>

          {/* Alert Message */}
          {alertMessage && (
            <div
              className={`p-4 rounded-md ${
                alertType === "error"
                  ? "bg-red-50 text-red-800 border border-red-200"
                  : "bg-green-50 text-green-800 border border-green-200"
              }`}
            >
              <p className="text-sm">{alertMessage}</p>
            </div>
          )}
        </div>
      </div>

      {/* Footer */}
      <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 flex justify-end">
        {showRegisterButton && (
          <button
            onClick={registerUser}
            disabled={loading}
            className="flex items-center justify-center w-full md:w-auto px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
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
