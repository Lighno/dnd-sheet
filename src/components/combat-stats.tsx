"use client";

import { Footprints, Heart, Shield, Zap } from "lucide-react";
import type { CombatStats as CombatStatsType } from "~/lib/character-data";
import { Card, CardContent } from "~/components/ui/card";
import { Label } from "~/components/ui/label";
import { Progress } from "~/components/ui/progress";
import { calculateModifier, cn } from "~/lib/utils";
import StatCircle from "~/components/ui/stat-circle";
import { useCharacterStore } from "~/lib/stores/store-provider";

interface CombatStatsProps {
  readOnly?: boolean;
}

export default function CombatStats({ readOnly = false }: CombatStatsProps) {
  const { updateCombatStats } = useCharacterStore((state) => ({
    updateCombatStats: state.updateCombatStats,
  }));
  const { abilityScores, combatStats, level } = useCharacterStore((state) => ({
    abilityScores: state.character.abilityScores,
    combatStats: state.character.combatStats,
    level: state.character.level,
  }));

  const updateCombatStat = <T extends keyof CombatStatsType>(
    key: T,
    value: CombatStatsType[T],
  ) => {
    if (readOnly) return;
    updateCombatStats({
      [key]: value,
    });
  };

  const updateHitDice = <T extends keyof CombatStatsType["hitDice"]>(
    key: T,
    value: CombatStatsType["hitDice"][T],
  ) => {
    if (readOnly) return;
    updateCombatStats((prev) => ({
      hitDice: {
        ...prev.hitDice,
        [key]: value,
      },
    }));
  };

  const dexModifier = calculateModifier(abilityScores.dexterity);
  const healthPercentage = Math.max(
    0,
    Math.min(100, (combatStats.currentHp / combatStats.maxHp) * 100),
  );

  const handleACChange = (value: number) => {
    updateCombatStat("armorClass", value);
  };

  const handleSpeedChange = (value: number) => {
    updateCombatStat("speed", value);
  };

  return (
    <div className="space-y-6">
      {/* Core Combat Stats */}
      <div className="flex flex-row items-start justify-between gap-4 rounded-lg border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900">
        {/* AC */}
        <div className="flex items-start">
          <Shield className="mt-1 h-5 w-5 text-slate-700 dark:text-slate-300" />
          <StatCircle
            value={combatStats.armorClass}
            onChange={handleACChange}
            label="Armor Class"
            readOnly={readOnly}
          />
        </div>

        {/* Initiative */}
        <div className="flex items-start">
          <Zap className="mt-1 h-5 w-5 text-slate-700 dark:text-slate-300" />
          <StatCircle
            value={dexModifier}
            label="Initiative"
            sublabel="Based on DEX modifier"
            readOnly={true}
            showControls={false}
          />
        </div>

        {/* Speed */}
        <div className="flex items-start  ">
          <Footprints className="mt-1 h-5 w-5 text-slate-700 dark:text-slate-300" />
          <StatCircle
            value={combatStats.speed}
            onChange={handleSpeedChange}
            label="Speed"
            sublabel="feet"
            step={5}
            readOnly={readOnly}
          />
        </div>
      </div>

      {/* Hit Points Card */}
      <Card>
        <CardContent className="p-6">
          <div className="mb-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="rounded-full bg-red-100 p-2 dark:bg-red-900">
                <Heart className="h-6 w-6 text-red-500 dark:text-red-400" />
              </div>
              <h3 className="text-lg font-bold">Hit Points</h3>
            </div>
            <div className="text-2xl font-bold text-slate-700 tabular-nums dark:text-slate-200">
              {combatStats.currentHp}
              <span className="mx-1 text-slate-400 dark:text-slate-500">/</span>
              {combatStats.maxHp}
            </div>
          </div>

          <div className="relative mb-6">
            <Progress
              value={healthPercentage}
              className={cn("h-3", {
                "[&>div]:bg-green-500": healthPercentage > 50,
                "[&>div]:bg-yellow-500":
                  healthPercentage <= 50 && healthPercentage > 25,
                "[&>div]:bg-red-500": healthPercentage <= 25,
              })}
            />
            {combatStats.temporaryHp > 0 && (
              <div className="absolute -top-5 right-0 rounded-full bg-blue-100 px-2 py-1 text-sm font-medium text-blue-700 dark:bg-blue-900 dark:text-blue-300">
                +{combatStats.temporaryHp} temp
              </div>
            )}
          </div>

          <div className="grid grid-cols-3 gap-6">
            <StatCircle
              value={combatStats.currentHp}
              max={combatStats.maxHp}
              min={0}
              onChange={(value) => updateCombatStat("currentHp", value)}
              label="Current HP"
              readOnly={readOnly}
            />
            <StatCircle
              value={combatStats.maxHp}
              min={1}
              onChange={(value) => updateCombatStat("maxHp", value)}
              label="Max HP"
              readOnly={readOnly}
            />
            <StatCircle
              value={combatStats.temporaryHp}
              min={0}
              onChange={(value) => updateCombatStat("temporaryHp", value)}
              label="Temp HP"
              readOnly={readOnly}
            />
          </div>

          <div className="mt-8">
            <div className="mb-4 flex items-center gap-3">
              <h4 className="text-lg font-bold">Hit Dice</h4>
            </div>
            <div className="grid grid-cols-3 gap-6">
              <StatCircle
                value={combatStats.hitDice.total}
                min={0}
                max={level}
                onChange={(value) => updateHitDice("total", value)}
                label="Total"
                readOnly={readOnly}
              />
              <StatCircle
                value={combatStats.hitDice.used}
                min={0}
                max={combatStats.hitDice.total}
                onChange={(value) => updateHitDice("used", value)}
                label="Used"
                readOnly={readOnly}
              />
              <div className="flex flex-col items-center">
                <Label className="mb-2 text-sm font-semibold">Die Type</Label>
                <div className="grid grid-cols-2 gap-2">
                  {[6, 8, 10, 12].map((dieType) => (
                    <button
                      key={dieType}
                      onClick={() =>
                        !readOnly && updateHitDice("dieType", dieType)
                      }
                      disabled={readOnly}
                      className={cn(
                        "flex h-8 w-8 cursor-pointer items-center justify-center rounded-lg border-2 text-sm font-bold transition-colors",
                        combatStats.hitDice.dieType === dieType
                          ? "border-primary bg-primary text-primary-foreground"
                          : "border-input bg-background hover:bg-accent hover:text-accent-foreground",
                      )}
                    >
                      {`d${dieType}`}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
