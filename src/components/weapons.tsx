"use client";

import { PlusCircle, Swords, Trash2 } from "lucide-react";
import { useState } from "react";
import type {
  AbilityScores,
  Character,
  DamageType,
  Weapon,
  WeaponType,
} from "~/lib/character-data";
import { Button } from "~/components/ui/button";
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
import { Textarea } from "~/components/ui/textarea";
import { calculateModifier } from "~/lib/utils";

interface WeaponsProps {
  weapons: Array<Weapon>;
  abilityScores: AbilityScores;
  proficiencyBonus: number;
  updateCharacter: (updates: Partial<Character>) => void;
  readOnly?: boolean;
}

export default function Weapons({
  weapons,
  abilityScores,
  proficiencyBonus,
  updateCharacter,
  readOnly = false,
}: WeaponsProps) {
  const [newWeapon, setNewWeapon] = useState<Omit<Weapon, "id">>({
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
  });

  const weaponTypes: Array<{ value: WeaponType; label: string }> = [
    { value: "melee", label: "Melee" },
    { value: "ranged", label: "Ranged" },
    { value: "spell", label: "Spell" },
  ];

  const damageTypes: Array<{ value: DamageType; label: string }> = [
    { value: "acid", label: "Acid" },
    { value: "bludgeoning", label: "Bludgeoning" },
    { value: "cold", label: "Cold" },
    { value: "fire", label: "Fire" },
    { value: "force", label: "Force" },
    { value: "lightning", label: "Lightning" },
    { value: "necrotic", label: "Necrotic" },
    { value: "piercing", label: "Piercing" },
    { value: "poison", label: "Poison" },
    { value: "psychic", label: "Psychic" },
    { value: "radiant", label: "Radiant" },
    { value: "slashing", label: "Slashing" },
    { value: "thunder", label: "Thunder" },
  ];

  const abilityOptions = [
    { value: "strength", label: "Strength" },
    { value: "dexterity", label: "Dexterity" },
    { value: "constitution", label: "Constitution" },
    { value: "intelligence", label: "Intelligence" },
    { value: "wisdom", label: "Wisdom" },
    { value: "charisma", label: "Charisma" },
  ];

  const commonProperties = [
    "ammunition",
    "finesse",
    "heavy",
    "light",
    "loading",
    "reach",
    "special",
    "thrown",
    "two-handed",
    "versatile",
  ];

  const addWeapon = () => {
    if (readOnly || !newWeapon.name) return;

    const weapon = {
      ...newWeapon,
      id: crypto.randomUUID(),
    };

    updateCharacter({
      weapons: [...weapons, weapon],
    });

    setNewWeapon({
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
    });
  };

  const removeWeapon = (id: string) => {
    if (readOnly) return;
    updateCharacter({
      weapons: weapons.filter((weapon) => weapon.id !== id),
    });
  };

  const updateWeapon = (id: string, updates: Partial<Weapon>) => {
    if (readOnly) return;
    updateCharacter({
      weapons: weapons.map((weapon) =>
        weapon.id === id ? { ...weapon, ...updates } : weapon,
      ),
    });
  };

  const toggleProperty = (weapon: Weapon, property: string) => {
    if (readOnly) return;
    const properties = weapon.properties.includes(property)
      ? weapon.properties.filter((p) => p !== property)
      : [...weapon.properties, property];

    updateWeapon(weapon.id, { properties });
  };

  const calculateAttackBonus = (weapon: Weapon) => {
    const abilityModifier = calculateModifier(
      abilityScores[weapon.abilityScore],
    );
    const proficiencyModifier = weapon.isProficient ? proficiencyBonus : 0;
    return abilityModifier + proficiencyModifier + weapon.attackBonus;
  };

  const calculateDamageBonus = (weapon: Weapon) => {
    const abilityModifier = calculateModifier(
      abilityScores[weapon.abilityScore],
    );
    return abilityModifier + weapon.damageBonus;
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <Swords className="mr-2 h-5 w-5" />
          <h2 className="text-lg font-semibold">Weapons & Attacks</h2>
        </div>
      </div>

      <div className="grid gap-4">
        {weapons.map((weapon) => (
          <Card key={weapon.id}>
            <CardContent className="p-4">
              <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold">{weapon.name}</h3>
                    {!readOnly && (
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => removeWeapon(weapon.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                        <span className="sr-only">Remove</span>
                      </Button>
                    )}
                  </div>
                  <div className="text-sm text-slate-500 capitalize">
                    {weapon.type} • {weapon.damageType}
                    {weapon.range && ` • Range ${weapon.range}`}
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="text-center">
                    <div className="flex h-14 w-14 items-center justify-center rounded-full border-2 border-slate-300 dark:border-slate-700">
                      <span className="text-xl font-bold">
                        {calculateAttackBonus(weapon) >= 0 ? "+" : ""}
                        {calculateAttackBonus(weapon)}
                      </span>
                    </div>
                    <span className="text-xs">Attack</span>
                  </div>

                  <div className="text-center">
                    <div className="flex h-14 w-14 items-center justify-center rounded-full border-2 border-slate-300 dark:border-slate-700">
                      <span className="text-xl font-bold">
                        {weapon.damageDice}
                        {calculateDamageBonus(weapon) !== 0 &&
                          `${calculateDamageBonus(weapon) > 0 ? "+" : ""}${calculateDamageBonus(weapon)}`}
                      </span>
                    </div>
                    <span className="text-xs">Damage</span>
                  </div>
                </div>
              </div>

              {!readOnly && (
                <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
                  <div className="space-y-4">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id={`proficient-${weapon.id}`}
                        checked={weapon.isProficient}
                        onCheckedChange={(checked) =>
                          updateWeapon(weapon.id, { isProficient: !!checked })
                        }
                      />
                      <label
                        htmlFor={`proficient-${weapon.id}`}
                        className="text-sm leading-none font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        Proficient
                      </label>
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <div className="space-y-1">
                        <Label
                          htmlFor={`ability-${weapon.id}`}
                          className="text-xs"
                        >
                          Ability
                        </Label>
                        <Select
                          value={weapon.abilityScore}
                          onValueChange={(value) =>
                            updateWeapon(weapon.id, {
                              abilityScore: value as keyof AbilityScores,
                            })
                          }
                        >
                          <SelectTrigger
                            id={`ability-${weapon.id}`}
                            className="h-8"
                          >
                            <SelectValue placeholder="Select ability" />
                          </SelectTrigger>
                          <SelectContent>
                            {abilityOptions.map((option) => (
                              <SelectItem
                                key={option.value}
                                value={option.value}
                              >
                                {option.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-1">
                        <Label
                          htmlFor={`attack-bonus-${weapon.id}`}
                          className="text-xs"
                        >
                          Attack Bonus
                        </Label>
                        <Input
                          id={`attack-bonus-${weapon.id}`}
                          type="number"
                          value={weapon.attackBonus}
                          onChange={(e) =>
                            updateWeapon(weapon.id, {
                              attackBonus: Number.parseInt(e.target.value) || 0,
                            })
                          }
                          className="h-8"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <div className="space-y-1">
                        <Label
                          htmlFor={`damage-dice-${weapon.id}`}
                          className="text-xs"
                        >
                          Damage Dice
                        </Label>
                        <Input
                          id={`damage-dice-${weapon.id}`}
                          value={weapon.damageDice}
                          onChange={(e) =>
                            updateWeapon(weapon.id, {
                              damageDice: e.target.value,
                            })
                          }
                          className="h-8"
                          placeholder="1d8"
                        />
                      </div>

                      <div className="space-y-1">
                        <Label
                          htmlFor={`damage-bonus-${weapon.id}`}
                          className="text-xs"
                        >
                          Damage Bonus
                        </Label>
                        <Input
                          id={`damage-bonus-${weapon.id}`}
                          type="number"
                          value={weapon.damageBonus}
                          onChange={(e) =>
                            updateWeapon(weapon.id, {
                              damageBonus: Number.parseInt(e.target.value) || 0,
                            })
                          }
                          className="h-8"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <div className="space-y-1">
                        <Label
                          htmlFor={`damage-type-${weapon.id}`}
                          className="text-xs"
                        >
                          Damage Type
                        </Label>
                        <Select
                          value={weapon.damageType}
                          onValueChange={(value) =>
                            updateWeapon(weapon.id, {
                              damageType: value as DamageType,
                            })
                          }
                        >
                          <SelectTrigger
                            id={`damage-type-${weapon.id}`}
                            className="h-8"
                          >
                            <SelectValue placeholder="Select type" />
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

                      <div className="space-y-1">
                        <Label
                          htmlFor={`range-${weapon.id}`}
                          className="text-xs"
                        >
                          Range
                        </Label>
                        <Input
                          id={`range-${weapon.id}`}
                          value={weapon.range || ""}
                          onChange={(e) =>
                            updateWeapon(weapon.id, { range: e.target.value })
                          }
                          className="h-8"
                          placeholder="20/60"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label className="text-xs">Properties</Label>
                    <div className="grid grid-cols-2 gap-1">
                      {commonProperties.map((property) => (
                        <div
                          key={property}
                          className="flex items-center space-x-2"
                        >
                          <Checkbox
                            id={`property-${property}-${weapon.id}`}
                            checked={weapon.properties.includes(property)}
                            onCheckedChange={() =>
                              toggleProperty(weapon, property)
                            }
                          />
                          <label
                            htmlFor={`property-${property}-${weapon.id}`}
                            className="text-xs leading-none font-medium capitalize peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                          >
                            {property}
                          </label>
                        </div>
                      ))}
                    </div>

                    <div className="mt-2">
                      <Label htmlFor={`notes-${weapon.id}`} className="text-xs">
                        Notes
                      </Label>
                      <Textarea
                        id={`notes-${weapon.id}`}
                        value={weapon.notes || ""}
                        onChange={(e) =>
                          updateWeapon(weapon.id, { notes: e.target.value })
                        }
                        className="h-16 resize-none"
                        placeholder="Special properties or notes"
                      />
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        ))}

        {weapons.length === 0 && (
          <div className="py-8 text-center text-slate-500">
            <p>
              No weapons added yet.{" "}
              {!readOnly && "Add your first weapon below."}
            </p>
          </div>
        )}
      </div>

      {!readOnly && (
        <Card>
          <CardHeader>
            <CardTitle>Add New Weapon</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4">
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="weapon-name">Name</Label>
                  <Input
                    id="weapon-name"
                    value={newWeapon.name}
                    onChange={(e) =>
                      setNewWeapon({ ...newWeapon, name: e.target.value })
                    }
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

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
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

                <div className="space-y-2">
                  <Label htmlFor="weapon-range">Range (optional)</Label>
                  <Input
                    id="weapon-range"
                    value={newWeapon.range}
                    onChange={(e) =>
                      setNewWeapon({ ...newWeapon, range: e.target.value })
                    }
                    placeholder="20/60"
                  />
                </div>
              </div>

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

              <Button onClick={addWeapon} className="w-full">
                <PlusCircle className="mr-2 h-4 w-4" />
                Add Weapon
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
