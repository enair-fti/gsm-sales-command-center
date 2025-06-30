
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TrendingUp, TrendingDown, Download, AlertTriangle, Users, UserCheck } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

interface PartnerMovementProps {
  station: string;
  filters: {
    agency: string;
    advertiser: string;
    station: string;
    quarter: string;
    year: string;
  };
}

const PartnerMovement: React.FC<PartnerMovementProps> = ({ station, filters }) => {
  const [nonReturners, setNonReturners] = useState<any[]>([]);
  const [returners, setReturners] = useState<any[]>([]);
  const [decliners, setDecliners] = useState<any[]>([]);
  const [adders, setAdders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPartnerMovement = async () => {
      try {
        setLoading(true);
        
        // Mock non-returners data
        const mockNonReturners = [
          { 
            agency: "Discontinued Media Co", 
            advertiser: "Former Auto Dealer",
            orderId: "ORD-2024-1240",
            lastActivity: "Q1 2024", 
            lastSpend: 45600, 
            reasonCode: "Budget Cuts",
            salesperson: "Sarah Johnson",
            market: "Boston Metro",
            ownership: "Cumulus"
          },
          { 
            agency: "Sunset Agency", 
            advertiser: "Closed Restaurant Chain",
            orderId: "ORD-2024-1241", 
            lastActivity: "Q4 2023", 
            lastSpend: 23800, 
            reasonCode: "Business Closure",
            salesperson: "Mike Chen",
            market: "Providence",
            ownership: "iHeart"
          }
        ];

        // Mock returners data
        const mockReturners = [
          { 
            agency: "Comeback Media", 
            advertiser: "Returning Retailer",
            orderId: "ORD-2024-1242",
            lastActivity: "Q3 2023", 
            currentSpend: 38200, 
            returnDate: "Jan 2024",
            salesperson: "Lisa Wong",
            market: "Hartford",
            ownership: "Audacy"
          },
          { 
            agency: "Revival Agency", 
            advertiser: "Renewed Healthcare",
            orderId: "ORD-2024-1243",
            lastActivity: "Q2 2023", 
            currentSpend: 52100, 
            returnDate: "Feb 2024",
            salesperson: "Tom Rodriguez",
            market: "Springfield",
            ownership: "Entercom"
          }
        ];

        // Mock decliner data
        const mockDecliners = [
          { 
            agency: "MediaCom", 
            advertiser: "Tech Startup Inc",
            orderId: "ORD-2024-1234",
            thisQuarter: 18400, 
            lastQuarter: 23200, 
            dollarChange: -4800,
            percentChange: -20.7,
            statusChange: "Reduced",
            salesperson: "Sarah Johnson",
            market: "Boston Metro",
            ownership: "Cumulus"
          },
          { 
            agency: "Havas", 
            advertiser: "Local Restaurant",
            orderId: "ORD-2024-1235", 
            thisQuarter: 12100, 
            lastQuarter: 15600, 
            dollarChange: -3500,
            percentChange: -22.4,
            statusChange: "Budget Cut",
            salesperson: "Mike Chen",
            market: "Providence",
            ownership: "iHeart"
          }
        ];

        // Mock adder data
        const mockAdders = [
          { 
            agency: "GroupM", 
            advertiser: "Holiday Resort",
            orderId: "ORD-2024-1237",
            thisQuarter: 24200, 
            lastQuarter: 16800, 
            dollarChange: 7400,
            percentChange: 44.0,
            statusChange: "Increased",
            salesperson: "Tom Rodriguez",
            market: "Boston Metro",
            ownership: "Entercom"
          },
          { 
            agency: "Publicis", 
            advertiser: "Auto Dealership",
            orderId: "ORD-2024-1238",
            thisQuarter: 31800, 
            lastQuarter: 24200, 
            dollarChange: 7600,
            percentChange: 31.4,
            statusChange: "Expanded",
            salesperson: "Jennifer Davis",
            market: "Providence",
            ownership: "Townsquare"
          }
        ];
        
        setNonReturners(mockNonReturners);
        setReturners(mockReturners);
        setDecliners(mockDecliners);
        setAdders(mockAdders);
      } catch (error) {
        console.error('Error fetching partner movement data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPartnerMovement();
  }, [station, filters]);

  const exportData = (data: any[], filename: string) => {
    const csvContent = "data:text/csv;charset=utf-8," 
      + Object.keys(data[0]).join(",") + "\n"
      + data.map(row => 
          Object.values(row).map(value => `"${value}"`).join(",")
        ).join("\n");
    
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", filename);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (loading) {
    return (
      <div className="h-full flex items-center justify-center">
        <div className="text-lg text-gray-600">Loading partner movement data...</div>
      </div>
    );
  }

  return (
    <div className="h-full overflow-auto">
      <Tabs defaultValue="summary" className="h-full">
        <TabsList className="grid w-full grid-cols-5 mb-6">
          <TabsTrigger value="summary">Summary</TabsTrigger>
          <TabsTrigger value="non-returners">Non-Returners</TabsTrigger>
          <TabsTrigger value="returners">Returners</TabsTrigger>
          <TabsTrigger value="decliners">Decliners</TabsTrigger>
          <TabsTrigger value="adders">Adders</TabsTrigger>
        </TabsList>
        
        <TabsContent value="summary" className="space-y-6">
          {/* Summary Cards */}
          <div className="grid grid-cols-4 gap-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-600 flex items-center space-x-2">
                  <Users className="w-4 h-4 text-red-500" />
                  <span>Non-Returners</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-red-600">{nonReturners.length}</div>
                <div className="text-sm text-gray-500">
                  -${(nonReturners.reduce((sum, item) => sum + (item.lastSpend || 0), 0) / 1000).toFixed(1)}K lost
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-600 flex items-center space-x-2">
                  <UserCheck className="w-4 h-4 text-green-500" />
                  <span>Returners</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-600">{returners.length}</div>
                <div className="text-sm text-gray-500">
                  +${(returners.reduce((sum, item) => sum + (item.currentSpend || 0), 0) / 1000).toFixed(1)}K gained
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-600 flex items-center space-x-2">
                  <TrendingDown className="w-4 h-4 text-orange-500" />
                  <span>Decliners</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-orange-600">{decliners.length}</div>
                <div className="text-sm text-gray-500">
                  -${(decliners.reduce((sum, item) => sum + Math.abs(item.dollarChange), 0) / 1000).toFixed(1)}K impact
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-600 flex items-center space-x-2">
                  <TrendingUp className="w-4 h-4 text-blue-500" />
                  <span>Adders</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-blue-600">{adders.length}</div>
                <div className="text-sm text-gray-500">
                  +${(adders.reduce((sum, item) => sum + item.dollarChange, 0) / 1000).toFixed(1)}K impact
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Quick Overview */}
          <div className="grid grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-red-600 flex items-center space-x-2">
                  <Users className="w-5 h-5" />
                  <span>Recent Non-Returners</span>
                </CardTitle>
                <CardDescription>Agencies that stopped business</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {nonReturners.slice(0, 3).map((item, index) => (
                    <div key={index} className="flex justify-between items-center p-3 bg-red-50 rounded-lg border-l-4 border-red-500">
                      <div>
                        <div className="font-medium text-gray-900">{item.agency}</div>
                        <div className="text-sm text-gray-600">{item.reasonCode}</div>
                      </div>
                      <div className="text-right">
                        <div className="font-bold text-red-600">${(item.lastSpend / 1000).toFixed(1)}K</div>
                        <div className="text-sm text-gray-500">{item.lastActivity}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-green-600 flex items-center space-x-2">
                  <UserCheck className="w-5 h-5" />
                  <span>Recent Returners</span>
                </CardTitle>
                <CardDescription>Agencies that resumed business</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {returners.slice(0, 3).map((item, index) => (
                    <div key={index} className="flex justify-between items-center p-3 bg-green-50 rounded-lg border-l-4 border-green-500">
                      <div>
                        <div className="font-medium text-gray-900">{item.agency}</div>
                        <div className="text-sm text-gray-600">Returned {item.returnDate}</div>
                      </div>
                      <div className="text-right">
                        <div className="font-bold text-green-600">+${(item.currentSpend / 1000).toFixed(1)}K</div>
                        <div className="text-sm text-gray-500">Current spend</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="non-returners" className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-red-600">Non-Returners</h3>
              <p className="text-sm text-gray-600">Agencies that stopped business since last quarter</p>
            </div>
            <button
              onClick={() => exportData(nonReturners, "non_returners_report.csv")}
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
                      <th className="text-left py-3 px-4 font-medium text-gray-600">Agency</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-600">Advertiser</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-600">Last Order</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-600">Last Activity</th>
                      <th className="text-right py-3 px-4 font-medium text-gray-600">Last Spend</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-600">Reason</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-600">Salesperson</th>
                    </tr>
                  </thead>
                  <tbody>
                    {nonReturners.map((row, index) => (
                      <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                        <td className="py-3 px-4 font-medium text-gray-900">{row.agency}</td>
                        <td className="py-3 px-4 text-gray-600">{row.advertiser}</td>
                        <td className="py-3 px-4 text-blue-600 font-medium">{row.orderId}</td>
                        <td className="py-3 px-4">{row.lastActivity}</td>
                        <td className="py-3 px-4 text-right font-medium">${(row.lastSpend / 1000).toFixed(1)}K</td>
                        <td className="py-3 px-4">
                          <Badge variant="destructive">
                            {row.reasonCode}
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

        <TabsContent value="returners" className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-green-600">Returners</h3>
              <p className="text-sm text-gray-600">Agencies that have resumed business this quarter</p>
            </div>
            <button
              onClick={() => exportData(returners, "returners_report.csv")}
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
                      <th className="text-left py-3 px-4 font-medium text-gray-600">Agency</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-600">Advertiser</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-600">Current Order</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-600">Return Date</th>
                      <th className="text-right py-3 px-4 font-medium text-gray-600">Current Spend</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-600">Last Activity</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-600">Salesperson</th>
                    </tr>
                  </thead>
                  <tbody>
                    {returners.map((row, index) => (
                      <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                        <td className="py-3 px-4 font-medium text-gray-900">{row.agency}</td>
                        <td className="py-3 px-4 text-gray-600">{row.advertiser}</td>
                        <td className="py-3 px-4 text-blue-600 font-medium">{row.orderId}</td>
                        <td className="py-3 px-4 text-green-600 font-medium">{row.returnDate}</td>
                        <td className="py-3 px-4 text-right font-medium">${(row.currentSpend / 1000).toFixed(1)}K</td>
                        <td className="py-3 px-4 text-gray-500">{row.lastActivity}</td>
                        <td className="py-3 px-4 text-gray-600">{row.salesperson}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="decliners" className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-orange-600">Decliners</h3>
              <p className="text-sm text-gray-600">Agencies that reduced spend or activity</p>
            </div>
            <button
              onClick={() => exportData(decliners, "decliners_report.csv")}
              className="flex items-center space-x-2 px-3 py-2 bg-orange-600 text-white rounded-md hover:bg-orange-700 transition-colors"
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
                      <th className="text-left py-3 px-4 font-medium text-gray-600">Agency</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-600">Advertiser</th>
                      <th className="text-right py-3 px-4 font-medium text-gray-600">This Quarter</th>
                      <th className="text-right py-3 px-4 font-medium text-gray-600">Last Quarter</th>
                      <th className="text-right py-3 px-4 font-medium text-gray-600">$ Change</th>
                      <th className="text-right py-3 px-4 font-medium text-gray-600">% Change</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-600">Status</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-600">Salesperson</th>
                    </tr>
                  </thead>
                  <tbody>
                    {decliners.map((row, index) => (
                      <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                        <td className="py-3 px-4 font-medium text-gray-900">{row.agency}</td>
                        <td className="py-3 px-4 text-gray-600">{row.advertiser}</td>
                        <td className="py-3 px-4 text-right font-medium">${(row.thisQuarter / 1000).toFixed(1)}K</td>
                        <td className="py-3 px-4 text-right">${(row.lastQuarter / 1000).toFixed(1)}K</td>
                        <td className="py-3 px-4 text-right font-bold text-orange-600">
                          ${(Math.abs(row.dollarChange) / 1000).toFixed(1)}K
                        </td>
                        <td className="py-3 px-4 text-right text-orange-600">{row.percentChange}%</td>
                        <td className="py-3 px-4">
                          <Badge variant="secondary">
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
              <h3 className="text-lg font-semibold text-blue-600">Adders</h3>
              <p className="text-sm text-gray-600">Agencies that increased spend or activity</p>
            </div>
            <button
              onClick={() => exportData(adders, "adders_report.csv")}
              className="flex items-center space-x-2 px-3 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
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
                      <th className="text-left py-3 px-4 font-medium text-gray-600">Agency</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-600">Advertiser</th>
                      <th className="text-right py-3 px-4 font-medium text-gray-600">This Quarter</th>
                      <th className="text-right py-3 px-4 font-medium text-gray-600">Last Quarter</th>
                      <th className="text-right py-3 px-4 font-medium text-gray-600">$ Change</th>
                      <th className="text-right py-3 px-4 font-medium text-gray-600">% Change</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-600">Status</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-600">Salesperson</th>
                    </tr>
                  </thead>
                  <tbody>
                    {adders.map((row, index) => (
                      <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                        <td className="py-3 px-4 font-medium text-gray-900">{row.agency}</td>
                        <td className="py-3 px-4 text-gray-600">{row.advertiser}</td>
                        <td className="py-3 px-4 text-right font-medium">${(row.thisQuarter / 1000).toFixed(1)}K</td>
                        <td className="py-3 px-4 text-right">${(row.lastQuarter / 1000).toFixed(1)}K</td>
                        <td className="py-3 px-4 text-right font-bold text-blue-600">
                          +${(row.dollarChange / 1000).toFixed(1)}K
                        </td>
                        <td className="py-3 px-4 text-right text-blue-600">+{row.percentChange}%</td>
                        <td className="py-3 px-4">
                          <Badge variant="default" className="bg-blue-100 text-blue-800">
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

export default PartnerMovement;
