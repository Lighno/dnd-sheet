"use client";

import { useState } from "react";
import { getRouteApi } from "@tanstack/react-router";
import { Eye, Pencil } from "lucide-react";
import CharacterInfo from "./character-info";
import AbilityScores from "./ability-scores";
import AbilityScoreRow from "./ability-score-row";
import Equipment from "./equipment";
import Spells from "./spells";
import Features from "./features";
import CombatStats from "./combat-stats";
import Weapons from "./weapons";
import { Label } from "~/components/ui/label";
import { Switch } from "~/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";

const route = getRouteApi("/sheet");

export default function CharacterSheet() {
  const [readOnly, setReadOnly] = useState(false);
  const { section } = route.useSearch();
  const navigate = route.useNavigate();

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

      <CharacterInfo readOnly={readOnly} />

      <div className="border-b border-slate-200 p-4 dark:border-slate-800">
        <CombatStats readOnly={readOnly} />
        <div className="mt-6">
          <AbilityScoreRow readOnly={readOnly} />
        </div>
      </div>

      <Tabs
        value={section}
        onValueChange={(value) =>
          navigate({
            search: {
              section: value as typeof section,
            },
            resetScroll: false,
          })
        }
        className="p-4"
      >
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="abilities" className="cursor-pointer">
            Abilities & Skills
          </TabsTrigger>
          <TabsTrigger value="combat" className="cursor-pointer">
            Combat
          </TabsTrigger>
          <TabsTrigger value="features" className="cursor-pointer">
            Features
          </TabsTrigger>
          <TabsTrigger value="equipment" className="cursor-pointer">
            Equipment
          </TabsTrigger>
          <TabsTrigger value="spells" className="cursor-pointer">
            Spells
          </TabsTrigger>
        </TabsList>

        <TabsContent value="abilities" className="mt-4">
          <AbilityScores readOnly={readOnly} />
        </TabsContent>

        <TabsContent value="combat" className="mt-4">
          <Weapons readOnly={readOnly} />
        </TabsContent>

        <TabsContent value="features" className="mt-4">
          <Features readOnly={readOnly} />
        </TabsContent>

        <TabsContent value="equipment" className="mt-4">
          <Equipment readOnly={readOnly} />
        </TabsContent>

        <TabsContent value="spells" className="mt-4">
          <Spells readOnly={readOnly} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
