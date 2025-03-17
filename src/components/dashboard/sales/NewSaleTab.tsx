import React from "react";
import ProductCatalog from "./ProductCatalog";
import ShoppingCartPanel from "./ShoppingCartPanel";

const NewSaleTab = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div className="lg:col-span-2">
        <ProductCatalog />
      </div>
      <div>
        <ShoppingCartPanel />
      </div>
    </div>
  );
};

export default NewSaleTab;