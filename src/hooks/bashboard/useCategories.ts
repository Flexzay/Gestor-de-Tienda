import { useState, useEffect } from "react";
import { categoriesService } from "../../Services/categories.service";
import  Category from "../../interface/category";

export function useCategories() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [newCategory, setNewCategory] = useState("");
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await categoriesService.getCategories();
        if (response.status === 200 && Array.isArray(response.data.data)) {
          setCategories(response.data.data);
        } else {
          console.error("⚠️ Respuesta inesperada:", response);
        }
      } catch (error) {
        console.error("❌ Error al obtener categorías:", error);
      }
    };

    fetchCategories();
  }, []);

  const filteredCategories = categories.filter((cat) =>
    cat.name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const addCategory = async () => {
    if (!newCategory.trim()) return;
    const formattedCategory = newCategory.charAt(0).toUpperCase() + newCategory.slice(1);

    try {
      const response = await categoriesService.createCategory(formattedCategory);
      if (response.status === 200) {
        setCategories((prev) => [...prev, response.data.data]);
        setNewCategory("");
      }
    } catch (error) {
      console.error("❌ Error al añadir categoría:", error);
    }
  };

  const startEditing = (category: Category) => setEditingCategory(category);

  const saveEdit = async () => {
    if (!editingCategory) return;
    try {
      const response = await categoriesService.updateCategory(
        editingCategory.id,
        editingCategory.name
      );
      if (response.status === 200) {
        setCategories((prev) =>
          prev.map((cat) =>
            cat.id === editingCategory.id ? editingCategory : cat
          )
        );
        setEditingCategory(null);
      }
    } catch (error) {
      console.error("❌ Error al editar categoría:", error);
    }
  };

  const deleteCategory = async (id: number) => {
    try {
      const response = await categoriesService.deleteCategory(id);
      if (response.status === 200) {
        setCategories((prev) => prev.filter((cat) => cat.id !== id));
      }
    } catch (error) {
      console.error("❌ Error al eliminar categoría:", error);
    }
  };

  return {
    categories,
    filteredCategories,
    newCategory,
    setNewCategory,
    editingCategory,
    setEditingCategory,
    searchTerm,
    setSearchTerm,
    addCategory,
    startEditing,
    saveEdit,
    deleteCategory,
  };
}

export default useCategories;