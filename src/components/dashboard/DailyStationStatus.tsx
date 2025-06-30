
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
import CompetitiveAnalysisChart from './charts/CompetitiveAnalysisChart';
import DarwinProjectionsChart from './charts/DarwinProjectionsChart';
import PacingTrendChart from './charts/PacingTrendChart';

interface DailyStationStatusProps {
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

const DailyStationStatus: React.FC<DailyStationStatusProps> = ({ station, filters }) => {
  const [viewMode, setViewMode] = useState<'charts' | 'performance'>('charts');
  const [stationData, setStationData] = useState<any[]>([]);
  const [competitiveData, setCompetitiveData] = useState<any[]>([]);
  const [darwinData, setDarwinData] = useState<any[]>([]);
  const [pacingData, setPacingData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isRealData, setIsRealData] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [kpiMetrics, setKpiMetrics] = useState({
    salesDollars: 0,
    pacing: 0,
    changeVsLastYear: 0,
    monthProgress: 84
  });

  // Generate mock data functions
  const generateMockDarwinData = () => [
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
    },
    {
      stationCode: 'WBRU-FM',
      station: 'WBRU-FM',
      market: 'Providence',
      advertiser: 'Regional Medical Center',
      aeName: 'Lisa Rodriguez',
      agency: 'Zenith Media',
      billing: 38700,
      projectedBilling: 41000,
      projectedMarket: 220000,
      actualMarket: 205000,
      variance: 2300,
      category: 'Healthcare',
      quarter: 'Q3-2025',
      projectedShare: 12.8
    },
    {
      stationCode: 'WKFD-FM',
      station: 'WKFD-FM',
      market: 'Hartford',
      advertiser: 'Premier Real Estate',
      aeName: 'James Wilson',
      agency: 'Direct',
      billing: 32500,
      projectedBilling: 35000,
      projectedMarket: 150000,
      actualMarket: 142000,
      variance: 2500,
      category: 'Real Estate',
      quarter: 'Q3-2025',
      projectedShare: 18.5
    }
  ];

  const generateMockCompetitiveData = () => [
    {
      Month: 'Jan 2024',
      Agency: 'GroupM',
      Advertiser: 'Toyota Motors',
      '# Headlines': 45,
      'Billing $': 485000,
      'Mkt $': 2100000,
      'Rep %': 23.1,
      Custom: 1
    },
    {
      Month: 'Feb 2024',
      Agency: 'Zenith Media',
      Advertiser: 'McDonald\'s Corporation',
      '# Headlines': 38,
      'Billing $': 423000,
      'Mkt $': 1850000,
      'Rep %': 22.9,
      Custom: 2
    },
    {
      Month: 'Mar 2024',
      Agency: 'Direct',
      Advertiser: 'Local Auto Dealer',
      '# Headlines': 52,
      'Billing $': 380000,
      'Mkt $': 1900000,
      'Rep %': 20.0,
      Custom: 1
    },
    {
      Month: 'Apr 2024',
      Agency: 'GroupM',
      Advertiser: 'Regional Bank',
      '# Headlines': 41,
      'Billing $': 510000,
      'Mkt $': 2200000,
      'Rep %': 23.2,
      Custom: 1
    },
    {
      Month: 'May 2024',
      Agency: 'Havas',
      Advertiser: 'Healthcare System',
      '# Headlines': 35,
      'Billing $': 390000,
      'Mkt $': 1750000,
      'Rep %': 22.3,
      Custom: 2
    },
    {
      Month: 'Jun 2024',
      Agency: 'Zenith Media',
      Advertiser: 'Retail Chain',
      '# Headlines': 47,
      'Billing $': 445000,
      'Mkt $': 1950000,
      'Rep %': 22.8,
      Custom: 1
    }
  ];

  const generateMockPacingData = () => [
    {
      Month: 'Jan 2024',
      Advertiser: 'Toyota Motors',
      'Sales $': '485000',
      Projection: '450000',
      'Last Year': '410000',
      '% Pacing': '107.8',
      Variance: '35000',
      'Change vs LY': '75000'
    },
    {
      Month: 'Feb 2024',
      Advertiser: 'McDonald\'s Corporation',
      'Sales $': '423000',
      Projection: '420000',
      'Last Year': '395000',
      '% Pacing': '100.7',
      Variance: '3000',
      'Change vs LY': '28000'
    },
    {
      Month: 'Mar 2024',
      Advertiser: 'Local Auto Dealer',
      'Sales $': '380000',
      Projection: '365000',
      'Last Year': '352000',
      '% Pacing': '104.1',
      Variance: '15000',
      'Change vs LY': '28000'
    }
  ];

