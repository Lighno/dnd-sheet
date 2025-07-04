import { Card, CardContent, CardHeader } from "./ui/card";
import AbilityScoreInput from "./ui/ability-score-input";
import { useCharacterStore } from "~/lib/stores/store-provider";

interface AbilityScoreRowProps {
  readOnly?: boolean;
}

export default function AbilityScoreRow({
  readOnly = false,
}: AbilityScoreRowProps) {
  const abilities = [
    { key: "strength" as const, label: "Strength", abbr: "STR" },
    { key: "dexterity" as const, label: "Dexterity", abbr: "DEX" },
    { key: "constitution" as const, label: "Constitution", abbr: "CON" },
    { key: "intelligence" as const, label: "Intelligence", abbr: "INT" },
    { key: "wisdom" as const, label: "Wisdom", abbr: "WIS" },
    { key: "charisma" as const, label: "Charisma", abbr: "CHA" },
  ];
  const { abilityScores, updateAbilityScores } = useCharacterStore((state) => ({
    abilityScores: state.character.abilityScores,
    updateAbilityScores: state.updateAbilityScores,
  }));
  return (
    <div className="grid grid-cols-2 justify-around gap-4 md:grid-cols-3 lg:grid-cols-6">
      {abilities.map((ability) => (
        <Card key={ability.key} className="flex-1 pt-0">
          <CardHeader className="px-0">
            <div className="border-b border-slate-200 px-4 py-2 text-center dark:border-slate-700 dark:bg-slate-800">
              <h3 className="text-lg font-bold tracking-wide text-slate-900 dark:text-white">
                {ability.abbr}
              </h3>
              <p className="mt-1 text-xs text-slate-500 uppercase dark:text-slate-400">
                {ability.label}
              </p>
            </div>
          </CardHeader>
          <CardContent>
            <AbilityScoreInput
              value={abilityScores[ability.key]}
              onChange={(value) =>
                updateAbilityScores({ [ability.key]: value })
              }
              max={30}
              readOnly={readOnly}
            />
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
