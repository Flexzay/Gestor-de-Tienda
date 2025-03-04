import { Link } from "react-router-dom"
import { ArrowLeft, Truck } from "lucide-react"
import { useProviders } from "../../hooks/bashboard/useProviders"
import { SearchBar } from "../../components/dashboard/SearchBar"
import { ProviderList } from "../../components/dashboard/ProviderList"
import { AddProviderForm } from "../../components/dashboard/AddProviderForm"

export function Providers() {
  const providerHook = useProviders()

  return (
    <div className="p-8 bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl shadow-lg">
       <Link
          to="/dashboard"
          className="flex items-center text-gray-600 hover:text-[#ff204e] transition-colors duration-300"
        >
          <ArrowLeft size={24} className="mr-2" />
          <span className="font-medium">Volver al Dashboard</span>
        </Link>

      <div className="flex items-center justify-between mb-8">
        <h2 className="text-3xl font-semibold text-gray-800 pt-6">Provedores</h2>
        <Truck size={24} className="text-[#ff204e]" />
      </div>

      <SearchBar {...providerHook} />
      <ProviderList {...providerHook} />
      <AddProviderForm {...providerHook} />
    </div>
  )
}
export default Providers
