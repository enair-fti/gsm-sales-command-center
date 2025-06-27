
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ChevronUp, ChevronDown, Download, Filter, BarChart3 } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

interface TopAdvertisersProps {
  station: string;
}

const TopAdvertisers: React.FC<TopAdvertisersProps> = ({ station }) => {
  const [sortField, setSortField] = useState<'booked' | 'forecast' | 'growth'>('booked');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');
  const [filterCategory, setFilterCategory] = useState<string>('All');
  const [advertisers, setAdvertisers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAdvertisers = async () => {
      try {
        setLoading(true);
        
        // Fetch from references_advertisers and extended_media_orders
        const { data: advertiserRef } = await supabase
          .from('references_advertisers')
          .select('*')
          .limit(100);

        const { data: orderData } = await supabase
          .from('extended_media_orders')
          .select('*')
          .limit(100);

        console.log('Fetched advertiser data:', { advertiserRef, orderData });
        
        // Mock data with calculated metrics
        const mockAdvertisers = [
          { 
            rank: 1, 
            name: "AutoNation", 
            agency: "GroupM", 
            category: "Automotive", 
            booked: 145200, 
            forecast: 160000, 
            previousYear: 125000,
            currentPercent: 90.8,
            finalPercent: 116.2,
            growth: 16.2,
            market: "Providence"
          },
          { 
            rank: 2, 
            name: "Regional Medical Center", 
            agency: "Havas", 
            category: "Healthcare", 
            booked: 128700, 
            forecast: 135000, 
            previousYear: 110000,
            currentPercent: 95.3,
            finalPercent: 117.0,
            growth: 17.0,
            market: "Boston Metro"
          },
          { 
            rank: 3, 
            name: "Premier Real Estate", 
            agency: "Zenith", 
            category: "Real Estate", 
            booked: 112500, 
            forecast: 125000, 
            previousYear: 98000,
            currentPercent: 90.0,
            finalPercent: 114.8,
            growth: 14.8,
            market: "Hartford"
          },
          { 
            rank: 4, 
            name: "Restaurant Group LLC", 
            agency: "MediaCom", 
            category: "Food & Dining", 
            booked: 98900, 
            forecast: 105000, 
            previousYear: 105000,
            currentPercent: 94.2,
            finalPercent: 94.2,
            growth: -5.8,
            market: "Springfield"
          },
          { 
            rank: 5, 
            name: "Tech Solutions Inc", 
            agency: "Publicis", 
            category: "Technology", 
            booked: 87600, 
            forecast: 95000, 
            previousYear: 92000,
            currentPercent: 92.2,
            finalPercent: 95.2,
            growth: -4.8,
            market: "Boston Metro"
          }
        ];
        
        setAdvertisers(mockAdvertisers);
      } catch (error) {
        console.error('Error fetching advertiser data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAdvertisers();
  }, [station]);

  const categories = ['All', ...Array.from(new Set(advertisers.map(item => item.category)))];

  const filteredAdvertisers = filterCategory === 'All' 
    ? advertisers 
    : advertisers.filter(item => item.category === filterCategory);

  const handleSort = (field: 'booked' | 'forecast' | 'growth') => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('desc');
    }
  };

  const SortIcon = ({ field }: { field: 'booked' | 'forecast' | 'growth' }) => {
    if (sortField !== field) return null;
    return sortDirection === 'asc' ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />;
  };

  const exportData = () => {
    const csvContent = "data:text/csv;charset=utf-8," 
      + "Rank,Advertiser,Agency,Category,Booked,Forecast,Current %,Final %,Growth %\n"
      + filteredAdvertisers.map(row => 
          `${row.rank},"${row.name}","${row.agency}","${row.category}",${row.booked},${row.forecast},${row.currentPercent},${row.finalPercent},${row.growth}`
        ).join("\n");
    
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "top_advertisers.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (loading) {
    return (
      <div className="h-full flex items-center justify-center">
        <div className="text-lg text-gray-600">Loading advertiser data...</div>
      </div>
    );
  }

  return (
    <div className="h-full overflow-auto space-y-6">
      {/* Header with Filters */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-gray-900">Top 100 Advertisers</h2>
          <p className="text-sm text-gray-600">Advertiser pacing and growth analysis</p>
        </div>
        <div className="flex items-center space-x-3">
          <div className="flex items-center space-x-2">
            <Filter className="w-4 h-4 text-gray-500" />
            <select 
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="border border-gray-300 rounded-md px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </div>
          <button
            onClick={exportData}
            className="flex items-center space-x-2 px-3 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
          >
            <Download className="w-4 h-4" />
            <span>Export</span>
          </button>
          <Badge variant="outline" className="text-sm">
            {filteredAdvertisers.length} Advertisers
          </Badge>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Total Booked</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">
              ${(filteredAdvertisers.reduce((sum, item) => sum + item.booked, 0) / 1000).toFixed(0)}K
            </div>
            <div className="text-sm text-green-600">Top 100 combined</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Avg Current %</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">
              {(filteredAdvertisers.reduce((sum, item) => sum + item.currentPercent, 0) / filteredAdvertisers.length).toFixed(1)}%
            </div>
            <div className="text-sm text-gray-600">Booked vs Forecast</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Avg Growth</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              +{(filteredAdvertisers.reduce((sum, item) => sum + item.growth, 0) / filteredAdvertisers.length).toFixed(1)}%
            </div>
            <div className="text-sm text-gray-600">vs Previous Year</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Categories</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">{categories.length - 1}</div>
            <div className="text-sm text-gray-600">Active categories</div>
          </CardContent>
        </Card>
      </div>

      {/* Advertisers Table */}
      <Card>
        <CardHeader>
          <CardTitle>Advertiser Performance & Pacing</CardTitle>
          <CardDescription>Current month performance vs forecast and prior year comparison</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-2 font-medium text-gray-600">Rank</th>
                  <th className="text-left py-3 px-2 font-medium text-gray-600">Advertiser</th>
                  <th className="text-left py-3 px-2 font-medium text-gray-600">Agency</th>
                  <th className="text-left py-3 px-2 font-medium text-gray-600">Category</th>
                  <th 
                    className="text-right py-3 px-2 font-medium text-gray-600 cursor-pointer hover:text-gray-900 flex items-center justify-end space-x-1"
                    onClick={() => handleSort('booked')}
                  >
                    <span>Booked $</span>
                    <SortIcon field="booked" />
                  </th>
                  <th 
                    className="text-right py-3 px-2 font-medium text-gray-600 cursor-pointer hover:text-gray-900"
                    onClick={() => handleSort('forecast')}
                  >
                    <div className="flex items-center justify-end space-x-1">
                      <span>Forecast $</span>
                      <SortIcon field="forecast" />
                    </div>
                  </th>
                  <th className="text-right py-3 px-2 font-medium text-gray-600">Current %</th>
                  <th className="text-right py-3 px-2 font-medium text-gray-600">% Final</th>
                  <th 
                    className="text-right py-3 px-2 font-medium text-gray-600 cursor-pointer hover:text-gray-900"
                    onClick={() => handleSort('growth')}
                  >
                    <div className="flex items-center justify-end space-x-1">
                      <span>Growth %</span>
                      <SortIcon field="growth" />
                    </div>
                  </th>
                  <th className="text-center py-3 px-2 font-medium text-gray-600">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredAdvertisers.map((row, index) => (
                  <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-3 px-2">
                      <div className="w-8 h-8 bg-blue-100 text-blue-800 rounded-full flex items-center justify-center text-sm font-bold">
                        {row.rank}
                      </div>
                    </td>
                    <td className="py-3 px-2 font-medium text-blue-600">{row.name}</td>
                    <td className="py-3 px-2 text-gray-600">{row.agency}</td>
                    <td className="py-3 px-2">
                      <Badge variant="secondary" className="text-xs">
                        {row.category}
                      </Badge>
                    </td>
                    <td className="py-3 px-2 text-right font-bold">${(row.booked / 1000).toFixed(0)}K</td>
                    <td className="py-3 px-2 text-right text-blue-600">${(row.forecast / 1000).toFixed(0)}K</td>
                    <td className={`py-3 px-2 text-right font-medium ${
                      row.currentPercent >= 100 ? 'text-green-600' : row.currentPercent >= 90 ? 'text-yellow-600' : 'text-red-600'
                    }`}>
                      {row.currentPercent.toFixed(1)}%
                    </td>
                    <td className={`py-3 px-2 text-right font-medium ${
                      row.finalPercent >= 100 ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {row.finalPercent.toFixed(1)}%
                    </td>
                    <td className={`py-3 px-2 text-right font-medium ${
                      row.growth >= 0 ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {row.growth >= 0 ? '+' : ''}{row.growth.toFixed(1)}%
                    </td>
                    <td className="py-3 px-2 text-center">
                      <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                        <BarChart3 className="w-4 h-4" />
                      </button>
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

export default TopAdvertisers;
