"use client";

import { useState } from "react";
import type {
  AbilityScores,
  DamageType,
  Weapon,
  WeaponType,
} from "~/lib/character-data";
import { useCharacterStore } from "~/lib/stores/store-provider";
import { WeaponCard } from "~/components/ui/weapon-card";
import { NewWeaponForm } from "~/components/ui/new-weapon-form";

interface WeaponsProps {
  readOnly?: boolean;
}
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

const abilityOptions: Array<{ value: keyof AbilityScores; label: string }> = [
  { value: "strength", label: "Strength" },
  { value: "dexterity", label: "Dexterity" },
  { value: "constitution", label: "Constitution" },
  { value: "intelligence", label: "Intelligence" },
  { value: "wisdom", label: "Wisdom" },
  { value: "charisma", label: "Charisma" },
];

export default function Weapons({ readOnly = false }: WeaponsProps) {
  const { weapons, updateCharacter, abilityScores, proficiencyBonus } =
    useCharacterStore((state) => ({
      weapons: state.character.weapons,
      updateCharacter: state.updateCharacter,
      abilityScores: state.character.abilityScores,
      proficiencyBonus: state.character.proficiencyBonus,
    }));

  const [editingWeapon, setEditingWeapon] = useState<Weapon | null>(null);

  const addWeapon = (newWeapon: Omit<Weapon, "id">) => {
    if (readOnly) return;
    const weapon = {
      ...newWeapon,
      id: crypto.randomUUID(),
    };
    updateCharacter({
      weapons: [...weapons, weapon],
    });
  };

  const removeWeapon = (id: string) => {
    if (readOnly) return;
    updateCharacter({
      weapons: weapons.filter((weapon) => weapon.id !== id),
    });
    if (editingWeapon && editingWeapon.id === id) setEditingWeapon(null);
  };

  const updateWeapon = (id: string, updates: Partial<Weapon>) => {
    if (readOnly) return;
    updateCharacter({
      weapons: weapons.map((weapon) =>
        weapon.id === id ? { ...weapon, ...updates } : weapon,
      ),
    });
  };

  const handleEdit = (weapon: Weapon) => {
    setEditingWeapon(weapon);
  };

  const handleSaveEdit = (updated: Omit<Weapon, "id">) => {
    if (!editingWeapon) return;
    updateWeapon(editingWeapon.id, updated);
    setEditingWeapon(null);
  };

  const handleCancelEdit = () => {
    setEditingWeapon(null);
  };

  return (
    <div className="space-y-6">
      <div className="grid gap-4">
        {weapons.map((weapon) => (
          <WeaponCard
            key={weapon.id}
            weapon={weapon}
            readOnly={readOnly}
            abilityScores={abilityScores}
            proficiencyBonus={proficiencyBonus}
            onRemove={removeWeapon}
            onEdit={handleEdit}
          />
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
        <NewWeaponForm
          onAdd={addWeapon}
          abilityOptions={abilityOptions}
          damageTypes={damageTypes}
          weaponTypes={weaponTypes}
          editWeapon={editingWeapon}
          onSaveEdit={handleSaveEdit}
          onCancelEdit={handleCancelEdit}
        />
      )}
    </div>
  );
}
