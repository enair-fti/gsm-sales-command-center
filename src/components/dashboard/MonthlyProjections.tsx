
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ChevronUp, ChevronDown, Filter } from 'lucide-react';

interface MonthlyProjectionsProps {
  station: string;
}

const MonthlyProjections: React.FC<MonthlyProjectionsProps> = ({ station }) => {
  const [sortField, setSortField] = useState<'billing' | 'projected' | 'market'>('billing');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');
  const [filterMarket, setFilterMarket] = useState<string>('All');

  const projectionsData = [
    {
      station: 'WPRO-FM',
      market: 'Providence',
      advertiser: 'AutoNation',
      aeName: 'Mike Sullivan',
      billing: 45200,
      projectedBilling: 52000,
      projectedMarket: 180000,
      actualMarket: 165000,
      variance: 6800,
      category: 'Automotive'
    },
    {
      station: 'WBRU-FM',
      market: 'Providence',
      advertiser: 'Regional Medical Center',
      aeName: 'Lisa Rodriguez',
      billing: 38700,
      projectedBilling: 41000,
      projectedMarket: 220000,
      actualMarket: 205000,
      variance: 2300,
      category: 'Healthcare'
    },
    {
      station: 'WKFD-FM',
      market: 'Hartford',
      advertiser: 'Premier Real Estate',
      aeName: 'James Wilson',
      billing: 32500,
      projectedBilling: 35000,
      projectedMarket: 150000,
      actualMarket: 142000,
      variance: 2500,
      category: 'Real Estate'
    },
    {
      station: 'WXKS-FM',
      market: 'Boston Metro',
      advertiser: 'Local Restaurant Group',
      aeName: 'Sarah Chen',
      billing: 28900,
      projectedBilling: 30000,
      projectedMarket: 280000,
      actualMarket: 275000,
      variance: 1100,
      category: 'Food & Dining'
    },
    {
      station: 'WFHN-FM',
      market: 'Boston Metro',
      advertiser: 'Tech Solutions Inc',
      aeName: 'David Park',
      billing: 24600,
      projectedBilling: 28000,
      projectedMarket: 95000,
      actualMarket: 88000,
      variance: 3400,
      category: 'Technology'
    },
    {
      station: 'WPRO-AM',
      market: 'Providence',
      advertiser: 'Insurance Partners',
      aeName: 'Jennifer Adams',
      billing: 23100,
      projectedBilling: 25000,
      projectedMarket: 125000,
      actualMarket: 118000,
      variance: 1900,
      category: 'Insurance'
    }
  ];

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
    totalBilling: filteredData.reduce((sum, item) => sum + item.billing, 0),
    totalProjected: filteredData.reduce((sum, item) => sum + item.projectedBilling, 0),
    totalMarketActual: filteredData.reduce((sum, item) => sum + item.actualMarket, 0),
    totalMarketProjected: filteredData.reduce((sum, item) => sum + item.projectedMarket, 0),
    advertisers: filteredData.length
  };

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

      {/* Summary Cards */}
      <div className="grid grid-cols-4 gap-4">
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
      </div>

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
                  const attainment = parseFloat(calculateAttainment(row.billing, row.projectedBilling));
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
                      <td className="py-3 px-2 text-right font-bold">${row.billing.toLocaleString()}</td>
                      <td className="py-3 px-2 text-right text-blue-600">${row.projectedBilling.toLocaleString()}</td>
                      <td className={`py-3 px-2 text-right font-medium ${
                        attainment >= 100 ? 'text-green-600' : attainment >= 90 ? 'text-yellow-600' : 'text-red-600'
                      }`}>
                        {attainment}%
                      </td>
                      <td className={`py-3 px-2 text-right font-medium ${
                        row.variance >= 0 ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {row.variance >= 0 ? '+' : ''}${row.variance.toLocaleString()}
                      </td>
                      <td className="py-3 px-2 text-right">
                        <div className="font-medium">${row.actualMarket.toLocaleString()}</div>
                        <div className="text-xs text-gray-500">
                          vs ${row.projectedMarket.toLocaleString()} proj
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
