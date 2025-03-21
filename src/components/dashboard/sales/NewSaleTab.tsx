import React from "react";
import ProductCatalog from "./ProductCatalog";
import ShoppingCartPanel from "./ShoppingCartPanel";

const NewSaleTab = () => {
  return (
    // Se utiliza un grid para dividir la pantalla en dos secciones
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      
      {/* Sección izquierda: Catálogo de productos (ocupa 2 columnas en pantallas grandes) */}
      <div className="lg:col-span-2">
        <ProductCatalog />
      </div>

      {/* Sección derecha: Panel del carrito de compras (ocupa 1 columna) */}
      <div>
        <ShoppingCartPanel />
      </div>

    </div>
  );
};

export default NewSaleTab;
