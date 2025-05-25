import { useState } from "react"
import { userService } from "../../Services/user.Service"

interface FormOnsiteState {
  phoneNumber: string
  name: string
  birthDate: string
}

interface UseFormOnsiteProps {
  onUserFound: (userId: number) => void
}

export const useFormOnsite = ({ onUserFound }: UseFormOnsiteProps) => {
  const [clientForm, setClientForm] = useState<FormOnsiteState>({ 
    phoneNumber: "", 
    name: "", 
    birthDate: "" 
  })
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

  return {
    // State
    clientForm,
    userId,
    showRegisterButton,
    alertMessage,
    alertType,
    loading,
    
    // Handlers
    handleInputChange,
    resetForm,
    searchClient,
    registerUser
  }
}