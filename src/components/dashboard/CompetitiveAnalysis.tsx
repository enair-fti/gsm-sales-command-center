
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Calendar, TrendingUp, TrendingDown } from 'lucide-react';

interface CompetitiveData {
  agency: string;
  advertiser: string;
  billing: number;
  market: number;
  repPercent: number;
  period: string;
  quarter?: string;
}

const CompetitiveAnalysis: React.FC<{ station: string }> = ({ station }) => {
  const [viewMode, setViewMode] = useState<'monthly' | 'quarterly'>('monthly');

  // Mock data for competitive analysis
  const mockMonthlyData: CompetitiveData[] = [
    { agency: "Havas Media", advertiser: "Southeast Toyota", billing: 125000, market: 450000, repPercent: 27.8, period: "JAN 2024" },
    { agency: "Havas Media", advertiser: "Southeast Toyota", billing: 135000, market: 480000, repPercent: 28.1, period: "FEB 2024" },
    { agency: "Mindshare", advertiser: "Publix", billing: 89000, market: 320000, repPercent: 27.8, period: "JAN 2024" },
    { agency: "Mindshare", advertiser: "Publix", billing: 92000, market: 340000, repPercent: 27.1, period: "FEB 2024" },
    { agency: "OMD", advertiser: "Home Depot", billing: 45000, market: 580000, repPercent: 7.8, period: "JAN 2024" },
    { agency: "OMD", advertiser: "Home Depot", billing: 52000, market: 600000, repPercent: 8.7, period: "FEB 2024" },
    { agency: "GroupM", advertiser: "AutoNation", billing: 78000, market: 290000, repPercent: 26.9, period: "JAN 2024" },
    { agency: "GroupM", advertiser: "AutoNation", billing: 82000, market: 310000, repPercent: 26.5, period: "FEB 2024" }
  ];

  const mockQuarterlyData: CompetitiveData[] = [
    { agency: "Havas Media", advertiser: "Southeast Toyota", billing: 395000, market: 1350000, repPercent: 29.3, period: "Q1 2024", quarter: "Q1" },
    { agency: "Mindshare", advertiser: "Publix", billing: 267000, market: 960000, repPercent: 27.8, period: "Q1 2024", quarter: "Q1" },
    { agency: "OMD", advertiser: "Home Depot", billing: 147000, market: 1740000, repPercent: 8.4, period: "Q1 2024", quarter: "Q1" },
    { agency: "GroupM", advertiser: "AutoNation", billing: 238000, market: 870000, repPercent: 27.4, period: "Q1 2024", quarter: "Q1" },
    { agency: "Havas Media", advertiser: "Southeast Toyota", billing: 425000, market: 1420000, repPercent: 29.9, period: "Q2 2024", quarter: "Q2" },
    { agency: "Mindshare", advertiser: "Publix", billing: 289000, market: 1020000, repPercent: 28.3, period: "Q2 2024", quarter: "Q2" }
  ];

  const currentData = viewMode === 'monthly' ? mockMonthlyData : mockQuarterlyData;

  const getRepPercentColor = (repPercent: number) => {
    if (repPercent > 20) return 'bg-green-100 text-green-800';
    if (repPercent < 10) return 'bg-red-100 text-red-800';
    return 'bg-blue-100 text-blue-800';
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="space-y-6">
      <Card className="border-2 border-purple-200 bg-gradient-to-br from-purple-50 to-pink-50">
        <CardHeader className="bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-t-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <TrendingUp className="w-6 h-6" />
              <div>
                <CardTitle className="text-xl font-bold">Competitive Analysis</CardTitle>
                <CardDescription className="text-purple-100">
                  Track performance by Agency and Advertiser over time - {station}
                </CardDescription>
              </div>
            </div>
            <div className="flex space-x-2">
              <Button
                onClick={() => setViewMode('monthly')}
                variant={viewMode === 'monthly' ? 'secondary' : 'outline'}
                size="sm"
                className={viewMode === 'monthly' ? 'bg-white text-purple-600' : 'border-white text-white hover:bg-white hover:text-purple-600'}
              >
                <Calendar className="w-4 h-4 mr-1" />
                Monthly
              </Button>
              <Button
                onClick={() => setViewMode('quarterly')}
                variant={viewMode === 'quarterly' ? 'secondary' : 'outline'}
                size="sm"
                className={viewMode === 'quarterly' ? 'bg-white text-purple-600' : 'border-white text-white hover:bg-white hover:text-purple-600'}
              >
                <Calendar className="w-4 h-4 mr-1" />
                Quarterly
              </Button>
            </div>
          </div>
        </CardHeader>

        <CardContent className="p-6">
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="overflow-x-auto max-h-96">
              <Table>
                <TableHeader className="bg-gradient-to-r from-gray-50 to-gray-100">
                  <TableRow>
                    <TableHead className="font-bold text-gray-800">Agency</TableHead>
                    <TableHead className="font-bold text-gray-800">Advertiser</TableHead>
                    <TableHead className="font-bold text-gray-800">Period</TableHead>
                    <TableHead className="font-bold text-gray-800 text-right">
                      Billing $
                      <div className="text-xs font-normal text-gray-500 mt-1">Headlines Revenue</div>
                    </TableHead>
                    <TableHead className="font-bold text-gray-800 text-right">
                      Market $
                      <div className="text-xs font-normal text-gray-500 mt-1">Total Market Size</div>
                    </TableHead>
                    <TableHead className="font-bold text-gray-800 text-center">
                      Rep %
                      <div className="text-xs font-normal text-gray-500 mt-1">(Billing / Market × 100)</div>
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {currentData.map((item, index) => (
                    <TableRow key={index} className="hover:bg-gradient-to-r hover:from-purple-25 hover:to-pink-25 transition-colors">
                      <TableCell className="font-semibold text-gray-800">{item.agency}</TableCell>
                      <TableCell className="font-medium text-gray-700">{item.advertiser}</TableCell>
                      <TableCell className="text-gray-600">{item.period}</TableCell>
                      <TableCell className="text-right font-bold text-green-700">
                        {formatCurrency(item.billing)}
                      </TableCell>
                      <TableCell className="text-right font-medium text-blue-700">
                        {formatCurrency(item.market)}
                      </TableCell>
                      <TableCell className="text-center">
                        <Badge className={`${getRepPercentColor(item.repPercent)} font-bold px-3 py-1`}>
                          {item.repPercent}%
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>

          <div className="mt-4 flex justify-between items-center text-sm text-gray-600 bg-gray-50 p-3 rounded-lg">
            <div className="flex space-x-4">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <span>Rep % &gt; 20% (Excellent)</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                <span>Rep % &lt; 10% (Needs Attention)</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                <span>Rep % 10-20% (Average)</span>
              </div>
            </div>
            <div className="text-right">
              <div className="font-medium">Data Range: JAN 2024 - SEP 2025</div>
              <div className="text-xs">Updated: 2 minutes ago</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CompetitiveAnalysis;
