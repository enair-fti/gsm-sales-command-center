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

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8', '#82CA9D', '#FFC658', '#FF7C7C'];

  // Mock data for pie chart - replace with real category data from Supabase
  const mockPieData = [
    { name: 'Automotive', value: 125000, percentage: '28.5' },
    { name: 'Healthcare', value: 98000, percentage: '22.3' },
    { name: 'Retail', value: 87000, percentage: '19.8' },
    { name: 'Real Estate', value: 65000, percentage: '14.8' },
    { name: 'Financial', value: 42000, percentage: '9.6' },
    { name: 'Entertainment', value: 22000, percentage: '5.0' }
  ];

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
              {calculateAttainment(summaryData.totalBilling, summaryData.totalProjected)}% of projection
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
              {calculateAttainment(summaryData.totalMarketActual, summaryData.totalMarketProjected)}% of market projection
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
                    data={mockPieData}
                    cx="50%"
                    cy="50%"
                    innerRadius={20}
                    outerRadius={50}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {mockPieData.map((entry, index) => (
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
          <CardDescription>
            <Badge variant="outline" className="text-xs bg-yellow-50 text-yellow-700 border-yellow-200">
              Mock Data - Sample category breakdown
            </Badge>
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-4 gap-4">
            {mockPieData.map((entry, index) => (
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
                      <td className="py-3 px-2 text-right font-bold">${billing.toLocaleString()}</td>
                      <td className="py-3 px-2 text-right text-blue-600">${projectedBilling.toLocaleString()}</td>
                      <td className={`py-3 px-2 text-right font-medium ${
                        attainment >= 100 ? 'text-green-600' : attainment >= 90 ? 'text-yellow-600' : 'text-red-600'
                      }`}>
                        {attainment}%
                      </td>
                      <td className={`py-3 px-2 text-right font-medium ${
                        variance >= 0 ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {variance >= 0 ? '+' : ''}${variance.toLocaleString()}
                      </td>
                      <td className="py-3 px-2 text-right">
                        <div className="font-medium">${actualMarket.toLocaleString()}</div>
                        <div className="text-xs text-gray-500">
                          vs ${projectedMarket.toLocaleString()} proj
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
