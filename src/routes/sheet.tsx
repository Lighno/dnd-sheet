import { z } from "zod";
import { createFileRoute } from "@tanstack/react-router";
import CharacterSheet from "~/components/character-sheet";
import { StoreProvider } from "~/lib/stores/store-provider";

const schema = z.object({
  section: z
    .enum(["abilities", "combat", "features", "equipment", "spells"])
    .default("abilities"),
});

export const Route = createFileRoute("/sheet")({
  validateSearch: (search) => schema.parse(search),
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <main className="container mx-auto px-4 py-6">
      <h1 className="mb-6 text-center text-3xl font-bold">
        D&D Character Sheet
      </h1>
      <StoreProvider>
        <CharacterSheet />
      </StoreProvider>
    </main>
  );
}
