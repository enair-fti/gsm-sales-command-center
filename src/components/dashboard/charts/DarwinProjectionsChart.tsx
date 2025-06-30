
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

interface DarwinProjectionsChartProps {
  data: any[];
}

const DarwinProjectionsChart: React.FC<DarwinProjectionsChartProps> = ({ data }) => {
  // Group data by station code and aggregate projections
  const stationData = data.reduce((acc: any, curr: any) => {
    const station = curr.stationCode || 'Unknown';
    if (!acc[station]) {
      acc[station] = {
        stationCode: station,
        projectedBilling: 0,
        projectedShare: 0,
        count: 0
      };
    }
    
    acc[station].projectedBilling += curr.projectedBilling || 0;
    acc[station].projectedShare += curr.projectedShare || 0;
    acc[station].count += 1;
    
    return acc;
  }, {});

  // Convert to array and calculate averages
  const chartData = Object.values(stationData).map((item: any) => ({
    station: item.stationCode,
    projectedBilling: Math.round(item.projectedBilling / 1000), // Convert to thousands
    projectedShare: (item.projectedShare / item.count).toFixed(1)
  })).slice(0, 10); // Show top 10 stations

  return (
    <Card>
      <CardHeader>
        <CardTitle>Darwin Projections - Station Performance</CardTitle>
        <CardDescription>
          Projected billing and market share by station code
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="station" />
              <YAxis tickFormatter={(value) => `$${value}K`} />
              <Tooltip 
                formatter={(value, name) => {
                  if (name === 'projectedShare') return [`${value}%`, 'Projected Share'];
                  return [`$${value}K`, 'Projected Billing'];
                }}
              />
              <Legend />
              <Bar dataKey="projectedBilling" fill="#10b981" name="Projected Billing" />
              <Bar dataKey="projectedShare" fill="#f59e0b" name="Projected Share %" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default DarwinProjectionsChart;
