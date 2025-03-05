import { motion, AnimatePresence } from "framer-motion";
import { Pencil, Trash2, Plus } from "lucide-react";
import { Button } from "./Button_Add";

interface EditableListWithAddProps<T> {
  items: T[];
  editingItem: T | null;
  setEditingItem: (item: T) => void;
  startEditing: (item: T) => void;
  saveEdit: () => void;
  deleteItem: (id: number) => void;
  newItem: string;
  setNewItem: (value: string) => void;
  addItem: () => void;
  placeholder: string;
}

export function EditableListWithAdd<T extends { id: number; name: string }>({
  items,
  editingItem,
  setEditingItem,
  startEditing,
  saveEdit,
  deleteItem,
  newItem,
  setNewItem,
  addItem,
  placeholder,
}: EditableListWithAddProps<T>) {
  return (
    <div>
      {/* Lista de elementos */}
      <ul className="space-y-4 mb-8">
        <AnimatePresence>
          {items.map((item) => (
            <motion.li
              key={item.id}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="flex items-center justify-between p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex items-center space-x-4">
                {editingItem?.id === item.id ? (
                  <input
                    type="text"
                    value={editingItem.name}
                    onChange={(e) => setEditingItem({ ...editingItem, name: e.target.value })}
                    className="border-b-2 border-gray-300 px-2 py-1 focus:outline-none focus:border-[#ff204e]"
                    autoFocus
                  />
                ) : (
                  <span className="text-gray-800 font-medium">{item.name}</span>
                )}
              </div>
              <div className="flex space-x-2">
                {editingItem?.id === item.id ? (
                  <Button onClick={saveEdit} className="text-[#7B9400] hover:text-[#5e7200]">
                    Guardar
                  </Button>
                ) : (
                  <Button onClick={() => startEditing(item)} className="text-gray-500 hover:text-[#05f2f2]">
                    <Pencil size={18} />
                  </Button>
                )}
                <Button onClick={() => deleteItem(item.id)} className="text-gray-500 hover:text-[#ff204e]">
                  <Trash2 size={18} />
                </Button>
              </div>
            </motion.li>
          ))}
        </AnimatePresence>
      </ul>

      {/* Input y botón para agregar nuevo elemento */}
      <div className="flex space-x-2">
        <input
          type="text"
          value={newItem}
          onChange={(e) => setNewItem(e.target.value)}
          placeholder={placeholder}
          className="flex-grow px-4 py-3 text-gray-700 bg-white rounded-l-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#ff204e] transition-all duration-300"
        />
        <Button onClick={addItem} className="bg-[#ff204e] text-white rounded-r-lg hover:bg-[#ff3b60]">
          <Plus size={20} className="mr-2" />
          Añadir
        </Button>
      </div>
    </div>
  );
}
