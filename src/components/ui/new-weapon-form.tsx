import { useEffect, useState } from "react";
import { PlusCircle } from "lucide-react";
import type {
  AbilityScores,
  DamageType,
  Weapon,
  WeaponType,
} from "~/lib/character-data";
import Button from "~/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { Checkbox } from "~/components/ui/checkbox";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import { WeaponProperties } from "~/components/ui/weapon-properties";

interface NewWeaponFormProps {
  onAdd: (weapon: Omit<Weapon, "id">) => void;
  damageTypes: Array<{ value: DamageType; label: string }>;
  weaponTypes: Array<{ value: WeaponType; label: string }>;
  editWeapon?: Weapon | null;
  onSaveEdit?: (weapon: Omit<Weapon, "id">) => void;
  onCancelEdit?: () => void;
}

const abilityOptions: Array<{ value: keyof AbilityScores; label: string }> = [
  { value: "strength", label: "Strength" },
  { value: "dexterity", label: "Dexterity" },
  { value: "constitution", label: "Constitution" },
  { value: "intelligence", label: "Intelligence" },
  { value: "wisdom", label: "Wisdom" },
  { value: "charisma", label: "Charisma" },
];

const defaultWeapon: Omit<Weapon, "id"> = {
  name: "",
  type: "melee",
  isProficient: true,
  abilityScore: "strength",
  attackBonus: 0,
  damageDice: "1d8",
  damageBonus: 0,
  damageType: "slashing",
  properties: [],
  range: "",
  notes: "",
};

