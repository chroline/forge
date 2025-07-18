"use client";

import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { type ColumnSchema } from "@/lib/api";
import { AlertCircle, CheckCircle, ChevronDown, Info } from "lucide-react";
import { useMemo, useState } from "react";

interface DatasetSchemaEditorProps {
  columns: string[];
  schema?: ColumnSchema[];
  onSchemaChange: (schema: ColumnSchema[]) => void;
  isEditing?: boolean;
}

const columnTypeColors = {
  identifier: "bg-blue-100 text-blue-800 border-blue-200",
  feature: "bg-green-100 text-green-800 border-green-200",
  target: "bg-purple-100 text-purple-800 border-purple-200",
  metadata: "bg-gray-100 text-gray-800 border-gray-200",
};

const columnTypeDescriptions = {
  identifier: "Unique identifier for each row (e.g., ID, UUID)",
  feature: "Input variables used for training the model",
  target: "Output variable to be predicted (only one allowed)",
  metadata: "Additional information not used for training",
};

export function DatasetSchemaEditor({
  columns,
  schema = [],
  onSchemaChange,
  isEditing = false,
}: DatasetSchemaEditorProps) {
  const [localSchema, setLocalSchema] = useState<ColumnSchema[]>(() => {
    // Initialize with existing schema or default to all metadata
    if (schema.length > 0) {
      return schema;
    }
    return columns.map((column) => ({
      name: column,
      type: "metadata" as const,
    }));
  });

  const [isEditingMode, setIsEditingMode] = useState(isEditing);

  // Validation
  const validation = useMemo(() => {
    const identifierCount = localSchema.filter(
      (col) => col.type === "identifier"
    ).length;
    const targetCount = localSchema.filter(
      (col) => col.type === "target"
    ).length;
    const featureCount = localSchema.filter(
      (col) => col.type === "feature"
    ).length;

    return {
      isValid: identifierCount <= 1 && targetCount <= 1,
      identifierCount,
      targetCount,
      featureCount,
      errors: [] as string[],
    };
  }, [localSchema]);

  // Add validation errors
  if (validation.identifierCount > 1) {
    validation.errors.push("Only one identifier column is allowed");
  }
  if (validation.targetCount > 1) {
    validation.errors.push("Only one target column is allowed");
  }

  const handleColumnTypeChange = (
    columnName: string,
    newType: ColumnSchema["type"]
  ) => {
    const updatedSchema = localSchema.map((col) =>
      col.name === columnName ? { ...col, type: newType } : col
    );
    setLocalSchema(updatedSchema);
  };

  const handleSave = () => {
    if (validation.isValid) {
      onSchemaChange(localSchema);
      setIsEditingMode(false);
    }
  };

  const handleCancel = () => {
    setLocalSchema(
      schema.length > 0
        ? schema
        : columns.map((column) => ({
            name: column,
            type: "metadata" as const,
          }))
    );
    setIsEditingMode(false);
  };

  const getColumnTypeCount = (type: ColumnSchema["type"]) => {
    return localSchema.filter((col) => col.type === type).length;
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">Schema Editor</CardTitle>
          {!isEditingMode ? (
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsEditingMode(true)}
            >
              Edit Schema
            </Button>
          ) : (
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={handleCancel}>
                Cancel
              </Button>
              <Button
                size="sm"
                onClick={handleSave}
                disabled={!validation.isValid}
              >
                Save Schema
              </Button>
            </div>
          )}
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Schema Summary */}
        <div className="flex gap-2 flex-wrap">
          <Badge variant="outline" className={columnTypeColors.identifier}>
            {getColumnTypeCount("identifier")} Identifier
          </Badge>
          <Badge variant="outline" className={columnTypeColors.feature}>
            {getColumnTypeCount("feature")} Features
          </Badge>
          <Badge variant="outline" className={columnTypeColors.target}>
            {getColumnTypeCount("target")} Target
          </Badge>
          <Badge variant="outline" className={columnTypeColors.metadata}>
            {getColumnTypeCount("metadata")} Metadata
          </Badge>
        </div>

        {/* Validation Errors */}
        {validation.errors.length > 0 && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              {validation.errors.map((error, index) => (
                <div key={index}>{error}</div>
              ))}
            </AlertDescription>
          </Alert>
        )}

        {/* Schema is valid indicator */}
        {validation.isValid &&
          localSchema.some((col) => col.type !== "metadata") && (
            <Alert>
              <CheckCircle className="h-4 w-4" />
              <AlertDescription>
                Schema is valid and ready for use
              </AlertDescription>
            </Alert>
          )}

        {/* Column Type Descriptions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-muted-foreground">
          {Object.entries(columnTypeDescriptions).map(([type, description]) => (
            <div key={type} className="flex items-start gap-2">
              <Badge
                variant="outline"
                className={`${
                  columnTypeColors[type as keyof typeof columnTypeColors]
                } text-xs`}
              >
                {type}
              </Badge>
              <span>{description}</span>
            </div>
          ))}
        </div>

        {/* Column List */}
        <div className="space-y-3">
          <h4 className="font-medium">Columns</h4>
          <div className="space-y-2">
            {localSchema.map((column) => (
              <div
                key={column.name}
                className="flex items-center justify-between p-3 border rounded-lg"
              >
                <div className="flex items-center gap-3">
                  <span className="font-medium text-sm">{column.name}</span>
                  {!isEditingMode && (
                    <Badge
                      variant="outline"
                      className={columnTypeColors[column.type]}
                    >
                      {column.type}
                    </Badge>
                  )}
                </div>

                {isEditingMode && (
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="outline"
                        size="sm"
                        className="w-32 justify-between"
                      >
                        {column.type}
                        <ChevronDown className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem
                        onClick={() =>
                          handleColumnTypeChange(column.name, "identifier")
                        }
                      >
                        Identifier
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() =>
                          handleColumnTypeChange(column.name, "feature")
                        }
                      >
                        Feature
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() =>
                          handleColumnTypeChange(column.name, "target")
                        }
                      >
                        Target
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() =>
                          handleColumnTypeChange(column.name, "metadata")
                        }
                      >
                        Metadata
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Help Text */}
        <Alert>
          <Info className="h-4 w-4" />
          <AlertDescription>
            <strong>Schema Rules:</strong> You can have only one identifier
            column and one target column. Features are input variables used for
            training, while metadata contains additional information not used in
            the model.
          </AlertDescription>
        </Alert>
      </CardContent>
    </Card>
  );
}
