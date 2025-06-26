import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ChevronUp, ChevronDown, AlertTriangle, CheckCircle, Clock } from 'lucide-react';

interface TopAdvertisersProps {
  station: string;
}

const TopAdvertisers: React.FC<TopAdvertisersProps> = ({ station }) => {
  const [sortField, setSortField] = useState<'spend' | 'category' | 'region'>('spend');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');
  const [expandedRow, setExpandedRow] = useState<number | null>(null);

  const advertisers = [
    { 
      rank: 1, 
      name: "AutoNation", 
      spend: 45200, 
      category: "Automotive", 
      region: "Northeast", 
      spots: 234, 
      lastOrder: "2 hours ago", 
      trend: "+12%",
      spotIssues: { missed: 2, makegoods: 1, total: 234 },
      buylines: [
        { headline: "New Year Sales Event", flightStart: "2024-01-01", flightEnd: "2024-01-31", spotCount: 156, status: "active" },
        { headline: "Winter Service Special", flightStart: "2024-01-15", flightEnd: "2024-02-15", spotCount: 78, status: "pending" }
      ]
    },
    { 
      rank: 2, 
      name: "Regional Medical Center", 
      spend: 38700, 
      category: "Healthcare", 
      region: "Metro", 
      spots: 156, 
      lastOrder: "4 hours ago", 
      trend: "+8%",
      spotIssues: { missed: 0, makegoods: 0, total: 156 },
      buylines: [
        { headline: "Heart Health Awareness", flightStart: "2024-01-01", flightEnd: "2024-03-31", spotCount: 156, status: "active" }
      ]
    },
    { 
      rank: 3, 
      name: "Premier Real Estate", 
      spend: 32500, 
      category: "Real Estate", 
      region: "Southeast", 
      spots: 189, 
      lastOrder: "1 day ago", 
      trend: "+15%",
      spotIssues: { missed: 3, makegoods: 2, total: 189 },
      buylines: [
        { headline: "Spring Home Buying", flightStart: "2024-01-15", flightEnd: "2024-04-30", spotCount: 120, status: "active" },
        { headline: "First Time Buyer Program", flightStart: "2024-02-01", flightEnd: "2024-03-15", spotCount: 69, status: "issues" }
      ]
    },
    { 
      rank: 4, 
      name: "Local Restaurant Group", 
      spend: 28900, 
      category: "Food & Dining", 
      region: "Metro", 
      spots: 298, 
      lastOrder: "3 hours ago", 
      trend: "+5%",
      spotIssues: { missed: 1, makegoods: 0, total: 298 },
      buylines: [
        { headline: "Weekend Brunch Special", flightStart: "2024-01-01", flightEnd: "2024-02-29", spotCount: 200, status: "active" },
        { headline: "Valentine's Day Menu", flightStart: "2024-02-10", flightEnd: "2024-02-18", spotCount: 98, status: "completed" }
      ]
    },
    { 
      rank: 5, 
      name: "Tech Solutions Inc", 
      spend: 24600, 
      category: "Technology", 
      region: "Northeast", 
      spots: 87, 
      lastOrder: "6 hours ago", 
      trend: "-3%",
      spotIssues: { missed: 4, makegoods: 3, total: 87 },
      buylines: [
        { headline: "Digital Transformation", flightStart: "2024-01-01", flightEnd: "2024-06-30", spotCount: 87, status: "issues" }
      ]
    }
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

  const getSpotIssueStatus = (issues: { missed: number; makegoods: number; total: number }) => {
    const totalIssues = issues.missed + issues.makegoods;
    if (totalIssues === 0) return { color: 'text-green-600', icon: CheckCircle, text: 'Clean' };
    if (totalIssues <= 2) return { color: 'text-yellow-600', icon: Clock, text: 'Minor Issues' };
    return { color: 'text-red-600', icon: AlertTriangle, text: 'Attention Needed' };
  };

  const getBuylineStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'issues': return 'bg-red-100 text-red-800';
      case 'completed': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
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
            <CardTitle className="text-sm font-medium text-gray-600">Spot Issues</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">18</div>
            <div className="text-sm text-gray-600">Across all campaigns</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Active Buylines</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">142</div>
            <div className="text-sm text-blue-600">+8 this week</div>
          </CardContent>
        </Card>
      </div>

      {/* Top Advertisers Table with Buyline Details */}
      <Card>
        <CardHeader>
          <CardTitle>Top 100 Advertisers + Buyline Detail</CardTitle>
          <CardDescription>Ranked by total spend with campaign details and spot issue tracking</CardDescription>
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
                  <th className="text-left py-3 px-2 font-medium text-gray-600">Spots/Issues</th>
                  <th className="text-left py-3 px-2 font-medium text-gray-600">Trend</th>
                  <th className="text-left py-3 px-2 font-medium text-gray-600">Last Order</th>
                  <th className="text-left py-3 px-2 font-medium text-gray-600">Actions</th>
                </tr>
              </thead>
              <tbody>
                {advertisers.map((advertiser, index) => {
                  const spotStatus = getSpotIssueStatus(advertiser.spotIssues);
                  const isExpanded = expandedRow === index;
                  
                  return (
                    <React.Fragment key={index}>
                      <tr className="border-b border-gray-100 hover:bg-gray-50">
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
                        <td className="py-3 px-2">
                          <div className="flex items-center space-x-2">
                            <span className="text-sm font-medium">{advertiser.spots} spots</span>
                            <div className={`flex items-center space-x-1 ${spotStatus.color}`}>
                              <spotStatus.icon className="w-4 h-4" />
                              <span className="text-xs">{spotStatus.text}</span>
                            </div>
                          </div>
                          {(advertiser.spotIssues.missed > 0 || advertiser.spotIssues.makegoods > 0) && (
                            <div className="text-xs text-gray-500 mt-1">
                              {advertiser.spotIssues.missed > 0 && `${advertiser.spotIssues.missed} missed`}
                              {advertiser.spotIssues.missed > 0 && advertiser.spotIssues.makegoods > 0 && ', '}
                              {advertiser.spotIssues.makegoods > 0 && `${advertiser.spotIssues.makegoods} makegoods`}
                            </div>
                          )}
                        </td>
                        <td className="py-3 px-2">
                          <span className={`font-medium ${advertiser.trend.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
                            {advertiser.trend}
                          </span>
                        </td>
                        <td className="py-3 px-2 text-sm text-gray-500">{advertiser.lastOrder}</td>
                        <td className="py-3 px-2">
                          <button
                            onClick={() => setExpandedRow(isExpanded ? null : index)}
                            className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                          >
                            {isExpanded ? 'Hide' : 'View'} Buylines
                          </button>
                        </td>
                      </tr>
                      
                      {/* Expanded Buyline Details */}
                      {isExpanded && (
                        <tr>
                          <td colSpan={8} className="py-4 px-4 bg-gray-50">
                            <div className="space-y-3">
                              <h4 className="font-medium text-gray-900 mb-3">Buyline Details for {advertiser.name}</h4>
                              {advertiser.buylines.map((buyline, buylineIndex) => (
                                <div key={buylineIndex} className="bg-white p-3 rounded-lg border border-gray-200">
                                  <div className="grid grid-cols-5 gap-4 items-center">
                                    <div>
                                      <div className="font-medium text-gray-900">{buyline.headline}</div>
                                      <div className="text-sm text-gray-500">Campaign Name</div>
                                    </div>
                                    <div>
                                      <div className="text-sm font-medium">{buyline.flightStart} - {buyline.flightEnd}</div>
                                      <div className="text-xs text-gray-500">Flight Dates</div>
                                    </div>
                                    <div>
                                      <div className="text-sm font-medium">{buyline.spotCount} spots</div>
                                      <div className="text-xs text-gray-500">Total Count</div>
                                    </div>
                                    <div>
                                      <Badge className={`${getBuylineStatusColor(buyline.status)} border-0 text-xs`}>
                                        {buyline.status.toUpperCase()}
                                      </Badge>
                                    </div>
                                    <div>
                                      <button className="text-blue-600 hover:text-blue-800 text-sm">
                                        View Details
                                      </button>
                                    </div>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </td>
                        </tr>
                      )}
                    </React.Fragment>
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

export default TopAdvertisers;
