import { type } from "arktype";

export const AbilityScoresSchema = type({
  strength: "number",
  dexterity: "number",
  constitution: "number",
  intelligence: "number",
  wisdom: "number",
  charisma: "number",
});
export type AbilityScores = typeof AbilityScoresSchema.infer;

export const SkillSchema = type({
  acrobatics: "boolean",
  animalHandling: "boolean",
  arcana: "boolean",
  athletics: "boolean",
  deception: "boolean",
  history: "boolean",
  insight: "boolean",
  intimidation: "boolean",
  investigation: "boolean",
  medicine: "boolean",
  nature: "boolean",
  perception: "boolean",
  performance: "boolean",
  persuasion: "boolean",
  religion: "boolean",
  sleightOfHand: "boolean",
  stealth: "boolean",
  survival: "boolean",
});
export type Skill = typeof SkillSchema.keyof;

export const SavingThrowSchema = type({
  strength: "boolean",
  dexterity: "boolean",
  constitution: "boolean",
  intelligence: "boolean",
  wisdom: "boolean",
  charisma: "boolean",
});
export type SavingThrows = typeof SavingThrowSchema.infer;

export const CombatStatsSchema = type({
  maxHp: "number",
  currentHp: "number",
  temporaryHp: "number",
  armorClass: "number",
  speed: "number",
  hitDice: {
    total: "number",
    used: "number",
    dieType: "12 | 10 | 8 | 6",
  },
});
export type CombatStats = typeof CombatStatsSchema.infer;

export const WeaponTypeSchema = type("'melee' | 'ranged' | 'spell'");
export type WeaponType = typeof WeaponTypeSchema.infer;

export const DamageTypeSchema = type(
  "'acid' | 'bludgeoning' | 'cold' | 'fire' | 'force' | 'lightning' | 'necrotic' | 'piercing' | 'poison' | 'psychic' | 'radiant' | 'slashing' | 'thunder' | 'none'",
);
export type DamageType = typeof DamageTypeSchema.infer;

export const WeaponPropertiesSchema = type(
  "'ammunition' | 'finesse' | 'heavy' | 'light' | 'loading' | 'reach' | 'special' | 'thrown' | 'two-handed' | 'versatile'",
);
export type WeaponProperties = typeof WeaponPropertiesSchema.infer;

export const WeaponSchema = type({
  id: "string",
  name: "string",
  type: WeaponTypeSchema,
  isProficient: "boolean",
  abilityScore: AbilityScoresSchema.keyof,
  attackBonus: "number", // Additional bonus beyond ability and proficiency
  damageDice: /\d+d\d+/, // e.g., "1d8"
  damageBonus: "number", // Additional bonus beyond ability
  damageType: DamageTypeSchema,
  properties: WeaponPropertiesSchema.array,
  "range?": /\d+(\/\d+)?/, // e.g., "20/60" for ranged weapons
  "notes?": "string",
});
export type Weapon = typeof WeaponSchema.infer;

export const FeatureSchema = type({
  id: "string",
  name: "string",
  source: "string",
  description: "string",
});
export type Feature = typeof FeatureSchema.infer;

export const EquipmentItemSchema = type({
  id: "string",
  name: "string",
  type: "string",
  quantity: "number",
  weight: "number",
  description: "string",
  equipped: "boolean",
});
export type EquipmentItem = typeof EquipmentItemSchema.infer;

export const SpellSchema = type({
  id: "string",
  name: "string",
  level: "number",
  school: "string",
  castingTime: "string",
  range: "string",
  components: "string",
  duration: "string",
  description: "string",
  equipped: "boolean",
});

export type Spell = typeof SpellSchema.infer;

export const SpellSlotsSchema = type({
  "1": { used: "number", total: "number" },
  "2": { used: "number", total: "number" },
  "3": { used: "number", total: "number" },
  "4": { used: "number", total: "number" },
  "5": { used: "number", total: "number" },
  "6": { used: "number", total: "number" },
  "7": { used: "number", total: "number" },
  "8": { used: "number", total: "number" },
  "9": { used: "number", total: "number" },
});
export type SpellSlots = typeof SpellSlotsSchema.infer;

export const CharacterSchema = type({
  name: "string",
  id: "undefined | string.uuid.v4",
  class: "string",
  level: "number",
  race: "string",
  background: "string",
  alignment: "string",
  experiencePoints: "string",
  proficiencyBonus: "number",
  abilityScores: AbilityScoresSchema,
  savingThrows: SavingThrowSchema,
  skills: SkillSchema,
  combatStats: CombatStatsSchema,
  weapons: WeaponSchema.array,
  features: FeatureSchema.array,
  equipment: EquipmentItemSchema.array,
  spells: SpellSchema.array,
  spellSlots: SpellSlotsSchema,
});
export type Character = typeof CharacterSchema.infer;

export const defaultCharacter: Character = {
  name: "New Character",
  id: undefined,
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
