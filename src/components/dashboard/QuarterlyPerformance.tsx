
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, BarChart, Bar, Cell } from 'recharts';
import { TrendingUp, TrendingDown, Target, DollarSign } from 'lucide-react';
import { fetchDarwinProjections, fetchCompetitiveAnalysisData } from '@/utils/referenceData';

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
  const [isRealData, setIsRealData] = useState(false);

  // Helper function to safely parse billing values
  const parseBillingValue = (value: any): number => {
    if (typeof value === 'number') return value;
    if (typeof value === 'string') {
      const cleanValue = value.replace(/[,$]/g, '');
      const parsed = parseFloat(cleanValue);
      return isNaN(parsed) ? 0 : parsed;
    }
    return 0;
  };

  useEffect(() => {
    const fetchPerformanceData = async () => {
      try {
        setLoading(true);
        
        // Fetch real data from Darwin projections and competitive analysis
        const [darwinData, competitiveData] = await Promise.all([
          fetchDarwinProjections(filters),
          fetchCompetitiveAnalysisData(filters)
        ]);

        console.log('Fetched quarterly performance data:', darwinData.length, competitiveData.length);
        
        if (darwinData.length > 0 || competitiveData.length > 0) {
          setIsRealData(true);
          
          // Generate quarterly performance from real data
          const quarters = ['Q1 2024', 'Q2 2024', 'Q3 2024', 'Q4 2024'];
          const quarterlyData = quarters.map((quarter, index) => {
            let billingShare = 0;
            let marketBilling = 0;
            let projectedBilling = 0;
            let projectedMarket = 0;

            if (darwinData.length > 0) {
              // Use Darwin data for calculations
              const quarterData = darwinData.slice(index * Math.floor(darwinData.length / 4), (index + 1) * Math.floor(darwinData.length / 4));
              billingShare = quarterData.reduce((sum, item) => sum + parseBillingValue(item['Q3-2025 Billing$']), 0);
              projectedBilling = quarterData.reduce((sum, item) => sum + parseBillingValue(item['Proj Billing$']), 0);
              marketBilling = quarterData.reduce((sum, item) => sum + parseBillingValue(item['Q3-2025 Market$']), 0);
              projectedMarket = quarterData.reduce((sum, item) => sum + parseBillingValue(item['Proj Market$']), 0);
            } else if (competitiveData.length > 0) {
              // Use competitive data for calculations
              const quarterData = competitiveData.slice(index * Math.floor(competitiveData.length / 4), (index + 1) * Math.floor(competitiveData.length / 4));
              billingShare = quarterData.reduce((sum, item) => sum + (item['Billing $'] || 0), 0);
              marketBilling = quarterData.reduce((sum, item) => sum + (item['Mkt $'] || 0), 0);
              projectedBilling = billingShare * 1.1; // Estimate 10% growth
              projectedMarket = marketBilling * 1.05; // Estimate 5% market growth
            }

            const billingSharePercent = marketBilling > 0 ? (billingShare / marketBilling) * 100 : 0;
            const projectedSharePercent = projectedMarket > 0 ? (projectedBilling / projectedMarket) * 100 : 0;
            const repPercent = billingSharePercent;
            const performance = repPercent >= 20 ? 'strong' : 'weak';

            return {
              quarter,
              billingShare: Math.round(billingShare),
              marketBilling: Math.round(marketBilling),
              billingSharePercent: Number(billingSharePercent.toFixed(1)),
              projectedBilling: Math.round(projectedBilling),
              projectedMarket: Math.round(projectedMarket),
              projectedSharePercent: Number(projectedSharePercent.toFixed(1)),
              repPercent: Number(repPercent.toFixed(1)),
              performance
            };
          });

          setPerformanceData(quarterlyData);
        } else {
          // Use mock data when no real data is available
          setIsRealData(false);
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
        }
      } catch (error) {
        console.error('Error fetching quarterly performance data:', error);
        setIsRealData(false);
        setPerformanceData([]);
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
  const avgRepPercent = totalMarketBilling > 0 ? (totalBillingShare / totalMarketBilling) * 100 : 0;
  const currentQuarter = performanceData[performanceData.length - 1];

  // Helper function to get color based on rep percent
  const getBarColor = (repPercent: number) => {
    if (repPercent >= 20) return '#10b981'; // green
    if (repPercent >= 15) return '#f59e0b'; // yellow
    return '#ef4444'; // red
  };

  return (
    <div className="h-full overflow-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-gray-900">Quarterly Performance & Market Share</h2>
          <p className="text-sm text-gray-600">Station billing performance vs. market projections</p>
        </div>
        <div className="flex items-center space-x-3">
          <Badge variant="outline" className="text-sm">
            {performanceData.length} Quarters
          </Badge>
          <Badge variant="outline" className={`text-xs ${
            isRealData 
              ? 'bg-green-50 text-green-700 border-green-200' 
              : 'bg-yellow-50 text-yellow-700 border-yellow-200'
          }`}>
            {isRealData ? 'Real Data' : 'Mock Data'}
          </Badge>
        </div>
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
            <div className="text-2xl font-bold text-gray-900">{currentQuarter?.quarter || 'N/A'}</div>
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
              {currentQuarter?.projectedSharePercent?.toFixed(1) || '0.0'}%
            </div>
            <div className="text-sm text-gray-600">Next quarter target</div>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      {performanceData.length > 0 && (
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
                  <Bar dataKey="repPercent">
                    {performanceData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={getBarColor(entry.repPercent)} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Detailed Table */}
      {performanceData.length > 0 && (
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
      )}

      {/* No Data Message */}
      {performanceData.length === 0 && (
        <Card>
          <CardHeader>
            <CardTitle>No Performance Data Available</CardTitle>
            <CardDescription>No quarterly performance data found with current filters</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-sm text-gray-600">
              Try adjusting your filters or check data availability.
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default QuarterlyPerformance;
