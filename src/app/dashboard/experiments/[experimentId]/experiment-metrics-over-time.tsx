"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { MetricsOverTime } from "@/lib/types";
import { format } from "date-fns";
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

interface ExperimentMetricsOverTimeProps {
  metricsOverTime: MetricsOverTime[];
}

export function ExperimentMetricsOverTime({
  metricsOverTime,
}: ExperimentMetricsOverTimeProps) {
  const chartData = metricsOverTime.map((item) => ({
    ...item,
    date: format(new Date(item.timestamp), "MMM dd"),
    accuracy: (item.metrics.accuracy * 100).toFixed(1),
    precision: (item.metrics.precision * 100).toFixed(1),
    recall: (item.metrics.recall * 100).toFixed(1),
    f1Score: (item.metrics.f1Score * 100).toFixed(1),
    specificity: (item.metrics.specificity * 100).toFixed(1),
    sensitivity: (item.metrics.sensitivity * 100).toFixed(1),
    auc: (item.metrics.auc * 100).toFixed(1),
  }));

  return (
    <Card>
      <CardHeader>
        <CardTitle>Classification Metrics Over Time</CardTitle>
        <CardDescription>
          Performance metrics evolution across prompt iterations
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {/* Main Metrics Chart */}
          <div>
            <h4 className="text-sm font-medium mb-4">
              Core Classification Metrics
            </h4>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis domain={[0, 100]} />
                <Tooltip
                  formatter={(value: any) => [`${value}%`, ""]}
                  labelFormatter={(label) => `Iteration ${label}`}
                />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="accuracy"
                  stroke="#2563eb"
                  strokeWidth={2}
                  name="Accuracy"
                />
                <Line
                  type="monotone"
                  dataKey="precision"
                  stroke="#dc2626"
                  strokeWidth={2}
                  name="Precision"
                />
                <Line
                  type="monotone"
                  dataKey="recall"
                  stroke="#059669"
                  strokeWidth={2}
                  name="Recall"
                />
                <Line
                  type="monotone"
                  dataKey="f1Score"
                  stroke="#7c3aed"
                  strokeWidth={2}
                  name="F1 Score"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Additional Metrics Chart */}
          <div>
            <h4 className="text-sm font-medium mb-4">Additional Metrics</h4>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis domain={[0, 100]} />
                <Tooltip
                  formatter={(value: any) => [`${value}%`, ""]}
                  labelFormatter={(label) => `Iteration ${label}`}
                />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="specificity"
                  stroke="#ea580c"
                  strokeWidth={2}
                  name="Specificity"
                />
                <Line
                  type="monotone"
                  dataKey="sensitivity"
                  stroke="#0891b2"
                  strokeWidth={2}
                  name="Sensitivity"
                />
                <Line
                  type="monotone"
                  dataKey="auc"
                  stroke="#be185d"
                  strokeWidth={2}
                  name="AUC"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Metrics Summary Table */}
          <div>
            <h4 className="text-sm font-medium mb-4">Metrics Summary</h4>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="text-left p-2">Iteration</th>
                    <th className="text-left p-2">Date</th>
                    <th className="text-right p-2">Accuracy</th>
                    <th className="text-right p-2">Precision</th>
                    <th className="text-right p-2">Recall</th>
                    <th className="text-right p-2">F1 Score</th>
                    <th className="text-right p-2">AUC</th>
                  </tr>
                </thead>
                <tbody>
                  {chartData.map((item, index) => (
                    <tr key={index} className="border-b hover:bg-muted/50">
                      <td className="p-2 font-medium">{item.iteration}</td>
                      <td className="p-2 text-muted-foreground">{item.date}</td>
                      <td className="p-2 text-right">{item.accuracy}%</td>
                      <td className="p-2 text-right">{item.precision}%</td>
                      <td className="p-2 text-right">{item.recall}%</td>
                      <td className="p-2 text-right">{item.f1Score}%</td>
                      <td className="p-2 text-right">{item.auc}%</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
