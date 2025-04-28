"use client";

import SavingThrowsComponent from "./saving-throws";
import Skills from "./skills";
import AbilityScoreInput from "./ui/ability-score-input";
import type {
  AbilityScores as AbilityScoresType,
  Character,
  SavingThrows,
  Skill,
} from "~/lib/character-data";
import { Card, CardContent } from "~/components/ui/card";
import { Label } from "~/components/ui/label";
import { calculateModifier } from "~/lib/utils";

interface AbilityScoresProps {
  abilityScores: AbilityScoresType;
  savingThrows: SavingThrows;
  skills: Record<Skill, boolean>;
  proficiencyBonus: number;
  updateAbilityScore: (ability: keyof AbilityScoresType, value: number) => void;
  updateCharacter: (updates: Partial<Character>) => void;
  readOnly?: boolean;
}

export default function AbilityScores({
  abilityScores,
  savingThrows,
  skills,
  proficiencyBonus,
  updateAbilityScore,
  updateCharacter,
  readOnly = false,
}: AbilityScoresProps) {
  const abilities = [
    { key: "strength" as const, label: "Strength", abbr: "STR" },
    { key: "dexterity" as const, label: "Dexterity", abbr: "DEX" },
    { key: "constitution" as const, label: "Constitution", abbr: "CON" },
    { key: "intelligence" as const, label: "Intelligence", abbr: "INT" },
    { key: "wisdom" as const, label: "Wisdom", abbr: "WIS" },
    { key: "charisma" as const, label: "Charisma", abbr: "CHA" },
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {abilities.map((ability) => (
          <Card key={ability.key} className="overflow-hidden">
            <div className="bg-slate-100 dark:bg-slate-800 p-2 text-center">
              <h3 className="font-bold">{ability.abbr}</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                {ability.label}
              </p>
            </div>
            <CardContent className="p-4 text-center">
              <div className="mb-2">
                <AbilityScoreInput
                  value={abilityScores[ability.key]}
                  onChange={(value) => updateAbilityScore(ability.key, value)}
                  readOnly={readOnly}
                />
              </div>
              <div className="text-xl font-bold">
                {calculateModifier(abilityScores[ability.key])}
              </div>
              <Label className="text-xs text-slate-500 dark:text-slate-400">
                Modifier
              </Label>
            </CardContent>
          </Card>
        ))}
      </div>

      <SavingThrowsComponent
        savingThrows={savingThrows}
        abilityScores={abilityScores}
        proficiencyBonus={proficiencyBonus}
        updateCharacter={updateCharacter}
        readOnly={readOnly}
      />

      <div className="mt-6">
        <h3 className="text-lg font-semibold mb-4">Skills</h3>
        <Skills
          skills={skills}
          abilityScores={abilityScores}
          proficiencyBonus={proficiencyBonus}
          updateCharacter={updateCharacter}
          readOnly={readOnly}
        />
      </div>
    </div>
  );
}
