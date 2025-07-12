import { ChevronsUpDown, Pencil, Trash2 } from "lucide-react";
import ReactMarkdown from "react-markdown";
import type { Feature } from "~/lib/character-data";
import Button from "~/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "~/components/ui/card";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "~/components/ui/collapsible";

interface FeatureCardProps {
  feature: Feature;
  readOnly?: boolean;
  onEdit: (feature: Feature) => void;
  onRemove: (id: string) => void;
}

export function FeatureCard({ feature, readOnly = false, onEdit, onRemove }: FeatureCardProps) {
  return (
    <Card>
      <Collapsible>
        <div className="flex items-center justify-between pr-4">
          <CardHeader className="flex-grow pb-2">
            <CardTitle>{feature.name}</CardTitle>
            {feature.source && (
              <CardDescription>
                <p className="text-sm text-slate-500">{feature.source}</p>
              </CardDescription>
            )}
          </CardHeader>
          <div className="flex items-center space-x-1">
            {!readOnly && (
              <>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => onEdit(feature)}
                >
                  <Pencil className="h-4 w-4" />
                  <span className="sr-only">Edit</span>
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => onRemove(feature.id)}
                >
                  <Trash2 className="h-4 w-4" />
                  <span className="sr-only">Remove</span>
                </Button>
              </>
            )}
            <CollapsibleTrigger asChild>
              <Button variant="ghost" size="icon">
                <ChevronsUpDown className="h-4 w-4" />
                <span className="sr-only">Toggle</span>
              </Button>
            </CollapsibleTrigger>
          </div>
        </div>

        <CollapsibleContent>
          <CardContent className="pt-0">
            <div className="prose prose-sm max-w-none dark:prose-invert h-[var(--radix-collapsible-content-height)] ">
              <ReactMarkdown>{feature.description}</ReactMarkdown>
            </div>
          </CardContent>
        </CollapsibleContent>
      </Collapsible>
    </Card>
  );
}
