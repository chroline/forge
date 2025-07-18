"use client";

import { Badge } from "@/components/ui/badge";
import { Experiment } from "@/lib/types";
import { format } from "date-fns";
import { Activity, BarChart3, TrendingUp } from "lucide-react";
import { useRouter } from "next/navigation";

interface ExperimentDetailsHeaderProps {
  experiment: Experiment;
}

export function ExperimentDetailsHeader({
  experiment,
}: ExperimentDetailsHeaderProps) {
  const router = useRouter();

  const getStatusColor = (status: string) => {
    switch (status) {
      case "running":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "completed":
        return "bg-green-100 text-green-800 border-green-200";
      case "failed":
        return "bg-red-100 text-red-800 border-red-200";
      case "pending":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  return (
    <div className="border-b">
      <div className="container mx-auto px-12 py-10">
        {/* Experiment Info */}
        <div className="space-y-4">
          <div className="flex items-start justify-between">
            <div className="space-y-2">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <BarChart3 className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <h1 className="text-3xl font-bold">{experiment.name}</h1>
                  <p className="text-lg opacity-50">{experiment.description}</p>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Badge className={`${getStatusColor(experiment.status)} border`}>
                {experiment.status.charAt(0).toUpperCase() +
                  experiment.status.slice(1)}
              </Badge>
            </div>
          </div>

          {/* Experiment Details */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 pt-4">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-gray-100 rounded-lg">
                <Activity className="h-4 w-4 text-gray-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900">Dataset</p>
                <p className="text-sm text-gray-600">{experiment.dataset}</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-gray-100 rounded-lg">
                <TrendingUp className="h-4 w-4 text-gray-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900">Model</p>
                <p className="text-sm text-gray-600">{experiment.model}</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-gray-100 rounded-lg">
                <BarChart3 className="h-4 w-4 text-gray-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900">Framework</p>
                <p className="text-sm text-gray-600">{experiment.framework}</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-gray-100 rounded-lg">
                <Activity className="h-4 w-4 text-gray-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900">Created</p>
                <p className="text-sm text-gray-600">
                  {format(new Date(experiment.createdAt), "MMM dd, yyyy")}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
