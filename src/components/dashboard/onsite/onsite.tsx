import React, { useState, useEffect } from "react";
import ClientSearchForm from "./formOnsite";
import SelectTable from "./selectTable";
import SelectProduct from "./selectProduct";
import type { Table } from "../../../interface/table";
import { storageService } from "../../../Services/storage.service";
import type { ProductFormData } from "../../../interface/product";

const Onsite: React.FC = () => {
  const [userId, setUserId] = useState<number | null>(null);
  const [selectedTable, setSelectedTable] = useState<Table | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<ProductFormData | null>(null);
  const [shopId, setShopId] = useState<string | null>(null);

  useEffect(() => {
    const id = storageService.getShopId();
    setShopId(id);
  }, []);

  if (!shopId) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-md">
          <p className="text-red-700">
            No se ha podido identificar la tienda. Por favor, inicie sesión nuevamente.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <ClientSearchForm onUserFound={setUserId} />

      {userId && (
        <>
          <SelectTable
            shopId={shopId}
            onSelect={setSelectedTable}
            selectedTableId={selectedTable?.id}
          />

          {selectedTable && (
            <>
              <SelectProduct
                onSelect={setSelectedProduct}
                selectedProductId={selectedProduct?.id}
              />

              {selectedProduct && (
                <div className="mt-6 p-6 bg-white border border-gray-200 rounded-lg shadow-sm">
                  <h3 className="text-lg font-semibold mb-4">Resumen de selección</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="p-4 bg-blue-50 rounded-lg">
                      <p className="text-sm text-gray-500">Cliente ID</p>
                      <p className="text-lg font-medium">{userId}</p>
                    </div>
                    <div className="p-4 bg-green-50 rounded-lg">
                      <p className="text-sm text-gray-500">Mesa</p>
                      <p className="text-lg font-medium">{selectedTable.name}</p>
                    </div>
                    <div className="p-4 bg-yellow-50 rounded-lg">
                      <p className="text-sm text-gray-500">Producto</p>
                      <p className="text-lg font-medium">{selectedProduct.name}</p>
                    </div>
                  </div>

                  <div className="mt-6 pt-4 border-t border-gray-200">
                    <button
                      className="w-full px-4 py-3 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 transition-colors"
                      onClick={() => {
                        // Aquí puedes agregar la lógica para confirmar el pedido o guardarlo
                        console.log("Confirmar selección:", {
                          userId,
                          selectedTable,
                          selectedProduct,
                        });
                      }}
                    >
                      Confirmar selección
                    </button>
                  </div>
                </div>
              )}
            </>
          )}
        </>
      )}
    </div>
  );
};

export default Onsite;
