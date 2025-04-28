import type { Character } from "~/lib/character-data";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";

interface CharacterInfoProps {
  character: Character;
  updateCharacter: (updates: Partial<Character>) => void;
  updateLevel: (value: number) => void;
  readOnly?: boolean;
}

export default function CharacterInfo({
  character,
  updateCharacter,
  updateLevel,
  readOnly = false,
}: CharacterInfoProps) {
  return (
    <div className="p-4 border-b border-slate-200 dark:border-slate-800">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="space-y-2">
          <Label htmlFor="name">Character Name</Label>
          <Input
            id="name"
            value={character.name}
            onChange={(e) => updateCharacter({ name: e.target.value })}
            readOnly={readOnly}
            className={readOnly ? "bg-slate-50 dark:bg-slate-900" : ""}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="class">Class</Label>
            <Select
              value={character.class}
              onValueChange={(value) => updateCharacter({ class: value })}
              disabled={readOnly}
            >
              <SelectTrigger
                id="class"
                className={readOnly ? "bg-slate-50 dark:bg-slate-900" : ""}
              >
                <SelectValue placeholder="Select class" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="barbarian">Barbarian</SelectItem>
                <SelectItem value="bard">Bard</SelectItem>
                <SelectItem value="cleric">Cleric</SelectItem>
                <SelectItem value="druid">Druid</SelectItem>
                <SelectItem value="fighter">Fighter</SelectItem>
                <SelectItem value="monk">Monk</SelectItem>
                <SelectItem value="paladin">Paladin</SelectItem>
                <SelectItem value="ranger">Ranger</SelectItem>
                <SelectItem value="rogue">Rogue</SelectItem>
                <SelectItem value="sorcerer">Sorcerer</SelectItem>
                <SelectItem value="warlock">Warlock</SelectItem>
                <SelectItem value="wizard">Wizard</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="level">Level</Label>
            <Input
              id="level"
              type="number"
              min="1"
              max="20"
              value={character.level}
              onChange={(e) =>
                updateLevel(Number.parseInt(e.target.value) || 1)
              }
              readOnly={readOnly}
              className={readOnly ? "bg-slate-50 dark:bg-slate-900" : ""}
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="race">Race</Label>
            <Select
              value={character.race}
              onValueChange={(value) => updateCharacter({ race: value })}
              disabled={readOnly}
            >
              <SelectTrigger
                id="race"
                className={readOnly ? "bg-slate-50 dark:bg-slate-900" : ""}
              >
                <SelectValue placeholder="Select race" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="dragonborn">Dragonborn</SelectItem>
                <SelectItem value="dwarf">Dwarf</SelectItem>
                <SelectItem value="elf">Elf</SelectItem>
                <SelectItem value="gnome">Gnome</SelectItem>
                <SelectItem value="half-elf">Half-Elf</SelectItem>
                <SelectItem value="half-orc">Half-Orc</SelectItem>
                <SelectItem value="halfling">Halfling</SelectItem>
                <SelectItem value="human">Human</SelectItem>
                <SelectItem value="tiefling">Tiefling</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="background">Background</Label>
            <Input
              id="background"
              value={character.background}
              onChange={(e) => updateCharacter({ background: e.target.value })}
              readOnly={readOnly}
              className={readOnly ? "bg-slate-50 dark:bg-slate-900" : ""}
            />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4 mt-4">
        <div className="space-y-2">
          <Label htmlFor="alignment">Alignment</Label>
          <Select
            value={character.alignment}
            onValueChange={(value) => updateCharacter({ alignment: value })}
            disabled={readOnly}
          >
            <SelectTrigger
              id="alignment"
              className={readOnly ? "bg-slate-50 dark:bg-slate-900" : ""}
            >
              <SelectValue placeholder="Select alignment" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="lawful-good">Lawful Good</SelectItem>
              <SelectItem value="neutral-good">Neutral Good</SelectItem>
              <SelectItem value="chaotic-good">Chaotic Good</SelectItem>
              <SelectItem value="lawful-neutral">Lawful Neutral</SelectItem>
              <SelectItem value="true-neutral">True Neutral</SelectItem>
              <SelectItem value="chaotic-neutral">Chaotic Neutral</SelectItem>
              <SelectItem value="lawful-evil">Lawful Evil</SelectItem>
              <SelectItem value="neutral-evil">Neutral Evil</SelectItem>
              <SelectItem value="chaotic-evil">Chaotic Evil</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="experience">Experience Points</Label>
          <Input
            id="experience"
            value={character.experiencePoints}
            onChange={(e) =>
              updateCharacter({ experiencePoints: e.target.value })
            }
            readOnly={readOnly}
            className={readOnly ? "bg-slate-50 dark:bg-slate-900" : ""}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="proficiency">Proficiency Bonus</Label>
          <Input
            id="proficiency"
            value={`+${character.proficiencyBonus}`}
            readOnly
            className="bg-slate-50 dark:bg-slate-900"
          />
        </div>
      </div>
    </div>
  );
}
