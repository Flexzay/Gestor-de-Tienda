import { motion, AnimatePresence } from "framer-motion";
import { Pencil, Trash2, Plus } from "lucide-react";
import { Button } from "./Button";

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
    <div className="p-4 md:p-8 bg-white rounded-3xl shadow-lg border border-gray-200 relative overflow-hidden">
      {/* Lista de elementos */}
      <ul className="space-y-4 mb-6">
        <AnimatePresence>
          {items.map((item) => (
            <motion.li
              key={item.id}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="flex flex-wrap items-center justify-between p-3 sm:p-4 bg-white border 
                         border-gray-300 rounded-xl shadow-md hover:shadow-lg transition-all"
            >
              <div className="flex items-center space-x-3 sm:space-x-4 flex-1">
                {editingItem?.id === item.id ? (
                  <input
                    type="text"
                    value={editingItem.name}
                    onChange={(e) => setEditingItem({ ...editingItem, name: e.target.value })}
                    className="border-b-2 border-gray-400 text-gray-800 px-2 py-1 sm:px-3 sm:py-2 
                               focus:outline-none focus:border-[#FF2C59] transition-all text-base sm:text-lg font-medium w-full"
                    autoFocus
                  />
                ) : (
                  <span className="text-gray-800 font-medium text-base sm:text-lg">{item.name}</span>
                )}
              </div>

              <div className="flex space-x-2 sm:space-x-3 mt-2 sm:mt-0">
                {editingItem?.id === item.id ? (
                  <Button variant="primary" text="Guardar" onClick={saveEdit} />
                ) : (
                  <button
                    onClick={() => startEditing(item)}
                    className="w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center rounded-full 
                               border border-gray-300 text-gray-600 hover:text-[#FF2C59] 
                               hover:border-[#FF2C59] transition-all"
                  >
                    <Pencil size={18} />
                  </button>
                )}
                <button
                  onClick={() => deleteItem(item.id)}
                  className="w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center rounded-full 
                             border border-gray-300 text-gray-600 hover:text-red-600 
                             hover:border-red-600 transition-all"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </motion.li>
          ))}
        </AnimatePresence>
      </ul>

      {/* Input y botón para agregar nuevo elemento */}
      <div className="flex flex-wrap gap-2">
        <input
          type="text"
          value={newItem}
          onChange={(e) => setNewItem(e.target.value)}
          placeholder={placeholder}
          className="flex-grow px-3 py-2 sm:px-4 sm:py-3 text-gray-800 bg-white border border-gray-300 
                     rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-[#FF2C59] 
                     transition-all placeholder-gray-500 text-base sm:text-lg"
        />
        <Button variant="primary" icon={Plus} text="Añadir" onClick={addItem} />
      </div>
    </div>
  );
}
