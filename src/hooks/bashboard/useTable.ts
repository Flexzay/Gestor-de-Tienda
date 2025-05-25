import { useEffect, useState, useCallback } from "react";
import { spacesService } from "../../Services/spaces.service";
import { Table } from "../../interface/table";

export const useTable = (shopId: string) => {
  const [tables, setTables] = useState<Table[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getSpaces = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);

      if (!shopId) {
        setError("No se ha proporcionado un ID de tienda válido");
        return;
      }

      const response = await spacesService.GetSpaces(shopId);
      const tablesData = response?.data || response || [];

      if (!Array.isArray(tablesData)) {
        throw new Error("La respuesta no es un array de mesas");
      }

      const validTables = tablesData.map(table => ({
        id: table.id?.toString() || Math.random().toString(36).substr(2, 9),
        name: table.name || "Mesa sin nombre",
        status: typeof table.status === 'boolean' ? table.status : true,
        delivery: typeof table.delivery === 'boolean' ? table.delivery : false
      }));

      setTables(validTables);
    } catch (err: any) {
      setError(err.message || "Error al cargar las mesas");
    } finally {
      setIsLoading(false);
    }
  }, [shopId]);

  useEffect(() => {
    getSpaces();
  }, [getSpaces]);

  return {
    tables,
    isLoading,
    error,
    refetch: getSpaces
  };
};