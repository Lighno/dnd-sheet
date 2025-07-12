import { PlusCircle } from "lucide-react";
import { useEffect, useState } from "react";
import type { Feature } from "~/lib/character-data";
import Button from "~/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { Textarea } from "~/components/ui/textarea";

interface FeatureFormProps {
  onAdd: (feature: Omit<Feature, "id">) => void;
  editItem?: Feature | null;
  onSaveEdit?: (feature: Omit<Feature, "id">) => void;
  onCancelEdit?: () => void;
}

export function FeatureForm({
  onAdd,
  editItem = null,
  onSaveEdit,
  onCancelEdit,
}: FeatureFormProps) {
  const defaultFeature: Omit<Feature, "id"> = {
    name: "",
    source: "",
    description: "",
  };

  const [feature, setFeature] = useState<Omit<Feature, "id">>(
    editItem ? { ...editItem } : defaultFeature,
  );

  useEffect(() => {
    if (editItem) {
      setFeature(editItem);
    } else {
      setFeature(defaultFeature);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editItem]);

  const handleAdd = () => {
    if (!feature.name) return;
    onAdd(feature);
    setFeature(defaultFeature);
  };

  const handleSave = () => {
    if (!feature.name || !onSaveEdit) return;
    onSaveEdit(feature);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>{editItem ? "Edit Feature" : "Add New Feature"}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          <div className="space-y-2">
            <Label htmlFor="feature-name">Name</Label>
            <Input
              id="feature-name"
              value={feature.name}
              onChange={(e) =>
                setFeature({ ...feature, name: e.target.value })
              }
              placeholder="e.g., Darkvision, Spellcasting"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="feature-source">Source (Optional)</Label>
            <Input
              id="feature-source"
              value={feature.source}
              onChange={(e) =>
                setFeature({ ...feature, source: e.target.value })
              }
              placeholder="e.g., Race: Elf, Class: Wizard"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="feature-description">Description</Label>
            <Textarea
              id="feature-description"
              value={feature.description}
              onChange={(e) =>
                setFeature({ ...feature, description: e.target.value })
              }
              placeholder="Describe the feature in detail..."
              rows={5}
            />
          </div>

          {editItem ? (
            <div className="flex gap-2">
              <Button onClick={handleSave} className="flex-1" variant="default">
                Save Changes
              </Button>
              <Button
                onClick={onCancelEdit}
                className="flex-1"
                variant="secondary"
                type="button"
              >
                Cancel
              </Button>
            </div>
          ) : (
            <Button onClick={handleAdd} className="w-full">
              <PlusCircle className="mr-2 h-4 w-4" />
              Add Feature
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
