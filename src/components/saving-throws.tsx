import type {
  AbilityScores,
  Character,
  SavingThrows,
} from "~/lib/character-data";
import { Checkbox } from "~/components/ui/checkbox";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { calculateModifier } from "~/lib/utils";

interface SavingThrowsProps {
  savingThrows: SavingThrows;
  abilityScores: AbilityScores;
  proficiencyBonus: number;
  updateCharacter: (updates: Partial<Character>) => void;
  readOnly?: boolean;
}

export default function SavingThrowsComponent({
  savingThrows,
  abilityScores,
  proficiencyBonus,
  updateCharacter,
  readOnly = false,
}: SavingThrowsProps) {
  const abilities = [
    { key: "strength" as const, label: "Strength", abbr: "STR" },
    { key: "dexterity" as const, label: "Dexterity", abbr: "DEX" },
    { key: "constitution" as const, label: "Constitution", abbr: "CON" },
    { key: "intelligence" as const, label: "Intelligence", abbr: "INT" },
    { key: "wisdom" as const, label: "Wisdom", abbr: "WIS" },
    { key: "charisma" as const, label: "Charisma", abbr: "CHA" },
  ];

  const toggleProficiency = (ability: keyof SavingThrows) => {
    if (readOnly) return;
    updateCharacter({
      savingThrows: {
        ...savingThrows,
        [ability]: !savingThrows[ability],
      },
    });
  };

  const getSavingThrowModifier = (ability: keyof AbilityScores) => {
    const abilityModifier = calculateModifier(abilityScores[ability]);
    const isProficient = savingThrows[ability];
    return isProficient ? abilityModifier + proficiencyBonus : abilityModifier;
  };

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle>Saving Throws</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-2">
          {abilities.map((ability) => (
            <div
              key={ability.key}
              className="flex items-center justify-between rounded-md border p-2"
            >
              <div className="flex items-center space-x-2">
                <Checkbox
                  id={`save-${ability.key}`}
                  checked={savingThrows[ability.key]}
                  onCheckedChange={() => toggleProficiency(ability.key)}
                  disabled={readOnly}
                />
                <label
                  htmlFor={`save-${ability.key}`}
                  className="text-sm leading-none font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  {ability.label}
                </label>
              </div>
              <div className="font-bold">
                {getSavingThrowModifier(ability.key) >= 0 ? "+" : ""}
                {getSavingThrowModifier(ability.key)}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
