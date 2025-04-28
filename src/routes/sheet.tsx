import { createFileRoute } from "@tanstack/react-router";
import CharacterSheet from "~/components/character-sheet";

export const Route = createFileRoute("/sheet")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <main className="container mx-auto py-6 px-4">
      <h1 className="text-3xl font-bold text-center mb-6">
        D&D Character Sheet
      </h1>
      <CharacterSheet />
    </main>
  );
}
