import { useState, useEffect } from "react";
import { shopService } from "../../Services/shop.service";

export function useShopStatus() {
  const [isShopOpen, setIsShopOpen] = useState<boolean>(true);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    
    const shopData = shopService.getShopData();
    if (shopData?.open !== undefined) {
      setIsShopOpen(shopData.open);
    }
  }, []);

  const toggleShopStatus = async () => {
    try {
      setLoading(true);
      const newStatus = !isShopOpen;
      await shopService.closeAndOpenStore(newStatus);
      setIsShopOpen(newStatus);

     
      const local = shopService.getShopData();
      if (local) {
        local.open = newStatus;
        localStorage.setItem("shop_data", JSON.stringify(local));
      }
    } catch (error) {
      console.error("Error al cambiar estado de la tienda:", error);
      alert("Ocurrió un error al actualizar el estado de la tienda.");
    } finally {
      setLoading(false);
    }
  };

  return { isShopOpen, toggleShopStatus, loading };
}
