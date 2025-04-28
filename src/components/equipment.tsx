import { PlusCircle, Trash2 } from "lucide-react";
import { useState } from "react";
import type { Character, EquipmentItem } from "~/lib/character-data";
import { Button } from "~/components/ui/button";
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

interface EquipmentProps {
  equipment: Array<EquipmentItem>;
  updateCharacter: (updates: Partial<Character>) => void;
  readOnly: boolean;
}

export default function Equipment({
  equipment,
  updateCharacter,
}: EquipmentProps) {
  const [newItem, setNewItem] = useState<EquipmentItem>({
    id: "",
    name: "",
    type: "weapon",
    quantity: 1,
    weight: 0,
    description: "",
    equipped: false,
  });

  const addItem = () => {
    if (!newItem.name) return;

    const item = {
      ...newItem,
      id: crypto.randomUUID(),
    };

    updateCharacter({
      equipment: [...equipment, item],
    });

    setNewItem({
      id: "",
      name: "",
      type: "weapon",
      quantity: 1,
      weight: 0,
      description: "",
      equipped: false,
    });
  };

  const removeItem = (id: string) => {
    updateCharacter({
      equipment: equipment.filter((item) => item.id !== id),
    });
  };

  const toggleEquipped = (id: string) => {
    updateCharacter({
      equipment: equipment.map((item) =>
        item.id === id ? { ...item, equipped: !item.equipped } : item,
      ),
    });
  };

  const updateQuantity = (id: string, quantity: number) => {
    updateCharacter({
      equipment: equipment.map((item) =>
        item.id === id ? { ...item, quantity } : item,
      ),
    });
  };

  const calculateTotalWeight = () => {
    return equipment.reduce(
      (total, item) => total + item.weight * item.quantity,
      0,
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">Equipment</h3>
        <div className="text-sm">
          Total Weight:{" "}
          <span className="font-bold">{calculateTotalWeight()} lbs</span>
        </div>
      </div>

      <div className="grid gap-4">
        {equipment.map((item) => (
          <Card key={item.id} className={item.equipped ? "border-primary" : ""}>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div>
                    <h4 className="font-semibold">{item.name}</h4>
                    <p className="text-xs text-slate-500 capitalize">
                      {item.type}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="flex items-center space-x-1">
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-6 w-6"
                      onClick={() =>
                        updateQuantity(item.id, Math.max(1, item.quantity - 1))
                      }
                    >
                      -
                    </Button>
                    <span className="w-8 text-center">{item.quantity}</span>
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-6 w-6"
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    >
                      +
                    </Button>
                  </div>
                  <Button
                    variant={item.equipped ? "default" : "outline"}
                    size="sm"
                    onClick={() => toggleEquipped(item.id)}
                  >
                    {item.equipped ? "Equipped" : "Equip"}
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => removeItem(item.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                    <span className="sr-only">Remove</span>
                  </Button>
                </div>
              </div>
              {item.description && (
                <p className="mt-2 text-sm">{item.description}</p>
              )}
              <div className="mt-2 text-xs text-slate-500">
                Weight: {item.weight} lbs (Total: {item.weight * item.quantity}{" "}
                lbs)
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Add New Item</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="item-name">Name</Label>
                <Input
                  id="item-name"
                  value={newItem.name}
                  onChange={(e) =>
                    setNewItem({ ...newItem, name: e.target.value })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="item-type">Type</Label>
                <Select
                  value={newItem.type}
                  onValueChange={(value) =>
                    setNewItem({ ...newItem, type: value })
                  }
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
                  value={newItem.quantity}
                  onChange={(e) =>
                    setNewItem({
                      ...newItem,
                      quantity: Number.parseInt(e.target.value) || 1,
                    })
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
                  value={newItem.weight}
                  onChange={(e) =>
                    setNewItem({
                      ...newItem,
                      weight: Number.parseFloat(e.target.value) || 0,
                    })
                  }
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="item-description">Description</Label>
              <Textarea
                id="item-description"
                value={newItem.description}
                onChange={(e) =>
                  setNewItem({ ...newItem, description: e.target.value })
                }
                rows={2}
              />
            </div>
            <Button onClick={addItem} className="w-full">
              <PlusCircle className="mr-2 h-4 w-4" />
              Add Item
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
