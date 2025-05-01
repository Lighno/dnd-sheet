"use client";

import { createContext, useContext, useRef } from "react";
import { useStore } from "zustand";
import { useShallow } from "zustand/react/shallow";
import { createCharacterStore } from "./character-store";
import type { CharacterStore } from "./character-store";
import type { ReactNode } from "react";

export const useCharacterBasics = () =>
  useCharacterStore((state) => ({
    class: state.character.class,
    level: state.character.level,
    name: state.character.name,
    race: state.character.race,
  }));

export const useCombatStats = () =>
  useCharacterStore((state) => state.character.combatStats);

export const useAbilityScores = () =>
  useCharacterStore((state) => state.character.abilityScores);

export const useSpellcasting = () =>
  useCharacterStore((state) => ({
    spellSlots: state.character.spellSlots,
    spells: state.character.spells,
  }));

interface StoreProviderProps {
  children: ReactNode;
}

type StoreApi = ReturnType<typeof createCharacterStore>;

const StoreContext = createContext<StoreApi | undefined>(undefined);

export function StoreProvider({ children }: StoreProviderProps) {
  const storeRef = useRef<StoreApi | null>(null);

  if (!storeRef.current) {
    storeRef.current = createCharacterStore();
  }

  return (
    <StoreContext.Provider value={storeRef.current}>
      {children}
    </StoreContext.Provider>
  );
}

export function useCharacterStore<T>(selector: (_: CharacterStore) => T): T {
  const store = useContext(StoreContext);
  if (!store) {
    throw new Error("Missing StoreContext.Provider in the tree");
  }

  return useStore(store, useShallow(selector));
}
