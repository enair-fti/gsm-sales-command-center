import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { TrendingUp, TrendingDown, Target, DollarSign } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

interface QuarterlyPerformanceProps {
  station: string;
  filters: {
    agency: string;
    advertiser: string;
    station: string;
    quarter: string;
    year: string;
  };
}

const QuarterlyPerformance: React.FC<QuarterlyPerformanceProps> = ({ station, filters }) => {
  const [performanceData, setPerformanceData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPerformanceData = async () => {
      try {
        setLoading(true);
        
        // Fetch headline data
        const { data: headlineData } = await supabase
          .from('darwin-extract-data')
          .select('*')
          .limit(20);

        console.log('Fetched quarterly performance data:', headlineData);
        
        // Mock quarterly performance data
        const mockData = [
          {
            quarter: 'Q1 2024',
            billingShare: 2450000,
            marketBilling: 12250000,
            billingSharePercent: 20.0,
            projectedBilling: 2800000,
            projectedMarket: 13500000,
            projectedSharePercent: 20.7,
            repPercent: 20.0,
            performance: 'strong'
          },
          {
            quarter: 'Q2 2024',
            billingShare: 2680000,
            marketBilling: 13200000,
            billingSharePercent: 20.3,
            projectedBilling: 2900000,
            projectedMarket: 14200000,
            projectedSharePercent: 20.4,
            repPercent: 20.3,
            performance: 'strong'
          },
          {
            quarter: 'Q3 2024',
            billingShare: 2420000,
            marketBilling: 13800000,
            billingSharePercent: 17.5,
            projectedBilling: 2750000,
            projectedMarket: 14800000,
            projectedSharePercent: 18.6,
            repPercent: 17.5,
            performance: 'weak'
          },
          {
            quarter: 'Q4 2024',
            billingShare: 2890000,
            marketBilling: 14200000,
            billingSharePercent: 20.4,
            projectedBilling: 3100000,
            projectedMarket: 15000000,
            projectedSharePercent: 20.7,
            repPercent: 20.4,
            performance: 'strong'
          }
        ];
        
        setPerformanceData(mockData);
      } catch (error) {
        console.error('Error fetching quarterly performance data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPerformanceData();
  }, [station, filters]);

  if (loading) {
    return (
      <div className="h-full flex items-center justify-center">
        <div className="text-lg text-gray-600">Loading quarterly performance data...</div>
      </div>
    );
  }

  const totalBillingShare = performanceData.reduce((sum, item) => sum + item.billingShare, 0);
  const totalMarketBilling = performanceData.reduce((sum, item) => sum + item.marketBilling, 0);
  const avgRepPercent = (totalBillingShare / totalMarketBilling) * 100;
  const currentQuarter = performanceData[performanceData.length - 1];

  return (
    <div className="h-full overflow-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-gray-900">Quarterly Performance & Market Share</h2>
          <p className="text-sm text-gray-600">Station billing performance vs. market projections</p>
        </div>
        <Badge variant="outline" className="text-sm">
          {performanceData.length} Quarters
        </Badge>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600 flex items-center space-x-2">
              <DollarSign className="w-4 h-4 text-blue-500" />
              <span>Total Billing Share</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">${(totalBillingShare / 1000000).toFixed(1)}M</div>
            <div className="text-sm text-gray-600">Across all quarters</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Average Rep %</CardTitle>
          </CardHeader>
          <CardContent>
            <div className={`text-2xl font-bold ${
              avgRepPercent >= 20 ? 'text-green-600' : avgRepPercent >= 15 ? 'text-yellow-600' : 'text-red-600'
            }`}>
              {avgRepPercent.toFixed(1)}%
            </div>
            <div className="text-sm text-gray-600">Market share average</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Current Quarter</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">{currentQuarter?.quarter}</div>
            <div className={`text-sm ${
              currentQuarter?.performance === 'strong' ? 'text-green-600' : 'text-red-600'
            }`}>
              {currentQuarter?.performance === 'strong' ? 'Strong performance' : 'Below target'}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600 flex items-center space-x-2">
              <Target className="w-4 h-4 text-purple-500" />
              <span>Projected Share</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-600">
              {currentQuarter?.projectedSharePercent?.toFixed(1)}%
            </div>
            <div className="text-sm text-gray-600">Next quarter target</div>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Billing Share Trend</CardTitle>
            <CardDescription>Quarterly billing performance over time</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={performanceData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="quarter" />
                <YAxis tickFormatter={(value) => `$${(value / 1000000).toFixed(1)}M`} />
                <Line 
                  type="monotone" 
                  dataKey="billingShare" 
                  stroke="#3b82f6" 
                  strokeWidth={3}
                  dot={{ fill: '#3b82f6', strokeWidth: 2, r: 6 }}
                />
                <Line 
                  type="monotone" 
                  dataKey="projectedBilling" 
                  stroke="#10b981" 
                  strokeWidth={2}
                  strokeDasharray="5 5"
                  dot={{ fill: '#10b981', strokeWidth: 2, r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Market Share %</CardTitle>
            <CardDescription>Rep % by quarter with target benchmarks</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={performanceData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="quarter" />
                <YAxis tickFormatter={(value) => `${value}%`} />
                <Bar 
                  dataKey="repPercent" 
                  fill={(data) => data >= 20 ? '#10b981' : data >= 15 ? '#f59e0b' : '#ef4444'}
                />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Detailed Table */}
      <Card>
        <CardHeader>
          <CardTitle>Quarterly Performance Details</CardTitle>
          <CardDescription>Comprehensive view of billing and market performance</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-2 font-medium text-gray-600">Quarter</th>
                  <th className="text-right py-3 px-2 font-medium text-gray-600">Billing Share $</th>
                  <th className="text-right py-3 px-2 font-medium text-gray-600">Market Billing $</th>
                  <th className="text-right py-3 px-2 font-medium text-gray-600">Billing Share %</th>
                  <th className="text-right py-3 px-2 font-medium text-gray-600">Rep %</th>
                  <th className="text-right py-3 px-2 font-medium text-gray-600">Projected $</th>
                  <th className="text-right py-3 px-2 font-medium text-gray-600">Projected Share %</th>
                  <th className="text-center py-3 px-2 font-medium text-gray-600">Performance</th>
                </tr>
              </thead>
              <tbody>
                {performanceData.map((quarter, index) => (
                  <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-3 px-2 font-medium text-gray-900">{quarter.quarter}</td>
                    <td className="py-3 px-2 text-right font-bold">${(quarter.billingShare / 1000000).toFixed(1)}M</td>
                    <td className="py-3 px-2 text-right">${(quarter.marketBilling / 1000000).toFixed(1)}M</td>
                    <td className="py-3 px-2 text-right">{quarter.billingSharePercent.toFixed(1)}%</td>
                    <td className={`py-3 px-2 text-right font-medium ${
                      quarter.repPercent >= 20 ? 'text-green-600' : quarter.repPercent >= 15 ? 'text-yellow-600' : 'text-red-600'
                    }`}>
                      {quarter.repPercent.toFixed(1)}%
                    </td>
                    <td className="py-3 px-2 text-right text-blue-600">${(quarter.projectedBilling / 1000000).toFixed(1)}M</td>
                    <td className="py-3 px-2 text-right text-blue-600">{quarter.projectedSharePercent.toFixed(1)}%</td>
                    <td className="py-3 px-2 text-center">
                      <Badge variant={quarter.performance === 'strong' ? 'default' : 'destructive'}>
                        {quarter.performance === 'strong' ? 'Strong' : 'Weak'}
                      </Badge>
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

export default QuarterlyPerformance;
