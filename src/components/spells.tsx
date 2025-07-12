"use client";

import { useState } from "react";
import type { Spell, SpellSlots } from "~/lib/character-data";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";
import { useCharacterStore } from "~/lib/stores/store-provider";
import { SpellCard } from "~/components/ui/spell-card";
import { SpellForm } from "~/components/ui/spell-form";

interface SpellsProps {
  readOnly: boolean;
}

export default function Spells({ readOnly = false }: SpellsProps) {
  const {
    spells,
    spellSlots,
    setSpellSlotUsed,
    setSpellSlotTotal,
    updateSpells,
  } = useCharacterStore((state) => ({
    spells: state.character.spells,
    spellSlots: state.character.spellSlots,
    setSpellSlotTotal: state.setSpellSlotTotal,
    setSpellSlotUsed: state.setSpellSlotUsed,
    updateSpells: state.updateSpells,
  }));

  const [editingSpell, setEditingSpell] = useState<Spell | null>(null);

  const addSpell = (newSpell: Omit<Spell, "id">) => {
    if (!newSpell.name) return;
    if (readOnly) return;

    const spell = {
      ...newSpell,
      id: crypto.randomUUID(),
    };

    updateSpells((oldSpells) => [...oldSpells, spell]);
  };

  const removeSpell = (id: string) => {
    if (readOnly) return;
    updateSpells((oldSpells) => oldSpells.filter((spell) => spell.id !== id));
    if (editingSpell && editingSpell.id === id) setEditingSpell(null);
  };

  const togglePrepared = (id: string) => {
    updateSpells((oldSpells) =>
      oldSpells.map((spell) =>
        spell.id === id ? { ...spell, prepared: !spell.prepared } : spell,
      ),
    );
  };

  const updateSpell = (id: string, updates: Partial<Spell>) => {
    if (readOnly) return;
    updateSpells((oldSpells) =>
      oldSpells.map((spell) =>
        spell.id === id ? { ...spell, ...updates } : spell,
      ),
    );
  };

  const handleEdit = (spell: Spell) => {
    setEditingSpell(spell);
  };

  const handleSaveEdit = (updated: Omit<Spell, "id">) => {
    if (!editingSpell) return;
    updateSpell(editingSpell.id, updated);
    setEditingSpell(null);
  };

  const handleCancelEdit = () => {
    setEditingSpell(null);
  };

  const spellLevels = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Spell Slots</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {spellLevels.slice(1).map((level) => (
                <div key={level} className="flex items-center justify-between">
                  <div className="font-semibold">Level {level}</div>
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-2">
                      <Label
                        htmlFor={`slots-used-${level}`}
                        className="text-sm"
                      >
                        Used:
                      </Label>
                      <Input
                        id={`slots-used-${level}`}
                        type="number"
                        min="0"
                        max={spellSlots[level as keyof SpellSlots].total || 0}
                        value={spellSlots[level as keyof SpellSlots].used || 0}
                        onChange={(e) =>
                          setSpellSlotUsed(
                            level as keyof SpellSlots,
                            Number.parseInt(e.target.value) || 0,
                          )
                        }
                        className="w-16 text-center"
                      />
                    </div>
                    <div className="flex items-center space-x-2">
                      <Label
                        htmlFor={`slots-total-${level}`}
                        className="text-sm"
                      >
                        Total:
                      </Label>
                      <Input
                        id={`slots-total-${level}`}
                        type="number"
                        min="0"
                        value={spellSlots[level as keyof SpellSlots].total || 0}
                        onChange={(e) =>
                          setSpellSlotTotal(
                            level as keyof SpellSlots,
                            Number.parseInt(e.target.value) || 0,
                          )
                        }
                        className="w-16 text-center"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {!readOnly && (
          <SpellForm
            onAdd={addSpell}
            editSpell={editingSpell}
            onSaveEdit={handleSaveEdit}
            onCancelEdit={handleCancelEdit}
          />
        )}
      </div>

      <Tabs defaultValue="0">
        <TabsList className="flex flex-wrap">
          <TabsTrigger value="0">Cantrips</TabsTrigger>
          {spellLevels.slice(1).map((level) => (
            <TabsTrigger key={level} value={level.toString()}>
              Level {level}
            </TabsTrigger>
          ))}
        </TabsList>

        {spellLevels.map((level) => (
          <TabsContent key={level} value={level.toString()} className="mt-4">
            <div className="grid gap-4">
              {spells
                .filter((spell) => spell.level === level)
                .map((spell) => (
                  <SpellCard
                    key={spell.id}
                    spell={spell}
                    readOnly={readOnly}
                    onRemove={removeSpell}
                    onEdit={handleEdit}
                    onTogglePrepared={togglePrepared}
                  />
                ))}
              {spells.filter((spell) => spell.level === level).length === 0 && (
                <div className="py-4 text-center text-slate-500">
                  No {level === 0 ? "cantrips" : `level ${level} spells`} added
                  yet.
                </div>
              )}
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}
