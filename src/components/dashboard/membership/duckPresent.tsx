import { useEffect, useState } from "react";
import { CreditCard } from "lucide-react";
import { shopService } from "../../../Services/shop.service"; 

export function CreditosActuales() {
  const [creditos, setCreditos] = useState<number>(0); 

  useEffect(() => {
    const fetchBalance = async () => {
      const balance = await shopService.getBalance();
      setCreditos(balance ?? 0); 
    };

    fetchBalance();
    const interval = setInterval(fetchBalance, 30000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="rounded-lg bg-white p-6 shadow-md">
      <div className="flex items-center gap-3">
        <CreditCard className="h-6 w-6 text-amber-400" />
        <h2 className="text-xl font-semibold text-gray-800">Ducks Actuales</h2>
      </div>
      <div className="mt-4 flex items-baseline">
        <span className="text-4xl font-bold text-amber-400">
          {creditos.toLocaleString("de-DE")}
        </span>
        <span className="ml-2 text-gray-500">créditos disponibles</span>
      </div>
    </div>
  );
}
