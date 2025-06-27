
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TrendingUp, TrendingDown, Download, AlertTriangle } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

interface DailyDeclinersAddersProps {
  station: string;
}

const DailyDeclinersAdders: React.FC<DailyDeclinersAddersProps> = ({ station }) => {
  const [decliners, setDecliners] = useState<any[]>([]);
  const [adders, setAdders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrderChanges = async () => {
      try {
        setLoading(true);
        
        // Fetch order data for comparison logic
        const { data: currentOrders } = await supabase
          .from('extended_media_orders')
          .select('*')
          .limit(100);

        const { data: newOrders } = await supabase
          .from('new_order_table')
          .select('*')
          .limit(50);

        console.log('Fetched order change data:', { currentOrders, newOrders });
        
        // Mock decliner data
        const mockDecliners = [
          { 
            advertiser: "Tech Startup Inc", 
            agency: "MediaCom",
            orderId: "ORD-2024-1234",
            buyline: "BL-456",
            thisWeek: 18400, 
            lastWeek: 23200, 
            dollarChange: -4800,
            spotChange: -24,
            statusChange: "Reduced",
            salesperson: "Sarah Johnson",
            market: "Boston Metro",
            ownership: "Cumulus"
          },
          { 
            advertiser: "Local Restaurant", 
            agency: "Havas",
            orderId: "ORD-2024-1235", 
            buyline: "BL-789",
            thisWeek: 12100, 
            lastWeek: 15600, 
            dollarChange: -3500,
            spotChange: -18,
            statusChange: "Cancelled",
            salesperson: "Mike Chen",
            market: "Providence",
            ownership: "iHeart"
          },
          { 
            advertiser: "Insurance Agency", 
            agency: "Zenith",
            orderId: "ORD-2024-1236",
            buyline: "BL-321", 
            thisWeek: 8300, 
            lastWeek: 12800, 
            dollarChange: -4500,
            spotChange: -32,
            statusChange: "Reduced",
            salesperson: "Lisa Wong",
            market: "Hartford",
            ownership: "Audacy"
          }
        ];

        // Mock adder data
        const mockAdders = [
          { 
            advertiser: "Holiday Resort", 
            agency: "GroupM",
            orderId: "ORD-2024-1237",
            buyline: "BL-111",
            thisWeek: 24200, 
            lastWeek: 16800, 
            dollarChange: 7400,
            spotChange: 36,
            statusChange: "Increased",
            salesperson: "Tom Rodriguez",
            market: "Boston Metro",
            ownership: "Entercom"
          },
          { 
            advertiser: "Auto Dealership", 
            agency: "Publicis",
            orderId: "ORD-2024-1238",
            buyline: "BL-222",
            thisWeek: 31800, 
            lastWeek: 24200, 
            dollarChange: 7600,
            spotChange: 42,
            statusChange: "New Campaign",
            salesperson: "Jennifer Davis",
            market: "Providence",
            ownership: "Townsquare"
          },
          { 
            advertiser: "Healthcare Network", 
            agency: "MediaCom",
            orderId: "ORD-2024-1239",
            buyline: "BL-333",
            thisWeek: 19600, 
            lastWeek: 14100, 
            dollarChange: 5500,
            spotChange: 28,
            statusChange: "Expanded",
            salesperson: "David Kim",
            market: "Springfield",
            ownership: "Cumulus"
          }
        ];
        
        setDecliners(mockDecliners);
        setAdders(mockAdders);
      } catch (error) {
        console.error('Error fetching order changes:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrderChanges();
  }, [station]);

  const exportDecliners = () => {
    const csvContent = "data:text/csv;charset=utf-8," 
      + "Advertiser,Agency,Order ID,Buyline,This Week,Last Week,$ Change,Spot Change,Status,Salesperson,Market,Ownership\n"
      + decliners.map(row => 
          `"${row.advertiser}","${row.agency}","${row.orderId}","${row.buyline}",${row.thisWeek},${row.lastWeek},${row.dollarChange},${row.spotChange},"${row.statusChange}","${row.salesperson}","${row.market}","${row.ownership}"`
        ).join("\n");
    
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "decliners_report.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const exportAdders = () => {
    const csvContent = "data:text/csv;charset=utf-8," 
      + "Advertiser,Agency,Order ID,Buyline,This Week,Last Week,$ Change,Spot Change,Status,Salesperson,Market,Ownership\n"
      + adders.map(row => 
          `"${row.advertiser}","${row.agency}","${row.orderId}","${row.buyline}",${row.thisWeek},${row.lastWeek},${row.dollarChange},${row.spotChange},"${row.statusChange}","${row.salesperson}","${row.market}","${row.ownership}"`
        ).join("\n");
    
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "adders_report.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (loading) {
    return (
      <div className="h-full flex items-center justify-center">
        <div className="text-lg text-gray-600">Loading order change data...</div>
      </div>
    );
  }

  return (
    <div className="h-full overflow-auto">
      <Tabs defaultValue="summary" className="h-full">
        <TabsList className="grid w-full grid-cols-3 mb-6">
          <TabsTrigger value="summary">Summary</TabsTrigger>
          <TabsTrigger value="decliners">Decliners</TabsTrigger>
          <TabsTrigger value="adders">Adders</TabsTrigger>
        </TabsList>
        
        <TabsContent value="summary" className="space-y-6">
          {/* Summary Cards */}
          <div className="grid grid-cols-4 gap-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-600 flex items-center space-x-2">
                  <TrendingDown className="w-4 h-4 text-red-500" />
                  <span>Decliners</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-red-600">{decliners.length}</div>
                <div className="text-sm text-gray-500">
                  -${(decliners.reduce((sum, item) => sum + Math.abs(item.dollarChange), 0) / 1000).toFixed(1)}K impact
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-600 flex items-center space-x-2">
                  <TrendingUp className="w-4 h-4 text-green-500" />
                  <span>Adders</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-600">{adders.length}</div>
                <div className="text-sm text-gray-500">
                  +${(adders.reduce((sum, item) => sum + item.dollarChange, 0) / 1000).toFixed(1)}K impact
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">Net Change</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-600">
                  +${((adders.reduce((sum, item) => sum + item.dollarChange, 0) - 
                       decliners.reduce((sum, item) => sum + Math.abs(item.dollarChange), 0)) / 1000).toFixed(1)}K
                </div>
                <div className="text-sm text-gray-500">Week-over-week</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-600 flex items-center space-x-2">
                  <AlertTriangle className="w-4 h-4 text-yellow-500" />
                  <span>At Risk</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-yellow-600">
                  {decliners.filter(item => item.statusChange === "Cancelled").length}
                </div>
                <div className="text-sm text-gray-500">Cancelled orders</div>
              </CardContent>
            </Card>
          </div>

          {/* Quick Overview */}
          <div className="grid grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-red-600 flex items-center space-x-2">
                  <TrendingDown className="w-5 h-5" />
                  <span>Recent Decliners</span>
                </CardTitle>
                <CardDescription>Top order reductions this week</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {decliners.slice(0, 3).map((item, index) => (
                    <div key={index} className="flex justify-between items-center p-3 bg-red-50 rounded-lg border-l-4 border-red-500">
                      <div>
                        <div className="font-medium text-gray-900">{item.advertiser}</div>
                        <div className="text-sm text-gray-600">{item.statusChange}</div>
                      </div>
                      <div className="text-right">
                        <div className="font-bold text-red-600">${(Math.abs(item.dollarChange) / 1000).toFixed(1)}K</div>
                        <div className="text-sm text-gray-500">{item.spotChange} spots</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-green-600 flex items-center space-x-2">
                  <TrendingUp className="w-5 h-5" />
                  <span>Recent Adders</span>
                </CardTitle>
                <CardDescription>Top order increases this week</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {adders.slice(0, 3).map((item, index) => (
                    <div key={index} className="flex justify-between items-center p-3 bg-green-50 rounded-lg border-l-4 border-green-500">
                      <div>
                        <div className="font-medium text-gray-900">{item.advertiser}</div>
                        <div className="text-sm text-gray-600">{item.statusChange}</div>
                      </div>
                      <div className="text-right">
                        <div className="font-bold text-green-600">+${(item.dollarChange / 1000).toFixed(1)}K</div>
                        <div className="text-sm text-gray-500">+{item.spotChange} spots</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="decliners" className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-red-600">Order Decliners</h3>
              <p className="text-sm text-gray-600">Orders with reduced or cancelled activity</p>
            </div>
            <button
              onClick={exportDecliners}
              className="flex items-center space-x-2 px-3 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
            >
              <Download className="w-4 h-4" />
              <span>Export</span>
            </button>
          </div>

          <Card>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full text-sm border-collapse">
                  <thead>
                    <tr className="border-b border-gray-200 bg-gray-50">
                      <th className="text-left py-3 px-4 font-medium text-gray-600">Advertiser</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-600">Agency</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-600">Order/Buyline</th>
                      <th className="text-right py-3 px-4 font-medium text-gray-600">This Week</th>
                      <th className="text-right py-3 px-4 font-medium text-gray-600">Last Week</th>
                      <th className="text-right py-3 px-4 font-medium text-gray-600">$ Change</th>
                      <th className="text-right py-3 px-4 font-medium text-gray-600">Spot Change</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-600">Status</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-600">Salesperson</th>
                    </tr>
                  </thead>
                  <tbody>
                    {decliners.map((row, index) => (
                      <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                        <td className="py-3 px-4 font-medium text-gray-900">{row.advertiser}</td>
                        <td className="py-3 px-4 text-gray-600">{row.agency}</td>
                        <td className="py-3 px-4">
                          <div className="text-blue-600 font-medium">{row.orderId}</div>
                          <div className="text-xs text-gray-500">{row.buyline}</div>
                        </td>
                        <td className="py-3 px-4 text-right font-medium">${(row.thisWeek / 1000).toFixed(1)}K</td>
                        <td className="py-3 px-4 text-right">${(row.lastWeek / 1000).toFixed(1)}K</td>
                        <td className="py-3 px-4 text-right font-bold text-red-600">
                          ${(Math.abs(row.dollarChange) / 1000).toFixed(1)}K
                        </td>
                        <td className="py-3 px-4 text-right text-red-600">{row.spotChange}</td>
                        <td className="py-3 px-4">
                          <Badge variant={row.statusChange === "Cancelled" ? "destructive" : "secondary"}>
                            {row.statusChange}
                          </Badge>
                        </td>
                        <td className="py-3 px-4 text-gray-600">{row.salesperson}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="adders" className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-green-600">Order Adders</h3>
              <p className="text-sm text-gray-600">New orders and increased activity</p>
            </div>
            <button
              onClick={exportAdders}
              className="flex items-center space-x-2 px-3 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
            >
              <Download className="w-4 h-4" />
              <span>Export</span>
            </button>
          </div>

          <Card>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full text-sm border-collapse">
                  <thead>
                    <tr className="border-b border-gray-200 bg-gray-50">
                      <th className="text-left py-3 px-4 font-medium text-gray-600">Advertiser</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-600">Agency</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-600">Order/Buyline</th>
                      <th className="text-right py-3 px-4 font-medium text-gray-600">This Week</th>
                      <th className="text-right py-3 px-4 font-medium text-gray-600">Last Week</th>
                      <th className="text-right py-3 px-4 font-medium text-gray-600">$ Change</th>
                      <th className="text-right py-3 px-4 font-medium text-gray-600">Spot Change</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-600">Status</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-600">Salesperson</th>
                    </tr>
                  </thead>
                  <tbody>
                    {adders.map((row, index) => (
                      <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                        <td className="py-3 px-4 font-medium text-gray-900">{row.advertiser}</td>
                        <td className="py-3 px-4 text-gray-600">{row.agency}</td>
                        <td className="py-3 px-4">
                          <div className="text-blue-600 font-medium">{row.orderId}</div>
                          <div className="text-xs text-gray-500">{row.buyline}</div>
                        </td>
                        <td className="py-3 px-4 text-right font-medium">${(row.thisWeek / 1000).toFixed(1)}K</td>
                        <td className="py-3 px-4 text-right">${(row.lastWeek / 1000).toFixed(1)}K</td>
                        <td className="py-3 px-4 text-right font-bold text-green-600">
                          +${(row.dollarChange / 1000).toFixed(1)}K
                        </td>
                        <td className="py-3 px-4 text-right text-green-600">+{row.spotChange}</td>
                        <td className="py-3 px-4">
                          <Badge variant="default" className="bg-green-100 text-green-800">
                            {row.statusChange}
                          </Badge>
                        </td>
                        <td className="py-3 px-4 text-gray-600">{row.salesperson}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default DailyDeclinersAdders;
