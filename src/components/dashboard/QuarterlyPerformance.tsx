
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';

interface QuarterlyPerformanceProps {
  station: string;
}

const QuarterlyPerformance: React.FC<QuarterlyPerformanceProps> = ({ station }) => {
  const quarterlyData = [
    { quarter: 'Q1 2023', revenue: 2400000, goal: 2200000, yoy: 8.5 },
    { quarter: 'Q2 2023', revenue: 2650000, goal: 2400000, yoy: 12.3 },
    { quarter: 'Q3 2023', revenue: 2800000, goal: 2600000, yoy: 15.2 },
    { quarter: 'Q4 2023', revenue: 3100000, goal: 2900000, yoy: 18.7 },
    { quarter: 'Q1 2024', revenue: 2750000, goal: 2600000, yoy: 14.6 },
    { quarter: 'Q2 2024', revenue: 2950000, goal: 2750000, yoy: 11.3 },
    { quarter: 'Q3 2024', revenue: 3200000, goal: 3000000, yoy: 14.3 },
    { quarter: 'Q4 2024', revenue: 2100000, goal: 3200000, yoy: 0 }, // Current quarter in progress
  ];

  const categoryData = [
    { name: 'Automotive', value: 25, color: '#3b82f6' },
    { name: 'Healthcare', value: 20, color: '#10b981' },
    { name: 'Real Estate', value: 15, color: '#8b5cf6' },
    { name: 'Food & Dining', value: 12, color: '#f59e0b' },
    { name: 'Retail', value: 10, color: '#ef4444' },
    { name: 'Other', value: 18, color: '#6b7280' },
  ];

  const pacingData = [
    { metric: "Revenue vs Goal", current: 2100000, target: 3200000, percentage: 65.6 },
    { metric: "Spots Sold", current: 8450, target: 12000, percentage: 70.4 },
    { metric: "New Clients", current: 23, target: 35, percentage: 65.7 },
    { metric: "Retention Rate", current: 89, target: 85, percentage: 104.7 },
  ];

  return (
    <div className="h-full overflow-auto space-y-6">
      {/* Summary KPIs */}
      <div className="grid grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Q4 Revenue</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">$2.1M</div>
            <div className="text-sm text-orange-600">65.6% of goal</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">YoY Growth</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">+14.3%</div>
            <div className="text-sm text-gray-500">vs Q3 2023</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Pacing</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">$1.1M</div>
            <div className="text-sm text-gray-500">Remaining to goal</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Days Left</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">28</div>
            <div className="text-sm text-gray-500">in Q4 2024</div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-3 gap-6">
        {/* Revenue vs Goals Chart */}
        <Card className="col-span-2">
          <CardHeader>
            <CardTitle>Revenue vs Goals Trend</CardTitle>
            <CardDescription>Quarterly performance over the last 8 quarters</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={quarterlyData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="quarter" />
                  <YAxis tickFormatter={(value) => `$${(value / 1000000).toFixed(1)}M`} />
                  <Tooltip formatter={(value, name) => [`$${(Number(value) / 1000000).toFixed(2)}M`, name === 'revenue' ? 'Actual Revenue' : 'Goal']} />
                  <Bar dataKey="goal" fill="#e5e7eb" name="goal" />
                  <Bar dataKey="revenue" fill="#3b82f6" name="revenue" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Revenue by Category */}
        <Card>
          <CardHeader>
            <CardTitle>Revenue by Category</CardTitle>
            <CardDescription>Q4 2024 breakdown</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={categoryData}
                    cx="50%"
                    cy="50%"
                    innerRadius={40}
                    outerRadius={80}
                    dataKey="value"
                  >
                    {categoryData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => `${value}%`} />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-4 space-y-2">
              {categoryData.map((category, index) => (
                <div key={index} className="flex items-center justify-between text-sm">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 rounded" style={{ backgroundColor: category.color }}></div>
                    <span>{category.name}</span>
                  </div>
                  <span className="font-medium">{category.value}%</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Pacing Metrics */}
      <Card>
        <CardHeader>
          <CardTitle>Q4 2024 Pacing Metrics</CardTitle>
          <CardDescription>Current progress towards quarterly goals</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {pacingData.map((item, index) => (
              <div key={index} className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="font-medium text-gray-900">{item.metric}</span>
                  <span className={`font-bold ${item.percentage >= 100 ? 'text-green-600' : item.percentage >= 70 ? 'text-blue-600' : 'text-red-600'}`}>
                    {item.percentage.toFixed(1)}%
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className={`h-2 rounded-full ${item.percentage >= 100 ? 'bg-green-500' : item.percentage >= 70 ? 'bg-blue-500' : 'bg-red-500'}`}
                    style={{ width: `${Math.min(item.percentage, 100)}%` }}
                  ></div>
                </div>
                <div className="flex justify-between text-sm text-gray-600">
                  <span>
                    {item.metric === "Revenue vs Goal" ? `$${(item.current / 1000000).toFixed(1)}M` : 
                     item.metric === "Retention Rate" ? `${item.current}%` : item.current.toLocaleString()}
                  </span>
                  <span>
                    {item.metric === "Revenue vs Goal" ? `$${(item.target / 1000000).toFixed(1)}M` : 
                     item.metric === "Retention Rate" ? `${item.target}%` : item.target.toLocaleString()}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default QuarterlyPerformance;
