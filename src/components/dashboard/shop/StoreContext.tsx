import { createContext, useContext, useState, useEffect } from "react";

interface StoreData {
  ownDelivery: boolean;
  deliveryFee: number;
  minOrderValue: number;
}

interface StoreContextType {
  storeData: StoreData;
  updateStoreData: (key: keyof StoreData, value: any) => void;
}

const StoreContext = createContext<StoreContextType | null>(null);

export function StoreProvider({ children }: { children: React.ReactNode }) {
  const [storeData, setStoreData] = useState<StoreData>(() => {
    if (typeof window !== 'undefined') {
      const savedData = localStorage.getItem('storeData');
      if (savedData) {
        const parsedData = JSON.parse(savedData);
        return {
          ownDelivery: parsedData.ownDelivery || false,
          deliveryFee: Number(parsedData.deliveryFee) || 0,
          minOrderValue: Number(parsedData.minOrderValue) || 0,
        };
      }
    }
    return {
      ownDelivery: false,
      deliveryFee: 0,
      minOrderValue: 0,
    };
  });

  useEffect(() => {
    localStorage.setItem('storeData', JSON.stringify(storeData));
  }, [storeData]);

  const updateStoreData = (key: keyof StoreData, value: any) => {
    setStoreData(prev => ({ ...prev, [key]: value }));
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