import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const useSelectStore = () => {
  const [selectedStore, setSelectedStore] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleSelectStore = (store: string) => {
    setSelectedStore(store);
    localStorage.setItem("selectedStore", store);
    navigate("/Dashboard", { replace: true });
  };

  return {
    selectedStore,
    handleSelectStore,
  };
};