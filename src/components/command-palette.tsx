"use client";

import {
  Clock,
  Database,
  FlaskConical,
  Loader2,
  MessageSquare,
  Zap,
} from "lucide-react";
import { useEffect, useState } from "react";

import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { useDatasetSearch } from "@/hooks/use-datasets";
import { useExperimentSearch } from "@/hooks/use-experiments";
import { useRouter } from "next/navigation";

interface CommandPaletteProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function CommandPalette({ open, onOpenChange }: CommandPaletteProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();

  // Search hooks
  const {
    data: datasets,
    isLoading: datasetsLoading,
    error: datasetsError,
  } = useDatasetSearch(searchQuery);

  const {
    data: experiments,
    isLoading: experimentsLoading,
    error: experimentsError,
  } = useExperimentSearch(searchQuery);

  const handleSearch = (value: string) => {
    setSearchQuery(value);
  };

  const handleSelectDataset = (datasetId: string) => {
    router.push(`/dashboard/datasets/${datasetId}`);
    onOpenChange(false);
    setSearchQuery("");
  };

  const handleSelectExperiment = (experimentId: string) => {
    router.push(`/dashboard/experiments/${experimentId}`);
    onOpenChange(false);
    setSearchQuery("");
  };

  const handleCreateExperiment = () => {
    router.push("/dashboard/experiments");
    onOpenChange(false);
    setSearchQuery("");
  };

  const handleUploadDataset = () => {
    router.push("/dashboard/datasets");
    onOpenChange(false);
    setSearchQuery("");
  };

  const isLoading = datasetsLoading || experimentsLoading;
  const hasSearchResults =
    (datasets && datasets.length > 0) ||
    (experiments && experiments.length > 0);

  // Show default content when no search query or when loading with no query
  const showDefaultContent = !searchQuery || (isLoading && !searchQuery);

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        onOpenChange(true);
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  return (
    <CommandDialog
      open={open}
      onOpenChange={onOpenChange}
      commandProps={{ shouldFilter: false }}
    >
      <CommandInput
        placeholder="Search experiments, datasets, models..."
        value={searchQuery}
        onValueChange={handleSearch}
      />
      <CommandList>
        {isLoading && searchQuery && (
          <div className="flex items-center justify-center py-6">
            <Loader2 className="h-4 w-4 animate-spin" />
            <span className="ml-2 text-sm text-muted-foreground">
              Searching...
            </span>
          </div>
        )}

        {!isLoading && !hasSearchResults && searchQuery && (
          <CommandEmpty>No results found for "{searchQuery}".</CommandEmpty>
        )}

        {showDefaultContent && (
          <>
            <CommandGroup heading="Quick Actions">
              <CommandItem onSelect={handleCreateExperiment}>
                <FlaskConical className="size-4" />
                <span>Create new experiment</span>
              </CommandItem>
              <CommandItem onSelect={handleUploadDataset}>
                <Database className="size-4" />
                <span>Upload dataset</span>
              </CommandItem>
            </CommandGroup>

            <CommandGroup heading="Navigation">
              <CommandItem onSelect={() => router.push("/dashboard")}>
                <Zap className="size-4" />
                <span>Go to dashboard</span>
              </CommandItem>
              <CommandItem
                onSelect={() => router.push("/dashboard/experiments")}
              >
                <FlaskConical className="size-4" />
                <span>View all experiments</span>
              </CommandItem>
              <CommandItem onSelect={() => router.push("/dashboard/datasets")}>
                <Database className="size-4" />
                <span>Browse datasets</span>
              </CommandItem>
              <CommandItem>
                <Clock className="size-4" />
                <span>View activity</span>
              </CommandItem>
              <CommandItem>
                <MessageSquare className="size-4" />
                <span>Send feedback</span>
              </CommandItem>
            </CommandGroup>
          </>
        )}

        {!isLoading && experiments && experiments.length > 0 && (
          <CommandGroup heading="Experiments">
            {experiments.map((experiment) => (
              <CommandItem
                key={experiment.id}
                onSelect={() => handleSelectExperiment(experiment.id)}
                className="flex items-center justify-between"
              >
                <div className="flex items-center">
                  <FlaskConical className="size-4 mr-2" />
                  <div className="flex flex-col">
                    <span className="font-medium">{experiment.name}</span>
                    <span className="text-xs text-muted-foreground">
                      {experiment.description}
                    </span>
                  </div>
                </div>
              </CommandItem>
            ))}
          </CommandGroup>
        )}

        {!isLoading && datasets && datasets.length > 0 && (
          <CommandGroup heading="Datasets">
            {datasets.map((dataset) => (
              <CommandItem
                key={dataset.id}
                onSelect={() => handleSelectDataset(dataset.id)}
                className="flex items-center justify-between"
              >
                <div className="flex items-center">
                  <Database className="size-4 mr-2" />
                  <div className="flex flex-col">
                    <span className="font-medium">{dataset.name}</span>
                    <span className="text-xs text-muted-foreground">
                      {dataset.description}
                    </span>
                  </div>
                </div>
              </CommandItem>
            ))}
          </CommandGroup>
        )}
      </CommandList>
    </CommandDialog>
  );
}
