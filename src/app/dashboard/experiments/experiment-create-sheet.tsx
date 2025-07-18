"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Textarea } from "@/components/ui/textarea";
import { useDatasets } from "@/hooks/use-datasets";
import { useCreateExperiment } from "@/hooks/use-experiments";
import { AlertCircle, FlaskConical } from "lucide-react";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";

interface ExperimentCreateSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ExperimentCreateSheet({
  open,
  onOpenChange,
}: ExperimentCreateSheetProps) {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    dataset: "",
    model: "",
    framework: "",
  });
  const router = useRouter();

  const createExperimentMutation = useCreateExperiment();
  const { data: datasets = [] } = useDatasets();

  const handleInputChange = useCallback((field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  }, []);

  const handleCreate = useCallback(async () => {
    if (!formData.name || !formData.dataset || !formData.model) return;

    try {
      const newExperiment = await createExperimentMutation.mutateAsync({
        name: formData.name,
        description: formData.description,
        status: "pending",
        metrics: null,
        dataset: formData.dataset,
        model: formData.model,
        framework: formData.framework,
      });

      // Reset form and close sheet
      setFormData({
        name: "",
        description: "",
        dataset: "",
        model: "",
        framework: "",
      });
      onOpenChange(false);

      // Redirect to the experiment detail page
      router.push(`/dashboard/experiments/${newExperiment.id}`);
    } catch (error) {
      console.error("Experiment creation failed:", error);
    }
  }, [formData, createExperimentMutation, onOpenChange, router]);

  const handleClose = useCallback(() => {
    setFormData({
      name: "",
      description: "",
      dataset: "",
      model: "",
      framework: "",
    });
    onOpenChange(false);
  }, [onOpenChange]);

  const isFormValid = formData.name && formData.dataset && formData.model;

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-[400px] sm:w-[540px]">
        <SheetHeader>
          <SheetTitle>Create New Experiment</SheetTitle>
          <SheetDescription>
            Set up a new experiment to test system prompts for classification
            tasks.
          </SheetDescription>
        </SheetHeader>

        <div className="flex-1 px-4 space-y-6">
          {/* Experiment Name */}
          <div className="space-y-2">
            <Label htmlFor="name">Experiment Name</Label>
            <Input
              id="name"
              placeholder="Enter experiment name"
              value={formData.name}
              onChange={(e) => handleInputChange("name", e.target.value)}
            />
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              placeholder="Describe what this experiment will test..."
              value={formData.description}
              onChange={(e) => handleInputChange("description", e.target.value)}
              rows={3}
            />
          </div>

          {/* Dataset Selection */}
          <div className="space-y-2">
            <Label htmlFor="dataset">Dataset</Label>
            <Select
              value={formData.dataset}
              onValueChange={(value) => handleInputChange("dataset", value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select a dataset" />
              </SelectTrigger>
              <SelectContent>
                {datasets.map((dataset) => (
                  <SelectItem key={dataset.id} value={dataset.name}>
                    {dataset.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Model Selection */}
          <div className="space-y-2">
            <Label htmlFor="model">Model</Label>
            <Select
              value={formData.model}
              onValueChange={(value) => handleInputChange("model", value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select a model" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="GPT-4">GPT-4</SelectItem>
                <SelectItem value="GPT-3.5-turbo">GPT-3.5-turbo</SelectItem>
                <SelectItem value="Claude-3">Claude-3</SelectItem>
                <SelectItem value="Claude-2">Claude-2</SelectItem>
                <SelectItem value="Llama-2">Llama-2</SelectItem>
                <SelectItem value="Custom">Custom</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Framework Selection */}
          <div className="space-y-2">
            <Label htmlFor="framework">Framework</Label>
            <Select
              value={formData.framework}
              onValueChange={(value) => handleInputChange("framework", value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select a framework" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="OpenAI API">OpenAI API</SelectItem>
                <SelectItem value="Anthropic API">Anthropic API</SelectItem>
                <SelectItem value="Hugging Face">Hugging Face</SelectItem>
                <SelectItem value="Custom API">Custom API</SelectItem>
                <SelectItem value="Local Model">Local Model</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Info Box */}
          <div className="p-3 bg-muted/50 rounded-lg">
            <div className="flex items-start space-x-2">
              <AlertCircle className="h-4 w-4 text-muted-foreground mt-0.5 flex-shrink-0" />
              <div className="text-xs text-muted-foreground">
                <p className="font-medium">
                  Experiment will be created in pending status
                </p>
                <p>You can configure experiment settings after creation</p>
              </div>
            </div>
          </div>
        </div>

        <SheetFooter>
          <Button variant="outline" onClick={handleClose}>
            Cancel
          </Button>
          <Button
            onClick={handleCreate}
            disabled={!isFormValid || createExperimentMutation.isPending}
            className="min-w-[100px]"
          >
            {createExperimentMutation.isPending ? (
              <>
                <FlaskConical className="h-4 w-4 mr-2 animate-spin" />
                Creating...
              </>
            ) : (
              "Create Experiment"
            )}
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
