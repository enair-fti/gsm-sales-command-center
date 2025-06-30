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

  // Helper function to safely parse billing values
  const parseBillingValue = (value: any): number => {
    if (typeof value === 'number') return value;
    if (typeof value === 'string') {
      const cleanValue = value.replace(/[,$]/g, '');
      const parsed = parseFloat(cleanValue);
      return isNaN(parsed) ? 0 : parsed;
    }
    return 0;
  };

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
        
        console.log('Fetched Darwin projections:', darwinProjections.length, 'records (full dataset)');
        console.log('Fetched competitive analysis:', competitiveAnalysis.length, 'records (full dataset)');
        console.log('Fetched pacing data:', pacingInfo.length, 'records (full dataset)');
        
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
          
          // Calculate KPI metrics from real data
          let totalSales = 0;
          let totalProjection = 0;
          let totalLastYear = 0;
          let avgPacing = 0;

          if (pacingInfo.length > 0) {
            totalSales = pacingInfo.reduce((sum, item) => sum + parseBillingValue(item['Sales $']), 0);
            totalProjection = pacingInfo.reduce((sum, item) => sum + parseBillingValue(item['Projection']), 0);
            totalLastYear = pacingInfo.reduce((sum, item) => sum + parseBillingValue(item['Last Year']), 0);
            avgPacing = pacingInfo.reduce((sum, item) => sum + (parseFloat(item['% Pacing']?.toString().replace(/%/g, '')) || 0), 0) / pacingInfo.length;
          } else if (darwinProjections.length > 0) {
            totalSales = darwinProjections.reduce((sum, item) => sum + parseBillingValue(item['Q3-2025 Billing$']), 0);
            totalProjection = darwinProjections.reduce((sum, item) => sum + parseBillingValue(item['Proj Billing$']), 0);
            totalLastYear = totalSales * 0.85; // Estimate last year as 85% of current
            avgPacing = totalProjection > 0 ? (totalSales / totalProjection) * 100 : 0;
          } else if (competitiveAnalysis.length > 0) {
            totalSales = competitiveAnalysis.reduce((sum, item) => sum + (item['Billing $'] || 0), 0);
            totalLastYear = totalSales * 0.85;
            avgPacing = 100; // Default pacing
          }
          
          setKpiMetrics({
            salesDollars: totalSales,
            pacing: avgPacing,
            changeVsLastYear: totalSales - totalLastYear,
            monthProgress: 84
          });
        } else {
          // Use mock data when no real data is available
          setHasError(true);
          setIsRealData(false);
          setDarwinData([]);
          setCompetitiveData([]);
          setPacingData([]);
          setStationData([]);
          
          setKpiMetrics({
            salesDollars: 0,
            pacing: 0,
            changeVsLastYear: 0,
            monthProgress: 84
          });
        }
        
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
        setHasError(true);
        setIsRealData(false);
        
        // Set empty data on error
        setDarwinData([]);
        setCompetitiveData([]);
        setPacingData([]);
        setStationData([]);
        
        setKpiMetrics({
          salesDollars: 0,
          pacing: 0,
          changeVsLastYear: 0,
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
      change: isRealData ? "Real Data" : "No Data", 
      positive: true,
      icon: DollarSign,
      tooltip: isRealData ? "Month-to-date confirmed sales dollars from real data" : "No real data available"
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
      change: `${kpiMetrics.salesDollars > 0 ? ((kpiMetrics.changeVsLastYear / (kpiMetrics.salesDollars * 0.85)) * 100).toFixed(1) : '0.0'}%`, 
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
              ? `Real Data Connected (${darwinData.length + competitiveData.length + pacingData.length} records)` 
              : hasError 
                ? 'No Data Available'
                : 'No real data available'
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
          {competitiveData.length > 0 && <CompetitiveAnalysisChart data={competitiveData} />}

          {/* Darwin Projections Chart */}
          {darwinData.length > 0 && <DarwinProjectionsChart data={darwinData} />}

          {/* Pacing Trend Chart */}
          {stationData.length > 0 && <PacingTrendChart data={stationData} />}

          {/* Show message if no data */}
          {!isRealData && (
            <Card>
              <CardHeader>
                <CardTitle>No Real Data Available</CardTitle>
                <CardDescription>
                  Unable to connect to the _temp tables or no data found with current filters.
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
                  <p className="mt-2 text-blue-600">Try adjusting your filters or check data availability.</p>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      ) : (
        stationData.length > 0 ? <PacingTrendChart data={stationData} /> : (
          <Card>
            <CardHeader>
              <CardTitle>No Performance Data Available</CardTitle>
              <CardDescription>No data available for performance analysis</CardDescription>
            </CardHeader>
          </Card>
        )
      )}
    </div>
  );
};

export default DailyStationStatus;
