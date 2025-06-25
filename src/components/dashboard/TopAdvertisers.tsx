
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ChevronUp, ChevronDown } from 'lucide-react';

interface TopAdvertisersProps {
  station: string;
}

const TopAdvertisers: React.FC<TopAdvertisersProps> = ({ station }) => {
  const [sortField, setSortField] = useState<'spend' | 'category' | 'region'>('spend');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');

  const advertisers = [
    { rank: 1, name: "AutoNation", spend: 45200, category: "Automotive", region: "Northeast", spots: 234, lastOrder: "2 hours ago", trend: "+12%" },
    { rank: 2, name: "Regional Medical Center", spend: 38700, category: "Healthcare", region: "Metro", spots: 156, lastOrder: "4 hours ago", trend: "+8%" },
    { rank: 3, name: "Premier Real Estate", spend: 32500, category: "Real Estate", region: "Southeast", spots: 189, lastOrder: "1 day ago", trend: "+15%" },
    { rank: 4, name: "Local Restaurant Group", spend: 28900, category: "Food & Dining", region: "Metro", spots: 298, lastOrder: "3 hours ago", trend: "+5%" },
    { rank: 5, name: "Tech Solutions Inc", spend: 24600, category: "Technology", region: "Northeast", spots: 87, lastOrder: "6 hours ago", trend: "-3%" },
    { rank: 6, name: "Insurance Partners", spend: 23100, category: "Insurance", region: "Southeast", spots: 145, lastOrder: "5 hours ago", trend: "+7%" },
    { rank: 7, name: "Fitness First Gyms", spend: 21800, category: "Health & Fitness", region: "Metro", spots: 167, lastOrder: "8 hours ago", trend: "+22%" },
    { rank: 8, name: "Legal Associates", spend: 19400, category: "Legal", region: "Northeast", spots: 78, lastOrder: "12 hours ago", trend: "+1%" },
    { rank: 9, name: "Home Improvement Co", spend: 18200, category: "Home & Garden", region: "Southeast", spots: 203, lastOrder: "1 day ago", trend: "+18%" },
    { rank: 10, name: "Fashion Retail Chain", spend: 16900, category: "Retail", region: "Metro", spots: 134, lastOrder: "4 hours ago", trend: "-5%" },
  ];

  const handleSort = (field: 'spend' | 'category' | 'region') => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('desc');
    }
  };

  const SortIcon = ({ field }: { field: 'spend' | 'category' | 'region' }) => {
    if (sortField !== field) return null;
    return sortDirection === 'asc' ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />;
  };

  const getCategoryColor = (category: string) => {
    const colors: { [key: string]: string } = {
      "Automotive": "bg-blue-100 text-blue-800",
      "Healthcare": "bg-green-100 text-green-800",
      "Real Estate": "bg-purple-100 text-purple-800",
      "Food & Dining": "bg-orange-100 text-orange-800",
      "Technology": "bg-indigo-100 text-indigo-800",
      "Insurance": "bg-yellow-100 text-yellow-800",
      "Health & Fitness": "bg-pink-100 text-pink-800",
      "Legal": "bg-gray-100 text-gray-800",
      "Home & Garden": "bg-emerald-100 text-emerald-800",
      "Retail": "bg-red-100 text-red-800",
    };
    return colors[category] || "bg-gray-100 text-gray-800";
  };

  return (
    <div className="h-full overflow-auto space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Total Advertisers</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">847</div>
            <div className="text-sm text-green-600">+23 this month</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Top 100 Spend</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">$2.4M</div>
            <div className="text-sm text-green-600">+8.5% YTD</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Avg Order Value</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">$1,840</div>
            <div className="text-sm text-blue-600">+12% vs Q3</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Active Categories</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">18</div>
            <div className="text-sm text-gray-600">Diverse portfolio</div>
          </CardContent>
        </Card>
      </div>

      {/* Top Advertisers Table */}
      <Card>
        <CardHeader>
          <CardTitle>Top 100 Advertisers</CardTitle>
          <CardDescription>Ranked by total spend for the current quarter</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-2 font-medium text-gray-600">Rank</th>
                  <th className="text-left py-3 px-2 font-medium text-gray-600">Advertiser</th>
                  <th 
                    className="text-left py-3 px-2 font-medium text-gray-600 cursor-pointer hover:text-gray-900 flex items-center space-x-1"
                    onClick={() => handleSort('spend')}
                  >
                    <span>Total Spend</span>
                    <SortIcon field="spend" />
                  </th>
                  <th 
                    className="text-left py-3 px-2 font-medium text-gray-600 cursor-pointer hover:text-gray-900"
                    onClick={() => handleSort('category')}
                  >
                    <div className="flex items-center space-x-1">
                      <span>Category</span>
                      <SortIcon field="category" />
                    </div>
                  </th>
                  <th 
                    className="text-left py-3 px-2 font-medium text-gray-600 cursor-pointer hover:text-gray-900"
                    onClick={() => handleSort('region')}
                  >
                    <div className="flex items-center space-x-1">
                      <span>Region</span>
                      <SortIcon field="region" />
                    </div>
                  </th>
                  <th className="text-left py-3 px-2 font-medium text-gray-600">Spots</th>
                  <th className="text-left py-3 px-2 font-medium text-gray-600">Trend</th>
                  <th className="text-left py-3 px-2 font-medium text-gray-600">Last Order</th>
                </tr>
              </thead>
              <tbody>
                {advertisers.map((advertiser, index) => (
                  <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-3 px-2">
                      <div className="w-8 h-8 bg-blue-100 text-blue-800 rounded-full flex items-center justify-center text-sm font-bold">
                        {advertiser.rank}
                      </div>
                    </td>
                    <td className="py-3 px-2">
                      <div className="font-medium text-gray-900">{advertiser.name}</div>
                    </td>
                    <td className="py-3 px-2">
                      <div className="font-bold text-gray-900">${advertiser.spend.toLocaleString()}</div>
                    </td>
                    <td className="py-3 px-2">
                      <Badge className={`${getCategoryColor(advertiser.category)} border-0`}>
                        {advertiser.category}
                      </Badge>
                    </td>
                    <td className="py-3 px-2 text-gray-600">{advertiser.region}</td>
                    <td className="py-3 px-2 text-gray-600">{advertiser.spots}</td>
                    <td className="py-3 px-2">
                      <span className={`font-medium ${advertiser.trend.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
                        {advertiser.trend}
                      </span>
                    </td>
                    <td className="py-3 px-2 text-sm text-gray-500">{advertiser.lastOrder}</td>
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
