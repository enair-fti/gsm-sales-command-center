
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Award, TrendingUp, TrendingDown, DollarSign, Target, Calendar } from 'lucide-react';
import { fetchAdvertisers } from '@/utils/referenceData';

interface TopAdvertisersProps {
  station: string;
  filters: {
    agency: string;
    advertiser: string;
    station: string;
    quarter: string;
    year: string;
  };
}

const TopAdvertisers: React.FC<TopAdvertisersProps> = ({ station, filters }) => {
  const [sortField, setSortField] = useState<'spend' | 'spots' | 'trend'>('spend');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');
  const [advertisersData, setAdvertisersData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        let data = await fetchAdvertisers();
        
        // Enhance data with mock metrics
        const enhancedData = data.map((advertiser, index) => ({
          ...advertiser,
          rank: index + 1,
          spend: Math.floor(Math.random() * 500000) + 50000, // Mock spend $50K-$550K
          spots: Math.floor(Math.random() * 1000) + 100, // Mock spots 100-1100
          trend: (Math.random() - 0.5) * 40, // Mock trend -20% to +20%
          lastOrderDate: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
          region: ['Northeast', 'Southeast', 'Midwest', 'West Coast', 'Southwest'][Math.floor(Math.random() * 5)],
          makegoods: Math.floor(Math.random() * 5), // 0-5 makegoods
          missed: Math.floor(Math.random() * 3) // 0-3 missed
        }));

        // Apply filters
        let filteredData = enhancedData;
        if (filters.advertiser && !filters.advertiser.startsWith('All')) {
          filteredData = filteredData.filter(item => 
            item.Name && item.Name.toLowerCase().includes(filters.advertiser.toLowerCase())
          );
        }
        if (filters.agency && !filters.agency.startsWith('All')) {
          // Mock agency filtering since we don't have agency data in advertisers table
          filteredData = filteredData.filter(() => Math.random() > 0.3);
        }

        // Sort data
        filteredData.sort((a, b) => b.spend - a.spend);
        
        setAdvertisersData(filteredData.slice(0, 100)); // Top 100
      } catch (error) {
        console.error('Error fetching advertisers data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [station, filters]);

  const handleSort = (field: 'spend' | 'spots' | 'trend') => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('desc');
    }

    const sortedData = [...advertisersData].sort((a, b) => {
      const aVal = a[field];
      const bVal = b[field];
      return sortDirection === 'asc' ? aVal - bVal : bVal - aVal;
    });
    setAdvertisersData(sortedData);
  };

  const getRankBadge = (rank: number) => {
    if (rank <= 3) {
      const colors = ['bg-yellow-500', 'bg-gray-400', 'bg-amber-600'];
      const icons = ['🥇', '🥈', '🥉'];
      return (
        <div className={`${colors[rank - 1]} text-white px-2 py-1 rounded-full text-xs font-bold flex items-center space-x-1`}>
          <span>{icons[rank - 1]}</span>
          <span>#{rank}</span>
        </div>
      );
    } else if (rank <= 10) {
      return (
        <Badge variant="secondary" className="bg-blue-100 text-blue-800 font-bold">
          #{rank}
        </Badge>
      );
    } else {
      return (
        <Badge variant="outline" className="font-medium">
          #{rank}
        </Badge>
      );
    }
  };

  const getTrendIcon = (trend: number) => {
    if (trend > 0) {
      return <TrendingUp className="w-4 h-4 text-green-500" />;
    } else if (trend < 0) {
      return <TrendingDown className="w-4 h-4 text-red-500" />;
    } else {
      return <Target className="w-4 h-4 text-gray-500" />;
    }
  };

  if (loading) {
    return (
      <div className="h-full flex items-center justify-center">
        <div className="text-lg text-gray-600">Loading advertisers data...</div>
      </div>
    );
  }

  return (
    <div className="h-full overflow-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-gray-900 flex items-center space-x-2">
            <Award className="w-6 h-6 text-yellow-500" />
            <span>Top 100 Advertisers</span>
          </h2>
          <p className="text-sm text-gray-600">Ranked by total billing with performance metrics</p>
        </div>
        <Badge variant="outline" className="text-sm">
          {advertisersData.length} Advertisers
        </Badge>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600 flex items-center space-x-2">
              <DollarSign className="w-4 h-4 text-green-500" />
              <span>Total Spend</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">
              ${advertisersData.reduce((sum, item) => sum + item.spend, 0).toLocaleString()}
            </div>
            <div className="text-sm text-gray-500">Across all advertisers</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Top Performer</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-lg font-bold text-gray-900">
              {advertisersData[0]?.Name || 'N/A'}
            </div>
            <div className="text-sm text-green-600">
              ${advertisersData[0]?.spend.toLocaleString() || '0'}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Avg Growth</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              {advertisersData.length > 0 
                ? `+${(advertisersData.reduce((sum, item) => sum + Math.max(0, item.trend), 0) / advertisersData.length).toFixed(1)}%`
                : '0%'
              }
            </div>
            <div className="text-sm text-gray-500">YoY average</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Active Regions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">
              {new Set(advertisersData.map(item => item.region)).size}
            </div>
            <div className="text-sm text-gray-500">Geographic markets</div>
          </CardContent>
        </Card>
      </div>

      {/* Advertisers Table */}
      <Card>
        <CardHeader>
          <CardTitle>Top 100 Advertisers Ranking</CardTitle>
          <CardDescription>Complete advertiser performance breakdown with billing and activity metrics</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-2 font-medium text-gray-600">Rank</th>
                  <th className="text-left py-3 px-2 font-medium text-gray-600">Advertiser Name</th>
                  <th className="text-left py-3 px-2 font-medium text-gray-600">Region</th>
                  <th 
                    className="text-right py-3 px-2 font-medium text-gray-600 cursor-pointer hover:text-gray-900"
                    onClick={() => handleSort('spend')}
                  >
                    Spend ($)
                  </th>
                  <th 
                    className="text-right py-3 px-2 font-medium text-gray-600 cursor-pointer hover:text-gray-900"
                    onClick={() => handleSort('spots')}
                  >
                    Spots
                  </th>
                  <th 
                    className="text-right py-3 px-2 font-medium text-gray-600 cursor-pointer hover:text-gray-900"
                    onClick={() => handleSort('trend')}
                  >
                    YoY Trend
                  </th>
                  <th className="text-left py-3 px-2 font-medium text-gray-600">Last Order</th>
                  <th className="text-left py-3 px-2 font-medium text-gray-600">Issues</th>
                </tr>
              </thead>
              <tbody>
                {advertisersData.map((advertiser, index) => (
                  <tr key={advertiser.Code} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-3 px-2">
                      {getRankBadge(advertiser.rank)}
                    </td>
                    <td className="py-3 px-2">
                      <div className="font-medium text-blue-600">{advertiser.Name}</div>
                      <div className="text-xs text-gray-500">Code: {advertiser.Code}</div>
                    </td>
                    <td className="py-3 px-2">
                      <Badge variant="outline" className="text-xs">
                        {advertiser.region}
                      </Badge>
                    </td>
                    <td className="py-3 px-2 text-right font-bold">
                      ${advertiser.spend.toLocaleString()}
                    </td>
                    <td className="py-3 px-2 text-right font-medium">
                      {advertiser.spots.toLocaleString()}
                    </td>
                    <td className="py-3 px-2 text-right">
                      <div className="flex items-center justify-end space-x-1">
                        {getTrendIcon(advertiser.trend)}
                        <span className={`font-medium ${
                          advertiser.trend > 0 ? 'text-green-600' : 
                          advertiser.trend < 0 ? 'text-red-600' : 'text-gray-600'
                        }`}>
                          {advertiser.trend > 0 ? '+' : ''}{advertiser.trend.toFixed(1)}%
                        </span>
                      </div>
                    </td>
                    <td className="py-3 px-2">
                      <div className="flex items-center space-x-1">
                        <Calendar className="w-3 h-3 text-gray-400" />
                        <span className="text-xs">{advertiser.lastOrderDate}</span>
                      </div>
                    </td>
                    <td className="py-3 px-2">
                      <div className="flex space-x-1">
                        {advertiser.makegoods > 0 && (
                          <Badge variant="outline" className="text-xs bg-yellow-50 text-yellow-700">
                            {advertiser.makegoods} MG
                          </Badge>
                        )}
                        {advertiser.missed > 0 && (
                          <Badge variant="destructive" className="text-xs">
                            {advertiser.missed} Miss
                          </Badge>
                        )}
                      </div>
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
