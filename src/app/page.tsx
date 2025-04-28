import CharacterSheet from "~/components/character-sheet";

export default function Home() {
  return (
    <main className="container mx-auto py-6 px-4">
      <h1 className="text-3xl font-bold text-center mb-6">
        D&D Character Sheet
      </h1>
      <CharacterSheet />
    </main>
  );
}
