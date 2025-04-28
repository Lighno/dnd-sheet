"use client";

import type { AbilityScores, Character, Skill } from "~/lib/character-data";
import { Checkbox } from "~/components/ui/checkbox";
import { Card, CardContent } from "~/components/ui/card";
import { calculateModifier } from "~/lib/utils";

interface SkillsProps {
  skills: Record<Skill, boolean>;
  abilityScores: AbilityScores;
  proficiencyBonus: number;
  updateCharacter: (updates: Partial<Character>) => void;
  readOnly?: boolean;
}

export default function Skills({
  skills,
  abilityScores,
  proficiencyBonus,
  updateCharacter,
  readOnly = false,
}: SkillsProps) {
  const skillsList: Array<{
    name: Skill;
    ability: keyof AbilityScores;
    label: string;
  }> = [
    { name: "acrobatics", ability: "dexterity", label: "Acrobatics" },
    { name: "animalHandling", ability: "wisdom", label: "Animal Handling" },
    { name: "arcana", ability: "intelligence", label: "Arcana" },
    { name: "athletics", ability: "strength", label: "Athletics" },
    { name: "deception", ability: "charisma", label: "Deception" },
    { name: "history", ability: "intelligence", label: "History" },
    { name: "insight", ability: "wisdom", label: "Insight" },
    { name: "intimidation", ability: "charisma", label: "Intimidation" },
    { name: "investigation", ability: "intelligence", label: "Investigation" },
    { name: "medicine", ability: "wisdom", label: "Medicine" },
    { name: "nature", ability: "intelligence", label: "Nature" },
    { name: "perception", ability: "wisdom", label: "Perception" },
    { name: "performance", ability: "charisma", label: "Performance" },
    { name: "persuasion", ability: "charisma", label: "Persuasion" },
    { name: "religion", ability: "intelligence", label: "Religion" },
    { name: "sleightOfHand", ability: "dexterity", label: "Sleight of Hand" },
    { name: "stealth", ability: "dexterity", label: "Stealth" },
    { name: "survival", ability: "wisdom", label: "Survival" },
  ];

  const toggleProficiency = (skill: Skill) => {
    if (readOnly) return;
    updateCharacter({
      skills: {
        ...skills,
        [skill]: !skills[skill],
      },
    });
  };

  const getSkillModifier = (skill: Skill, ability: keyof AbilityScores) => {
    const abilityModifier = calculateModifier(abilityScores[ability]);
    const isProficient = skills[skill];
    return isProficient ? abilityModifier + proficiencyBonus : abilityModifier;
  };

  return (
    <Card>
      <CardContent className="p-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {skillsList.map((skill) => (
            <div
              key={skill.name}
              className="flex items-center justify-between p-2 border rounded-md"
            >
              <div className="flex items-center space-x-2">
                <Checkbox
                  id={skill.name}
                  checked={skills[skill.name]}
                  onCheckedChange={() => toggleProficiency(skill.name)}
                  disabled={readOnly}
                />
                <label
                  htmlFor={skill.name}
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  {skill.label}{" "}
                  <span className="text-slate-500">
                    ({skill.ability.substring(0, 3).toUpperCase()})
                  </span>
                </label>
              </div>
              <div className="font-bold">
                {getSkillModifier(skill.name, skill.ability) >= 0 ? "+" : ""}
                {getSkillModifier(skill.name, skill.ability)}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
