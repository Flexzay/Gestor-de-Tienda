// StoreContext.tsx
import { createContext, useContext, useState } from "react";

interface StoreData {
  ownDelivery: boolean;
  deliveryFee: number;
  minOrderValue: number;
  // Agrega otros campos si es necesario
}

interface StoreContextType {
  storeData: StoreData;
  updateStoreData: (key: keyof StoreData, value: any) => void;
}

const StoreContext = createContext<StoreContextType | null>(null);

export function StoreProvider({ children }: { children: React.ReactNode }) {
  const [storeData, setStoreData] = useState<StoreData>(() => {
    // Intenta cargar del localStorage al inicializar
    const savedData = localStorage.getItem('storeData');
    return savedData ? JSON.parse(savedData) : {
      ownDelivery: false,
      deliveryFee: 0,
      minOrderValue: 0,
    };
  });

  const updateStoreData = (key: keyof StoreData, value: any) => {
    setStoreData((prev) => {
      const newData = { ...prev, [key]: value };
      // Guarda en localStorage cada cambio
      localStorage.setItem('storeData', JSON.stringify(newData));
      return newData;
    });
  };

  return (
    <StoreContext.Provider value={{ storeData, updateStoreData }}>
      {children}
    </StoreContext.Provider>
  );
}

export const useStore = () => {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return context;
};