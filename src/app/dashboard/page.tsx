"use client";

import { DashboardBody } from "@/components/dashboard-body";
import { DashboardHeader } from "@/components/dashboard-header";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useDatasets } from "@/hooks/use-datasets";
import { useExperiments } from "@/hooks/use-experiments";
import {
  Activity,
  AlertCircle,
  ArrowRight,
  BarChart3,
  CheckCircle,
  Clock,
  Database,
  FlaskConical,
  PlayCircle,
  Plus,
  TrendingUp,
} from "lucide-react";
import Link from "next/link";

export default function DashboardPage() {
  const { data: datasets, isLoading: datasetsLoading } = useDatasets();
  const { data: experiments, isLoading: experimentsLoading } = useExperiments();

  // Calculate statistics
  const totalDatasets = datasets?.length || 0;
  const totalExperiments = experiments?.length || 0;
  const activeExperiments =
    experiments?.filter((exp) => exp.status === "running").length || 0;
  const completedExperiments =
    experiments?.filter((exp) => exp.status === "completed").length || 0;

  // Get recent items
  const recentDatasets = datasets?.slice(0, 3) || [];
  const recentExperiments = experiments?.slice(0, 3) || [];

  // Calculate average accuracy for completed experiments
  const completedExperimentsWithAccuracy =
    experiments?.filter(
      (exp) =>
        exp.status === "completed" &&
        exp.metrics?.classificationMetrics?.accuracy
    ) || [];
  const avgAccuracy =
    completedExperimentsWithAccuracy.length > 0
      ? completedExperimentsWithAccuracy.reduce(
          (acc, exp) =>
            acc + (exp.metrics?.classificationMetrics?.accuracy || 0),
          0
        ) / completedExperimentsWithAccuracy.length
      : 0;

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
      case "completed":
        return "success";
      case "running":
        return "warning";
      case "failed":
        return "destructive";
      case "pending":
        return "secondary";
      default:
        return "default";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "active":
      case "completed":
        return <CheckCircle className="w-4 h-4" />;
      case "running":
        return <PlayCircle className="w-4 h-4" />;
      case "failed":
        return <AlertCircle className="w-4 h-4" />;
      case "pending":
        return <Clock className="w-4 h-4" />;
      default:
        return <Activity className="w-4 h-4" />;
    }
  };

  return (
    <div className="flex flex-1 flex-col">
      <DashboardHeader title="Dashboard" />
      <DashboardBody>
        <div className="flex flex-1 flex-col gap-6">
          {/* Welcome Section */}
          <div className="space-y-2">
            <h1 className="text-3xl font-bold tracking-tight">Welcome back!</h1>
            <p className="text-muted-foreground">
              Here's what's happening with your AI experiments and datasets.
            </p>
          </div>

          {/* Statistics Cards */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Total Datasets
                </CardTitle>
                <Database className="h-4 w-4 text-blue-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-blue-600">
                  {totalDatasets}
                </div>
                <p className="text-xs text-muted-foreground">
                  {datasetsLoading ? "Loading..." : "Active datasets"}
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Total Experiments
                </CardTitle>
                <FlaskConical className="h-4 w-4 text-purple-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-purple-600">
                  {totalExperiments}
                </div>
                <p className="text-xs text-muted-foreground">
                  {experimentsLoading ? "Loading..." : "All experiments"}
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Active Experiments
                </CardTitle>
                <PlayCircle className="h-4 w-4 text-orange-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-orange-600">
                  {activeExperiments}
                </div>
                <p className="text-xs text-muted-foreground">
                  Currently running
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Avg Accuracy
                </CardTitle>
                <TrendingUp className="h-4 w-4 text-green-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-600">
                  {avgAccuracy > 0
                    ? `${(avgAccuracy * 100).toFixed(1)}%`
                    : "N/A"}
                </div>
                <p className="text-xs text-muted-foreground">
                  Completed experiments
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Quick Actions */}
          <div className="space-y-4">
            <div>
              <h2 className="text-lg font-semibold">Quick Actions</h2>
              <p className="text-sm text-muted-foreground">
                Get started with common tasks
              </p>
            </div>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <Button asChild className="h-auto flex-col gap-2 p-4">
                <Link href="/dashboard/datasets">
                  <Database className="h-6 w-6" />
                  <span>View Datasets</span>
                </Link>
              </Button>
              <Button asChild className="h-auto flex-col gap-2 p-4">
                <Link href="/dashboard/experiments">
                  <FlaskConical className="h-6 w-6" />
                  <span>View Experiments</span>
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                className="h-auto flex-col gap-2 p-4"
              >
                <Link href="/dashboard/datasets">
                  <Plus className="h-6 w-6" />
                  <span>Upload Dataset</span>
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                className="h-auto flex-col gap-2 p-4"
              >
                <Link href="/dashboard/experiments">
                  <Plus className="h-6 w-6" />
                  <span>New Experiment</span>
                </Link>
              </Button>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="grid gap-6 md:grid-cols-2">
            {/* Recent Datasets */}
            <div className="space-y-4">
              <div>
                <h2 className="text-lg font-semibold flex items-center gap-2">
                  <Database className="h-5 w-5" />
                  Recent Datasets
                </h2>
                <p className="text-sm text-muted-foreground">
                  Your most recently updated datasets
                </p>
              </div>
              <div className="space-y-4">
                {datasetsLoading ? (
                  <div className="text-sm text-muted-foreground">
                    Loading datasets...
                  </div>
                ) : recentDatasets.length > 0 ? (
                  recentDatasets.map((dataset) => (
                    <div
                      key={dataset.id}
                      className="flex items-center justify-between p-4 rounded-lg border bg-card"
                    >
                      <div className="space-y-1">
                        <p className="text-sm font-medium leading-none">
                          {dataset.name}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {dataset.entries} entries • {dataset.columns} columns
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant={getStatusColor(dataset.status) as any}>
                          {dataset.status}
                        </Badge>
                        <Button variant="ghost" size="sm" asChild>
                          <Link href={`/dashboard/datasets/${dataset.id}`}>
                            <ArrowRight className="h-4 w-4" />
                          </Link>
                        </Button>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-sm text-muted-foreground p-4 rounded-lg border bg-card">
                    No datasets yet. Create your first dataset to get started.
                  </div>
                )}
                {recentDatasets.length > 0 && (
                  <Button
                    variant="outline"
                    size="sm"
                    asChild
                    className="w-full"
                  >
                    <Link href="/dashboard/datasets">
                      View all datasets
                      <ArrowRight className="h-4 w-4 ml-2" />
                    </Link>
                  </Button>
                )}
              </div>
            </div>

            {/* Recent Experiments */}
            <div className="space-y-4">
              <div>
                <h2 className="text-lg font-semibold flex items-center gap-2">
                  <FlaskConical className="h-5 w-5" />
                  Recent Experiments
                </h2>
                <p className="text-sm text-muted-foreground">
                  Your most recent experiments
                </p>
              </div>
              <div className="space-y-4">
                {experimentsLoading ? (
                  <div className="text-sm text-muted-foreground">
                    Loading experiments...
                  </div>
                ) : recentExperiments.length > 0 ? (
                  recentExperiments.map((experiment) => (
                    <div
                      key={experiment.id}
                      className="flex items-center justify-between p-4 rounded-lg border bg-card"
                    >
                      <div className="space-y-1">
                        <p className="text-sm font-medium leading-none">
                          {experiment.name}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {experiment.model} •{" "}
                          {experiment.metrics?.iterations || 0} iterations
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge
                          variant={getStatusColor(experiment.status) as any}
                        >
                          {getStatusIcon(experiment.status)}
                          {experiment.status}
                        </Badge>
                        <Button variant="ghost" size="sm" asChild>
                          <Link
                            href={`/dashboard/experiments/${experiment.id}`}
                          >
                            <ArrowRight className="h-4 w-4" />
                          </Link>
                        </Button>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-sm text-muted-foreground p-4 rounded-lg border bg-card">
                    No experiments yet. Run your first experiment to get
                    started.
                  </div>
                )}
                {recentExperiments.length > 0 && (
                  <Button
                    variant="outline"
                    size="sm"
                    asChild
                    className="w-full"
                  >
                    <Link href="/dashboard/experiments">
                      View all experiments
                      <ArrowRight className="h-4 w-4 ml-2" />
                    </Link>
                  </Button>
                )}
              </div>
            </div>
          </div>

          {/* Performance Overview */}
          {completedExperiments > 0 && (
            <div className="space-y-4">
              <div>
                <h2 className="text-lg font-semibold flex items-center gap-2">
                  <BarChart3 className="h-5 w-5" />
                  Performance Overview
                </h2>
                <p className="text-sm text-muted-foreground">
                  Insights from your completed experiments
                </p>
              </div>
              <div className="grid gap-4 md:grid-cols-3">
                <div className="space-y-2 p-4 rounded-lg border bg-card">
                  <p className="text-sm font-medium">Completion Rate</p>
                  <div className="text-2xl font-bold">
                    {totalExperiments > 0
                      ? `${(
                          (completedExperiments / totalExperiments) *
                          100
                        ).toFixed(1)}%`
                      : "0%"}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {completedExperiments} of {totalExperiments} experiments
                    completed
                  </p>
                </div>
                <div className="space-y-2 p-4 rounded-lg border bg-card">
                  <p className="text-sm font-medium">Success Rate</p>
                  <div className="text-2xl font-bold">
                    {completedExperiments > 0
                      ? `${(
                          (completedExperiments /
                            (completedExperiments +
                              (experiments?.filter(
                                (exp) => exp.status === "failed"
                              ).length || 0))) *
                          100
                        ).toFixed(1)}%`
                      : "0%"}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Successful completions
                  </p>
                </div>
                <div className="space-y-2 p-4 rounded-lg border bg-card">
                  <p className="text-sm font-medium">Average Accuracy</p>
                  <div className="text-2xl font-bold">
                    {avgAccuracy > 0
                      ? `${(avgAccuracy * 100).toFixed(1)}%`
                      : "N/A"}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Across all completed experiments
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </DashboardBody>
    </div>
  );
}
