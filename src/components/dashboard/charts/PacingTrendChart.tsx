
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

interface PacingTrendChartProps {
  data: any[];
}

const PacingTrendChart: React.FC<PacingTrendChartProps> = ({ data }) => {
  // Format currency with M/K notation
  const formatCurrency = (value: number): string => {
    if (value >= 1000000) {
      return `$${(value / 1000000).toFixed(1)}M`;
    } else if (value >= 1000) {
      return `$${(value / 1000).toFixed(0)}K`;
    } else {
      return `$${value.toFixed(0)}`;
    }
  };

  // Process pacing data for chart display
  const processedData = data.map(item => {
    // Handle different data structures
    const month = item.Month || item.month || 'Unknown';
    const advertiser = item.Advertiser || item.advertiser || 'Unknown';
    
    // Parse sales values
    const parseValue = (val: any) => {
      if (typeof val === 'number') return val;
      if (typeof val === 'string') {
        const cleanValue = val.replace(/[,$]/g, '');
        return parseFloat(cleanValue) || 0;
      }
      return 0;
    };

    const salesDollars = parseValue(item['Sales $'] || item.salesDollars || 0);
    const projection = parseValue(item.Projection || item.projection || 0);
    const lastYear = parseValue(item['Last Year'] || item.lastYear || 0);
    
    // Parse pacing percentage
    const pacingStr = item['% Pacing'] || item.pacing || '0%';
    const pacing = parseFloat(pacingStr.toString().replace(/%/g, '')) || 0;

    return {
      month,
      advertiser,
      salesDollars,
      projection,
      lastYear,
      pacing,
      variance: salesDollars - projection,
      changeVsLY: salesDollars - lastYear
    };
  });

  // Group by month for trend analysis
  const monthlyTrends = processedData.reduce((acc: any, item) => {
    const month = item.month;
    if (!acc[month]) {
      acc[month] = {
        month,
        totalSales: 0,
        totalProjection: 0,
        totalLastYear: 0,
        count: 0
      };
    }
    
    acc[month].totalSales += item.salesDollars;
    acc[month].totalProjection += item.projection;
    acc[month].totalLastYear += item.lastYear;
    acc[month].count += 1;
    
    return acc;
  }, {});

  const chartData = Object.values(monthlyTrends).map((item: any) => ({
    month: item.month,
    salesDollars: item.totalSales,
    projection: item.totalProjection,
    lastYear: item.totalLastYear,
    pacing: item.totalProjection > 0 ? (item.totalSales / item.totalProjection) * 100 : 0
  }));

  return (
    <Card>
      <CardHeader>
        <CardTitle>Pacing Trends - Sales vs Projections</CardTitle>
        <CardDescription>
          Monthly pacing analysis showing actual sales, projections, and last year comparison ({data.length} records)
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis 
                yAxisId="left" 
                tickFormatter={(value) => formatCurrency(value)} 
              />
              <YAxis 
                yAxisId="right" 
                orientation="right" 
                tickFormatter={(value) => `${value.toFixed(0)}%`}
              />
              <Tooltip 
                formatter={(value, name) => {
                  if (name === 'Pacing %') return [`${Number(value).toFixed(1)}%`, 'Pacing %'];
                  return [formatCurrency(Number(value)), name];
                }}
              />
              <Legend />
              <Line 
                yAxisId="left"
                type="monotone" 
                dataKey="salesDollars" 
                stroke="#10b981" 
                strokeWidth={3}
                name="Actual Sales"
                dot={{ fill: '#10b981', strokeWidth: 2, r: 6 }}
              />
              <Line 
                yAxisId="left"
                type="monotone" 
                dataKey="projection" 
                stroke="#3b82f6" 
                strokeWidth={2}
                strokeDasharray="5 5"
                name="Projection"
                dot={{ fill: '#3b82f6', strokeWidth: 2, r: 4 }}
              />
              <Line 
                yAxisId="left"
                type="monotone" 
                dataKey="lastYear" 
                stroke="#6b7280" 
                strokeWidth={2}
                name="Last Year"
                dot={{ fill: '#6b7280', strokeWidth: 2, r: 4 }}
              />
              <Line 
                yAxisId="right"
                type="monotone" 
                dataKey="pacing" 
                stroke="#ef4444" 
                strokeWidth={3}
                name="Pacing %"
                dot={{ fill: '#ef4444', strokeWidth: 2, r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default PacingTrendChart;
