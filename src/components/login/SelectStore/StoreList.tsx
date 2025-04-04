import { useState } from "react";
import StoreCard from "./StoreCard";

const StoreList = ({ stores, onSelect }) => {
  const [hoveredStore, setHoveredStore] = useState<number | null>(null);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl w-full">
      {stores.map((store) => (
        <StoreCard
          key={store.id}
          store={store}
          isHovered={hoveredStore === store.id}
          onHover={setHoveredStore}
          onSelect={onSelect}
        />
      ))}
    </div>
  );
};

export default StoreList;
