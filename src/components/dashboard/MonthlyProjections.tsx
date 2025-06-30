
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ChevronUp, ChevronDown, Filter } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { fetchDarwinProjections } from '@/utils/referenceData';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface MonthlyProjectionsProps {
  station: string;
  filters: {
    agency: string;
    advertiser: string;
    station: string;
    market: string;
    aeName: string;
    quarter: string;
    year: string;
  };
}

const MonthlyProjections: React.FC<MonthlyProjectionsProps> = ({ station, filters }) => {
  const [sortField, setSortField] = useState<'billing' | 'projected' | 'market'>('billing');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');
  const [filterMarket, setFilterMarket] = useState<string>('All');
  const [projectionsData, setProjectionsData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [realMetrics, setRealMetrics] = useState({
    totalBilling: 0,
    totalProjected: 0,
    totalMarketActual: 0,
    totalMarketProjected: 0,
    avgAttainment: 0,
    advertisers: 0
  });

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8', '#82CA9D', '#FFC658', '#FF7C7C'];

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

  // Format numbers for display
  const formatCurrency = (value: number): string => {
    if (value >= 1000000) {
      return `$${(value / 1000000).toFixed(1)}M`;
    } else if (value >= 1000) {
      return `$${(value / 1000).toFixed(0)}K`;
    } else {
      return `$${value.toFixed(0)}`;
    }
  };

  // Calculate category breakdown from real data
  const calculateCategoryBreakdown = (data: any[]) => {
    const categoryTotals: Record<string, number> = data.reduce((acc, item: any) => {
      const category = item.category || 'Other';
      const billing = parseBillingValue(item.billing);
      
      if (!acc[category]) {
        acc[category] = 0;
      }
      acc[category] += billing;
      return acc;
    }, {} as Record<string, number>);

    const totalValue = Object.values(categoryTotals).reduce((sum: number, value: number) => {
      return sum + value;
    }, 0);
    
    return Object.entries(categoryTotals)
      .map(([category, value]: [string, number]) => {
        return {
          name: category,
          value: value,
          percentage: totalValue > 0 ? ((value / totalValue) * 100).toFixed(1) : '0'
        };
      })
      .sort((a, b) => b.value - a.value)
      .slice(0, 8); // Show top 8 categories for better visualization
  };

  const [pieData, setPieData] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        console.log('Fetching full Darwin projections dataset with filters:', filters);
        
        let data = await fetchDarwinProjections(filters);
        console.log('Raw Darwin data received:', data.length, 'records (full dataset)');
        
        // Transform and calculate metrics from real data
        const transformedData = data.map((item: any) => {
          const billing = parseBillingValue(item['Q3-2025 Billing$']);
          const projectedBilling = parseBillingValue(item['Proj Billing$']);
          const actualMarket = parseBillingValue(item['Q3-2025 Market$']);
          const projectedMarket = parseBillingValue(item['Proj Market$']);
          const projectedDiff = parseBillingValue(item['Proj Diff$']);
          
          // Handle projected share percentage
          const projectedShareValue = item['Proj Share%'];
          const projectedShare = typeof projectedShareValue === 'string' ? 
                                parseFloat(projectedShareValue.replace(/%/g, '')) || 0 : 
                                typeof projectedShareValue === 'number' ? projectedShareValue : 0;

          return {
            station: item['Station Code'] || 'Unknown',
            market: item['Market'] || 'Unknown',
            advertiser: item['Advertiser Name'] || 'Unknown',
            aeName: item['Seller Code'] || 'Unknown',
            agency: item['Agency Name'] || 'Direct',
            billing: billing,
            projectedBilling: projectedBilling,
            actualMarket: actualMarket,
            projectedMarket: projectedMarket,
            variance: projectedDiff,
            category: item['Category'] || 'Other',
            quarter: item['Quarter'] || 'Q3-2025',
            projectedShare: projectedShare
          };
        });

        console.log('Transformed data:', transformedData.length, 'records (full dataset)');

        // Apply additional filters
        let filteredData = transformedData;
        
        if (filters.agency && !filters.agency.startsWith('All')) {
          filteredData = filteredData.filter(item => item.agency === filters.agency);
        }
        if (filters.advertiser && !filters.advertiser.startsWith('All')) {
          filteredData = filteredData.filter(item => item.advertiser === filters.advertiser);
        }
        if (filters.station && !filters.station.startsWith('All')) {
          filteredData = filteredData.filter(item => item.station === filters.station);
        }
        if (filters.aeName && !filters.aeName.startsWith('All')) {
          filteredData = filteredData.filter(item => item.aeName === filters.aeName);
        }

        setProjectionsData(filteredData);

        // Calculate real metrics from full dataset
        const totalBilling = filteredData.reduce((sum, item) => sum + item.billing, 0);
        const totalProjected = filteredData.reduce((sum, item) => sum + item.projectedBilling, 0);
        const totalMarketActual = filteredData.reduce((sum, item) => sum + item.actualMarket, 0);
        const totalMarketProjected = filteredData.reduce((sum, item) => sum + item.projectedMarket, 0);
        const avgAttainment = totalProjected > 0 ? (totalBilling / totalProjected) * 100 : 0;

        setRealMetrics({
          totalBilling,
          totalProjected,
          totalMarketActual,
          totalMarketProjected,
          avgAttainment,
          advertisers: filteredData.length
        });

        // Calculate category breakdown from full dataset
        const categoryBreakdown = calculateCategoryBreakdown(filteredData);
        setPieData(categoryBreakdown);

        console.log('Calculated metrics from full dataset:', {
          totalBilling: formatCurrency(totalBilling),
          totalProjected: formatCurrency(totalProjected),
          avgAttainment: avgAttainment.toFixed(1) + '%',
          advertisers: filteredData.length,
          totalRecords: filteredData.length
        });
        
      } catch (error) {
        console.error('Error fetching projections data:', error);
        setRealMetrics({
          totalBilling: 0,
          totalProjected: 0,
          totalMarketActual: 0,
          totalMarketProjected: 0,
          avgAttainment: 0,
          advertisers: 0
        });
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [station, filters]);

  const markets = ['All', ...Array.from(new Set(projectionsData.map(item => item.market)))];

  const filteredData = filterMarket === 'All' 
    ? projectionsData 
    : projectionsData.filter(item => item.market === filterMarket);

  const handleSort = (field: 'billing' | 'projected' | 'market') => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('desc');
    }
  };

  const SortIcon = ({ field }: { field: 'billing' | 'projected' | 'market' }) => {
    if (sortField !== field) return null;
    return sortDirection === 'asc' ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />;
  };

  const calculateAttainment = (actual: number, projected: number) => {
    return projected > 0 ? ((actual / projected) * 100).toFixed(1) : '0.0';
  };

  if (loading) {
    return (
      <div className="h-full flex items-center justify-center">
        <div className="text-lg text-gray-600">Loading full projections dataset from Darwin system...</div>
      </div>
    );
  }

  return (
    <div className="h-full overflow-auto space-y-6">
      {/* Header with Filters */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-gray-900">Monthly Projections (Darwin System - Full Dataset)</h2>
          <p className="text-sm text-gray-600">Revenue projections by advertiser, station, and AE - Live Data (No Limits)</p>
        </div>
        <div className="flex items-center space-x-3">
          <div className="flex items-center space-x-2">
            <Filter className="w-4 h-4 text-gray-500" />
            <Select value={filterMarket} onValueChange={setFilterMarket}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Select Market" />
              </SelectTrigger>
              <SelectContent>
                {markets.map(market => (
                  <SelectItem key={market} value={market}>{market}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <Badge variant="outline" className="text-sm bg-green-50 text-green-700 border-green-200">
            {filteredData.length} Live Records (Full Dataset)
          </Badge>
        </div>
      </div>

      {/* Summary Cards and Category Pie Chart */}
      <div className="grid grid-cols-5 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Total Billing (Live)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">{formatCurrency(realMetrics.totalBilling)}</div>
            <div className="text-sm text-blue-600">
              {calculateAttainment(realMetrics.totalBilling, realMetrics.totalProjected)}% of projection
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Projected Billing</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">{formatCurrency(realMetrics.totalProjected)}</div>
            <div className="text-sm text-gray-600">Monthly target</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Market Actual</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">{formatCurrency(realMetrics.totalMarketActual)}</div>
            <div className="text-sm text-green-600">
              {calculateAttainment(realMetrics.totalMarketActual, realMetrics.totalMarketProjected)}% of market projection
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Active Advertisers</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">{realMetrics.advertisers.toLocaleString()}</div>
            <div className="text-sm text-gray-600">In selected market(s)</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Category Breakdown</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-32">
              {pieData.length > 0 ? (
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={pieData}
                      cx="50%"
                      cy="50%"
                      innerRadius={20}
                      outerRadius={50}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {pieData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value) => [`${formatCurrency(Number(value))}`, 'Billing']} />
                  </PieChart>
                </ResponsiveContainer>
              ) : (
                <div className="flex items-center justify-center h-full text-gray-500 text-sm">
                  No category data
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Category Legend */}
      {pieData.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Category Distribution (Full Dataset - Live Data)</CardTitle>
            <CardDescription>
              <Badge variant="outline" className="text-xs bg-green-50 text-green-700 border-green-200">
                Real Data - Full category breakdown from Darwin system ({pieData.length} categories)
              </Badge>
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-4 gap-4">
              {pieData.map((entry, index) => (
                <div key={entry.name} className="flex items-center space-x-2">
                  <div 
                    className="w-4 h-4 rounded-full"
                    style={{ backgroundColor: COLORS[index % COLORS.length] }}
                  />
                  <div className="flex-1">
                    <div className="text-sm font-medium">{entry.name}</div>
                    <div className="text-xs text-gray-500">{entry.percentage}% • {formatCurrency(Number(entry.value))}</div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Projections Table - Show all data */}
      <Card>
        <CardHeader>
          <CardTitle>Monthly Projections by Advertiser & AE (Full Dataset - Live Data)</CardTitle>
          <CardDescription>Real billing performance vs projections with market context from Darwin system - All {filteredData.length} records</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-2 font-medium text-gray-600">Station/Market</th>
                  <th className="text-left py-3 px-2 font-medium text-gray-600">Advertiser</th>
                  <th className="text-left py-3 px-2 font-medium text-gray-600">AE Name</th>
                  <th className="text-left py-3 px-2 font-medium text-gray-600">Category</th>
                  <th 
                    className="text-right py-3 px-2 font-medium text-gray-600 cursor-pointer hover:text-gray-900 flex items-center justify-end space-x-1"
                    onClick={() => handleSort('billing')}
                  >
                    <span>Billing $</span>
                    <SortIcon field="billing" />
                  </th>
                  <th 
                    className="text-right py-3 px-2 font-medium text-gray-600 cursor-pointer hover:text-gray-900"
                    onClick={() => handleSort('projected')}
                  >
                    <div className="flex items-center justify-end space-x-1">
                      <span>Projected $</span>
                      <SortIcon field="projected" />
                    </div>
                  </th>
                  <th className="text-right py-3 px-2 font-medium text-gray-600">Attainment %</th>
                  <th className="text-right py-3 px-2 font-medium text-gray-600">Variance</th>
                  <th 
                    className="text-right py-3 px-2 font-medium text-gray-600 cursor-pointer hover:text-gray-900"
                    onClick={() => handleSort('market')}
                  >
                    <div className="flex items-center justify-end space-x-1">
                      <span>Market $</span>
                      <SortIcon field="market" />
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredData.map((row, index) => {
                  const billing = Number(row.billing) || 0;
                  const projectedBilling = Number(row.projectedBilling) || 0;
                  const variance = Number(row.variance) || 0;
                  const actualMarket = Number(row.actualMarket) || 0;
                  const projectedMarket = Number(row.projectedMarket) || 0;
                  const attainment = parseFloat(calculateAttainment(billing, projectedBilling));
                  
                  return (
                    <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="py-3 px-2">
                        <div className="font-medium">{row.station}</div>
                        <div className="text-xs text-gray-500">{row.market}</div>
                      </td>
                      <td className="py-3 px-2 font-medium text-blue-600">{row.advertiser}</td>
                      <td className="py-3 px-2">{row.aeName}</td>
                      <td className="py-3 px-2">
                        <Badge variant="secondary" className="text-xs">
                          {row.category}
                        </Badge>
                      </td>
                      <td className="py-3 px-2 text-right font-bold">{formatCurrency(billing)}</td>
                      <td className="py-3 px-2 text-right text-blue-600">{formatCurrency(projectedBilling)}</td>
                      <td className={`py-3 px-2 text-right font-medium ${
                        attainment >= 100 ? 'text-green-600' : attainment >= 90 ? 'text-yellow-600' : 'text-red-600'
                      }`}>
                        {attainment}%
                      </td>
                      <td className={`py-3 px-2 text-right font-medium ${
                        variance >= 0 ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {variance >= 0 ? '+' : ''}{formatCurrency(variance)}
                      </td>
                      <td className="py-3 px-2 text-right">
                        <div className="font-medium">{formatCurrency(actualMarket)}</div>
                        <div className="text-xs text-gray-500">
                          vs {formatCurrency(projectedMarket)} proj
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            
            {filteredData.length === 0 && (
              <div className="text-center py-8 text-gray-500">
                No projection data available for the selected filters
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default MonthlyProjections;
