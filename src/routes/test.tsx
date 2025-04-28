import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import AbilityScoreInput from "~/components/ui/ability-score-input";

export const Route = createFileRoute("/test")({
  component: RouteComponent,
});

function RouteComponent() {
  const [strength, setStrength] = useState(10);
  return (
    <div className="flex flex-col gap-4">
      <AbilityScoreInput
        value={strength}
        onChange={(value) => setStrength(value)}
        label="Strength"
      />
    </div>
  );
}
