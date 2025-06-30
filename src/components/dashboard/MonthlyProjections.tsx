
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ChevronUp, ChevronDown, Filter } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { fetchDarwinProjections } from '@/utils/referenceData';

interface MonthlyProjectionsProps {
  station: string;
  filters: {
    agency: string;
    advertiser: string;
    station: string;
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

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8', '#82CA9D', '#FFC658', '#FF7C7C'];

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        let data = await fetchDarwinProjections(filters);
        
        // Apply filters
        if (filters.agency && !filters.agency.startsWith('All')) {
          data = data.filter(item => item.agency === filters.agency);
        }
        if (filters.advertiser && !filters.advertiser.startsWith('All')) {
          data = data.filter(item => item.advertiser === filters.advertiser);
        }
        if (filters.station && !filters.station.startsWith('All')) {
          data = data.filter(item => item.station === filters.station);
        }
        if (filters.aeName && !filters.aeName.startsWith('All')) {
          data = data.filter(item => item.aeName === filters.aeName);
        }
        
        setProjectionsData(data);
      } catch (error) {
        console.error('Error fetching projections data:', error);
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
    return ((actual / projected) * 100).toFixed(1);
  };

  const summaryData = {
    totalBilling: filteredData.reduce((sum, item) => sum + (Number(item.billing) || 0), 0),
    totalProjected: filteredData.reduce((sum, item) => sum + (Number(item.projectedBilling) || 0), 0),
    totalMarketActual: filteredData.reduce((sum, item) => sum + (Number(item.actualMarket) || 0), 0),
    totalMarketProjected: filteredData.reduce((sum, item) => sum + (Number(item.projectedMarket) || 0), 0),
    advertisers: filteredData.length
  };

  // Calculate category breakdown for pie chart
  const categoryBreakdown = filteredData.reduce((acc, item) => {
    const category = item.category || 'Uncategorized';
    acc[category] = (acc[category] || 0) + (Number(item.billing) || 0);
    return acc;
  }, {} as Record<string, number>);

  const pieData = Object.entries(categoryBreakdown).map(([category, value]) => ({
    name: category,
    value,
    percentage: summaryData.totalBilling > 0 ? ((value / summaryData.totalBilling) * 100).toFixed(1) : "0.0"
  }));

  if (loading) {
    return (
      <div className="h-full flex items-center justify-center">
        <div className="text-lg text-gray-600">Loading projections data...</div>
      </div>
    );
  }

  return (
    <div className="h-full overflow-auto space-y-6">
      {/* Header with Filters */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-gray-900">Monthly Projections (Darwin System)</h2>
          <p className="text-sm text-gray-600">Revenue projections by advertiser, station, and AE</p>
        </div>
        <div className="flex items-center space-x-3">
          <div className="flex items-center space-x-2">
            <Filter className="w-4 h-4 text-gray-500" />
            <select 
              value={filterMarket}
              onChange={(e) => setFilterMarket(e.target.value)}
              className="border border-gray-300 rounded-md px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {markets.map(market => (
                <option key={market} value={market}>{market}</option>
              ))}
            </select>
          </div>
          <Badge variant="outline" className="text-sm">
            {filteredData.length} Advertisers
          </Badge>
        </div>
      </div>

      {/* Summary Cards and Category Pie Chart */}
      <div className="grid grid-cols-5 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Total Billing</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">${summaryData.totalBilling.toLocaleString()}</div>
            <div className="text-sm text-blue-600">
              {summaryData.totalProjected > 0 ? calculateAttainment(summaryData.totalBilling, summaryData.totalProjected) : "0"}% of projection
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Projected Billing</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">${summaryData.totalProjected.toLocaleString()}</div>
            <div className="text-sm text-gray-600">Monthly target</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Market Actual</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">${summaryData.totalMarketActual.toLocaleString()}</div>
            <div className="text-sm text-green-600">
              {summaryData.totalMarketProjected > 0 ? calculateAttainment(summaryData.totalMarketActual, summaryData.totalMarketProjected) : "0"}% of market projection
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Active Advertisers</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">{summaryData.advertisers}</div>
            <div className="text-sm text-gray-600">In selected market(s)</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Category Breakdown</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-32">
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
                  <Tooltip formatter={(value) => [`$${Number(value).toLocaleString()}`, 'Billing']} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Category Legend */}
      <Card>
        <CardHeader>
          <CardTitle>Category Distribution</CardTitle>
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
                  <div className="text-xs text-gray-500">{entry.percentage}% • ${Number(entry.value).toLocaleString()}</div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Projections Table */}
      <Card>
        <CardHeader>
          <CardTitle>Monthly Projections by Advertiser & AE</CardTitle>
          <CardDescription>Billing performance vs projections with market context</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-2 font-medium text-gray-600">Station/Market</th>
                  <th className="text-left py-3 px-2 font-medium text-gray-600">Advertiser</th>
                  <th className="text-left py-3 px-2 font-medium text-gray-600">AE Name</th>
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
                  const attainment = row.projectedBilling > 0 ? parseFloat(calculateAttainment(row.billing || 0, row.projectedBilling || 0)) : 0;
                  return (
                    <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="py-3 px-2">
                        <div className="font-medium">{row.station}</div>
                        <div className="text-xs text-gray-500">{row.market}</div>
                      </td>
                      <td className="py-3 px-2 font-medium text-blue-600">{row.advertiser}</td>
                      <td className="py-3 px-2">{row.aeName}</td>
                      <td className="py-3 px-2 text-right font-bold">${(row.billing || 0).toLocaleString()}</td>
                      <td className="py-3 px-2 text-right text-blue-600">${(row.projectedBilling || 0).toLocaleString()}</td>
                      <td className={`py-3 px-2 text-right font-medium ${
                        attainment >= 100 ? 'text-green-600' : attainment >= 90 ? 'text-yellow-600' : 'text-red-600'
                      }`}>
                        {attainment.toFixed(1)}%
                      </td>
                      <td className={`py-3 px-2 text-right font-medium ${
                        (row.variance || 0) >= 0 ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {(row.variance || 0) >= 0 ? '+' : ''}${(row.variance || 0).toLocaleString()}
                      </td>
                      <td className="py-3 px-2 text-right">
                        <div className="font-medium">${(row.actualMarket || 0).toLocaleString()}</div>
                        <div className="text-xs text-gray-500">
                          vs ${(row.projectedMarket || 0).toLocaleString()} proj
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default MonthlyProjections;
