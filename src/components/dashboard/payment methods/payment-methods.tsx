import type React from "react"
import { useState } from "react"
import { Plus, Edit2, Trash2, Check, CreditCard } from "lucide-react"
import type PaymentMethod from "../../../interface/paymentMethod"
import Sidebar from "../Sidebar"

export function PaymentMethods() {
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([
    {
      id: 1,
      entidad: "Banco A",
      name_account: "Cuenta Principal",
      type_account: "Ahorros",
      nit_cc: "123456789",
      account: "1234567890",
      link_payment: "https://pago.com/1",
      status: true,
    },
    {
      id: 2,
      entidad: "Banco B",
      name_account: "Cuenta Secundaria",
      type_account: "Corriente",
      nit_cc: "987654321",
      account: "0987654321",
      link_payment: "https://pago.com/2",
      status: false,
    },
  ])
  const [editingMethod, setEditingMethod] = useState<PaymentMethod | null>(null)
  const [formData, setFormData] = useState({
    name_account: "",
    entidad: "",
    type_account: "",
    nit_cc: "",
    account: "",
    link_payment: "",
  })
  const [imageSelected, setImageSelected] = useState<string | null>(null)
  const [formError, setFormError] = useState("")

  const institutions = ["Banco A", "Banco B", "Banco C"]
  const types = ["Ahorros", "Corriente"]

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setImageSelected(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const validateForm = () => {
    if (!formData.account && !formData.link_payment && !imageSelected) {
      setFormError("Debes proporcionar al menos uno de los siguientes: Número de Cuenta, Link de Pago o Código QR.")
      return false
    }
    setFormError("")
    return true
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!validateForm()) return

    if (editingMethod) {
      setPaymentMethods(
        paymentMethods.map((method) => (method.id === editingMethod.id ? { ...method, ...formData } : method)),
      )
      setEditingMethod(null)
    } else {
      const newMethod: PaymentMethod = {
        id: Date.now(),
        ...formData,
        status: true,
      }
      setPaymentMethods([...paymentMethods, newMethod])
    }

    setFormData({
      name_account: "",
      entidad: "",
      type_account: "",
      nit_cc: "",
      account: "",
      link_payment: "",
    })
    setImageSelected(null)
  }

  const toggleActive = (method: PaymentMethod) => {
    setPaymentMethods(paymentMethods.map((m) => (m.id === method.id ? { ...m, status: !m.status } : m)))
  }

  const editPaymentMethod = (method: PaymentMethod) => {
    setEditingMethod(method)
    setFormData({
      name_account: method.name_account,
      entidad: method.entidad,
      type_account: method.type_account,
      nit_cc: method.nit_cc,
      account: method.account || "",
      link_payment: method.link_payment || "",
    })
    setImageSelected(method.qr_code || null)
  }

  const deletePaymentMethod = (id: number) => {
    setPaymentMethods(paymentMethods.filter((m) => m.id !== id))
  }

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <Sidebar />
      <div className="flex-1  p-8 bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl shadow-lg">
        <h2 className="text-3xl font-semibold mb-8 text-center text-gray-800">Medios de Pago</h2>

        <form onSubmit={handleSubmit} className="space-y-6 mb-8">
          {formError && (
            <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 mb-6" role="alert">
              <p>{formError}</p>
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label htmlFor="name_account" className="block text-sm font-medium text-gray-700 mb-1">
                Nombre cuenta
              </label>
              <input
                id="name_account"
                name="name_account"
                type="text"
                value={formData.name_account}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#ff204e] focus:border-[#ff204e]"
                required
              />
            </div>
            <div>
              <label htmlFor="entidad" className="block text-sm font-medium text-gray-700 mb-1">
                Entidad
              </label>
              <select
                id="entidad"
                name="entidad"
                value={formData.entidad}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#ff204e] focus:border-[#ff204e]"
                required
              >
                <option value="">Seleccione una entidad</option>
                {institutions.map((institution) => (
                  <option key={institution} value={institution}>
                    {institution}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label htmlFor="type_account" className="block text-sm font-medium text-gray-700 mb-1">
                Tipo de Cuenta
              </label>
              <select
                id="type_account"
                name="type_account"
                value={formData.type_account}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#ff204e] focus:border-[#ff204e]"
                required
              >
                <option value="">Seleccione un tipo de cuenta</option>
                {types.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="nit_cc" className="block text-sm font-medium text-gray-700 mb-1">
                NIT/CC
              </label>
              <input
                id="nit_cc"
                name="nit_cc"
                type="text"
                value={formData.nit_cc}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#ff204e] focus:border-[#ff204e]"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label htmlFor="account" className="block text-sm font-medium text-gray-700 mb-1">
                Número de Cuenta
              </label>
              <input
                id="account"
                name="account"
                type="text"
                value={formData.account}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#ff204e] focus:border-[#ff204e]"
              />
            </div>
            <div>
              <label htmlFor="link_payment" className="block text-sm font-medium text-gray-700 mb-1">
                Link de Pago
              </label>
              <input
                id="link_payment"
                name="link_payment"
                type="url"
                value={formData.link_payment}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#ff204e] focus:border-[#ff204e]"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">QR Code</label>
            <div className="flex items-center">
              <span className="inline-block h-36 w-36 overflow-hidden bg-gray-100 rounded-md">
                {imageSelected ? (
                  <img src={imageSelected || "/placeholder.svg"} alt="QR Code" className="h-full w-full object-cover" />
                ) : (
                  <div className="h-full w-full flex items-center justify-center text-gray-400">
                    <CreditCard size={48} />
                  </div>
                )}
              </span>
              <label
                htmlFor="qr_code"
                className="ml-5 bg-white py-2 px-3 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-[#ff204e] cursor-pointer"
              >
                <span>Subir QR</span>
                <input id="qr_code" type="file" onChange={handleFileChange} className="sr-only" accept="image/*" />
              </label>
            </div>
          </div>

          <div className="flex justify-center">
            <button
              type="submit"
              className="px-6 py-3 bg-[#ff204e] text-white rounded-lg hover:bg-[#ff3b60] transition-colors duration-300 flex items-center justify-center shadow-sm"
            >
              <Plus size={20} className="mr-2" />
              {editingMethod ? "Actualizar" : "Guardar"}
            </button>
          </div>
        </form>

        <div className="mt-12">
          <h3 className="text-2xl font-semibold mb-6 text-gray-800">Lista de Medios de Pago</h3>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Entidad
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Nombre de la Cuenta
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Tipo de Cuenta
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    NIT/CC
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Acciones
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {paymentMethods.map((method) => (
                  <tr key={method.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{method.entidad}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{method.name_account}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{method.type_account}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{method.nit_cc}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button onClick={() => toggleActive(method)} className="text-gray-600 hover:text-[#ff204e] mr-2">
                        <Check size={20} className={method.status ? "text-green-500" : "text-gray-400"} />
                      </button>
                      <button
                        onClick={() => editPaymentMethod(method)}
                        className="text-gray-600 hover:text-[#ff204e] mr-2"
                      >
                        <Edit2 size={20} />
                      </button>
                      <button onClick={() => deletePaymentMethod(method.id)} className="text-gray-600 hover:text-red-600">
                        <Trash2 size={20} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PaymentMethods

