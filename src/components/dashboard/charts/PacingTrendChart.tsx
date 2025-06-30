
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ComposedChart, Bar, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

interface PacingTrendChartProps {
  data: any[];
}

const PacingTrendChart: React.FC<PacingTrendChartProps> = ({ data }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Pacing Trend Analysis</CardTitle>
        <CardDescription>
          Monthly sales performance vs. projections and last year comparison
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis yAxisId="left" tickFormatter={(value) => `$${(value / 1000).toFixed(0)}K`} />
              <YAxis yAxisId="right" orientation="right" tickFormatter={(value) => `${value}%`} />
              <Tooltip 
                formatter={(value, name) => {
                  if (name === 'pace') return [`${value}%`, 'Pacing %'];
                  return [`$${(Number(value) / 1000).toFixed(0)}K`, name];
                }}
              />
              <Legend />
              <Bar yAxisId="left" dataKey="booked" fill="#3b82f6" name="Sales $" />
              <Bar yAxisId="left" dataKey="projection" fill="#e5e7eb" name="Projection" />
              <Bar yAxisId="left" dataKey="lastYear" fill="#94a3b8" name="Last Year" />
              <Line yAxisId="right" type="monotone" dataKey="pace" stroke="#ef4444" strokeWidth={3} name="% Pacing" />
            </ComposedChart>
          </ResponsiveContainer>
        </div>

        {/* Performance Table */}
        <div className="mt-6 overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-2 font-medium text-gray-600">Month</th>
                <th className="text-right py-3 px-2 font-medium text-gray-600">Sales $</th>
                <th className="text-right py-3 px-2 font-medium text-gray-600">Projection</th>
                <th className="text-right py-3 px-2 font-medium text-gray-600">Last Year</th>
                <th className="text-right py-3 px-2 font-medium text-gray-600">% Pacing</th>
                <th className="text-right py-3 px-2 font-medium text-gray-600">Change vs LY</th>
              </tr>
            </thead>
            <tbody>
              {data.map((row, index) => (
                <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-3 px-2 font-medium">{row.month}</td>
                  <td className="py-3 px-2 text-right font-bold">${(row.booked / 1000).toFixed(0)}K</td>
                  <td className="py-3 px-2 text-right text-blue-600">${(row.projection / 1000).toFixed(0)}K</td>
                  <td className="py-3 px-2 text-right text-gray-600">${(row.lastYear / 1000).toFixed(0)}K</td>
                  <td className={`py-3 px-2 text-right font-medium ${
                    row.pace >= 100 ? 'text-green-600' : row.pace >= 95 ? 'text-yellow-600' : 'text-red-600'
                  }`}>
                    {row.pace}%
                  </td>
                  <td className={`py-3 px-2 text-right font-medium ${
                    row.changeVsLastYear >= 0 ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {row.changeVsLastYear >= 0 ? '+' : ''}${(row.changeVsLastYear / 1000).toFixed(0)}K
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
};

export default PacingTrendChart;
