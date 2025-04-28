export type AbilityScores = {
  strength: number;
  dexterity: number;
  constitution: number;
  intelligence: number;
  wisdom: number;
  charisma: number;
};

export type Skill =
  | "acrobatics"
  | "animalHandling"
  | "arcana"
  | "athletics"
  | "deception"
  | "history"
  | "insight"
  | "intimidation"
  | "investigation"
  | "medicine"
  | "nature"
  | "perception"
  | "performance"
  | "persuasion"
  | "religion"
  | "sleightOfHand"
  | "stealth"
  | "survival";

export type SavingThrows = {
  strength: boolean;
  dexterity: boolean;
  constitution: boolean;
  intelligence: boolean;
  wisdom: boolean;
  charisma: boolean;
};

export type CombatStats = {
  maxHp: number;
  currentHp: number;
  temporaryHp: number;
  armorClass: number;
  speed: number;
  hitDice: {
    total: number;
    used: number;
    dieType: number;
  };
};

export type WeaponType = "melee" | "ranged" | "spell";
export type DamageType =
  | "acid"
  | "bludgeoning"
  | "cold"
  | "fire"
  | "force"
  | "lightning"
  | "necrotic"
  | "piercing"
  | "poison"
  | "psychic"
  | "radiant"
  | "slashing"
  | "thunder";

export type Weapon = {
  id: string;
  name: string;
  type: WeaponType;
  isProficient: boolean;
  abilityScore: keyof AbilityScores;
  attackBonus: number; // Additional bonus beyond ability and proficiency
  damageDice: string; // e.g., "1d8"
  damageBonus: number; // Additional bonus beyond ability
  damageType: DamageType;
  properties: Array<string>; // e.g., ["finesse", "light", "thrown"]
  range?: string; // e.g., "20/60" for ranged weapons
  notes?: string;
};

export type Feature = {
  id: string;
  name: string;
  source: string;
  description: string;
};

export type EquipmentItem = {
  id: string;
  name: string;
  type: string;
  quantity: number;
  weight: number;
  description: string;
  equipped: boolean;
};

export type Spell = {
  id: string;
  name: string;
  level: number;
  school: string;
  castingTime: string;
  range: string;
  components: string;
  duration: string;
  description: string;
  prepared: boolean;
};

export type SpellSlots = {
  1: { used: number; total: number };
  2: { used: number; total: number };
  3: { used: number; total: number };
  4: { used: number; total: number };
  5: { used: number; total: number };
  6: { used: number; total: number };
  7: { used: number; total: number };
  8: { used: number; total: number };
  9: { used: number; total: number };
};

export type Character = {
  name: string;
  class: string;
  level: number;
  race: string;
  background: string;
  alignment: string;
  experiencePoints: string;
  proficiencyBonus: number;
  abilityScores: AbilityScores;
  savingThrows: SavingThrows;
  skills: Record<Skill, boolean>;
  combatStats: CombatStats;
  weapons: Array<Weapon>;
  features: Array<Feature>;
  equipment: Array<EquipmentItem>;
  spells: Array<Spell>;
  spellSlots: SpellSlots;
};

export const defaultCharacter: Character = {
  name: "New Character",
  class: "fighter",
  level: 1,
  race: "human",
  background: "soldier",
  alignment: "true-neutral",
  experiencePoints: "0",
  proficiencyBonus: 2,
  abilityScores: {
    strength: 10,
    dexterity: 10,
    constitution: 10,
    intelligence: 10,
    wisdom: 10,
    charisma: 10,
  },
  savingThrows: {
    strength: false,
    dexterity: false,
    constitution: false,
    intelligence: false,
    wisdom: false,
    charisma: false,
  },
  skills: {
    acrobatics: false,
    animalHandling: false,
    arcana: false,
    athletics: false,
    deception: false,
    history: false,
    insight: false,
    intimidation: false,
    investigation: false,
    medicine: false,
    nature: false,
    perception: false,
    performance: false,
    persuasion: false,
    religion: false,
    sleightOfHand: false,
    stealth: false,
    survival: false,
  },
  combatStats: {
    maxHp: 10,
    currentHp: 10,
    temporaryHp: 0,
    armorClass: 10,
    speed: 30,
    hitDice: {
      total: 1,
      used: 0,
      dieType: 10,
    },
  },
  weapons: [],
  features: [],
  equipment: [],
  spells: [],
  spellSlots: {
    1: { used: 0, total: 0 },
    2: { used: 0, total: 0 },
    3: { used: 0, total: 0 },
    4: { used: 0, total: 0 },
    5: { used: 0, total: 0 },
    6: { used: 0, total: 0 },
    7: { used: 0, total: 0 },
    8: { used: 0, total: 0 },
    9: { used: 0, total: 0 },
  },
};
