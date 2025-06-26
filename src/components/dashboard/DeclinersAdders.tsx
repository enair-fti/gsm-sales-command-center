
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { TrendingDown, TrendingUp, AlertTriangle, Users } from 'lucide-react';

interface AdvertiserChange {
  advertiser: string;
  agency: string;
  headlineId: string;
  buylineNumber: string;
  billingThisWeek: number;
  billingLastWeek: number;
  changeAmount: number;
  spotsChange: number;
  statusChange: string;
  daypart: string;
  spotLength: number;
  startDate: string;
  endDate: string;
}

const DeclinersAdders: React.FC<{ station: string }> = ({ station }) => {
  const [viewMode, setViewMode] = useState<'decliners' | 'adders'>('decliners');

  // Mock data for decliners (week-over-week decreases or cancellations)
  const mockDecliners: AdvertiserChange[] = [
    {
      advertiser: "Home Depot",
      agency: "OMD",
      headlineId: "HD-2024-Q1-001",
      buylineNumber: "BL-445",
      billingThisWeek: 8500,
      billingLastWeek: 15200,
      changeAmount: -6700,
      spotsChange: -12,
      statusChange: "Active → Reduced",
      daypart: "Prime",
      spotLength: 30,
      startDate: "2024-01-15",
      endDate: "2024-03-30"
    },
    {
      advertiser: "Regional Medical",
      agency: "Local Direct",
      headlineId: "RM-2024-Q1-003",
      buylineNumber: "BL-892",
      billingThisWeek: 0,
      billingLastWeek: 12800,
      changeAmount: -12800,
      spotsChange: -24,
      statusChange: "Active → Canceled",
      daypart: "Daytime",
      spotLength: 60,
      startDate: "2024-01-08",
      endDate: "2024-02-29"
    },
    {
      advertiser: "Tech Solutions Inc",
      agency: "Independent",
      headlineId: "TS-2024-Q1-007",
      buylineNumber: "BL-334",
      billingThisWeek: 3200,
      billingLastWeek: 7800,
      changeAmount: -4600,
      spotsChange: -8,
      statusChange: "Active → Reduced",
      daypart: "Drive Time",
      spotLength: 30,
      startDate: "2024-01-22",
      endDate: "2024-04-15"
    }
  ];

  // Mock data for adders (new or increased activity)
  const mockAdders: AdvertiserChange[] = [
    {
      advertiser: "Southeast Toyota",
      agency: "Havas Media",
      headlineId: "ST-2024-Q1-012",
      buylineNumber: "BL-778",
      billingThisWeek: 18500,
      billingLastWeek: 0,
      changeAmount: 18500,
      spotsChange: 28,
      statusChange: "New → Active",
      daypart: "Prime",
      spotLength: 30,
      startDate: "2024-01-29",
      endDate: "2024-05-15"
    },
    {
      advertiser: "Premier Real Estate",
      agency: "Local Direct",
      headlineId: "PR-2024-Q1-005",
      buylineNumber: "BL-556",
      billingThisWeek: 14200,
      billingLastWeek: 8900,
      changeAmount: 5300,
      spotsChange: 12,
      statusChange: "Active → Increased",
      daypart: "Weekend",
      spotLength: 60,
      startDate: "2024-01-10",
      endDate: "2024-03-20"
    },
    {
      advertiser: "Fitness First Gyms",
      agency: "Independent",
      headlineId: "FF-2024-Q1-009",
      buylineNumber: "BL-223",
      billingThisWeek: 9800,
      billingLastWeek: 0,
      changeAmount: 9800,
      spotsChange: 16,
      statusChange: "New → Active",
      daypart: "Early Morning",
      spotLength: 30,
      startDate: "2024-01-25",
      endDate: "2024-04-30"
    }
  ];

  const currentData = viewMode === 'decliners' ? mockDecliners : mockAdders;

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const getStatusColor = (statusChange: string) => {
    if (statusChange.includes('Canceled')) return 'bg-red-100 text-red-800';
    if (statusChange.includes('Reduced')) return 'bg-orange-100 text-orange-800';
    if (statusChange.includes('New')) return 'bg-green-100 text-green-800';
    if (statusChange.includes('Increased')) return 'bg-blue-100 text-blue-800';
    return 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="space-y-6">
      <Card className="border-2 border-orange-200 bg-gradient-to-br from-orange-50 to-red-50">
        <CardHeader className="bg-gradient-to-r from-orange-600 to-red-600 text-white rounded-t-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Users className="w-6 h-6" />
              <div>
                <CardTitle className="text-xl font-bold">Decliners & Adders Analysis</CardTitle>
                <CardDescription className="text-orange-100">
                  Track week-over-week changes in headline/buyline activity - {station}
                </CardDescription>
              </div>
            </div>
            <div className="flex space-x-2">
              <Button
                onClick={() => setViewMode('decliners')}
                variant={viewMode === 'decliners' ? 'secondary' : 'outline'}
                size="sm"
                className={viewMode === 'decliners' ? 'bg-white text-red-600' : 'border-white text-white hover:bg-white hover:text-red-600'}
              >
                <TrendingDown className="w-4 h-4 mr-1" />
                Decliners ({mockDecliners.length})
              </Button>
              <Button
                onClick={() => setViewMode('adders')}
                variant={viewMode === 'adders' ? 'secondary' : 'outline'}
                size="sm"
                className={viewMode === 'adders' ? 'bg-white text-green-600' : 'border-white text-white hover:bg-white hover:text-green-600'}
              >
                <TrendingUp className="w-4 h-4 mr-1" />
                Adders ({mockAdders.length})
              </Button>
            </div>
          </div>
        </CardHeader>

        <CardContent className="p-6">
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader className="bg-gradient-to-r from-gray-50 to-gray-100">
                  <TableRow>
                    <TableHead className="font-bold text-gray-800">Advertiser</TableHead>
                    <TableHead className="font-bold text-gray-800">Agency</TableHead>
                    <TableHead className="font-bold text-gray-800">Headline/Buyline</TableHead>
                    <TableHead className="font-bold text-gray-800 text-right">This Week $</TableHead>
                    <TableHead className="font-bold text-gray-800 text-right">Last Week $</TableHead>
                    <TableHead className="font-bold text-gray-800 text-right">Change $</TableHead>
                    <TableHead className="font-bold text-gray-800 text-center">Spots Change</TableHead>
                    <TableHead className="font-bold text-gray-800">Status Change</TableHead>
                    <TableHead className="font-bold text-gray-800">Details</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {currentData.map((item, index) => (
                    <TableRow key={index} className="hover:bg-gradient-to-r hover:from-orange-25 hover:to-red-25 transition-colors">
                      <TableCell className="font-semibold text-gray-800">{item.advertiser}</TableCell>
                      <TableCell className="text-gray-600">{item.agency}</TableCell>
                      <TableCell className="font-mono text-sm">
                        <div>{item.headlineId}</div>
                        <div className="text-xs text-gray-500">{item.buylineNumber}</div>
                      </TableCell>
                      <TableCell className="text-right font-bold text-green-700">
                        {formatCurrency(item.billingThisWeek)}
                      </TableCell>
                      <TableCell className="text-right font-medium text-gray-600">
                        {formatCurrency(item.billingLastWeek)}
                      </TableCell>
                      <TableCell className={`text-right font-bold ${item.changeAmount >= 0 ? 'text-green-700' : 'text-red-700'}`}>
                        {item.changeAmount >= 0 ? '+' : ''}{formatCurrency(item.changeAmount)}
                      </TableCell>
                      <TableCell className={`text-center font-bold ${item.spotsChange >= 0 ? 'text-green-700' : 'text-red-700'}`}>
                        {item.spotsChange >= 0 ? '+' : ''}{item.spotsChange}
                      </TableCell>
                      <TableCell>
                        <Badge className={`${getStatusColor(item.statusChange)} font-medium px-2 py-1`}>
                          {item.statusChange}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-sm text-gray-600">
                        <div>{item.daypart} • {item.spotLength}s</div>
                        <div className="text-xs">{item.startDate} - {item.endDate}</div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>

          {/* Summary Cards */}
          <div className="grid grid-cols-2 gap-4 mt-6">
            <div className="bg-gradient-to-r from-red-100 to-orange-100 p-4 rounded-lg">
              <div className="flex items-center space-x-2 mb-2">
                <TrendingDown className="w-5 h-5 text-red-600" />
                <h3 className="font-bold text-red-800">Decliners Impact</h3>
              </div>
              <div className="space-y-1">
                <div className="flex justify-between">
                  <span className="text-red-700">Total Lost Revenue:</span>
                  <span className="font-bold text-red-900">
                    {formatCurrency(mockDecliners.reduce((sum, item) => sum + Math.abs(item.changeAmount), 0))}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-red-700">Lost Spots:</span>
                  <span className="font-bold text-red-900">
                    {mockDecliners.reduce((sum, item) => sum + Math.abs(item.spotsChange), 0)}
                  </span>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-green-100 to-blue-100 p-4 rounded-lg">
              <div className="flex items-center space-x-2 mb-2">
                <TrendingUp className="w-5 h-5 text-green-600" />
                <h3 className="font-bold text-green-800">Adders Growth</h3>
              </div>
              <div className="space-y-1">
                <div className="flex justify-between">
                  <span className="text-green-700">Total New Revenue:</span>
                  <span className="font-bold text-green-900">
                    {formatCurrency(mockAdders.reduce((sum, item) => sum + item.changeAmount, 0))}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-green-700">New Spots:</span>
                  <span className="font-bold text-green-900">
                    {mockAdders.reduce((sum, item) => sum + item.spotsChange, 0)}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-4 text-center text-sm text-gray-600 bg-gray-50 p-3 rounded-lg">
            <div className="flex items-center justify-center space-x-2">
              <AlertTriangle className="w-4 h-4 text-yellow-600" />
              <span>Change based on week-over-week buyline comparison • Data updated hourly</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DeclinersAdders;
