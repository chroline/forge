"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { useCreateDataset } from "@/hooks/use-datasets";
import { cn } from "@/lib/utils";
import { AlertCircle, FileText, Upload, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";

interface DatasetUploadSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function DatasetUploadSheet({
  open,
  onOpenChange,
}: DatasetUploadSheetProps) {
  const [file, setFile] = useState<File | null>(null);
  const [isDragOver, setIsDragOver] = useState(false);
  const router = useRouter();

  const createDatasetMutation = useCreateDataset();

  const handleFileSelect = useCallback((selectedFile: File) => {
    setFile(selectedFile);
  }, []);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragOver(false);

      const droppedFile = e.dataTransfer.files[0];
      if (droppedFile) {
        handleFileSelect(droppedFile);
      }
    },
    [handleFileSelect]
  );

  const handleFileInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const selectedFile = e.target.files?.[0];
      if (selectedFile) {
        handleFileSelect(selectedFile);
      }
    },
    [handleFileSelect]
  );

  const handleUpload = useCallback(async () => {
    if (!file) return;

    try {
      const newDataset = await createDatasetMutation.mutateAsync(file);

      // Reset form and close sheet
      setFile(null);
      onOpenChange(false);

      // Redirect to the dataset detail page
      router.push(`/dashboard/datasets/${newDataset.id}`);
    } catch (error) {
      console.error("Upload failed:", error);
    }
  }, [file, createDatasetMutation, onOpenChange, router]);

  const handleClose = useCallback(() => {
    setFile(null);
    setIsDragOver(false);
    onOpenChange(false);
  }, [onOpenChange]);

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-[400px] sm:w-[540px]">
        <SheetHeader>
          <SheetTitle>Upload New Dataset</SheetTitle>
          <SheetDescription>
            Upload a file to create a new dataset. Supported formats: CSV, JSON,
            Excel, and more.
          </SheetDescription>
        </SheetHeader>

        <div className="flex-1 px-4">
          <div
            className={cn(
              "border-2 border-dashed rounded-lg p-8 text-center transition-colors",
              isDragOver
                ? "border-primary bg-primary/5"
                : "border-muted-foreground/25 hover:border-muted-foreground/50",
              file && "border-primary bg-primary/5"
            )}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            {file ? (
              <div className="space-y-4">
                <div className="flex items-center justify-center">
                  <FileText className="h-12 w-12 text-primary" />
                </div>
                <div>
                  <p className="font-medium text-sm">{file.name}</p>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setFile(null)}
                  className="mt-2"
                >
                  <X className="h-4 w-4 mr-1" />
                  Remove File
                </Button>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="flex items-center justify-center">
                  <Upload className="h-12 w-12 text-muted-foreground" />
                </div>
                <div>
                  <p className="font-medium text-sm">
                    Drag and drop your file here, or click to browse
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    Supports CSV, JSON, Excel, and other data formats
                  </p>
                </div>
                <Input
                  type="file"
                  accept=".csv,.json,.xlsx,.xls,.txt,.parquet"
                  onChange={handleFileInputChange}
                  className="hidden"
                  id="file-upload"
                />
                <Button variant="outline" size="sm" asChild>
                  <label htmlFor="file-upload" className="cursor-pointer">
                    Choose File
                  </label>
                </Button>
              </div>
            )}
          </div>

          {file && (
            <div className="mt-4 p-3 bg-muted/50 rounded-lg">
              <div className="flex items-start space-x-2">
                <AlertCircle className="h-4 w-4 text-muted-foreground mt-0.5 flex-shrink-0" />
                <div className="text-xs text-muted-foreground">
                  <p className="font-medium">
                    File will be processed as a new dataset
                  </p>
                  <p>You can configure dataset settings after upload</p>
                </div>
              </div>
            </div>
          )}
        </div>

        <SheetFooter>
          <Button variant="outline" onClick={handleClose}>
            Cancel
          </Button>
          <Button
            onClick={handleUpload}
            disabled={!file || createDatasetMutation.isPending}
            className="min-w-[100px]"
          >
            {createDatasetMutation.isPending
              ? "Uploading..."
              : "Upload Dataset"}
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
