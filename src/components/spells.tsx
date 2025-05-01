"use client";

import { PlusCircle, Trash2 } from "lucide-react";
import { useState } from "react";
import type { Character, Spell, SpellSlots } from "~/lib/character-data";
import { Button } from "~/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";

interface SpellsProps {
  spells: Array<Spell>;
  spellSlots: SpellSlots;
  updateCharacter: (updates: Partial<Character>) => void;
  readOnly: boolean;
}

export default function Spells({
  spells,
  spellSlots,
  updateCharacter,
  readOnly,
}: SpellsProps) {
  const [newSpell, setNewSpell] = useState<Spell>({
    id: "",
    name: "",
    level: 0,
    school: "abjuration",
    castingTime: "",
    range: "",
    components: "",
    duration: "",
    description: "",
    prepared: false,
  });

  const addSpell = () => {
    if (!newSpell.name) return;
    if (readOnly) return;

    const spell = {
      ...newSpell,
      id: crypto.randomUUID(),
    };

    updateCharacter({
      spells: [...spells, spell],
    });

    setNewSpell({
      id: "",
      name: "",
      level: 0,
      school: "abjuration",
      castingTime: "",
      range: "",
      components: "",
      duration: "",
      description: "",
      prepared: false,
    });
  };

  const removeSpell = (id: string) => {
    if (readOnly) return;
    updateCharacter({
      spells: spells.filter((spell) => spell.id !== id),
    });
  };

  const togglePrepared = (id: string) => {
    updateCharacter({
      spells: spells.map((spell) =>
        spell.id === id ? { ...spell, prepared: !spell.prepared } : spell,
      ),
    });
  };

  const updateSpellSlot = (
    level: keyof SpellSlots,
    field: "used" | "total",
    value: number,
  ) => {
    if (readOnly && field === "total") return;
    updateCharacter({
      spellSlots: {
        ...spellSlots,
        [level]: {
          ...spellSlots[level],
          [field]: value,
        },
      },
    });
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
                          updateSpellSlot(
                            level as keyof SpellSlots,
                            "used",
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
                          updateSpellSlot(
                            level as keyof SpellSlots,
                            "total",
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

        <Card>
          <CardHeader>
            <CardTitle>Add New Spell</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="spell-name">Name</Label>
                  <Input
                    id="spell-name"
                    value={newSpell.name}
                    onChange={(e) =>
                      setNewSpell({ ...newSpell, name: e.target.value })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="spell-level">Level</Label>
                  <Select
                    value={newSpell.level.toString()}
                    onValueChange={(value) =>
                      setNewSpell({
                        ...newSpell,
                        level: Number.parseInt(value),
                      })
                    }
                  >
                    <SelectTrigger id="spell-level">
                      <SelectValue placeholder="Select level" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="0">Cantrip</SelectItem>
                      <SelectItem value="1">1st Level</SelectItem>
                      <SelectItem value="2">2nd Level</SelectItem>
                      <SelectItem value="3">3rd Level</SelectItem>
                      <SelectItem value="4">4th Level</SelectItem>
                      <SelectItem value="5">5th Level</SelectItem>
                      <SelectItem value="6">6th Level</SelectItem>
                      <SelectItem value="7">7th Level</SelectItem>
                      <SelectItem value="8">8th Level</SelectItem>
                      <SelectItem value="9">9th Level</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="spell-school">School</Label>
                  <Select
                    value={newSpell.school}
                    onValueChange={(value) =>
                      setNewSpell({ ...newSpell, school: value })
                    }
                  >
                    <SelectTrigger id="spell-school">
                      <SelectValue placeholder="Select school" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="abjuration">Abjuration</SelectItem>
                      <SelectItem value="conjuration">Conjuration</SelectItem>
                      <SelectItem value="divination">Divination</SelectItem>
                      <SelectItem value="enchantment">Enchantment</SelectItem>
                      <SelectItem value="evocation">Evocation</SelectItem>
                      <SelectItem value="illusion">Illusion</SelectItem>
                      <SelectItem value="necromancy">Necromancy</SelectItem>
                      <SelectItem value="transmutation">
                        Transmutation
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="spell-casting-time">Casting Time</Label>
                  <Input
                    id="spell-casting-time"
                    value={newSpell.castingTime}
                    onChange={(e) =>
                      setNewSpell({ ...newSpell, castingTime: e.target.value })
                    }
                    placeholder="1 action"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="spell-range">Range</Label>
                  <Input
                    id="spell-range"
                    value={newSpell.range}
                    onChange={(e) =>
                      setNewSpell({ ...newSpell, range: e.target.value })
                    }
                    placeholder="60 feet"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="spell-duration">Duration</Label>
                  <Input
                    id="spell-duration"
                    value={newSpell.duration}
                    onChange={(e) =>
                      setNewSpell({ ...newSpell, duration: e.target.value })
                    }
                    placeholder="Instantaneous"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="spell-components">Components</Label>
                <Input
                  id="spell-components"
                  value={newSpell.components}
                  onChange={(e) =>
                    setNewSpell({ ...newSpell, components: e.target.value })
                  }
                  placeholder="V, S, M (a pinch of dust)"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="spell-description">Description</Label>
                <Textarea
                  id="spell-description"
                  value={newSpell.description}
                  onChange={(e) =>
                    setNewSpell({ ...newSpell, description: e.target.value })
                  }
                  rows={3}
                />
              </div>
              <Button onClick={addSpell} className="w-full">
                <PlusCircle className="mr-2 h-4 w-4" />
                Add Spell
              </Button>
            </div>
          </CardContent>
        </Card>
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
                  <Card
                    key={spell.id}
                    className={spell.prepared ? "border-primary" : ""}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-semibold">{spell.name}</h4>
                          <p className="text-xs text-slate-500 capitalize">
                            {level === 0 ? "Cantrip" : `Level ${level}`} •{" "}
                            {spell.school}
                          </p>
                        </div>
                        <div className="flex items-center space-x-2">
                          {level > 0 && (
                            <Button
                              variant={spell.prepared ? "default" : "outline"}
                              size="sm"
                              onClick={() => togglePrepared(spell.id)}
                            >
                              {spell.prepared ? "Prepared" : "Prepare"}
                            </Button>
                          )}
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => removeSpell(spell.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                            <span className="sr-only">Remove</span>
                          </Button>
                        </div>
                      </div>
                      <div className="mt-2 grid grid-cols-2 gap-x-4 gap-y-1 text-xs">
                        <div>
                          <span className="font-semibold">Casting Time:</span>{" "}
                          {spell.castingTime}
                        </div>
                        <div>
                          <span className="font-semibold">Range:</span>{" "}
                          {spell.range}
                        </div>
                        <div>
                          <span className="font-semibold">Components:</span>{" "}
                          {spell.components}
                        </div>
                        <div>
                          <span className="font-semibold">Duration:</span>{" "}
                          {spell.duration}
                        </div>
                      </div>
                      {spell.description && (
                        <p className="mt-2 text-sm">{spell.description}</p>
                      )}
                    </CardContent>
                  </Card>
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