  const generateMockMonthlyData = () => [
    { month: 'Jan 24', booked: 378000, projection: 365000, lastYear: 352000, pace: 103.6, variance: 13000, changeVsLastYear: 26000 },
    { month: 'Feb 24', booked: 423000, projection: 420000, lastYear: 395000, pace: 100.7, variance: 3000, changeVsLastYear: 28000 },
    { month: 'Mar 24', booked: 390000, projection: 385000, lastYear: 365000, pace: 101.3, variance: 5000, changeVsLastYear: 25000 },
    { month: 'Apr 24', booked: 435000, projection: 425000, lastYear: 400000, pace: 102.4, variance: 10000, changeVsLastYear: 35000 },
    { month: 'May 24', booked: 412000, projection: 400000, lastYear: 385000, pace: 103.0, variance: 12000, changeVsLastYear: 27000 },
    { month: 'Jun 24', booked: 445000, projection: 440000, lastYear: 420000, pace: 101.1, variance: 5000, changeVsLastYear: 25000 },
    { month: 'Jul 24', booked: 428000, projection: 415000, lastYear: 395000, pace: 103.1, variance: 13000, changeVsLastYear: 33000 },
    { month: 'Aug 24', booked: 456000, projection: 450000, lastYear: 430000, pace: 101.3, variance: 6000, changeVsLastYear: 26000 },
    { month: 'Sep 24', booked: 468000, projection: 460000, lastYear: 445000, pace: 101.7, variance: 8000, changeVsLastYear: 23000 }
  ];

  // Fetch all data sources
  useEffect(() => {
    const fetchAllData = async () => {
      try {
        setLoading(true);
        setHasError(false);
        
        console.log('Fetching dashboard data with filters:', filters);
        
        // Fetch all data sources in parallel
        const [darwinProjections, competitiveAnalysis, pacingInfo] = await Promise.all([
          fetchDarwinProjections(filters),
          fetchCompetitiveAnalysisData(filters),
          fetchPacingData(filters)
        ]);
        
        console.log('Fetched Darwin projections:', darwinProjections.length);
        console.log('Fetched competitive analysis:', competitiveAnalysis.length);
        console.log('Fetched pacing data:', pacingInfo.length);
        
        // Check if we have real data
        const hasRealData = darwinProjections.length > 0 || competitiveAnalysis.length > 0 || pacingInfo.length > 0;
        
        if (hasRealData) {
          setDarwinData(darwinProjections);
          setCompetitiveData(competitiveAnalysis);
          setPacingData(pacingInfo);
          setIsRealData(true);
          
          // Calculate monthly performance data from available sources
          const monthlyPerformance = await calculateMonthlyPerformanceData(darwinProjections, pacingInfo);
          setStationData(monthlyPerformance);
          
          // Calculate KPI metrics from available data
          if (pacingInfo.length > 0) {
            const totalSales = pacingInfo.reduce((sum, item) => sum + (parseFloat(item['Sales $']?.toString().replace(/[,$]/g, '')) || 0), 0);
            const totalProjection = pacingInfo.reduce((sum, item) => sum + (parseFloat(item['Projection']?.toString().replace(/[,$]/g, '')) || 0), 0);
            const totalLastYear = pacingInfo.reduce((sum, item) => sum + (parseFloat(item['Last Year']?.toString().replace(/[,$]/g, '')) || 0), 0);
            const avgPacing = pacingInfo.reduce((sum, item) => sum + (parseFloat(item['% Pacing']?.toString().replace(/%/g, '')) || 0), 0) / pacingInfo.length;
            
            setKpiMetrics({
              salesDollars: totalSales,
              pacing: avgPacing,
              changeVsLastYear: totalSales - totalLastYear,
              monthProgress: 84
            });
          } else if (darwinProjections.length > 0) {
            const totalBilling = darwinProjections.reduce((sum, item) => sum + item.billing, 0);
            const totalProjected = darwinProjections.reduce((sum, item) => sum + item.projectedBilling, 0);
            const totalLastYear = totalBilling * 0.85;
            const pacing = totalProjected > 0 ? (totalBilling / totalProjected) * 100 : 0;
            
            setKpiMetrics({
              salesDollars: totalBilling,
              pacing: pacing,
              changeVsLastYear: totalBilling - totalLastYear,
              monthProgress: 84
            });
          }
        } else {
          // Use mock data when no real data is available
          setHasError(true);
          setIsRealData(false);
          setDarwinData(generateMockDarwinData());
          setCompetitiveData(generateMockCompetitiveData());
          setPacingData(generateMockPacingData());
          setStationData(generateMockMonthlyData());
          
          // Set mock KPI metrics
          setKpiMetrics({
            salesDollars: 378000,
            pacing: 103.6,
            changeVsLastYear: 38000,
            monthProgress: 84
          });
        }
        
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
        setHasError(true);
        setIsRealData(false);
        
        // Fallback to mock data on error
        setDarwinData(generateMockDarwinData());
        setCompetitiveData(generateMockCompetitiveData());
        setPacingData(generateMockPacingData());
        setStationData(generateMockMonthlyData());
        
        setKpiMetrics({
          salesDollars: 378000,
          pacing: 103.6,
          changeVsLastYear: 38000,
          monthProgress: 84
        });
      } finally {
        setLoading(false);
      }
    };

    fetchAllData();
  }, [station, filters]);

