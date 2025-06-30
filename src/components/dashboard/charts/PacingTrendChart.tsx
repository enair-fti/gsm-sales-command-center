
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

interface PacingTrendChartProps {
  data: any[];
}

const PacingTrendChart: React.FC<PacingTrendChartProps> = ({ data }) => {
  // Format currency with M/K notation
  const formatCurrency = (value: number): string => {
    if (Math.abs(value) >= 1000000) {
      return `$${(value / 1000000).toFixed(1)}M`;
    } else if (Math.abs(value) >= 1000) {
      return `$${(value / 1000).toFixed(0)}K`;
    } else {
      return `$${value.toFixed(0)}`;
    }
  };

  // Process pacing data for chart display
  const processedData = data.map(item => {
    // Handle different data structures - the Pacing table has specific column names
    const advertiser = item.Advertiser || item.advertiser || 'Unknown';
    
    // Parse sales values - handle both string and number formats
    const parseValue = (val: any) => {
      if (typeof val === 'number') return val;
      if (typeof val === 'string') {
        const cleanValue = val.replace(/[,$]/g, '');
        return parseFloat(cleanValue) || 0;
      }
      return 0;
    };

    // Map actual pacing data columns
    const salesDollars = parseValue(item['Sales $'] || 0);
    const projection = parseValue(item.Projection || 0);
    const lastYear = parseValue(item['Last Year'] || 0);
    
    // Parse pacing percentage
    const pacingStr = item['% Pacing'] || '0%';
    const pacing = parseFloat(pacingStr.toString().replace(/%/g, '')) || 0;

    // Calculate variance and change vs LY
    const variance = parseValue(item.Variance || 0);
    const changeVsLY = parseValue(item['Change vs LY'] || 0);

    return {
      advertiser,
      salesDollars,
      projection,
      lastYear,
      pacing,
      variance,
      changeVsLY,
      month: 'Q2 2025' // Since this is pacing data, we'll use Q2 2025 as the period
    };
  });

  // Group by advertiser for trend analysis - show top performers
  const advertiserTrends = processedData
    .sort((a, b) => b.salesDollars - a.salesDollars)
    .slice(0, 10); // Show top 10 advertisers by sales

  return (
    <Card>
      <CardHeader>
        <CardTitle>Pacing Analysis - Top Performers</CardTitle>
        <CardDescription>
          Sales vs projections and pacing percentages for top advertisers ({data.length} total records)
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={advertiserTrends}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis 
                dataKey="advertiser" 
                angle={-45}
                textAnchor="end"
                height={100}
                fontSize={10}
              />
              <YAxis 
                yAxisId="left" 
                tickFormatter={formatCurrency} 
                fontSize={10}
              />
              <YAxis 
                yAxisId="right" 
                orientation="right" 
                tickFormatter={(value) => `${value.toFixed(0)}%`}
                fontSize={10}
              />
              <Tooltip 
                formatter={(value, name) => {
                  if (name === 'Pacing %') return [`${Number(value).toFixed(1)}%`, 'Pacing %'];
                  return [formatCurrency(Number(value)), name];
                }}
                labelFormatter={(label) => `Advertiser: ${label}`}
              />
              <Legend />
              <Line 
                yAxisId="left"
                type="monotone" 
                dataKey="salesDollars" 
                stroke="#10b981" 
                strokeWidth={3}
                name="Actual Sales"
                dot={{ fill: '#10b981', strokeWidth: 2, r: 4 }}
              />
              <Line 
                yAxisId="left"
                type="monotone" 
                dataKey="projection" 
                stroke="#3b82f6" 
                strokeWidth={2}
                strokeDasharray="5 5"
                name="Projection"
                dot={{ fill: '#3b82f6', strokeWidth: 2, r: 3 }}
              />
              <Line 
                yAxisId="left"
                type="monotone" 
                dataKey="lastYear" 
                stroke="#6b7280" 
                strokeWidth={2}
                name="Last Year"
                dot={{ fill: '#6b7280', strokeWidth: 2, r: 3 }}
              />
              <Line 
                yAxisId="right"
                type="monotone" 
                dataKey="pacing" 
                stroke="#ef4444" 
                strokeWidth={3}
                name="Pacing %"
                dot={{ fill: '#ef4444', strokeWidth: 2, r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default PacingTrendChart;
