"use client";

import { DashboardBody } from "@/components/dashboard-body";
import { DashboardHeader } from "@/components/dashboard-header";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useState } from "react";
import { DatasetSidebar } from "./dataset-sidebar";
import { DatasetUploadSheet } from "./dataset-upload-sheet";

export default function DatasetsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [uploadSheetOpen, setUploadSheetOpen] = useState(false);

  return (
    <div className="flex flex-1 flex-col h-full overflow-hidden">
      <DashboardHeader title="Datasets">
        <Button onClick={() => setUploadSheetOpen(true)}>
          <Plus className="mr-1 h-4 w-4" />
          New Dataset
        </Button>
      </DashboardHeader>

      <DashboardBody>
        <div className="flex-1 flex gap-8 h-full overflow-hidden">
          {/* Left Panel - Dataset List */}
          <DatasetSidebar />

          {/* Right Panel - Child Pages */}
          <div className="flex-1 flex flex-col h-full overflow-scroll">
            <div className="max-w-4xl w-full mx-auto">{children}</div>
          </div>
        </div>

        {/* Upload Sheet */}
        <DatasetUploadSheet
          open={uploadSheetOpen}
          onOpenChange={setUploadSheetOpen}
        />
      </DashboardBody>
    </div>
  );
}
