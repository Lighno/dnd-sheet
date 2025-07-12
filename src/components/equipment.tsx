import { useState } from "react";
import type { EquipmentItem } from "~/lib/character-data";
import { useCharacterStore } from "~/lib/stores/store-provider";
import { EquipmentCard } from "~/components/ui/equipment-card";
import { EquipmentForm } from "~/components/ui/equipment-form";

interface EquipmentProps {
  readOnly: boolean;
}

export default function Equipment({ readOnly = false }: EquipmentProps) {
  const { equipment, updateCharacter } = useCharacterStore((state) => ({
    equipment: state.character.equipment,
    updateCharacter: state.updateCharacter,
  }));

  const [editingItem, setEditingItem] = useState<EquipmentItem | null>(null);

  const addItem = (newItem: Omit<EquipmentItem, "id">) => {
    if (readOnly) return;
    if (!newItem.name) return;

    const item = {
      ...newItem,
      id: crypto.randomUUID(),
    };

    updateCharacter({
      equipment: [...equipment, item],
    });
  };

  const updateItem = (id: string, updates: Partial<EquipmentItem>) => {
    if (readOnly) return;
    updateCharacter({
      equipment: equipment.map((item) =>
        item.id === id ? { ...item, ...updates } : item,
      ),
    });
  };

  const removeItem = (id: string) => {
    if (readOnly) return;
    updateCharacter({
      equipment: equipment.filter((item) => item.id !== id),
    });
    if (editingItem && editingItem.id === id) setEditingItem(null);
  };

  const toggleEquipped = (id: string) => {
    if (readOnly) return;
    const item = equipment.find((i) => i.id === id);
    if (item) {
      updateItem(id, { equipped: !item.equipped });
    }
  };

  const updateQuantity = (id: string, quantity: number) => {
    if (readOnly) return;
    updateItem(id, { quantity: Math.max(1, quantity) });
  };

  const handleEdit = (item: EquipmentItem) => {
    setEditingItem(item);
  };

  const handleSaveEdit = (updated: Omit<EquipmentItem, "id">) => {
    if (!editingItem) return;
    updateItem(editingItem.id, updated);
    setEditingItem(null);
  };

  const handleCancelEdit = () => {
    setEditingItem(null);
  };

  const calculateTotalWeight = () => {
    return equipment.reduce(
      (total, item) => total + item.weight * item.quantity,
      0,
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Equipment</h3>
        <div className="text-sm">
          Total Weight:{" "}
          <span className="font-bold">{calculateTotalWeight()} lbs</span>
        </div>
      </div>

      <div className="grid gap-4">
        {equipment.map((item) => (
          <EquipmentCard
            key={item.id}
            item={item}
            readOnly={readOnly}
            onRemove={removeItem}
            onEdit={handleEdit}
            onToggleEquipped={toggleEquipped}
            onUpdateQuantity={updateQuantity}
          />
        ))}
      </div>

      {!readOnly && (
        <EquipmentForm
          onAdd={addItem}
          editItem={editingItem}
          onSaveEdit={handleSaveEdit}
          onCancelEdit={handleCancelEdit}
        />
      )}
    </div>
  );
}
