import { useEffect, useState } from "react";
import { PlusCircle } from "lucide-react";
import type { Spell } from "~/lib/character-data";
import Button from "~/components/ui/button";
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

interface SpellFormProps {
  onAdd: (spell: Omit<Spell, "id">) => void;
  editSpell?: Spell | null;
  onSaveEdit?: (spell: Omit<Spell, "id">) => void;
  onCancelEdit?: () => void;
}

export function SpellForm({
  onAdd,
  editSpell = null,
  onSaveEdit,
  onCancelEdit,
}: SpellFormProps) {
  const defaultSpell: Omit<Spell, "id"> = {
    name: "",
    level: 0,
    school: "abjuration",
    castingTime: "",
    range: "",
    components: "",
    duration: "",
    description: "",
    prepared: false,
  };

  const [spell, setSpell] = useState<Omit<Spell, "id">>(editSpell ? { ...editSpell } : defaultSpell);

  useEffect(() => {
    if (editSpell) {
      setSpell(editSpell);
    } else {
      setSpell(defaultSpell);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editSpell]);

  const handleAdd = () => {
    if (!spell.name) return;
    onAdd(spell);
    setSpell(defaultSpell);
  };

  const handleSave = () => {
    if (!spell.name || !onSaveEdit) return;
    onSaveEdit(spell);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>{editSpell ? "Edit Spell" : "Add New Spell"}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="spell-name">Name</Label>
              <Input
                id="spell-name"
                value={spell.name}
                onChange={(e) =>
                  setSpell({ ...spell, name: e.target.value })
                }
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="spell-level">Level</Label>
              <Select
                value={spell.level.toString()}
                onValueChange={(value) =>
                  setSpell({
                    ...spell,
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
                value={spell.school}
                onValueChange={(value) =>
                  setSpell({ ...spell, school: value })
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
                  <SelectItem value="transmutation">Transmutation</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="spell-casting-time">Casting Time</Label>
              <Input
                id="spell-casting-time"
                value={spell.castingTime}
                onChange={(e) =>
                  setSpell({ ...spell, castingTime: e.target.value })
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
                value={spell.range}
                onChange={(e) =>
                  setSpell({ ...spell, range: e.target.value })
                }
                placeholder="60 feet"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="spell-duration">Duration</Label>
              <Input
                id="spell-duration"
                value={spell.duration}
                onChange={(e) =>
                  setSpell({ ...spell, duration: e.target.value })
                }
                placeholder="Instantaneous"
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="spell-components">Components</Label>
            <Input
              id="spell-components"
              value={spell.components}
              onChange={(e) =>
                setSpell({ ...spell, components: e.target.value })
              }
              placeholder="V, S, M (a pinch of dust)"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="spell-description">Description</Label>
            <Textarea
              id="spell-description"
              value={spell.description}
              onChange={(e) =>
                setSpell({ ...spell, description: e.target.value })
              }
              rows={3}
            />
          </div>
          {editSpell ? (
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
              Add Spell
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
