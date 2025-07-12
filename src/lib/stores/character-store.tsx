import { createStore } from "zustand/vanilla";
import { createJSONStorage, devtools, persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
import type { Character } from "~/lib/character-data";
import { defaultCharacter } from "~/lib/character-data";
import { calculateModifier } from "~/lib/utils";

interface CharacterState {
  character: Character;
}
type StoreUpdates<T = Character> =
  | T
  | Partial<T>
  | ((prev: T) => T | Partial<T>);

type StoreRequiredUpdates<T = Character> = T | ((prev: T) => T);

interface CharacterActions {
  // Full character updates
  setCharacter: (character: Character) => void;
  resetCharacter: () => void;

  // Partial updates
  updateCharacter: (updates: StoreUpdates<Character>) => void;
  updateAbilityScores: (
    updates: StoreUpdates<Character["abilityScores"]>,
  ) => void;
  updateCombatStats: (updates: StoreUpdates<Character["combatStats"]>) => void;

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

  // Equipment management
  addWeapon: (weapon: Character["weapons"][number]) => void;
  removeWeapon: (weaponId: string) => void;
  addEquipment: (item: Character["equipment"][number]) => void;
  removeEquipment: (itemId: string) => void;

  // Spell management
  addSpell: (spell: Character["spells"][number]) => void;
  removeSpell: (spellId: string) => void;
  toggleSpellPrepared: (spellId: string) => void;
  setSpellSlotTotal: (
    level: keyof Character["spellSlots"],
    value: number,
  ) => void;
  setSpellSlotUsed: (
    level: keyof Character["spellSlots"],
    value: number,
  ) => void;
  updateSpells: (updates: StoreRequiredUpdates<Character["spells"]>) => void;
  toggleSavingThrowProficiency: (
    ability: keyof Character["savingThrows"],
  ) => void;
  toggleSkillProficiency: (skill: keyof Character["skills"]) => void;
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

          setCharacter: (character) =>
            set((state) => {
              state.character = character;
            }),

          resetCharacter: () =>
            set((state) => {
              state.character = defaultCharacter;
            }),

          updateCharacter: (updates) =>
            set((state) => {
              if (typeof updates === "function") {
                updates = updates(state.character);
              }
              state.character = { ...state.character, ...updates };
            }),

          updateAbilityScores: (updates) =>
            set((state) => {
              if (typeof updates === "function") {
                updates = updates(state.character.abilityScores);
              }
              state.character.abilityScores = {
                ...state.character.abilityScores,
                ...updates,
              };
            }),

          updateCombatStats: (updates) => {
            set((prev) => {
              if (typeof updates === "function") {
                updates = updates(prev.character.combatStats);
              }
              prev.character.combatStats = {
                ...prev.character.combatStats,
                ...updates,
              };
            });
          },
          // New encapsulated level update logic
          updateLevel: (newLevel) =>
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
              state.character.combatStats.currentHp =
                state.character.combatStats.maxHp;
              state.character.combatStats.hitDice.total = newLevel;
            }),

          // New encapsulated ability score update logic
          setAbilityScore: (ability, value) =>
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

          modifyHp: (amount) =>
            set((state) => {
              const newHp = Math.min(
                state.character.combatStats.maxHp,
                Math.max(0, state.character.combatStats.currentHp + amount),
              );
              state.character.combatStats.currentHp = newHp;
            }),

          setTemporaryHp: (amount) =>
            set((state) => {
              state.character.combatStats.temporaryHp = Math.max(0, amount);
            }),

          addWeapon: (weapon) =>
            set((state) => {
              state.character.weapons.push(weapon);
            }),

          removeWeapon: (weaponId) =>
            set((state) => {
              state.character.weapons = state.character.weapons.filter(
                (w) => w.id !== weaponId,
              );
            }),

          addEquipment: (item) =>
            set((state) => {
              state.character.equipment.push(item);
            }),

          removeEquipment: (itemId) =>
            set((state) => {
              state.character.equipment = state.character.equipment.filter(
                (i) => i.id !== itemId,
              );
            }),

          addSpell: (spell) =>
            set((state) => {
              state.character.spells.push(spell);
            }),

          removeSpell: (spellId) =>
            set((state) => {
              state.character.spells = state.character.spells.filter(
                (s) => s.id !== spellId,
              );
            }),

          toggleSpellPrepared: (spellId) =>
            set((state) => {
              const spell = state.character.spells.find(
                (s) => s.id === spellId,
              );
              if (spell) {
                spell.prepared = !spell.prepared;
              }
            }),

          updateSpells: (updates) =>
            set((state) => {
              if (typeof updates === "function") {
                updates = updates(state.character.spells);
              }
              state.character.spells = updates;
            }),

          setSpellSlotTotal: (level, value) =>
            set((state) => {
              state.character.spellSlots[level].total = value;
            }),

          setSpellSlotUsed: (level, value) =>
            set((state) => {
              state.character.spellSlots[level].used = value;
            }),

          toggleSavingThrowProficiency: (ability) =>
            set((state) => {
              state.character.savingThrows[ability] =
                !state.character.savingThrows[ability];
            }),
          toggleSkillProficiency: (skill) =>
            set((state) => {
              state.character.skills[skill] = !state.character.skills[skill];
            }),
        })),

        {
          name: "dnd-character-storage",
          storage: createJSONStorage(() => localStorage),
          partialize: (state) => {
            if (state.character.id === undefined) {
              state.character.id = crypto.randomUUID();
            }
            return { character: state.character };
          },
          merge(persistedState: unknown, currentState) {
            if (typeof persistedState !== "object" || !persistedState) {
              return currentState;
            }

            const character = (
              persistedState as Partial<{ character: Character }>
            ).character;
            if (
              !character ||
              (currentState.character.id !== undefined &&
                character.id !== currentState.character.id)
            ) {
              return currentState;
            }
            return {
              ...currentState,
              character: {
                ...currentState.character,
                ...character,
              },
            };
          },
          version: 1,
        },
      ),
    ),
  );
