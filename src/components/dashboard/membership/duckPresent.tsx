import { CreditCard } from "lucide-react"

interface CreditosActualesProps {
  creditos: number
}

export function CreditosActuales({ creditos }: CreditosActualesProps) {
  return (
    <div className="rounded-lg bg-white p-6 shadow-md">
      <div className="flex items-center gap-3">
        <CreditCard className="h-6 w-6 text-amber-400" />
        <h2 className="text-xl font-semibold text-gray-800">Ducks Actuales</h2>
      </div>
      <div className="mt-4 flex items-baseline">
        <span className="text-4xl font-bold text-amber-400">{creditos}</span>
        <span className="ml-2 text-gray-500">créditos disponibles</span>
      </div>
    </div>
  )
}

