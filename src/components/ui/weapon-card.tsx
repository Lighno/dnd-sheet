import { Pencil, Trash2 } from "lucide-react";
import type { AbilityScores, Weapon } from "~/lib/character-data";
import { Button } from "~/components/ui/button";
import { Card, CardContent } from "~/components/ui/card";
import { calculateModifier } from "~/lib/utils";

interface WeaponCardProps {
  weapon: Weapon;
  readOnly?: boolean;
  abilityScores: AbilityScores;
  proficiencyBonus: number;
  onRemove: (id: string) => void;
  onEdit?: (weapon: Weapon) => void;
}

export function WeaponCard({
  weapon,
  readOnly = false,
  abilityScores,
  proficiencyBonus,
  onRemove,
  onEdit,
}: WeaponCardProps) {
  const calculateAttackBonus = () => {
    const abilityModifier = calculateModifier(
      abilityScores[weapon.abilityScore],
    );
    const proficiencyModifier = weapon.isProficient ? proficiencyBonus : 0;
    return abilityModifier + proficiencyModifier + weapon.attackBonus;
  };

  const calculateDamageBonus = () => {
    const abilityModifier = calculateModifier(
      abilityScores[weapon.abilityScore],
    );
    return abilityModifier + weapon.damageBonus;
  };

  return (
    <Card>
      <CardContent className="px-6 py-4">
        <div className="flex w-full items-center gap-6">
          {/* Attack (Name/Type) */}
          <div className="flex min-w-[120px] flex-col justify-center">
            <span className="text-lg leading-tight font-bold">
              {weapon.name}
            </span>
            <span className="text-muted-foreground text-xs capitalize">
              {weapon.type} Weapon
            </span>
          </div>

          {/* Range */}
          <div className="min-w-[60px] text-center">
            <span className="text-xl font-bold">
              {weapon.type === "melee"
                ? "Melee"
                : weapon.range?.split("/")[0] || "-"}
            </span>
            {weapon.range && weapon.range.includes("/") && (
              <span className="text-muted-foreground text-sm">
                {" "}
                ({weapon.range.split("/")[1]})
              </span>
            )}
          </div>

          {/* Hit / DC */}
          <div className="flex min-w-[60px] justify-center">
            <span className="bg-background rounded-md border px-3 py-1 text-lg font-medium">
              {calculateAttackBonus() >= 0 ? "+" : ""}
              {calculateAttackBonus()}
            </span>
          </div>

          {/* Damage */}
          <div className="flex min-w-[90px] items-center justify-center gap-1">
            <span className="bg-background rounded-md border px-3 py-1 text-lg font-medium">
              {weapon.damageDice}
              {calculateDamageBonus() !== 0 &&
                `${calculateDamageBonus() > 0 ? "+" : ""}${calculateDamageBonus()}`}
            </span>
            {/* Optionally add a damage type icon here */}
          </div>

          {/* Notes */}
          <div className="text-muted-foreground min-w-[120px] flex-1 text-sm">
            {weapon.properties.length > 0 && (
              <span>
                {weapon.properties
                  .map((p) => p.charAt(0).toUpperCase() + p.slice(1))
                  .join(", ")}
              </span>
            )}
            {weapon.notes && <span className="ml-1">{weapon.notes}</span>}
          </div>

          {/* Edit/Remove Buttons */}
          <div className="ml-2 flex gap-1">
            {!readOnly && onEdit && (
              <Button
                variant="ghost"
                size="icon"
                onClick={() => onEdit(weapon)}
              >
                <span className="sr-only">Edit</span>
                <Pencil />
              </Button>
            )}
            {!readOnly && (
              <Button
                variant="ghost"
                size="icon"
                onClick={() => onRemove(weapon.id)}
              >
                <Trash2 className="h-4 w-4" />
                <span className="sr-only">Remove</span>
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
