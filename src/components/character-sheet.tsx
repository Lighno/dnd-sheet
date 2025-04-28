"use client";

import { useEffect, useState } from "react";
import { Eye, Pencil } from "lucide-react";
import CharacterInfo from "./character-info";
import AbilityScores from "./ability-scores";
import Equipment from "./equipment";
import Spells from "./spells";
import Features from "./features";
import CombatStats from "./combat-stats";
import Weapons from "./weapons";
import type { Character } from "~/lib/character-data";
import { defaultCharacter } from "~/lib/character-data";
import { Label } from "~/components/ui/label";
import { Switch } from "~/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";
import { calculateModifier } from "~/lib/utils";

const STORAGE_KEY = "dnd-character";

export default function CharacterSheet() {
  const [character, setCharacter] = useState<Character>(defaultCharacter);
  const [readOnly, setReadOnly] = useState(false);

  // Load character data from localStorage on mount
  useEffect(() => {
    const savedCharacter = localStorage.getItem(STORAGE_KEY);
    if (savedCharacter) {
      try {
        setCharacter(JSON.parse(savedCharacter));
      } catch (e) {
        console.error("Failed to parse saved character:", e);
      }
    }
  }, []);

  const updateCharacter = (updates: Partial<Character>) => {
    if (readOnly) return;
    setCharacter((prev) => {
      const newCharacter = { ...prev, ...updates };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newCharacter));
      return newCharacter;
    });
  };

  const updateLevel = (value: number) => {
    if (readOnly) return;
    setCharacter((prev) => {
      let newMaxHp = prev.combatStats.maxHp;
      const conMod = calculateModifier(prev.abilityScores.constitution);
      if (value > prev.level) {
        newMaxHp =
          prev.combatStats.maxHp +
          prev.combatStats.hitDice.dieType / 2 +
          1 +
          conMod;
      } else {
        newMaxHp =
          prev.combatStats.maxHp -
          prev.combatStats.hitDice.dieType / 2 -
          1 -
          conMod;
      }
      return {
        ...prev,
        level: value,
        combatStats: {
          ...prev.combatStats,
          maxHp: Math.max(newMaxHp, 1),
          currentHp: Math.max(newMaxHp, 1),
          hitDice: { ...prev.combatStats.hitDice, total: value },
        },
      };
    });
  };

  const updateAbilityScore = (
    ability: keyof typeof character.abilityScores,
    value: number,
  ) => {
    if (readOnly) return;
    setCharacter((prev) => {
      const newCharacter = {
        ...prev,
        abilityScores: {
          ...prev.abilityScores,
          [ability]: value,
        },
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newCharacter));
      return newCharacter;
    });
  };

  return (
    <div className="rounded-lg border border-slate-200 bg-white shadow-lg dark:border-slate-800 dark:bg-slate-950">
      <div className="flex items-center justify-between border-b border-slate-200 p-4 dark:border-slate-800">
        <h1 className="text-xl font-bold">D&D Character Sheet</h1>
        <div className="flex items-center space-x-2">
          {readOnly ? (
            <Eye className="h-4 w-4 text-slate-500" />
          ) : (
            <Pencil className="h-4 w-4 text-slate-500" />
          )}
          <Switch
            id="read-only-mode"
            checked={readOnly}
            onCheckedChange={setReadOnly}
          />
          <Label htmlFor="read-only-mode" className="text-sm">
            {readOnly ? "Read Only" : "Edit Mode"}
          </Label>
        </div>
      </div>

      <CharacterInfo
        character={character}
        updateCharacter={updateCharacter}
        updateLevel={updateLevel}
        readOnly={readOnly}
      />

      <div className="border-b border-slate-200 p-4 dark:border-slate-800">
        <CombatStats
          combatStats={character.combatStats}
          abilityScores={character.abilityScores}
          level={character.level}
          updateCharacter={updateCharacter}
          readOnly={readOnly}
        />
      </div>

      <Tabs defaultValue="abilities" className="p-4">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="abilities">Abilities & Skills</TabsTrigger>
          <TabsTrigger value="combat">Combat</TabsTrigger>
          <TabsTrigger value="features">Features</TabsTrigger>
          <TabsTrigger value="equipment">Equipment</TabsTrigger>
          <TabsTrigger value="spells">Spells</TabsTrigger>
        </TabsList>

        <TabsContent value="abilities" className="mt-4">
          <AbilityScores
            abilityScores={character.abilityScores}
            savingThrows={character.savingThrows}
            skills={character.skills}
            proficiencyBonus={character.proficiencyBonus}
            updateAbilityScore={updateAbilityScore}
            updateCharacter={updateCharacter}
            readOnly={readOnly}
          />
        </TabsContent>

        <TabsContent value="combat" className="mt-4">
          <Weapons
            weapons={character.weapons}
            abilityScores={character.abilityScores}
            proficiencyBonus={character.proficiencyBonus}
            updateCharacter={updateCharacter}
            readOnly={readOnly}
          />
        </TabsContent>

        <TabsContent value="features" className="mt-4">
          <Features
            features={character.features}
            updateCharacter={updateCharacter}
            readOnly={readOnly}
          />
        </TabsContent>

        <TabsContent value="equipment" className="mt-4">
          <Equipment
            equipment={character.equipment}
            updateCharacter={updateCharacter}
            readOnly={readOnly}
          />
        </TabsContent>

        <TabsContent value="spells" className="mt-4">
          <Spells
            spells={character.spells}
            spellSlots={character.spellSlots}
            updateCharacter={updateCharacter}
            readOnly={readOnly}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
}
