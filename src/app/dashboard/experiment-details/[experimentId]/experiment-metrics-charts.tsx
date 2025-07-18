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
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

interface ExperimentMetricsChartsProps {
  metricsOverTime: MetricsOverTime[];
}

export function ExperimentMetricsCharts({
  metricsOverTime,
}: ExperimentMetricsChartsProps) {
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

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-4 border rounded-lg shadow-lg">
          <p className="font-medium text-gray-900">Iteration {label}</p>
          {payload.map((entry: any, index: number) => (
            <p key={index} className="text-sm" style={{ color: entry.color }}>
              {entry.name}: {entry.value}%
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Metrics Evolution
        </h2>
        <p className="text-gray-600">
          Performance metrics over time across prompt iterations
        </p>
      </div>

      {/* Main Metrics Line Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Core Classification Metrics</CardTitle>
          <CardDescription>
            Accuracy, Precision, Recall, and F1 Score progression over
            iterations
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={400}>
            <LineChart
              data={chartData}
              margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis
                dataKey="date"
                stroke="#888888"
                fontSize={12}
                tickLine={false}
                axisLine={false}
              />
              <YAxis
                domain={[0, 100]}
                stroke="#888888"
                fontSize={12}
                tickLine={false}
                axisLine={false}
                tickFormatter={(value) => `${value}%`}
              />
              <Tooltip content={<CustomTooltip />} />
              <Legend />
              <Line
                type="monotone"
                dataKey="accuracy"
                stroke="#2563eb"
                strokeWidth={3}
                name="Accuracy"
                dot={{ fill: "#2563eb", strokeWidth: 2, r: 4 }}
                activeDot={{ r: 6 }}
              />
              <Line
                type="monotone"
                dataKey="precision"
                stroke="#dc2626"
                strokeWidth={3}
                name="Precision"
                dot={{ fill: "#dc2626", strokeWidth: 2, r: 4 }}
                activeDot={{ r: 6 }}
              />
              <Line
                type="monotone"
                dataKey="recall"
                stroke="#059669"
                strokeWidth={3}
                name="Recall"
                dot={{ fill: "#059669", strokeWidth: 2, r: 4 }}
                activeDot={{ r: 6 }}
              />
              <Line
                type="monotone"
                dataKey="f1Score"
                stroke="#7c3aed"
                strokeWidth={3}
                name="F1 Score"
                dot={{ fill: "#7c3aed", strokeWidth: 2, r: 4 }}
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Additional Metrics Area Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Additional Performance Metrics</CardTitle>
          <CardDescription>
            Specificity, Sensitivity, and AUC trends over iterations
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={400}>
            <AreaChart
              data={chartData}
              margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis
                dataKey="date"
                stroke="#888888"
                fontSize={12}
                tickLine={false}
                axisLine={false}
              />
              <YAxis
                domain={[0, 100]}
                stroke="#888888"
                fontSize={12}
                tickLine={false}
                axisLine={false}
                tickFormatter={(value) => `${value}%`}
              />
              <Tooltip content={<CustomTooltip />} />
              <Legend />
              <Area
                type="monotone"
                dataKey="specificity"
                stackId="1"
                stroke="#ea580c"
                fill="#ea580c"
                fillOpacity={0.6}
                name="Specificity"
              />
              <Area
                type="monotone"
                dataKey="sensitivity"
                stackId="1"
                stroke="#0891b2"
                fill="#0891b2"
                fillOpacity={0.6}
                name="Sensitivity"
              />
              <Area
                type="monotone"
                dataKey="auc"
                stackId="1"
                stroke="#be185d"
                fill="#be185d"
                fillOpacity={0.6}
                name="AUC"
              />
            </AreaChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Performance Comparison Bar Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Performance Comparison</CardTitle>
          <CardDescription>
            Side-by-side comparison of key metrics across iterations
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={400}>
            <BarChart
              data={chartData}
              margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis
                dataKey="date"
                stroke="#888888"
                fontSize={12}
                tickLine={false}
                axisLine={false}
              />
              <YAxis
                domain={[0, 100]}
                stroke="#888888"
                fontSize={12}
                tickLine={false}
                axisLine={false}
                tickFormatter={(value) => `${value}%`}
              />
              <Tooltip content={<CustomTooltip />} />
              <Legend />
              <Bar
                dataKey="accuracy"
                fill="#2563eb"
                name="Accuracy"
                radius={[4, 4, 0, 0]}
              />
              <Bar
                dataKey="f1Score"
                fill="#7c3aed"
                name="F1 Score"
                radius={[4, 4, 0, 0]}
              />
              <Bar
                dataKey="auc"
                fill="#be185d"
                name="AUC"
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Metrics Summary Table */}
      <Card>
        <CardHeader>
          <CardTitle>Detailed Metrics Table</CardTitle>
          <CardDescription>
            Complete breakdown of all metrics for each iteration
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b bg-gray-50">
                  <th className="text-left p-3 font-medium text-gray-900">
                    Iteration
                  </th>
                  <th className="text-left p-3 font-medium text-gray-900">
                    Date
                  </th>
                  <th className="text-right p-3 font-medium text-gray-900">
                    Accuracy
                  </th>
                  <th className="text-right p-3 font-medium text-gray-900">
                    Precision
                  </th>
                  <th className="text-right p-3 font-medium text-gray-900">
                    Recall
                  </th>
                  <th className="text-right p-3 font-medium text-gray-900">
                    F1 Score
                  </th>
                  <th className="text-right p-3 font-medium text-gray-900">
                    AUC
                  </th>
                  <th className="text-right p-3 font-medium text-gray-900">
                    Specificity
                  </th>
                  <th className="text-right p-3 font-medium text-gray-900">
                    Sensitivity
                  </th>
                </tr>
              </thead>
              <tbody>
                {chartData.map((item, index) => (
                  <tr
                    key={index}
                    className="border-b hover:bg-gray-50 transition-colors"
                  >
                    <td className="p-3 font-medium text-gray-900">
                      {item.iteration}
                    </td>
                    <td className="p-3 text-gray-600">{item.date}</td>
                    <td className="p-3 text-right font-medium text-blue-600">
                      {item.accuracy}%
                    </td>
                    <td className="p-3 text-right font-medium text-red-600">
                      {item.precision}%
                    </td>
                    <td className="p-3 text-right font-medium text-green-600">
                      {item.recall}%
                    </td>
                    <td className="p-3 text-right font-medium text-purple-600">
                      {item.f1Score}%
                    </td>
                    <td className="p-3 text-right font-medium text-pink-600">
                      {item.auc}%
                    </td>
                    <td className="p-3 text-right font-medium text-orange-600">
                      {item.specificity}%
                    </td>
                    <td className="p-3 text-right font-medium text-cyan-600">
                      {item.sensitivity}%
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
