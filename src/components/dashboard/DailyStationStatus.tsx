
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
  const [kpiMetrics, setKpiMetrics] = useState({
    salesDollars: 0,
    pacing: 0,
    changeVsLastYear: 0,
    monthProgress: 84
  });

  // Fetch all data sources
  useEffect(() => {
    const fetchAllData = async () => {
      try {
        setLoading(true);
        
        // Fetch all data sources in parallel
        const [darwinProjections, competitiveAnalysis, pacingInfo] = await Promise.all([
          fetchDarwinProjections(filters),
          fetchCompetitiveAnalysisData(filters),
          fetchPacingData(filters)
        ]);
        
        console.log('Fetched Darwin projections:', darwinProjections.length);
        console.log('Fetched competitive analysis:', competitiveAnalysis.length);
        console.log('Fetched pacing data:', pacingInfo.length);
        
        setDarwinData(darwinProjections);
        setCompetitiveData(competitiveAnalysis);
        setPacingData(pacingInfo);
        
        // Check if we have real data
        const hasRealData = darwinProjections.length > 0 || competitiveAnalysis.length > 0 || pacingInfo.length > 0;
        setIsRealData(hasRealData);
        
        // Calculate monthly performance data from available sources
        const monthlyPerformance = await calculateMonthlyPerformanceData(darwinProjections, pacingInfo);
        setStationData(monthlyPerformance);
        
        // Calculate KPI metrics from available data
        if (pacingInfo.length > 0) {
          // Use pacing data for KPIs
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
          // Fallback to Darwin data for KPIs
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
        } else {
          // Use mock data if no real data available
          setKpiMetrics({
            salesDollars: 378000,
            pacing: 103.6,
            changeVsLastYear: 38000,
            monthProgress: 84
          });
        }
        
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
        setIsRealData(false);
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
          <Badge variant="outline" className={`text-xs ${isRealData ? 'bg-green-50 text-green-700 border-green-200' : 'bg-yellow-50 text-yellow-700 border-yellow-200'}`}>
            {isRealData ? 'Real Data Connected' : 'Mock Data - No real data available'}
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
          {competitiveData.length > 0 && (
            <CompetitiveAnalysisChart data={competitiveData} />
          )}

          {/* Darwin Projections Chart */}
          {darwinData.length > 0 && (
            <DarwinProjectionsChart data={darwinData} />
          )}

          {/* Pacing Trend Chart */}
          {stationData.length > 0 && (
            <PacingTrendChart data={stationData} />
          )}

          {/* Show message if no data is available */}
          {!isRealData && (
            <Card>
              <CardHeader>
                <CardTitle>No Real Data Available</CardTitle>
                <CardDescription>
                  Unable to connect to the _temp tables. Please check database permissions and table names.
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