  const kpiData = [
    { 
      title: "Sales Dollars (MTD)", 
      value: `$${(kpiMetrics.salesDollars / 1000).toFixed(0)}K`, 
      change: isRealData ? "Real Data" : "+3.6%", 
      positive: true,
      icon: DollarSign,
      tooltip: isRealData ? "Month-to-date confirmed sales dollars from real data" : "Sample data - not real projections"
    },
    { 
      title: "% Pacing", 
      value: `${kpiMetrics.pacing.toFixed(1)}%`, 
      change: "vs projection", 
      positive: kpiMetrics.pacing >= 100,
      icon: Target,
      tooltip: "% Pacing = (Booked / Projection) * 100"
    },
    { 
      title: "Change vs. Last Year", 
      value: `${kpiMetrics.changeVsLastYear >= 0 ? '+' : ''}$${(kpiMetrics.changeVsLastYear / 1000).toFixed(0)}K`, 
      change: `${((kpiMetrics.changeVsLastYear / (kpiMetrics.salesDollars * 0.85)) * 100).toFixed(1)}%`, 
      positive: kpiMetrics.changeVsLastYear >= 0,
      icon: TrendingUp,
      tooltip: "Change vs. Last Year ($) = Current Year - Previous Year"
    },
    { 
      title: "25 Conf Month Close", 
      value: `${kpiMetrics.monthProgress}%`, 
      change: "of month", 
      positive: true,
      icon: Calendar,
      tooltip: "Progress through current month for 25th close"
    },
  ];

  const exportData = () => {
    const csvContent = "data:text/csv;charset=utf-8," 
      + "Month,Booked,Projection,Last Year,Pace %,Variance,Change vs Last Year\n"
      + stationData.map(row => 
          `${row.month},${row.booked},${row.projection},${row.lastYear},${row.pace},${row.variance},${row.changeVsLastYear}`
        ).join("\n");
    
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `station_performance_${station.replace(' ', '_')}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (loading) {
    return (
      <div className="h-full flex items-center justify-center">
        <div className="text-lg text-gray-600">Loading real-time dashboard data...</div>
      </div>
    );
  }

  return (
    <div className="h-full overflow-auto space-y-6">
      {/* Header with Controls */}
      <div className="flex items-center justify-between">
        <div className="flex space-x-2">
          <button
            onClick={() => setViewMode('charts')}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              viewMode === 'charts' 
                ? 'bg-blue-600 text-white' 
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Data Visualizations
          </button>
          <button
            onClick={() => setViewMode('performance')}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              viewMode === 'performance' 
                ? 'bg-blue-600 text-white' 
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Performance Details
          </button>
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
              : hasError 
                ? 'bg-red-50 text-red-700 border-red-200'
                : 'bg-yellow-50 text-yellow-700 border-yellow-200'
          }`}>
            {isRealData 
              ? 'Real Data Connected' 
              : hasError 
                ? 'Mock Data - Fetch error'
                : 'Mock Data - No real data available'
            }
          </Badge>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-4 gap-4">
        {kpiData.map((kpi, index) => (
          <Card key={index} className="relative group cursor-help hover:shadow-md transition-shadow">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-medium text-gray-600">{kpi.title}</CardTitle>
                <kpi.icon className="w-4 h-4 text-gray-400" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">{kpi.value}</div>
              <div className={`text-sm ${kpi.positive ? 'text-green-600' : 'text-red-600'}`}>
                {kpi.change}
              </div>
              {/* Tooltip */}
              <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-gray-800 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-10">
                {kpi.tooltip}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Main Content */}
      {viewMode === 'charts' ? (
        <div className="space-y-6">
          {/* Competitive Analysis Chart */}
          <CompetitiveAnalysisChart data={competitiveData} />

          {/* Darwin Projections Chart */}
          <DarwinProjectionsChart data={darwinData} />

          {/* Pacing Trend Chart */}
          <PacingTrendChart data={stationData} />

          {/* Show error message if using mock data due to errors */}
          {hasError && (
            <Card>
              <CardHeader>
                <CardTitle>Using Mock Data Due to Fetch Error</CardTitle>
                <CardDescription>
                  Unable to connect to the _temp tables. Database connection failed.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-sm text-gray-600">
                  <p>Expected tables:</p>
                  <ul className="list-disc list-inside mt-2">
                    <li>_temp."Competitive Analysis_250624-1224_AgyAdv"</li>
                    <li>_temp."darwin-sales-projections-20250624_Cris View"</li>
                    <li>_temp."Pacing_250624-1221_Adv"</li>
                  </ul>
                  <p className="mt-2 text-yellow-600">Displaying mock data for demonstration purposes.</p>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      ) : (
        <PacingTrendChart data={stationData} />
      )}
    </div>
  );
};

export default DailyStationStatus;
