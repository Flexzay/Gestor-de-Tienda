import { useState, useEffect } from "react";
import { categoriesService } from "../../Services/categories.service";
import type Category from "../../interface/category";

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
        }
      } catch (error) {
        console.error("❌ Error al obtener categorías");
      }
    };
    fetchCategories();
  }, []);

  const filteredCategories = categories.filter((cat) =>
    cat.name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const addCategory = async () => {
    if (!newCategory.trim()) return;
    try {
      const response = await categoriesService.createCategory(newCategory);
      if (response.status === 200) {
        setCategories((prev) => [...prev, response.data.data]);
        setNewCategory("");
      }
    } catch (error) {
      console.error("❌ Error al añadir categoría");
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
      console.error("❌ Error al editar categoría");
    }
  };

  const deleteCategory = async (id: number) => {
    try {
      const response = await categoriesService.deleteCategory(id);
      if (response.status === 200) {
        setCategories((prev) => prev.filter((cat) => cat.id !== id));
      }
    } catch (error) {
      console.error("❌ Error al eliminar categoría");
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
