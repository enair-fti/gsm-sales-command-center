
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, ComposedChart } from 'recharts';
import { Download, Filter } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

interface QuarterlyPerformanceProps {
  station: string;
}

const QuarterlyPerformance: React.FC<QuarterlyPerformanceProps> = ({ station }) => {
  const [viewMode, setViewMode] = useState<'quarterly' | 'monthly'>('quarterly');
  const [filterMarket, setFilterMarket] = useState<string>('All');
  const [performanceData, setPerformanceData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPerformanceData = async () => {
      try {
        setLoading(true);
        
        // Fetch from darwin-extract-data and references tables
        const { data: darwinData } = await supabase
          .from('darwin-extract-data')
          .select('*')
          .limit(100);

        const { data: stationData } = await supabase
          .from('references_stations')
          .select('*')
          .limit(50);

        const { data: marketData } = await supabase
          .from('references_markets')
          .select('*')
          .limit(20);

        console.log('Fetched performance data:', { darwinData, stationData, marketData });
        
        // Mock quarterly data with calculated Rep %
        const mockQuarterlyData = [
          { 
            period: 'Q1 2024', 
            billingShare: 2400000, 
            marketBilling: 12000000, 
            projectedBilling: 2600000,
            projectedMarket: 13000000,
            headlines: 156,
            repPercent: 20.0, // (2400000 / 12000000) * 100
            projectedShare: 20.0 // (2600000 / 13000000) * 100
          },
          { 
            period: 'Q2 2024', 
            billingShare: 2650000, 
            marketBilling: 14200000, 
            projectedBilling: 2800000,
            projectedMarket: 15000000,
            headlines: 178,
            repPercent: 18.7,
            projectedShare: 18.7
          },
          { 
            period: 'Q3 2024', 
            billingShare: 2800000, 
            marketBilling: 15800000, 
            projectedBilling: 3000000,
            projectedMarket: 16500000,
            headlines: 194,
            repPercent: 17.7,
            projectedShare: 18.2
          },
          { 
            period: 'Q4 2024', 
            billingShare: 1800000, 
            marketBilling: 10500000, 
            projectedBilling: 3200000,
            projectedMarket: 17200000,
            headlines: 125,
            repPercent: 17.1,
            projectedShare: 18.6
          }
        ];
        
        setPerformanceData(mockQuarterlyData);
      } catch (error) {
        console.error('Error fetching performance data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPerformanceData();
  }, [station]);

  const exportData = () => {
    const csvContent = "data:text/csv;charset=utf-8," 
      + "Period,Billing Share,Market Billing,Rep %,Projected Billing,Projected Market,Projected Share %,Headlines\n"
      + performanceData.map(row => 
          `${row.period},${row.billingShare},${row.marketBilling},${row.repPercent},${row.projectedBilling},${row.projectedMarket},${row.projectedShare},${row.headlines}`
        ).join("\n");
    
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "quarterly_performance.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (loading) {
    return (
      <div className="h-full flex items-center justify-center">
        <div className="text-lg text-gray-600">Loading performance data...</div>
      </div>
    );
  }

  const currentPeriod = performanceData[performanceData.length - 1];

  return (
    <div className="h-full overflow-auto space-y-6">
      {/* Header with Controls */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-gray-900">Quarterly Sales & Projections</h2>
          <p className="text-sm text-gray-600">Market share analysis and competitive positioning</p>
        </div>
        <div className="flex items-center space-x-3">
          <div className="flex space-x-2">
            <button
              onClick={() => setViewMode('quarterly')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                viewMode === 'quarterly' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Quarterly
            </button>
            <button
              onClick={() => setViewMode('monthly')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                viewMode === 'monthly' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Monthly
            </button>
          </div>
          <button
            onClick={exportData}
            className="flex items-center space-x-2 px-3 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
          >
            <Download className="w-4 h-4" />
            <span>Export</span>
          </button>
        </div>
      </div>

      {/* Summary KPIs */}
      <div className="grid grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Current Billing Share</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">
              ${(currentPeriod?.billingShare / 1000000).toFixed(1)}M
            </div>
            <div className="text-sm text-blue-600">Q4 2024 YTD</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Rep %</CardTitle>
          </CardHeader>
          <CardContent>
            <div className={`text-2xl font-bold ${
              currentPeriod?.repPercent >= 20 ? 'text-green-600' : 
              currentPeriod?.repPercent < 10 ? 'text-red-600' : 'text-yellow-600'
            }`}>
              {currentPeriod?.repPercent.toFixed(1)}%
            </div>
            <div className="text-sm text-gray-500">Market share</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Projected Share</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">{currentPeriod?.projectedShare.toFixed(1)}%</div>
            <div className="text-sm text-gray-500">End of period target</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Headlines</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">{currentPeriod?.headlines}</div>
            <div className="text-sm text-gray-500">Active campaigns</div>
          </CardContent>
        </Card>
      </div>

      {/* Performance Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Market Share & Billing Trends</CardTitle>
          <CardDescription>Quarterly billing share vs market with Rep % indicators</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-80 mb-6">
            <ResponsiveContainer width="100%" height="100%">
              <ComposedChart data={performanceData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="period" />
                <YAxis yAxisId="left" tickFormatter={(value) => `$${(value / 1000000).toFixed(1)}M`} />
                <YAxis yAxisId="right" orientation="right" tickFormatter={(value) => `${value.toFixed(1)}%`} />
                <Tooltip 
                  formatter={(value, name) => {
                    if (name === 'repPercent' || name === 'projectedShare') return [`${value}%`, name];
                    return [`$${(Number(value) / 1000000).toFixed(1)}M`, name];
                  }}
                />
                <Bar yAxisId="left" dataKey="marketBilling" fill="#e5e7eb" name="Market Billing" />
                <Bar yAxisId="left" dataKey="billingShare" fill="#3b82f6" name="Billing Share" />
                <Bar yAxisId="left" dataKey="projectedBilling" fill="#93c5fd" name="Projected Billing" />
                <Line yAxisId="right" type="monotone" dataKey="repPercent" stroke="#ef4444" strokeWidth={3} name="Rep %" />
                <Line yAxisId="right" type="monotone" dataKey="projectedShare" stroke="#10b981" strokeWidth={2} strokeDasharray="5 5" name="Projected Share %" />
              </ComposedChart>
            </ResponsiveContainer>
          </div>

          {/* Performance Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-2 font-medium text-gray-600">Period</th>
                  <th className="text-right py-3 px-2 font-medium text-gray-600">Billing Share</th>
                  <th className="text-right py-3 px-2 font-medium text-gray-600">Market Billing</th>
                  <th className="text-right py-3 px-2 font-medium text-gray-600">Rep %</th>
                  <th className="text-right py-3 px-2 font-medium text-gray-600">Projected Billing</th>
                  <th className="text-right py-3 px-2 font-medium text-gray-600">Projected Share %</th>
                  <th className="text-right py-3 px-2 font-medium text-gray-600">Headlines</th>
                </tr>
              </thead>
              <tbody>
                {performanceData.map((row, index) => (
                  <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-3 px-2 font-medium">{row.period}</td>
                    <td className="py-3 px-2 text-right font-bold">
                      ${(row.billingShare / 1000000).toFixed(1)}M
                    </td>
                    <td className="py-3 px-2 text-right text-gray-600">
                      ${(row.marketBilling / 1000000).toFixed(1)}M
                    </td>
                    <td className={`py-3 px-2 text-right font-medium ${
                      row.repPercent >= 20 ? 'text-green-600' : 
                      row.repPercent < 10 ? 'text-red-600' : 'text-yellow-600'
                    }`}>
                      {row.repPercent.toFixed(1)}%
                    </td>
                    <td className="py-3 px-2 text-right text-blue-600">
                      ${(row.projectedBilling / 1000000).toFixed(1)}M
                    </td>
                    <td className="py-3 px-2 text-right text-green-600">
                      {row.projectedShare.toFixed(1)}%
                    </td>
                    <td className="py-3 px-2 text-right">{row.headlines}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Market Position Analysis */}
      <Card>
        <CardHeader>
          <CardTitle>Market Position Analysis</CardTitle>
          <CardDescription>Station competitive positioning and share trends</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-4">
              <h4 className="font-medium text-gray-900">Share Performance</h4>
              <div className="space-y-3">
                <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                  <span className="text-green-800 font-medium">Above 20% (Excellent)</span>
                  <span className="text-green-600 font-bold">
                    {performanceData.filter(p => p.repPercent >= 20).length} quarters
                  </span>
                </div>
                <div className="flex justify-between items-center p-3 bg-yellow-50 rounded-lg">
                  <span className="text-yellow-800 font-medium">10-20% (Good)</span>
                  <span className="text-yellow-600 font-bold">
                    {performanceData.filter(p => p.repPercent >= 10 && p.repPercent < 20).length} quarters
                  </span>
                </div>
                <div className="flex justify-between items-center p-3 bg-red-50 rounded-lg">
                  <span className="text-red-800 font-medium">Below 10% (Needs Attention)</span>
                  <span className="text-red-600 font-bold">
                    {performanceData.filter(p => p.repPercent < 10).length} quarters
                  </span>
                </div>
              </div>
            </div>
            
            <div className="space-y-4">
              <h4 className="font-medium text-gray-900">Growth Metrics</h4>
              <div className="space-y-3">
                <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                  <span className="text-blue-800 font-medium">Average Rep %</span>
                  <span className="text-blue-600 font-bold">
                    {(performanceData.reduce((sum, p) => sum + p.repPercent, 0) / performanceData.length).toFixed(1)}%
                  </span>
                </div>
                <div className="flex justify-between items-center p-3 bg-purple-50 rounded-lg">
                  <span className="text-purple-800 font-medium">Total Headlines</span>
                  <span className="text-purple-600 font-bold">
                    {performanceData.reduce((sum, p) => sum + p.headlines, 0)}
                  </span>
                </div>
                <div className="flex justify-between items-center p-3 bg-indigo-50 rounded-lg">
                  <span className="text-indigo-800 font-medium">Market Growth</span>
                  <span className="text-indigo-600 font-bold">
                    +{(((performanceData[performanceData.length - 1]?.marketBilling || 0) / 
                        (performanceData[0]?.marketBilling || 1) - 1) * 100).toFixed(1)}%
                  </span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default QuarterlyPerformance;