export function NewWeaponForm({
  onAdd,
  damageTypes,
  weaponTypes,
  editWeapon = null,
  onSaveEdit,
  onCancelEdit,
}: NewWeaponFormProps) {
  const [newWeapon, setNewWeapon] = useState<Omit<Weapon, "id">>(
    editWeapon ? { ...editWeapon } : defaultWeapon,
  );

  useEffect(() => {
    if (editWeapon) {
      setNewWeapon(editWeapon);
    } else {
      setNewWeapon(defaultWeapon);
    }
  }, [editWeapon]);

  const handleAdd = () => {
    if (!newWeapon.name) return;
    onAdd(newWeapon);
    setNewWeapon(defaultWeapon);
  };

  const handleSave = () => {
    if (!newWeapon.name || !onSaveEdit) return;
    onSaveEdit(newWeapon);
  };

  // Name and Type row
  const NameAndTypeRow = () => (
    <div className="grid grid-cols-2 gap-4">
      <div className="space-y-2">
        <Label htmlFor="weapon-name">Name</Label>
        <Input
          id="weapon-name"
          value={newWeapon.name}
          onChange={(e) => setNewWeapon({ ...newWeapon, name: e.target.value })}
          placeholder="Longsword"
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="weapon-type">Type</Label>
        <Select
          value={newWeapon.type}
          onValueChange={(value) =>
            setNewWeapon({ ...newWeapon, type: value as WeaponType })
          }
        >
          <SelectTrigger id="weapon-type">
            <SelectValue placeholder="Select type" />
          </SelectTrigger>
          <SelectContent>
            {weaponTypes.map((type) => (
              <SelectItem key={type.value} value={type.value}>
                {type.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );

  // Ability and Damage Type row
  const AbilityAndDamageTypeRow = () => (
    <div className="grid grid-cols-2 gap-4">
      <div className="space-y-2">
        <Label htmlFor="weapon-ability">Ability</Label>
        <Select
          value={newWeapon.abilityScore}
          onValueChange={(value) =>
            setNewWeapon({
              ...newWeapon,
              abilityScore: value as keyof AbilityScores,
            })
          }
        >
          <SelectTrigger id="weapon-ability">
            <SelectValue placeholder="Select ability" />
          </SelectTrigger>
          <SelectContent>
            {abilityOptions.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="space-y-2">
        <Label htmlFor="weapon-damage-type">Damage Type</Label>
        <Select
          value={newWeapon.damageType}
          onValueChange={(value) =>
            setNewWeapon({
              ...newWeapon,
              damageType: value as DamageType,
            })
          }
        >
          <SelectTrigger id="weapon-damage-type">
            <SelectValue placeholder="Select damage type" />
          </SelectTrigger>
          <SelectContent>
            {damageTypes.map((type) => (
              <SelectItem key={type.value} value={type.value}>
                {type.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );

  // Damage Stats row
  const DamageStatsRow = () => (
    <div className="flex w-full flex-row gap-4">
      <div className="flex-1">
        <Label htmlFor="weapon-damage-dice">Damage Dice</Label>
        <Input
          id="weapon-damage-dice"
          value={newWeapon.damageDice}
          onChange={(e) =>
            setNewWeapon({ ...newWeapon, damageDice: e.target.value })
          }
          placeholder="1d8"
        />
      </div>
      <div className="flex-1">
        <Label htmlFor="weapon-damage-bonus">Damage Bonus</Label>
        <Input
          id="weapon-damage-bonus"
          type="number"
          value={newWeapon.damageBonus}
          onChange={(e) =>
            setNewWeapon({
              ...newWeapon,
              damageBonus: parseInt(e.target.value) || 0,
            })
          }
          placeholder="0"
        />
      </div>
      {newWeapon.type !== "melee" && (
        <div className="flex-1">
          <Label htmlFor="weapon-range">Range</Label>
          <Input
            id="weapon-range"
            value={newWeapon.range}
            onChange={(e) =>
              setNewWeapon({ ...newWeapon, range: e.target.value })
            }
            placeholder="20/60"
          />
        </div>
      )}
    </div>
  );

  // Proficiency checkbox
  const ProficiencyCheckbox = () => (
    <div className="flex items-center space-x-2">
      <Checkbox
        id="weapon-proficient"
        checked={newWeapon.isProficient}
        onCheckedChange={(checked) =>
          setNewWeapon({ ...newWeapon, isProficient: !!checked })
        }
      />
      <label
        htmlFor="weapon-proficient"
        className="text-sm leading-none font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
      >
        Proficient with this weapon
      </label>
    </div>
  );

  // Notes textarea
  const NotesTextarea = () => (
    <div className="space-y-2">
      <Label htmlFor="weapon-notes">Notes</Label>
      <textarea
        id="weapon-notes"
        value={newWeapon.notes}
        onChange={(e) => setNewWeapon({ ...newWeapon, notes: e.target.value })}
        className="bg-background min-h-[48px] w-full rounded-md border px-3 py-2 text-sm"
        placeholder="Special properties or notes"
      />
    </div>
  );

  // Properties component
  const PropertiesComponent = () => (
    <div className="space-y-2">
      <Label className="text-xs">Properties</Label>
      <WeaponProperties
        weapon={{ ...newWeapon, id: "temp" }}
        onUpdate={(_id, updates) => {
          if (updates.properties) {
            setNewWeapon({
              ...newWeapon,
              properties: updates.properties,
            });
          }
        }}
      />
    </div>
  );

  // Action buttons
  const ActionButtons = () =>
    editWeapon ? (
      <div className="flex gap-2">
        <Button onClick={handleSave} className="flex-1" variant="default">
          Save
        </Button>
        <Button
          onClick={onCancelEdit}
          className="flex-1"
          variant="secondary"
          type="button"
        >
          Cancel
        </Button>
      </div>
    ) : (
      <Button onClick={handleAdd} className="w-full">
        <PlusCircle className="mr-2 h-4 w-4" />
        Add Weapon
      </Button>
    );

  return (
    <Card>
      <CardHeader>
        <CardTitle>{editWeapon ? "Edit Weapon" : "Add New Weapon"}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          <NameAndTypeRow />
          <AbilityAndDamageTypeRow />
          <DamageStatsRow />
          <ProficiencyCheckbox />
          <NotesTextarea />
          <PropertiesComponent />
          <ActionButtons />
        </div>
      </CardContent>
    </Card>
  );
}
