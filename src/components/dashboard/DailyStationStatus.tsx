
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, ComposedChart } from 'recharts';
import { Calendar, TrendingUp, DollarSign, Target, Download } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

interface DailyStationStatusProps {
  station: string;
}

const DailyStationStatus: React.FC<DailyStationStatusProps> = ({ station }) => {
  const [viewMode, setViewMode] = useState<'daily' | 'monthly'>('monthly');
  const [stationData, setStationData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch station performance data
  useEffect(() => {
    const fetchStationData = async () => {
      try {
        setLoading(true);
        
        // Fetch from test_data_combined and extended_media_orders
        const { data: testData } = await supabase
          .from('test_data_combined')
          .select('*')
          .limit(100);

        const { data: orderData } = await supabase
          .from('extended_media_orders')
          .select('*')
          .limit(50);

        console.log('Fetched station data:', { testData, orderData });
        
        // Mock data for demo - in production, process real data
        const mockStationData = [
          { month: 'Jan 24', booked: 245000, projection: 260000, lastYear: 225000, pace: 94.2, variance: 20000 },
          { month: 'Feb 24', booked: 268000, projection: 275000, lastYear: 240000, pace: 97.5, variance: 28000 },
          { month: 'Mar 24', booked: 289000, projection: 285000, lastYear: 255000, pace: 101.4, variance: 34000 },
          { month: 'Apr 24', booked: 312000, projection: 300000, lastYear: 270000, pace: 104.0, variance: 42000 },
          { month: 'May 24', booked: 298000, projection: 310000, lastYear: 285000, pace: 96.1, variance: 13000 },
          { month: 'Jun 24', booked: 334000, projection: 325000, lastYear: 295000, pace: 102.8, variance: 39000 },
          { month: 'Jul 24', booked: 356000, projection: 340000, lastYear: 310000, pace: 104.7, variance: 46000 },
          { month: 'Aug 24', booked: 345000, projection: 350000, lastYear: 320000, pace: 98.6, variance: 25000 },
          { month: 'Sep 24', booked: 378000, projection: 365000, lastYear: 340000, pace: 103.6, variance: 38000 },
        ];
        
        setStationData(mockStationData);
      } catch (error) {
        console.error('Error fetching station data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStationData();
  }, [station]);

  const kpiData = [
    { 
      title: "MTD Booked", 
      value: "$378K", 
      change: "+3.6%", 
      positive: true,
      icon: DollarSign,
      tooltip: "Month-to-date confirmed revenue"
    },
    { 
      title: "% Pace", 
      value: "103.6%", 
      change: "vs projection", 
      positive: true,
      icon: Target,
      tooltip: "(Booked / Projection) * 100"
    },
    { 
      title: "Var vs LY", 
      value: "+$38K", 
      change: "+11.2%", 
      positive: true,
      icon: TrendingUp,
      tooltip: "Variance vs same period last year"
    },
    { 
      title: "25 Conf Close", 
      value: "84%", 
      change: "of month", 
      positive: true,
      icon: Calendar,
      tooltip: "Progress through current month"
    },
  ];

  const exportData = () => {
    const csvContent = "data:text/csv;charset=utf-8," 
      + "Month,Booked,Projection,Last Year,Pace %,Variance\n"
      + stationData.map(row => 
          `${row.month},${row.booked},${row.projection},${row.lastYear},${row.pace},${row.variance}`
        ).join("\n");
    
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `station_performance_${station.replace(' ', '_')}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (loading) {
    return (
      <div className="h-full flex items-center justify-center">
        <div className="text-lg text-gray-600">Loading station data...</div>
      </div>
    );
  }

  return (
    <div className="h-full overflow-auto space-y-6">
      {/* Header with Controls */}
      <div className="flex items-center justify-between">
        <div className="flex space-x-2">
          <button
            onClick={() => setViewMode('monthly')}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              viewMode === 'monthly' 
                ? 'bg-blue-600 text-white' 
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Monthly View
          </button>
          <button
            onClick={() => setViewMode('daily')}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              viewMode === 'daily' 
                ? 'bg-blue-600 text-white' 
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Daily View
          </button>
        </div>
        <div className="flex items-center space-x-3">
          <button
            onClick={exportData}
            className="flex items-center space-x-2 px-3 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
          >
            <Download className="w-4 h-4" />
            <span>Export</span>
          </button>
          <Badge variant="outline" className="text-sm">
            Station: {station}
          </Badge>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-4 gap-4">
        {kpiData.map((kpi, index) => (
          <Card key={index} className="relative group cursor-help hover:shadow-md transition-shadow">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-medium text-gray-600">{kpi.title}</CardTitle>
                <kpi.icon className="w-4 h-4 text-gray-400" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">{kpi.value}</div>
              <div className={`text-sm ${kpi.positive ? 'text-green-600' : 'text-red-600'}`}>
                {kpi.change}
              </div>
              {/* Tooltip */}
              <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-gray-800 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-10">
                {kpi.tooltip}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Performance Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Sales Performance & Pacing</CardTitle>
          <CardDescription>Monthly booked revenue vs. projections with pacing indicators</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-80 mb-6">
            <ResponsiveContainer width="100%" height="100%">
              <ComposedChart data={stationData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis yAxisId="left" tickFormatter={(value) => `$${(value / 1000).toFixed(0)}K`} />
                <YAxis yAxisId="right" orientation="right" tickFormatter={(value) => `${value.toFixed(1)}%`} />
                <Tooltip 
                  formatter={(value, name) => {
                    if (name === 'pace') return [`${value}%`, 'Pace %'];
                    return [`$${(Number(value) / 1000).toFixed(0)}K`, name];
                  }}
                />
                <Bar yAxisId="left" dataKey="projection" fill="#e5e7eb" name="Projection" />
                <Bar yAxisId="left" dataKey="booked" fill="#3b82f6" name="Booked" />
                <Bar yAxisId="left" dataKey="lastYear" fill="#94a3b8" name="Last Year" />
                <Line yAxisId="right" type="monotone" dataKey="pace" stroke="#ef4444" strokeWidth={3} name="Pace %" />
              </ComposedChart>
            </ResponsiveContainer>
          </div>

          {/* Performance Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-2 font-medium text-gray-600">Month</th>
                  <th className="text-right py-3 px-2 font-medium text-gray-600">Booked $</th>
                  <th className="text-right py-3 px-2 font-medium text-gray-600">Projection $</th>
                  <th className="text-right py-3 px-2 font-medium text-gray-600">Last Year $</th>
                  <th className="text-right py-3 px-2 font-medium text-gray-600">% Pace</th>
                  <th className="text-right py-3 px-2 font-medium text-gray-600">Var vs LY</th>
                </tr>
              </thead>
              <tbody>
                {stationData.map((row, index) => (
                  <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-3 px-2 font-medium">{row.month}</td>
                    <td className="py-3 px-2 text-right font-bold">${(row.booked / 1000).toFixed(0)}K</td>
                    <td className="py-3 px-2 text-right text-blue-600">${(row.projection / 1000).toFixed(0)}K</td>
                    <td className="py-3 px-2 text-right text-gray-600">${(row.lastYear / 1000).toFixed(0)}K</td>
                    <td className={`py-3 px-2 text-right font-medium ${
                      row.pace >= 100 ? 'text-green-600' : row.pace >= 95 ? 'text-yellow-600' : 'text-red-600'
                    }`}>
                      {row.pace.toFixed(1)}%
                    </td>
                    <td className={`py-3 px-2 text-right font-medium ${
                      row.variance >= 0 ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {row.variance >= 0 ? '+' : ''}${(row.variance / 1000).toFixed(0)}K
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
};

export default DailyStationStatus;
