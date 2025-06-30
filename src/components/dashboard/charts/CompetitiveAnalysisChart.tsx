
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ComposedChart, Bar, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

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
    
    // Handle both string and number formats for billing
    let billingValue = 0;
    if (typeof curr['Billing $'] === 'string') {
      billingValue = parseFloat(curr['Billing $'].toString().replace(/[,$]/g, '')) || 0;
    } else {
      billingValue = curr['Billing $'] || 0;
    }
    
    // Handle Rep % - it should already be a number from the database
    let repPercent = 0;
    if (typeof curr['Rep %'] === 'number') {
      repPercent = curr['Rep %'];
    } else {
      repPercent = parseFloat(curr['Rep %']?.toString()) || 0;
    }
    
    acc[month].totalBilling += billingValue;
    acc[month].avgRepPercent += repPercent;
    acc[month].agencies.add(curr.Agency);
    acc[month].count += 1;
    
    return acc;
  }, {});

  // Convert to array and calculate averages, sorted by month
  const chartData = Object.values(monthlyData).map((item: any) => ({
    month: item.month,
    billing: Math.round(item.totalBilling / 1000), // Convert to thousands
    repPercent: Number((item.avgRepPercent / item.count).toFixed(1)),
    agencyCount: item.agencies.size
  }));

  // Sort chronologically if possible
  chartData.sort((a, b) => {
    // Try to parse dates for proper sorting
    const dateA = new Date(a.month + ' 1');
    const dateB = new Date(b.month + ' 1');
    if (!isNaN(dateA.getTime()) && !isNaN(dateB.getTime())) {
      return dateA.getTime() - dateB.getTime();
    }
    return a.month.localeCompare(b.month);
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle>Competitive Analysis - Monthly Billing & Rep %</CardTitle>
        <CardDescription>
          Monthly billing dollars with representative percentage (red line shows Rep %)
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
                  if (name === 'Rep %') return [`${value}%`, 'Rep %'];
                  return [`$${value}K`, 'Billing'];
                }}
              />
              <Legend />
              <Bar yAxisId="left" dataKey="billing" fill="#3b82f6" name="Billing" />
              <Line 
                yAxisId="right" 
                type="monotone" 
                dataKey="repPercent" 
                stroke="#ef4444" 
                strokeWidth={3} 
                name="Rep %" 
                dot={{ fill: '#ef4444', strokeWidth: 2, r: 4 }}
              />
            </ComposedChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default CompetitiveAnalysisChart;
