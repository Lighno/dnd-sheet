import { Pencil, Trash2 } from "lucide-react";
import type { Spell } from "~/lib/character-data";
import Button from "~/components/ui/button";
import { Card, CardContent } from "~/components/ui/card";

interface SpellCardProps {
  spell: Spell;
  readOnly?: boolean;
  onRemove: (id: string) => void;
  onEdit?: (spell: Spell) => void;
  onTogglePrepared: (id: string) => void;
}

export function SpellCard({
  spell,
  readOnly = false,
  onRemove,
  onEdit,
  onTogglePrepared,
}: SpellCardProps) {
  return (
    <Card
      key={spell.id}
      className={spell.prepared ? "border-primary" : ""}
    >
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <div>
            <h4 className="font-semibold">{spell.name}</h4>
            <p className="text-xs text-slate-500 capitalize">
              {spell.level === 0 ? "Cantrip" : `Level ${spell.level}`} •{" "}
              {spell.school}
            </p>
          </div>
          <div className="flex items-center space-x-2">
            {spell.level > 0 && (
              <Button
                variant={spell.prepared ? "default" : "outline"}
                size="sm"
                onClick={() => onTogglePrepared(spell.id)}
              >
                {spell.prepared ? "Prepared" : "Prepare"}
              </Button>
            )}
            {!readOnly && onEdit && (
              <Button
                variant="ghost"
                size="icon"
                onClick={() => onEdit(spell)}
              >
                <span className="sr-only">Edit</span>
                <Pencil className="h-4 w-4" />
              </Button>
            )}
            {!readOnly && (
              <Button
                variant="ghost"
                size="icon"
                onClick={() => onRemove(spell.id)}
              >
                <Trash2 className="h-4 w-4" />
                <span className="sr-only">Remove</span>
              </Button>
            )}
          </div>
        </div>
        <div className="mt-2 grid grid-cols-2 gap-x-4 gap-y-1 text-xs">
          <div>
            <span className="font-semibold">Casting Time:</span>{" "}
            {spell.castingTime}
          </div>
          <div>
            <span className="font-semibold">Range:</span> {spell.range}
          </div>
          <div>
            <span className="font-semibold">Components:</span>{" "}
            {spell.components}
          </div>
          <div>
            <span className="font-semibold">Duration:</span> {spell.duration}
          </div>
        </div>
        {spell.description && (
          <p className="mt-2 text-sm">{spell.description}</p>
        )}
      </CardContent>
    </Card>
  );
}
