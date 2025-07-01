import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TrendingUp, TrendingDown, UserPlus, UserMinus, BarChart3 } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface PartnerMovementProps {
  station: string;
  filters: {
    agency: string;
    advertiser: string;
    station: string;
    market: string;
    category: string;
    aeName: string;
    quarter: string;
    year: string;
  };
}

const PartnerMovement: React.FC<PartnerMovementProps> = ({ station, filters }) => {
  const [loading, setLoading] = useState(true);
  const [movementData, setMovementData] = useState({
    nonReturners: [] as any[],
    returners: [] as any[],
    decliners: [] as any[],
    adders: [] as any[]
  });

  useEffect(() => {
    const fetchMovementData = async () => {
      setLoading(true);
      
      // Mock data - replace with actual API calls to Supabase
      const mockData = {
        nonReturners: [
          { agency: 'MediaCom', lastSpend: 45000, lastQuarter: 'Q4 2024', reason: 'Contract ended', category: 'Automotive' },
          { agency: 'Zenith Media', lastSpend: 32000, lastQuarter: 'Q4 2024', reason: 'Budget cuts', category: 'Retail' },
          { agency: 'Havas Media', lastSpend: 28000, lastQuarter: 'Q4 2024', reason: 'Strategy change', category: 'Healthcare' }
        ],
        returners: [
          { agency: 'GroupM', currentSpend: 52000, lastActive: 'Q2 2024', growth: '+25%', category: 'Financial' },
          { agency: 'Omnicom', currentSpend: 38000, lastActive: 'Q1 2024', growth: '+15%', category: 'Technology' },
          { agency: 'Publicis', currentSpend: 41000, lastActive: 'Q3 2024', growth: '+32%', category: 'QSR' }
        ],
        decliners: [
          { agency: 'WPP', previousSpend: 75000, currentSpend: 62000, decline: '-17%', category: 'Automotive' },
          { agency: 'Dentsu', previousSpend: 48000, currentSpend: 35000, decline: '-27%', category: 'Real Estate' },
          { agency: 'IPG', previousSpend: 35000, currentSpend: 28000, decline: '-20%', category: 'Healthcare' }
        ],
        adders: [
          { agency: 'Horizon Media', previousSpend: 42000, currentSpend: 58000, growth: '+38%', category: 'Technology' },
          { agency: 'MindShare', previousSpend: 38000, currentSpend: 51000, growth: '+34%', category: 'Financial' },
          { agency: 'Carat', previousSpend: 29000, currentSpend: 41000, growth: '+41%', category: 'Retail' }
        ]
      };

      setMovementData(mockData);
      setLoading(false);
    };

    fetchMovementData();
  }, [station, filters]);

  const summaryStats = {
    nonReturners: movementData.nonReturners.length,
    returners: movementData.returners.length,
    decliners: movementData.decliners.length,
    adders: movementData.adders.length,
    totalLostRevenue: movementData.nonReturners.reduce((sum, item) => sum + item.lastSpend, 0) +
                     movementData.decliners.reduce((sum, item) => sum + (item.previousSpend - item.currentSpend), 0),
    totalGainedRevenue: movementData.returners.reduce((sum, item) => sum + item.currentSpend, 0) +
                        movementData.adders.reduce((sum, item) => sum + (item.currentSpend - item.previousSpend), 0)
  };

  const chartData = [
    { name: 'Non-Returners', count: summaryStats.nonReturners, color: '#ef4444' },
    { name: 'Returners', count: summaryStats.returners, color: '#22c55e' },
    { name: 'Decliners', count: summaryStats.decliners, color: '#f59e0b' },
    { name: 'Adders', count: summaryStats.adders, color: '#3b82f6' }
  ];

  if (loading) {
    return (
      <div className="h-full flex items-center justify-center">
        <div className="text-lg text-gray-600">Loading partner movement data...</div>
      </div>
    );
  }

  return (
    <div className="h-full overflow-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-gray-900">Partner Movement Analysis</h2>
          <p className="text-sm text-gray-600">Track agency spending patterns and advertiser activity trends</p>
          <Badge variant="outline" className="text-xs mt-1 bg-yellow-50 text-yellow-700 border-yellow-200">
            Mock Data - All partner movement data is sample data
          </Badge>
        </div>
        <div className="flex items-center space-x-3">
          <Badge variant="outline" className="text-sm">
            Q2 2025 vs Q4 2024
          </Badge>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Non-Returners</CardTitle>
            <UserMinus className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{summaryStats.nonReturners}</div>
            <div className="text-xs text-gray-500">Agencies that stopped business</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Returners</CardTitle>
            <UserPlus className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{summaryStats.returners}</div>
            <div className="text-xs text-gray-500">Agencies that resumed business</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Decliners</CardTitle>
            <TrendingDown className="h-4 w-4 text-amber-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-amber-600">{summaryStats.decliners}</div>
            <div className="text-xs text-gray-500">Reduced spend/activity</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Adders</CardTitle>
            <TrendingUp className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">{summaryStats.adders}</div>
            <div className="text-xs text-gray-500">Increased spend/activity</div>
          </CardContent>
        </Card>
      </div>

      {/* Revenue Impact */}
      <div className="grid grid-cols-3 gap-4">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Revenue Impact</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <div className="text-sm text-gray-600">Lost Revenue</div>
                <div className="text-xl font-bold text-red-600">-${summaryStats.totalLostRevenue.toLocaleString()}</div>
              </div>
              <div>
                <div className="text-sm text-gray-600">Gained Revenue</div>
                <div className="text-xl font-bold text-green-600">+${summaryStats.totalGainedRevenue.toLocaleString()}</div>
              </div>
              <div className="border-t pt-2">
                <div className="text-sm text-gray-600">Net Impact</div>
                <div className={`text-xl font-bold ${
                  summaryStats.totalGainedRevenue - summaryStats.totalLostRevenue >= 0 
                    ? 'text-green-600' 
                    : 'text-red-600'
                }`}>
                  {summaryStats.totalGainedRevenue - summaryStats.totalLostRevenue >= 0 ? '+' : ''}
                  ${(summaryStats.totalGainedRevenue - summaryStats.totalLostRevenue).toLocaleString()}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="col-span-2">
          <CardHeader>
            <CardTitle className="text-lg">Movement Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="count" fill="#8884d8" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Detailed Tabs */}
      <Card>
        <CardHeader>
          <CardTitle>Detailed Partner Movement</CardTitle>
          <CardDescription>Click tabs to view different categories of partner movement</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="non-returners" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="non-returners">Non-Returners</TabsTrigger>
              <TabsTrigger value="returners">Returners</TabsTrigger>
              <TabsTrigger value="decliners">Decliners</TabsTrigger>
              <TabsTrigger value="adders">Adders</TabsTrigger>
            </TabsList>
            
            <TabsContent value="non-returners" className="mt-4">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-2 font-medium text-gray-600">Agency</th>
                      <th className="text-left py-2 font-medium text-gray-600">Category</th>
                      <th className="text-right py-2 font-medium text-gray-600">Last Spend</th>
                      <th className="text-left py-2 font-medium text-gray-600">Last Quarter</th>
                      <th className="text-left py-2 font-medium text-gray-600">Reason</th>
                    </tr>
                  </thead>
                  <tbody>
                    {movementData.nonReturners.map((agency, index) => (
                      <tr key={index} className="border-b border-gray-100">
                        <td className="py-2 font-medium">{agency.agency}</td>
                        <td className="py-2">
                          <Badge variant="secondary" className="text-xs">{agency.category}</Badge>
                        </td>
                        <td className="py-2 text-right font-medium">${agency.lastSpend.toLocaleString()}</td>
                        <td className="py-2">{agency.lastQuarter}</td>
                        <td className="py-2 text-gray-600">{agency.reason}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </TabsContent>
            
            <TabsContent value="returners" className="mt-4">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-2 font-medium text-gray-600">Agency</th>
                      <th className="text-left py-2 font-medium text-gray-600">Category</th>
                      <th className="text-right py-2 font-medium text-gray-600">Current Spend</th>
                      <th className="text-left py-2 font-medium text-gray-600">Last Active</th>
                      <th className="text-right py-2 font-medium text-gray-600">Growth</th>
                    </tr>
                  </thead>
                  <tbody>
                    {movementData.returners.map((agency, index) => (
                      <tr key={index} className="border-b border-gray-100">
                        <td className="py-2 font-medium">{agency.agency}</td>
                        <td className="py-2">
                          <Badge variant="secondary" className="text-xs">{agency.category}</Badge>
                        </td>
                        <td className="py-2 text-right font-medium">${agency.currentSpend.toLocaleString()}</td>
                        <td className="py-2">{agency.lastActive}</td>
                        <td className="py-2 text-right text-green-600 font-medium">{agency.growth}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </TabsContent>
            
            <TabsContent value="decliners" className="mt-4">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-2 font-medium text-gray-600">Agency</th>
                      <th className="text-left py-2 font-medium text-gray-600">Category</th>
                      <th className="text-right py-2 font-medium text-gray-600">Previous Spend</th>
                      <th className="text-right py-2 font-medium text-gray-600">Current Spend</th>
                      <th className="text-right py-2 font-medium text-gray-600">Decline</th>
                    </tr>
                  </thead>
                  <tbody>
                    {movementData.decliners.map((agency, index) => (
                      <tr key={index} className="border-b border-gray-100">
                        <td className="py-2 font-medium">{agency.agency}</td>
                        <td className="py-2">
                          <Badge variant="secondary" className="text-xs">{agency.category}</Badge>
                        </td>
                        <td className="py-2 text-right">${agency.previousSpend.toLocaleString()}</td>
                        <td className="py-2 text-right font-medium">${agency.currentSpend.toLocaleString()}</td>
                        <td className="py-2 text-right text-amber-600 font-medium">{agency.decline}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </TabsContent>
            
            <TabsContent value="adders" className="mt-4">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-2 font-medium text-gray-600">Agency</th>
                      <th className="text-left py-2 font-medium text-gray-600">Category</th>
                      <th className="text-right py-2 font-medium text-gray-600">Previous Spend</th>
                      <th className="text-right py-2 font-medium text-gray-600">Current Spend</th>
                      <th className="text-right py-2 font-medium text-gray-600">Growth</th>
                    </tr>
                  </thead>
                  <tbody>
                    {movementData.adders.map((agency, index) => (
                      <tr key={index} className="border-b border-gray-100">
                        <td className="py-2 font-medium">{agency.agency}</td>
                        <td className="py-2">
                          <Badge variant="secondary" className="text-xs">{agency.category}</Badge>
                        </td>
                        <td className="py-2 text-right">${agency.previousSpend.toLocaleString()}</td>
                        <td className="py-2 text-right font-medium">${agency.currentSpend.toLocaleString()}</td>
                        <td className="py-2 text-right text-blue-600 font-medium">{agency.growth}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default PartnerMovement;
