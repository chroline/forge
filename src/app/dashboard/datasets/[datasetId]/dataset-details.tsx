"use client";

interface DatasetDetailsProps {
  createdAt: string;
  lastUpdated: string;
}

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

export function DatasetDetails({
  createdAt,
  lastUpdated,
}: DatasetDetailsProps) {
  return (
    <div className="flex items-center gap-6 text-sm text-muted-foreground">
      <div className="flex items-center gap-2">
        <span>Created:</span>
        <span className="font-medium text-foreground">{createdAt}</span>
      </div>
      <div className="flex items-center gap-2">
        <span>Last updated:</span>
        <span className="font-medium text-foreground">{lastUpdated}</span>
      </div>
    </div>
  );
}
