
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, TrendingUp, DollarSign, Target, Download } from 'lucide-react';
import { 
  fetchDarwinProjections, 
  calculateMonthlyPerformanceData, 
  fetchCompetitiveAnalysisData, 
  fetchPacingData 
} from '@/utils/referenceData';

interface MonthlyProjectionsProps {
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

const MonthlyProjections: React.FC<MonthlyProjectionsProps> = ({ station, filters }) => {
  const [projectionData, setProjectionData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isRealData, setIsRealData] = useState(false);

  useEffect(() => {
    const fetchProjections = async () => {
      try {
        setLoading(true);
        console.log('Fetching monthly projections with filters:', filters);
        
        const darwinProjections = await fetchDarwinProjections(filters);
        console.log('Fetched Darwin projections:', darwinProjections.length);
        
        if (darwinProjections.length > 0) {
          setProjectionData(darwinProjections);
          setIsRealData(true);
        } else {
          // Mock data fallback
          setProjectionData([
            {
              stationCode: 'WPRO-FM',
              station: 'WPRO-FM',
              market: 'Providence',
              advertiser: 'AutoNation',
              aeName: 'Mike Sullivan',
              agency: 'GroupM',
              billing: 45200,
              projectedBilling: 52000,
              projectedMarket: 180000,
              actualMarket: 165000,
              variance: 6800,
              category: 'Automotive',
              quarter: 'Q3-2025',
              projectedShare: 15.2
            }
          ]);
          setIsRealData(false);
        }
      } catch (error) {
        console.error('Error fetching projections:', error);
        setProjectionData([]);
        setIsRealData(false);
      } finally {
        setLoading(false);
      }
    };

    fetchProjections();
  }, [station, filters]);

  // Calculate summary metrics with proper type handling
  const totalBilling = projectionData.reduce((sum, item) => {
    const billing = typeof item.billing === 'string' ? parseFloat(item.billing.replace(/[,$]/g, '')) || 0 : Number(item.billing) || 0;
    return sum + billing;
  }, 0);

  const totalProjected = projectionData.reduce((sum, item) => {
    const projected = typeof item.projectedBilling === 'string' ? parseFloat(item.projectedBilling.replace(/[,$]/g, '')) || 0 : Number(item.projectedBilling) || 0;
    return sum + projected;
  }, 0);

  const averagePacing = totalProjected > 0 ? (totalBilling / totalProjected) * 100 : 0;

  const exportData = () => {
    const csvContent = "data:text/csv;charset=utf-8," 
      + "Station,Market,Advertiser,AE Name,Agency,Billing,Projected Billing,Variance,Category,Quarter\n"
      + projectionData.map(row => {
          const billing = typeof row.billing === 'string' ? row.billing : String(row.billing || 0);
          const projectedBilling = typeof row.projectedBilling === 'string' ? row.projectedBilling : String(row.projectedBilling || 0);
          const variance = typeof row.variance === 'string' ? row.variance : String(row.variance || 0);
          const advertiser = typeof row.advertiser === 'string' ? row.advertiser : String(row.advertiser || '');
          const aeName = typeof row.aeName === 'string' ? row.aeName : String(row.aeName || '');
          const agency = typeof row.agency === 'string' ? row.agency : String(row.agency || '');
          
          return `${row.stationCode || ''},${row.market || ''},${advertiser},${aeName},${agency},${billing},${projectedBilling},${variance},${row.category || ''},${row.quarter || ''}`;
        }).join("\n");
    
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "monthly_projections.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (loading) {
    return (
      <div className="h-full flex items-center justify-center">
        <div className="text-lg text-gray-600">Loading monthly projections...</div>
      </div>
    );
  }

  return (
    <div className="h-full overflow-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-gray-900">Monthly Projections</h2>
          <p className="text-sm text-gray-600">Station performance projections and billing forecasts</p>
        </div>
        <div className="flex items-center space-x-3">
          <button
            onClick={exportData}
            className="flex items-center space-x-2 px-3 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
          >
            <Download className="w-4 h-4" />
            <span>Export</span>
          </button>
          <Badge variant="outline" className={`text-xs ${
            isRealData 
              ? 'bg-green-50 text-green-700 border-green-200' 
              : 'bg-yellow-50 text-yellow-700 border-yellow-200'
          }`}>
            {isRealData ? 'Real Data' : 'Mock Data'}
          </Badge>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Total Billing</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">${(totalBilling / 1000).toFixed(0)}K</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Projected Billing</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">${(totalProjected / 1000).toFixed(0)}K</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Average Pacing</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">{averagePacing.toFixed(1)}%</div>
          </CardContent>
        </Card>
      </div>

      {/* Projections Table */}
      <Card>
        <CardHeader>
          <CardTitle>Detailed Projections</CardTitle>
          <CardDescription>
            Station-level billing projections and performance metrics
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-2">Station</th>
                  <th className="text-left p-2">Market</th>
                  <th className="text-left p-2">Advertiser</th>
                  <th className="text-left p-2">AE Name</th>
                  <th className="text-left p-2">Agency</th>
                  <th className="text-right p-2">Billing</th>
                  <th className="text-right p-2">Projected</th>
                  <th className="text-right p-2">Variance</th>
                  <th className="text-left p-2">Category</th>
                </tr>
              </thead>
              <tbody>
                {projectionData.map((row, index) => (
                  <tr key={index} className="border-b hover:bg-gray-50">
                    <td className="p-2 font-medium">{row.stationCode || '-'}</td>
                    <td className="p-2">{row.market || '-'}</td>
                    <td className="p-2">{row.advertiser || '-'}</td>
                    <td className="p-2">{row.aeName || '-'}</td>
                    <td className="p-2">{row.agency || '-'}</td>
                    <td className="p-2 text-right">${typeof row.billing === 'string' ? row.billing : (row.billing || 0).toLocaleString()}</td>
                    <td className="p-2 text-right">${typeof row.projectedBilling === 'string' ? row.projectedBilling : (row.projectedBilling || 0).toLocaleString()}</td>
                    <td className="p-2 text-right">${typeof row.variance === 'string' ? row.variance : (row.variance || 0).toLocaleString()}</td>
                    <td className="p-2">{row.category || '-'}</td>
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

export default MonthlyProjections;
