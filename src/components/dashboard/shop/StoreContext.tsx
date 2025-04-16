import { createContext, useContext, useState, useEffect } from "react";
import { shopService } from "../../../Services/shop.service";

const StoreContext = createContext(null);

export function StoreProvider({ children }) {
  const [storeData, setStoreData] = useState({
    ownDelivery: false,
    deliveryFee: 0,
    minOrderValue: 0,
  });

  // Obtener datos reales desde el backend al montar
  useEffect(() => {
    const shop = shopService.getShopData();
    if (shop) {
      setStoreData({
        ownDelivery: shop.ownDelivery || false,
        deliveryFee: shop.deliveryFee || 0,
        minOrderValue: shop.minOrderValue || 0,
      });
    }
  }, []);

  // Actualiza estado y guarda en backend
  const updateStoreData = async (key, value) => {
    const newData = { ...storeData, [key]: value };
    setStoreData(newData);

    try {
      await shopService.updateShop({ [key]: value });
      // Actualiza el localStorage para mantener sincronizado
      const local = shopService.getShopData();
      if (local) {
        local[key] = value;
        localStorage.setItem("shop_data", JSON.stringify(local));
      }
    } catch (error) {
      console.error("Error actualizando tienda:", error);
      alert("Ocurrió un error al guardar los datos.");
    }
  };

  return (
    <StoreContext.Provider value={{ storeData, updateStoreData }}>
      {children}
    </StoreContext.Provider>
  );
}

export const useStore = () => useContext(StoreContext);
