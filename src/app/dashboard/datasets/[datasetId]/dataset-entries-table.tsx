"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { useDatasetEntriesPaginated, useDatasetEntriesSearch, getDatasetStatistics } from "@/hooks/use-dataset-entries";
import { ChevronLeft, ChevronRight, Search, Filter } from "lucide-react";
import { useState, useMemo } from "react";

interface DatasetEntriesTableProps {
  datasetId: string;
}

export function DatasetEntriesTable({ datasetId }: DatasetEntriesTableProps) {
  const [page, setPage] = useState(1);
  const [pageSize] = useState(10);
  const [searchQuery, setSearchQuery] = useState("");
  const [intentFilter, setIntentFilter] = useState<string>("all");
  const [urgencyFilter, setUrgencyFilter] = useState<string>("all");

  // Get paginated entries
  const { data: paginatedData, isLoading: isLoadingEntries } = useDatasetEntriesPaginated(
    datasetId,
    page,
    pageSize
  );

  // Get search results
  const { data: searchResults, isLoading: isLoadingSearch } = useDatasetEntriesSearch(
    datasetId,
    searchQuery
  );

  // Determine which data to show
  const displayData = searchQuery ? searchResults : paginatedData?.entries;
  const isLoading = isLoadingEntries || isLoadingSearch;

  // Get statistics for filters
  const statistics = useMemo(() => {
    if (!displayData) return null;
    return getDatasetStatistics(displayData);
  }, [displayData]);

  // Filter entries based on intent and urgency
  const filteredEntries = useMemo(() => {
    if (!displayData) return [];
    
    return displayData.filter(entry => {
      const matchesIntent = intentFilter === "all" || entry.intent_category === intentFilter;
      const matchesUrgency = urgencyFilter === "all" || entry.urgency_level === urgencyFilter;
      return matchesIntent && matchesUrgency;
    });
  }, [displayData, intentFilter, urgencyFilter]);

  const totalPages = searchQuery 
    ? Math.ceil((filteredEntries?.length || 0) / pageSize)
    : Math.ceil((paginatedData?.total || 0) / pageSize);

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setPage(1); // Reset to first page when searching
  };

  const clearFilters = () => {
    setIntentFilter("all");
    setUrgencyFilter("all");
    setSearchQuery("");
    setPage(1);
  };

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case "urgent":
        return "destructive";
      case "high":
        return "default";
      case "medium":
        return "secondary";
      case "low":
        return "outline";
      default:
        return "outline";
    }
  };

  const getIntentColor = (intent: string) => {
    switch (intent) {
      case "appointment request":
        return "default";
      case "medication question":
        return "secondary";
      case "billing inquiry":
        return "outline";
      case "test results":
        return "default";
      case "general question":
        return "secondary";
      case "complaint":
        return "destructive";
      default:
        return "outline";
    }
  };

  const getPriorityColor = (priority: number) => {
    if (priority >= 4) return "destructive";
    if (priority >= 3) return "default";
    return "secondary";
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Dataset Entries</CardTitle>
      </CardHeader>
      <CardContent>
        {/* Search and Filters */}
        <div className="space-y-4 mb-6">
          {/* Search */}
          <div className="flex gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search messages, intent, urgency..."
                value={searchQuery}
                onChange={(e) => handleSearch(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button variant="outline" onClick={clearFilters}>
              Clear
            </Button>
          </div>

          {/* Filters */}
          <div className="flex gap-4">
            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">Filters:</span>
            </div>
            
            <Select value={intentFilter} onValueChange={setIntentFilter}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Intent Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Intents</SelectItem>
                {statistics?.intents.map(intent => (
                  <SelectItem key={intent} value={intent}>
                    {intent} ({statistics.intentCounts[intent]})
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={urgencyFilter} onValueChange={setUrgencyFilter}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Urgency Level" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Urgency Levels</SelectItem>
                {statistics?.urgencyLevels.map(urgency => (
                  <SelectItem key={urgency} value={urgency}>
                    {urgency} ({statistics.urgencyCounts[urgency]})
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Statistics */}
          {statistics && (
            <div className="flex gap-4 text-sm text-muted-foreground">
              <span>Showing {filteredEntries.length} of {statistics.totalEntries} entries</span>
              <span>Avg Priority: {statistics.avgResponsePriority}</span>
            </div>
          )}
        </div>

        {/* Table */}
        <div className="border rounded-lg">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-24">ID</TableHead>
                <TableHead className="min-w-64">Message Content</TableHead>
                <TableHead className="w-32">Intent</TableHead>
                <TableHead className="w-24">Urgency</TableHead>
                <TableHead className="w-24">Type</TableHead>
                <TableHead className="w-20">Priority</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-8">
                    Loading entries...
                  </TableCell>
                </TableRow>
              ) : filteredEntries.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                    No entries found
                  </TableCell>
                </TableRow>
              ) : (
                filteredEntries.map((entry) => (
                  <TableRow key={entry.message_id}>
                    <TableCell className="font-mono text-xs">
                      {entry.message_id}
                    </TableCell>
                    <TableCell className="max-w-64">
                      <div className="truncate" title={entry.message_content}>
                        {entry.message_content}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant={getIntentColor(entry.intent_category)} className="text-xs">
                        {entry.intent_category}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant={getUrgencyColor(entry.urgency_level)} className="text-xs">
                        {entry.urgency_level}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className="text-xs">
                        {entry.patient_type}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant={getPriorityColor(entry.response_priority)} className="text-xs">
                        {entry.response_priority}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>

        {/* Pagination */}
        {!searchQuery && paginatedData && totalPages > 1 && (
          <div className="flex items-center justify-between mt-4">
            <div className="text-sm text-muted-foreground">
              Page {page} of {totalPages} ({paginatedData.total} total entries)
            </div>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => handlePageChange(page - 1)}
                disabled={page <= 1}
              >
                <ChevronLeft className="h-4 w-4" />
                Previous
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handlePageChange(page + 1)}
                disabled={page >= totalPages}
              >
                Next
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
