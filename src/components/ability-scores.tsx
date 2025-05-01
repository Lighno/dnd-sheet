"use client";

import {
  BicepsFlexed,
  Book,
  Cat,
  Compass,
  Cross,
  Dumbbell,
  Eye,
  EyeClosed,
  Leaf,
  Lightbulb,
  MessageCircle,
  Music,
  Search,
  Shield,
  Skull,
  Sparkles,
  Stethoscope,
  Swords,
  Wind,
} from "lucide-react";
import AbilityScoreInput from "./ui/ability-score-input";
import type {
  AbilityScores as AbilityScoresType,
  Character,
  SavingThrows,
  Skill,
} from "~/lib/character-data";
import { Card, CardContent } from "~/components/ui/card";
import { Checkbox } from "~/components/ui/checkbox";
import { calculateModifier } from "~/lib/utils";
import { Separator } from "~/components/ui/separator";

interface AbilityScoresProps {
  abilityScores: AbilityScoresType;
  savingThrows: SavingThrows;
  skills: Record<Skill, boolean>;
  proficiencyBonus: number;
  updateAbilityScore: (ability: keyof AbilityScoresType, value: number) => void;
  updateCharacter: (updates: Partial<Character>) => void;
  readOnly?: boolean;
}

const skillsByAbility: Record<
  keyof AbilityScoresType,
  Array<{ name: Skill; label: string; icon: typeof Dumbbell }>
> = {
  strength: [{ name: "athletics", label: "Athletics", icon: Dumbbell }],
  dexterity: [
    { name: "acrobatics", label: "Acrobatics", icon: BicepsFlexed },
    { name: "sleightOfHand", label: "Sleight of Hand", icon: Wind },
    { name: "stealth", label: "Stealth", icon: EyeClosed },
  ],
  constitution: [],
  intelligence: [
    { name: "arcana", label: "Arcana", icon: Sparkles },
    { name: "history", label: "History", icon: Book },
    { name: "investigation", label: "Investigation", icon: Search },
    { name: "nature", label: "Nature", icon: Leaf },
    { name: "religion", label: "Religion", icon: Cross },
  ],
  wisdom: [
    { name: "animalHandling", label: "Animal Handling", icon: Cat },
    { name: "insight", label: "Insight", icon: Lightbulb },
    { name: "medicine", label: "Medicine", icon: Stethoscope },
    { name: "perception", label: "Perception", icon: Eye },
    { name: "survival", label: "Survival", icon: Compass },
  ],
  charisma: [
    { name: "deception", label: "Deception", icon: Skull },
    { name: "intimidation", label: "Intimidation", icon: Swords },
    { name: "performance", label: "Performance", icon: Music },
    { name: "persuasion", label: "Persuasion", icon: MessageCircle },
  ],
};

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

  const toggleSavingThrowProficiency = (ability: keyof SavingThrows) => {
    if (readOnly) return;
    updateCharacter({
      savingThrows: {
        ...savingThrows,
        [ability]: !savingThrows[ability],
      },
    });
  };

  const toggleSkillProficiency = (skill: Skill) => {
    if (readOnly) return;
    updateCharacter({
      skills: {
        ...skills,
        [skill]: !skills[skill],
      },
    });
  };

  const getSavingThrowModifier = (ability: keyof AbilityScoresType) => {
    const abilityModifier = calculateModifier(abilityScores[ability]);
    const isProficient = savingThrows[ability];
    return isProficient ? abilityModifier + proficiencyBonus : abilityModifier;
  };

  const getSkillModifier = (skill: Skill, ability: keyof AbilityScoresType) => {
    const abilityModifier = calculateModifier(abilityScores[ability]);
    const isProficient = skills[skill];
    return isProficient ? abilityModifier + proficiencyBonus : abilityModifier;
  };

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
      {abilities.map((ability) => (
        <Card key={ability.key} className="overflow-hidden">
          <div className="bg-slate-100 p-2 text-center dark:bg-slate-800">
            <div className="flex items-center justify-center gap-2">
              <h3 className="font-bold">{ability.abbr}</h3>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              {ability.label}
            </p>
          </div>
          <CardContent className="p-4">
            <div className="flex flex-col items-center">
              <AbilityScoreInput
                value={abilityScores[ability.key]}
                onChange={(value) => updateAbilityScore(ability.key, value)}
                readOnly={readOnly}
              />
            </div>

            <Separator className="my-4" />

            {/* Saving Throws */}
            <div className="mb-4">
              <div className="flex items-center justify-between rounded-md border p-2">
                <div className="flex items-center space-x-2">
                  <Shield className="h-4 w-4 text-slate-500" />
                  <Checkbox
                    id={`save-${ability.key}`}
                    checked={savingThrows[ability.key]}
                    onCheckedChange={() =>
                      toggleSavingThrowProficiency(ability.key)
                    }
                    disabled={readOnly}
                  />
                  <label
                    htmlFor={`save-${ability.key}`}
                    className="text-sm leading-none font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Saving Throw
                  </label>
                </div>
                <div className="font-bold">
                  {getSavingThrowModifier(ability.key) >= 0 ? "+" : ""}
                  {getSavingThrowModifier(ability.key)}
                </div>
              </div>
            </div>

            {/* Skills */}
            {skillsByAbility[ability.key].length > 0 && (
              <div className="space-y-2">
                {skillsByAbility[ability.key].map((skill) => {
                  const SkillIcon = skill.icon;
                  return (
                    <div
                      key={skill.name}
                      className="flex items-center justify-between rounded-md border p-2"
                    >
                      <div className="flex items-center space-x-2">
                        <SkillIcon className="h-4 w-4 text-slate-500" />
                        <Checkbox
                          id={skill.name}
                          checked={skills[skill.name]}
                          onCheckedChange={() =>
                            toggleSkillProficiency(skill.name)
                          }
                          disabled={readOnly}
                        />
                        <label
                          htmlFor={skill.name}
                          className="text-sm leading-none font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          {skill.label}
                        </label>
                      </div>
                      <div className="font-bold">
                        {getSkillModifier(skill.name, ability.key) >= 0
                          ? "+"
                          : ""}
                        {getSkillModifier(skill.name, ability.key)}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
