"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useDatasets } from "@/hooks/use-datasets";
import { Archive, Download, Eye, Plus } from "lucide-react";
import { useMemo, useState } from "react";

type Status = "active" | "archived";

export default function DatasetsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<Status | "all">("all");

  // Use TanStack Query to fetch datasets
  const { data: datasets = [], isLoading, error } = useDatasets();

  // Filter datasets based on search query and status filter
  const filteredDatasets = useMemo(() => {
    return datasets.filter((dataset) => {
      const matchesSearch =
        dataset.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        dataset.description.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesStatus =
        statusFilter === "all" || dataset.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [datasets, searchQuery, statusFilter]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "success";
      case "archived":
        return "secondary";
      default:
        return "default";
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "active":
        return "Active";
      case "archived":
        return "Archived";
      default:
        return status;
    }
  };

  // Calculate summary statistics
  const totalDatasets = datasets.length;
  const activeDatasets = datasets.filter((d) => d.status === "active").length;
  const totalEntries = datasets.reduce((acc, d) => acc + d.entries, 0);

  // Loading state
  if (isLoading) {
    return (
      <div className="flex flex-1 flex-col h-full overflow-hidden">
        <div className="space-y-6">
          <div className="space-y-2">
            <Skeleton className="h-8 w-64" />
            <Skeleton className="h-4 w-96" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <Card key={i}>
                <CardHeader className="pb-2">
                  <Skeleton className="h-4 w-24" />
                </CardHeader>
                <CardContent>
                  <Skeleton className="h-8 w-16" />
                </CardContent>
              </Card>
            ))}
          </div>

          <Card>
            <CardHeader>
              <Skeleton className="h-6 w-32" />
            </CardHeader>
            <CardContent>
              <div className="flex gap-2">
                {Array.from({ length: 3 }).map((_, i) => (
                  <Skeleton key={i} className="h-10 w-32" />
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="flex flex-1 flex-col h-full overflow-hidden">
        <div className="space-y-6">
          <div className="space-y-2">
            <h1 className="text-2xl font-bold">Datasets Overview</h1>
            <p className="text-muted-foreground">
              Manage and explore your datasets. Select a dataset from the list
              to view detailed information.
            </p>
          </div>

          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <p className="text-destructive">Failed to load datasets</p>
                <Button
                  variant="outline"
                  className="mt-2"
                  onClick={() => window.location.reload()}
                >
                  Retry
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-1 flex-col h-full overflow-hidden">
      <div className="space-y-6">
        {/* Header */}
        <div className="space-y-2">
          <h1 className="text-2xl font-bold">Datasets Overview</h1>
          <p className="text-muted-foreground">
            Manage and explore your datasets. Select a dataset from the list to
            view detailed information.
          </p>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Total Datasets
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalDatasets}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Active Datasets
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{activeDatasets}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Total Entries
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {totalEntries.toLocaleString()}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex gap-2">
              <Button variant="default">
                <Plus className="mr-2 h-4 w-4" />
                Create New Dataset
              </Button>
              <Button variant="outline">
                <Download className="mr-2 h-4 w-4" />
                Import Dataset
              </Button>
              <Button variant="outline">
                <Archive className="mr-2 h-4 w-4" />
                View Archived
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {filteredDatasets.slice(0, 3).map((dataset) => (
                <div
                  key={dataset.id}
                  className="flex items-center justify-between"
                >
                  <div className="flex items-center gap-3">
                    <Badge
                      variant={getStatusColor(dataset.status)}
                      className="text-xs"
                    >
                      {getStatusText(dataset.status)}
                    </Badge>
                    <div>
                      <p className="text-sm font-medium">{dataset.name}</p>
                      <p className="text-xs text-muted-foreground">
                        Updated {dataset.lastUpdated}
                      </p>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm">
                    <Eye className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
