import { useState } from "react";
import type { Feature } from "~/lib/character-data";
import { useCharacterStore } from "~/lib/stores/store-provider";
import { FeatureCard } from "~/components/ui/feature-card";
import { FeatureForm } from "~/components/ui/feature-form";

interface FeaturesProps {
  readOnly?: boolean;
}

export default function Features({ readOnly = false }: FeaturesProps) {
  const { updateCharacter, features } = useCharacterStore((state) => ({
    updateCharacter: state.updateCharacter,
    features: state.character.features,
  }));

  const [editingFeature, setEditingFeature] = useState<Feature | null>(null);

  const addFeature = (newFeature: Omit<Feature, "id">) => {
    if (readOnly || !newFeature.name) return;

    const feature = {
      ...newFeature,
      id: crypto.randomUUID(),
    };

    updateCharacter({
      features: [...features, feature],
    });
  };

  const updateFeature = (id: string, updates: Partial<Feature>) => {
    if (readOnly) return;
    updateCharacter({
      features: features.map((feature) =>
        feature.id === id ? { ...feature, ...updates } : feature,
      ),
    });
  };

  const removeFeature = (id: string) => {
    if (readOnly) return;
    updateCharacter({
      features: features.filter((feature) => feature.id !== id),
    });
    if (editingFeature && editingFeature.id === id) {
      setEditingFeature(null);
    }
  };

  const handleEdit = (feature: Feature) => {
    setEditingFeature(feature);
  };

  const handleSaveEdit = (updated: Omit<Feature, "id">) => {
    if (!editingFeature) return;
    updateFeature(editingFeature.id, updated);
    setEditingFeature(null);
  };

  const handleCancelEdit = () => {
    setEditingFeature(null);
  };

  return (
    <div className="space-y-6">
      <div className="grid gap-4">
        {features.map((feature) => (
          <FeatureCard
            key={feature.id}
            feature={feature}
            readOnly={readOnly}
            onEdit={handleEdit}
            onRemove={removeFeature}
          />
        ))}
      </div>

      {features.length === 0 && (
        <div className="py-8 text-center text-slate-500">
          <p>
            No features added yet.{" "}
            {!readOnly && "Add your first feature below."}
          </p>
        </div>
      )}

      {!readOnly && (
        <FeatureForm
          onAdd={addFeature}
          editItem={editingFeature}
          onSaveEdit={handleSaveEdit}
          onCancelEdit={handleCancelEdit}
        />
      )}
    </div>
  );
}
