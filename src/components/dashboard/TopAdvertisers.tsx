import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';
import { TrendingUp, Filter, Download, Users, Trophy, Award, Medal } from 'lucide-react';
import { fetchTopAdvertisersData } from '@/utils/referenceData';

interface TopAdvertisersProps {
  station: string;
  filters: {
    agency: string;
    advertiser: string;
    station: string;
    category: string;
    aeName: string;
    quarter: string;
    year: string;
  };
}

const TopAdvertisers: React.FC<TopAdvertisersProps> = ({ station, filters }) => {
  const [advertiserData, setAdvertiserData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState<'totalBilling' | 'yoyChange' | 'spotCount'>('totalBilling');
  const [selectedCategory, setSelectedCategory] = useState('All');

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        
        let data = await fetchTopAdvertisersData(filters);
        
        // Apply case-insensitive filters
        if (filters.agency && !filters.agency.startsWith('All')) {
          data = data.filter(item => 
            item.agency && item.agency.toLowerCase().includes(filters.agency.toLowerCase())
          );
        }
        if (filters.advertiser && !filters.advertiser.startsWith('All')) {
          data = data.filter(item => 
            item.advertiser && item.advertiser.toLowerCase().includes(filters.advertiser.toLowerCase())
          );
        }
        if (filters.station && !filters.station.startsWith('All')) {
          data = data.filter(item => 
            item.station && item.station.toLowerCase().includes(filters.station.toLowerCase())
          );
        }
        if (filters.category && !filters.category.startsWith('All')) {
          data = data.filter(item => 
            item.category && item.category.toLowerCase().includes(filters.category.toLowerCase())
          );
        }
        if (filters.aeName && !filters.aeName.startsWith('All')) {
          data = data.filter(item => 
            item.aeName && item.aeName.toLowerCase().includes(filters.aeName.toLowerCase())
          );
        }
        if (selectedCategory !== 'All') {
          data = data.filter(item => 
            item.category && item.category.toLowerCase().includes(selectedCategory.toLowerCase())
          );
        }

        // Sort data
        data.sort((a, b) => {
          switch (sortBy) {
            case 'totalBilling':
              return b.totalBilling - a.totalBilling;
            case 'yoyChange':
              return parseFloat(b.yoyChange) - parseFloat(a.yoyChange);
            case 'spotCount':
              return b.spotCount - a.spotCount;
            default:
              return b.totalBilling - a.totalBilling;
          }
        });

        // Update ranks after filtering and sorting
        data = data.map((item, index) => ({ ...item, rank: index + 1 }));

        setAdvertiserData(data.slice(0, 100)); // Top 100
      } catch (error) {
        console.error('Error fetching advertiser data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [station, filters, sortBy, selectedCategory]);

  const exportData = () => {
    const csvContent = "data:text/csv;charset=utf-8," 
      + "Rank,Advertiser,Category,Agency,Total Billing,Spot Count,YoY Change,Last Order Date,Makegoods,Region\n"
      + advertiserData.map(row => 
          `${row.rank},${row.advertiser},${row.category},${row.agency},${row.totalBilling},${row.spotCount},${row.yoyChange},${row.lastOrderDate},${row.makegoods},${row.region}`
        ).join("\n");
    
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "top_100_advertisers.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const categories = ['All', 'Automotive', 'QSR', 'Healthcare', 'Financial', 'Retail', 'Technology', 'Real Estate', 'Uncategorized'];

  const getRankIcon = (rank: number) => {
    if (rank === 1) return <Trophy className="w-4 h-4 text-yellow-500" />;
    if (rank === 2) return <Award className="w-4 h-4 text-gray-400" />;
    if (rank === 3) return <Medal className="w-4 h-4 text-amber-600" />;
    if (rank <= 10) return <div className="w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center text-white text-xs font-bold">{rank}</div>;
    return null;
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
      {/* Header with Controls */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-gray-900">Top 100 Advertisers</h2>
          <p className="text-sm text-gray-600">Advertiser performance ranked by total billing and growth metrics</p>
        </div>
        <div className="flex items-center space-x-3">
          <div className="flex items-center space-x-2">
            <Filter className="w-4 h-4 text-gray-500" />
            <select 
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="border border-gray-300 rounded-md px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-600">Sort by:</span>
            <select 
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as 'totalBilling' | 'yoyChange' | 'spotCount')}
              className="border border-gray-300 rounded-md px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="totalBilling">Total Billing</option>
              <option value="yoyChange">YoY Growth</option>
              <option value="spotCount">Spot Count</option>
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
            {advertiserData.length} Advertisers
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
            <div className="text-2xl font-bold text-gray-900">
              ${advertiserData.reduce((sum, item) => sum + item.totalBilling, 0).toLocaleString()}
            </div>
            <div className="text-sm text-green-600">Combined revenue</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Total Spots</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">
              {advertiserData.reduce((sum, item) => sum + item.spotCount, 0).toLocaleString()}
            </div>
            <div className="text-sm text-blue-600">Air time inventory</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Avg YoY Growth</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">
              {(advertiserData.reduce((sum, item) => sum + parseFloat(item.yoyChange), 0) / advertiserData.length).toFixed(1)}%
            </div>
            <div className="text-sm text-green-600">Year over year</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Active Advertisers</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">{advertiserData.length}</div>
            <div className="text-sm text-gray-600">In current selection</div>
          </CardContent>
        </Card>
      </div>

      {/* Advertisers Table */}
      <Card>
        <CardHeader>
          <CardTitle>Top 100 Advertiser Rankings</CardTitle>
          <CardDescription>Complete advertiser performance with billing, trends, and operational metrics</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-2 font-medium text-gray-600">Rank</th>
                  <th className="text-left py-3 px-2 font-medium text-gray-600">Advertiser</th>
                  <th className="text-left py-3 px-2 font-medium text-gray-600">Category</th>
                  <th className="text-left py-3 px-2 font-medium text-gray-600">Agency</th>
                  <th className="text-left py-3 px-2 font-medium text-gray-600">Region</th>
                  <th className="text-right py-3 px-2 font-medium text-gray-600">Total Billing</th>
                  <th className="text-right py-3 px-2 font-medium text-gray-600">Spot Count</th>
                  <th className="text-right py-3 px-2 font-medium text-gray-600">YoY Change</th>
                  <th className="text-center py-3 px-2 font-medium text-gray-600">Last Order</th>
                  <th className="text-center py-3 px-2 font-medium text-gray-600">Makegoods</th>
                </tr>
              </thead>
              <tbody>
                {advertiserData.map((row, index) => (
                  <tr key={index} className={`border-b border-gray-100 hover:bg-gray-50 ${
                    row.rank <= 10 ? 'bg-blue-50' : ''
                  }`}>
                    <td className="py-3 px-2">
                      <div className="flex items-center space-x-2">
                        {getRankIcon(row.rank)}
                        <span className={`font-medium ${row.rank <= 10 ? 'text-blue-600' : 'text-gray-500'}`}>
                          #{row.rank}
                        </span>
                      </div>
                    </td>
                    <td className="py-3 px-2 font-medium text-blue-600">{row.advertiser}</td>
                    <td className="py-3 px-2">
                      <Badge variant="secondary" className="text-xs">
                        {row.category}
                      </Badge>
                    </td>
                    <td className="py-3 px-2 text-gray-600">{row.agency}</td>
                    <td className="py-3 px-2 text-gray-600">{row.region}</td>
                    <td className="py-3 px-2 text-right font-bold">${row.totalBilling.toLocaleString()}</td>
                    <td className="py-3 px-2 text-right text-blue-600">{row.spotCount.toLocaleString()}</td>
                    <td className={`py-3 px-2 text-right font-medium ${
                      parseFloat(row.yoyChange) >= 0 ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {row.yoyChange}%
                    </td>
                    <td className="py-3 px-2 text-center text-gray-600">{row.lastOrderDate}</td>
                    <td className="py-3 px-2 text-center">
                      <Badge variant={row.makegoods > 3 ? "destructive" : "secondary"} className="text-xs">
                        {row.makegoods}
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

export default TopAdvertisers;
