
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ComposedChart, Bar, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface CompetitiveAnalysisChartProps {
  data: any[];
}

const CompetitiveAnalysisChart: React.FC<CompetitiveAnalysisChartProps> = ({ data }) => {
  // Group data by month and aggregate billing
  const monthlyData = data.reduce((acc: any, curr: any) => {
    const month = curr.Month || 'Unknown';
    if (!acc[month]) {
      acc[month] = {
        month,
        totalBilling: 0,
        avgRepPercent: 0,
        agencies: new Set(),
        count: 0
      };
    }
    
    acc[month].totalBilling += parseFloat(curr['Billing $']?.toString().replace(/[,$]/g, '')) || 0;
    acc[month].avgRepPercent += parseFloat(curr['Rep %']?.toString()) || 0;
    acc[month].agencies.add(curr.Agency);
    acc[month].count += 1;
    
    return acc;
  }, {});

  // Convert to array and calculate averages
  const chartData = Object.values(monthlyData).map((item: any) => ({
    month: item.month,
    billing: Math.round(item.totalBilling / 1000), // Convert to thousands
    repPercent: (item.avgRepPercent / item.count).toFixed(1),
    agencyCount: item.agencies.size
  }));

  return (
    <Card>
      <CardHeader>
        <CardTitle>Competitive Analysis - Monthly Billing Trends</CardTitle>
        <CardDescription>
          Monthly billing dollars with representative percentage overlay
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis yAxisId="left" tickFormatter={(value) => `$${value}K`} />
              <YAxis yAxisId="right" orientation="right" tickFormatter={(value) => `${value}%`} />
              <Tooltip 
                formatter={(value, name) => {
                  if (name === 'repPercent') return [`${value}%`, 'Rep %'];
                  return [`$${value}K`, 'Billing'];
                }}
              />
              <Bar yAxisId="left" dataKey="billing" fill="#3b82f6" name="Billing" />
              <Line yAxisId="right" type="monotone" dataKey="repPercent" stroke="#ef4444" strokeWidth={3} name="Rep %" />
            </ComposedChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default CompetitiveAnalysisChart;
