import { createContext, useContext, useState } from "react";

const StoreContext = createContext(null);

export function StoreProvider({ children }) {
  const [storeData, setStoreData] = useState({
    ownDelivery: false,
    deliveryFee: 0,
    minOrderValue: 0,
    // Otros valores iniciales si es necesario
  });

  const updateStoreData = (key, value) => {
    setStoreData((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <StoreContext.Provider value={{ storeData, updateStoreData }}>
      {children}
    </StoreContext.Provider>
  );
}

export const useStore = () => useContext(StoreContext);
