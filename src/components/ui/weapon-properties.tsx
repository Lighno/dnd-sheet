import type { Weapon } from "~/lib/character-data";
import { Checkbox } from "~/components/ui/checkbox";
import { Label } from "~/components/ui/label";

interface WeaponPropertiesProps {
  weapon: Weapon;
  onUpdate: (id: string, updates: Partial<Weapon>) => void;
}

const commonProperties = [
  "ammunition",
  "finesse",
  "heavy",
  "light",
  "loading",
  "reach",
  "special",
  "thrown",
  "two-handed",
  "versatile",
];

export function WeaponProperties({ weapon, onUpdate }: WeaponPropertiesProps) {
  const toggleProperty = (property: string) => {
    const properties = weapon.properties.includes(property)
      ? weapon.properties.filter((p) => p !== property)
      : [...weapon.properties, property];

    onUpdate(weapon.id, { properties });
  };

  return (
    <div id="weapon-properties" className="grid grid-cols-2 gap-1">
      {commonProperties.map((property) => (
        <div key={property} className="flex items-center space-x-2">
          <Checkbox
            id={`property-${property}-${weapon.id}`}
            checked={weapon.properties.includes(property)}
            onCheckedChange={() => toggleProperty(property)}
          />
          <Label
            htmlFor={`property-${property}-${weapon.id}`}
            className="text-xs leading-none font-medium capitalize peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            {property}
          </Label>
        </div>
      ))}
    </div>
  );
}
