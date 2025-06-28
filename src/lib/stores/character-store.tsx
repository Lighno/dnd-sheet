import { createStore } from "zustand/vanilla";
import { createJSONStorage, devtools, persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
import type { Character } from "~/lib/character-data";
import { defaultCharacter } from "~/lib/character-data";
import { calculateModifier } from "~/lib/utils";

interface CharacterState {
  character: Character;
}

interface CharacterActions {
  // Full character updates
  setCharacter: (character: Character) => void;
  resetCharacter: () => void;

  // Partial updates
  updateCharacter: (updates: Partial<Character>) => void;
  updateAbilityScores: (updates: Partial<Character["abilityScores"]>) => void;
  updateCombatStats: (updates: Partial<Character["combatStats"]>) => void;

  // Level management
  updateLevel: (newLevel: number) => void;

  // Ability score management
  setAbilityScore: (
    ability: keyof Character["abilityScores"],
    value: number,
  ) => void;

  // Combat specific actions
  modifyHp: (amount: number) => void;
  setTemporaryHp: (amount: number) => void;
  useHitDie: () => void;

  // Equipment management
  addWeapon: (weapon: Character["weapons"][number]) => void;
  removeWeapon: (weaponId: string) => void;
  addEquipment: (item: Character["equipment"][number]) => void;
  removeEquipment: (itemId: string) => void;

  // Spell management
  addSpell: (spell: Character["spells"][number]) => void;
  removeSpell: (spellId: string) => void;
  toggleSpellPrepared: (spellId: string) => void;
  useSpellSlot: (level: keyof Character["spellSlots"]) => void;
  restoreSpellSlot: (level: keyof Character["spellSlots"]) => void;
}

export type CharacterStore = CharacterState & CharacterActions;
export const createCharacterStore = (
  initialState: CharacterState = { character: defaultCharacter },
) =>
  createStore<CharacterStore>()(
    devtools(
      persist(
        immer((set) => ({
          ...initialState,

          setCharacter: (character: Character) =>
            set((state) => {
              state.character = character;
            }),

          resetCharacter: () =>
            set((state) => {
              state.character = defaultCharacter;
            }),

          updateCharacter: (updates: Partial<Character>) =>
            set((state) => {
              state.character = { ...state.character, ...updates };
            }),

          updateAbilityScores: (updates: Partial<Character["abilityScores"]>) =>
            set((state) => {
              state.character.abilityScores = {
                ...state.character.abilityScores,
                ...updates,
              };
            }),

          updateCombatStats: (updates: Partial<Character["combatStats"]>) =>
            set((state) => {
              state.character.combatStats = {
                ...state.character.combatStats,
                ...updates,
              };
            }),

          // New encapsulated level update logic
          updateLevel: (newLevel: number) =>
            set((state) => {
              const conMod = calculateModifier(
                state.character.abilityScores.constitution,
              );
              const levelDiff = newLevel - state.character.level;
              const hpChange =
                (state.character.combatStats.hitDice.dieType / 2 + 1 + conMod) *
                levelDiff;

              state.character.level = newLevel;
              state.character.combatStats.maxHp = Math.max(
                state.character.combatStats.maxHp + hpChange,
                1,
              );
              state.character.combatStats.currentHp = Math.max(
                state.character.combatStats.maxHp + hpChange,
                1,
              );
              state.character.combatStats.hitDice.total = newLevel;
            }),

          // New encapsulated ability score update logic
          setAbilityScore: (
            ability: keyof Character["abilityScores"],
            value: number,
          ) =>
            set((state) => {
              state.character.abilityScores[ability] = value;

              // If it's constitution, update HP based on the new modifier
              if (ability === "constitution") {
                const oldMod = calculateModifier(
                  state.character.abilityScores.constitution,
                );
                const newMod = calculateModifier(value);
                const modDiff = newMod - oldMod;
                const hpChange = modDiff * state.character.level;

                state.character.combatStats.maxHp = Math.max(
                  state.character.combatStats.maxHp + hpChange,
                  1,
                );
                state.character.combatStats.currentHp = Math.max(
                  state.character.combatStats.currentHp + hpChange,
                  1,
                );
              }
            }),

          modifyHp: (amount: number) =>
            set((state) => {
              const newHp = Math.min(
                state.character.combatStats.maxHp,
                Math.max(0, state.character.combatStats.currentHp + amount),
              );
              state.character.combatStats.currentHp = newHp;
            }),

          setTemporaryHp: (amount: number) =>
            set((state) => {
              state.character.combatStats.temporaryHp = Math.max(0, amount);
            }),

          useHitDie: () =>
            set((state) => {
              if (
                state.character.combatStats.hitDice.used <
                state.character.combatStats.hitDice.total
              ) {
                state.character.combatStats.hitDice.used += 1;
              }
            }),

          addWeapon: (weapon: Character["weapons"][number]) =>
            set((state) => {
              state.character.weapons.push(weapon);
            }),

          removeWeapon: (weaponId: string) =>
            set((state) => {
              state.character.weapons = state.character.weapons.filter(
                (w) => w.id !== weaponId,
              );
            }),

          addEquipment: (item: Character["equipment"][number]) =>
            set((state) => {
              state.character.equipment.push(item);
            }),

          removeEquipment: (itemId: string) =>
            set((state) => {
              state.character.equipment = state.character.equipment.filter(
                (i) => i.id !== itemId,
              );
            }),

          addSpell: (spell: Character["spells"][number]) =>
            set((state) => {
              state.character.spells.push(spell);
            }),

          removeSpell: (spellId: string) =>
            set((state) => {
              state.character.spells = state.character.spells.filter(
                (s) => s.id !== spellId,
              );
            }),

          toggleSpellPrepared: (spellId: string) =>
            set((state) => {
              const spell = state.character.spells.find(
                (s) => s.id === spellId,
              );
              if (spell) {
                spell.prepared = !spell.prepared;
              }
            }),

          useSpellSlot: (level: keyof Character["spellSlots"]) =>
            set((state) => {
              if (
                state.character.spellSlots[level].used <
                state.character.spellSlots[level].total
              ) {
                state.character.spellSlots[level].used += 1;
              }
            }),

          restoreSpellSlot: (level: keyof Character["spellSlots"]) =>
            set((state) => {
              if (state.character.spellSlots[level].used > 0) {
                state.character.spellSlots[level].used -= 1;
              }
            }),
        })),
        {
          name: "dnd-character-storage",
          storage: createJSONStorage(() => localStorage),
          partialize: (state) => ({ character: state.character }),
          version: 1,
        },
      ),
    ),
  );
