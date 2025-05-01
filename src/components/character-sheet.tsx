"use client";

import { useState } from "react";
import { Eye, Pencil } from "lucide-react";
import CharacterInfo from "./character-info";
import AbilityScores from "./ability-scores";
import Equipment from "./equipment";
import Spells from "./spells";
import Features from "./features";
import CombatStats from "./combat-stats";
import Weapons from "./weapons";
import { Label } from "~/components/ui/label";
import { Switch } from "~/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";
import { useCharacterStore } from "~/lib/stores/store-provider";

export default function CharacterSheet() {
  const [readOnly, setReadOnly] = useState(false);

  // Use our store selectors for optimal performance
  const character = useCharacterStore((state) => state.character);
  const { updateCharacter, updateLevel, setAbilityScore } = useCharacterStore(
    (state) => ({
      updateCharacter: state.updateCharacter,
      updateLevel: state.updateLevel,
      setAbilityScore: state.setAbilityScore,
    }),
  );

  const handleLevelChange = (value: number) => {
    if (readOnly) return;
    updateLevel(value);
  };

  const handleAbilityScoreChange = (
    ability: keyof typeof character.abilityScores,
    value: number,
  ) => {
    if (readOnly) return;
    setAbilityScore(ability, value);
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
        updateLevel={handleLevelChange}
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
            updateAbilityScore={handleAbilityScoreChange}
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
