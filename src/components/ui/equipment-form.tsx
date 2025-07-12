import { useEffect, useState } from "react";
import { PlusCircle } from "lucide-react";
import type { EquipmentItem } from "~/lib/character-data";
import Button from "~/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import { Textarea } from "~/components/ui/textarea";

interface EquipmentFormProps {
  onAdd: (item: Omit<EquipmentItem, "id">) => void;
  editItem?: EquipmentItem | null;
  onSaveEdit?: (item: Omit<EquipmentItem, "id">) => void;
  onCancelEdit?: () => void;
}

export function EquipmentForm({
  onAdd,
  editItem = null,
  onSaveEdit,
  onCancelEdit,
}: EquipmentFormProps) {
  const defaultItem: Omit<EquipmentItem, "id"> = {
    name: "",
    type: "weapon",
    quantity: 1,
    weight: 0,
    description: "",
    equipped: false,
  };

  const [item, setItem] = useState<Omit<EquipmentItem, "id">>(
    editItem ? { ...editItem } : defaultItem,
  );

  useEffect(() => {
    if (editItem) {
      setItem(editItem);
    } else {
      setItem(defaultItem);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editItem]);

  const handleAdd = () => {
    if (!item.name) return;
    onAdd(item);
    setItem(defaultItem);
  };

  const handleSave = () => {
    if (!item.name || !onSaveEdit) return;
    onSaveEdit(item);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>{editItem ? "Edit Item" : "Add New Item"}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="item-name">Name</Label>
              <Input
                id="item-name"
                value={item.name}
                onChange={(e) => setItem({ ...item, name: e.target.value })}
                placeholder="e.g., Longsword, Leather Armor"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="item-type">Type</Label>
              <Select
                value={item.type}
                onValueChange={(value) => setItem({ ...item, type: value })}
              >
                <SelectTrigger id="item-type">
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="weapon">Weapon</SelectItem>
                  <SelectItem value="armor">Armor</SelectItem>
                  <SelectItem value="gear">Gear</SelectItem>
                  <SelectItem value="tool">Tool</SelectItem>
                  <SelectItem value="consumable">Consumable</SelectItem>
                  <SelectItem value="treasure">Treasure</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="item-quantity">Quantity</Label>
              <Input
                id="item-quantity"
                type="number"
                min="1"
                value={item.quantity}
                onChange={(e) =>
                  setItem({ ...item, quantity: Number(e.target.value) || 1 })
                }
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="item-weight">Weight (lbs)</Label>
              <Input
                id="item-weight"
                type="number"
                min="0"
                step="0.1"
                value={item.weight}
                onChange={(e) =>
                  setItem({ ...item, weight: Number(e.target.value) || 0 })
                }
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="item-description">Description</Label>
            <Textarea
              id="item-description"
              value={item.description}
              onChange={(e) =>
                setItem({ ...item, description: e.target.value })
              }
              placeholder="Additional details about the item"
              rows={3}
            />
          </div>

          {editItem ? (
            <div className="flex gap-2">
              <Button onClick={handleSave} className="flex-1" variant="default">
                Save Changes
              </Button>
              <Button
                onClick={onCancelEdit}
                className="flex-1"
                variant="secondary"
                type="button"
              >
                Cancel
              </Button>
            </div>
          ) : (
            <Button onClick={handleAdd} className="w-full">
              <PlusCircle className="mr-2 h-4 w-4" />
              Add Item
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
