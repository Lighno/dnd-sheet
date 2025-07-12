import { Pencil, Trash2 } from "lucide-react";
import type { EquipmentItem } from "~/lib/character-data";
import Button from "~/components/ui/button";
import { Card, CardContent } from "~/components/ui/card";

interface EquipmentCardProps {
  item: EquipmentItem;
  readOnly?: boolean;
  onRemove: (id: string) => void;
  onEdit?: (item: EquipmentItem) => void;
  onToggleEquipped: (id: string) => void;
  onUpdateQuantity: (id: string, quantity: number) => void;
}

export function EquipmentCard({
  item,
  readOnly = false,
  onRemove,
  onEdit,
  onToggleEquipped,
  onUpdateQuantity,
}: EquipmentCardProps) {
  return (
    <Card key={item.id} className={item.equipped ? "border-primary" : ""}>
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex flex-col">
            <h4 className="font-semibold">{item.name}</h4>
            <p className="text-xs text-slate-500 capitalize">{item.type}</p>
          </div>
          <div className="flex items-center space-x-2">
            <div className="flex items-center space-x-1">
              <Button
                variant="outline"
                size="icon"
                className="h-6 w-6"
                onClick={() =>
                  onUpdateQuantity(item.id, Math.max(1, item.quantity - 1))
                }
                disabled={readOnly}
              >
                -
              </Button>
              <span className="w-8 text-center">{item.quantity}</span>
              <Button
                variant="outline"
                size="icon"
                className="h-6 w-6"
                onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                disabled={readOnly}
              >
                +
              </Button>
            </div>
            <Button
              variant={item.equipped ? "default" : "outline"}
              size="sm"
              onClick={() => onToggleEquipped(item.id)}
              disabled={readOnly}
            >
              {item.equipped ? "Equipped" : "Equip"}
            </Button>
            {!readOnly && onEdit && (
              <Button variant="ghost" size="icon" onClick={() => onEdit(item)}>
                <span className="sr-only">Edit</span>
                <Pencil className="h-4 w-4" />
              </Button>
            )}
            {!readOnly && (
              <Button
                variant="ghost"
                size="icon"
                onClick={() => onRemove(item.id)}
              >
                <Trash2 className="h-4 w-4" />
                <span className="sr-only">Remove</span>
              </Button>
            )}
          </div>
        </div>
        {item.description && <p className="mt-2 text-sm">{item.description}</p>}
        <div className="mt-2 text-xs text-slate-500">
          {`Weight: ${item.weight} lbs ${item.quantity > 1 ? `(Total: ${item.weight * item.quantity} lbs)` : ""}`}
        </div>
      </CardContent>
    </Card>
  );
}
