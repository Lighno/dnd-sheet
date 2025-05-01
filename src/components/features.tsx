import { PlusCircle, Trash2 } from "lucide-react";
import { useState } from "react";
import type { Character, Feature } from "~/lib/character-data";
import { Button } from "~/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { Textarea } from "~/components/ui/textarea";

interface FeaturesProps {
  features: Array<Feature>;
  updateCharacter: (updates: Partial<Character>) => void;
  readOnly?: boolean;
}

export default function Features({
  features,
  updateCharacter,
  readOnly = false,
}: FeaturesProps) {
  const [newFeature, setNewFeature] = useState<Feature>({
    id: "",
    name: "",
    source: "",
    description: "",
  });

  const addFeature = () => {
    if (readOnly || !newFeature.name) return;

    const feature = {
      ...newFeature,
      id: crypto.randomUUID(),
    };

    updateCharacter({
      features: [...features, feature],
    });

    setNewFeature({
      id: "",
      name: "",
      source: "",
      description: "",
    });
  };

  const removeFeature = (id: string) => {
    if (readOnly) return;
    updateCharacter({
      features: features.filter((feature) => feature.id !== id),
    });
  };

  return (
    <div className="space-y-6">
      <div className="grid gap-4">
        {features.map((feature) => (
          <Card key={feature.id}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <div>
                <CardTitle>{feature.name}</CardTitle>
                <p className="text-sm text-slate-500">{feature.source}</p>
              </div>
              {!readOnly && (
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => removeFeature(feature.id)}
                >
                  <Trash2 className="h-4 w-4" />
                  <span className="sr-only">Remove</span>
                </Button>
              )}
            </CardHeader>
            <CardContent>
              <p className="text-sm">{feature.description}</p>
            </CardContent>
          </Card>
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
        <Card>
          <CardHeader>
            <CardTitle>Add New Feature</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="feature-name">Name</Label>
                  <Input
                    id="feature-name"
                    value={newFeature.name}
                    onChange={(e) =>
                      setNewFeature({ ...newFeature, name: e.target.value })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="feature-source">Source</Label>
                  <Input
                    id="feature-source"
                    value={newFeature.source}
                    onChange={(e) =>
                      setNewFeature({ ...newFeature, source: e.target.value })
                    }
                    placeholder="Class, Race, Background, etc."
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="feature-description">Description</Label>
                <Textarea
                  id="feature-description"
                  value={newFeature.description}
                  onChange={(e) =>
                    setNewFeature({
                      ...newFeature,
                      description: e.target.value,
                    })
                  }
                  rows={3}
                />
              </div>
              <Button onClick={addFeature} className="w-full">
                <PlusCircle className="mr-2 h-4 w-4" />
                Add Feature
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
