
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';
import { Calendar, TrendingUp, DollarSign, Target } from 'lucide-react';

interface DailyStationStatusProps {
  station: string;
}

const DailyStationStatus: React.FC<DailyStationStatusProps> = ({ station }) => {
  const [viewMode, setViewMode] = useState<'daily' | 'monthly'>('daily');

  // Sales Performance Report (13-Month View)
  const salesPerformanceData = [
    { month: 'Jan 23', booked: 245000, pending: 38000, finalized: 207000, projection: 260000, yoyChange: 8.5 },
    { month: 'Feb 23', booked: 268000, pending: 42000, finalized: 226000, projection: 275000, yoyChange: 12.3 },
    { month: 'Mar 23', booked: 289000, pending: 45000, finalized: 244000, projection: 285000, yoyChange: 15.2 },
    { month: 'Apr 23', booked: 312000, pending: 48000, finalized: 264000, projection: 300000, yoyChange: 18.7 },
    { month: 'May 23', booked: 298000, pending: 38000, finalized: 260000, projection: 310000, yoyChange: 14.1 },
    { month: 'Jun 23', booked: 334000, pending: 52000, finalized: 282000, projection: 325000, yoyChange: 22.8 },
    { month: 'Jul 23', booked: 356000, pending: 58000, finalized: 298000, projection: 340000, yoyChange: 19.6 },
    { month: 'Aug 23', booked: 345000, pending: 48000, finalized: 297000, projection: 350000, yoyChange: 16.4 },
    { month: 'Sep 23', booked: 378000, pending: 62000, finalized: 316000, projection: 365000, yoyChange: 24.2 },
    { month: 'Oct 23', booked: 398000, pending: 65000, finalized: 333000, projection: 380000, yoyChange: 28.1 },
    { month: 'Nov 23', booked: 425000, pending: 72000, finalized: 353000, projection: 410000, yoyChange: 31.5 },
    { month: 'Dec 23', booked: 456000, pending: 68000, finalized: 388000, projection: 445000, yoyChange: 26.8 },
    { month: 'Jan 24', booked: 267000, pending: 41000, finalized: 226000, projection: 282000, yoyChange: 8.9 },
  ];

  // End-of-Day Booking Extract
  const bookingExtractData = [
    {
      station: 'WPRO-FM',
      agency: 'MediaCom',
      advertiser: 'AutoNation',
      buyerName: 'Sarah Johnson',
      affiliation: 'GroupM',
      ownership: 'WPP',
      office: 'Boston',
      aeName: 'Mike Sullivan',
      stationShare: 15.2,
      current: 8400,
      previous: 7200,
      difference: 1200,
      market: 125000
    },
    {
      station: 'WBRU-FM',
      agency: 'Havas Media',
      advertiser: 'Regional Medical',
      buyerName: 'Tom Chen',
      affiliation: 'Havas Group',
      ownership: 'Vivendi',
      office: 'Providence',
      aeName: 'Lisa Rodriguez',
      stationShare: 12.8,
      current: 6200,
      previous: 5800,
      difference: 400,
      market: 98000
    },
    {
      station: 'WKFD-FM',
      agency: 'Zenith Media',
      advertiser: 'Premier Real Estate',
      buyerName: 'Amy Davis',
      affiliation: 'Publicis',
      ownership: 'Publicis Groupe',
      office: 'Hartford',
      aeName: 'James Wilson',
      stationShare: 18.5,
      current: 5800,
      previous: 6200,
      difference: -400,
      market: 87000
    }
  ];

  const kpiData = [
    { 
      title: "Booked Revenue", 
      value: "$267,000", 
      change: "+8.9%", 
      positive: true,
      icon: DollarSign,
      tooltip: "Total confirmed revenue for current period"
    },
    { 
      title: "Pacing %", 
      value: "94.7%", 
      change: "vs projection", 
      positive: false,
      icon: Target,
      tooltip: "Booked Revenue / Projection Target"
    },
    { 
      title: "Pending Orders", 
      value: "$41,000", 
      change: "+$3K", 
      positive: true,
      icon: Calendar,
      tooltip: "Revenue pending finalization"
    },
    { 
      title: "YoY Growth", 
      value: "+8.9%", 
      change: "vs Jan 23", 
      positive: true,
      icon: TrendingUp,
      tooltip: "Year-over-year growth comparison"
    },
  ];

  const calculatePacing = (booked: number, projection: number) => {
    return ((booked / projection) * 100).toFixed(1);
  };

  return (
    <div className="h-full overflow-auto space-y-6">
      {/* View Toggle */}
      <div className="flex items-center justify-between">
        <div className="flex space-x-2">
          <button
            onClick={() => setViewMode('daily')}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              viewMode === 'daily' 
                ? 'bg-blue-600 text-white' 
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Daily View
          </button>
          <button
            onClick={() => setViewMode('monthly')}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              viewMode === 'monthly' 
                ? 'bg-blue-600 text-white' 
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            13-Month Trend
          </button>
        </div>
        <Badge variant="outline" className="text-sm">
          Station: {station}
        </Badge>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-4 gap-4">
        {kpiData.map((kpi, index) => (
          <Card key={index} className="relative group cursor-help">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-medium text-gray-600">{kpi.title}</CardTitle>
                <kpi.icon className="w-4 h-4 text-gray-400" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">{kpi.value}</div>
              <div className={`text-sm ${kpi.positive ? 'text-green-600' : 'text-orange-600'}`}>
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

      {viewMode === 'monthly' ? (
        /* Sales Performance Report (13-Month View) */
        <Card>
          <CardHeader>
            <CardTitle>Sales Performance Report (13-Month Trend)</CardTitle>
            <CardDescription>Booked vs Projected Revenue with YoY Growth</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80 mb-6">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={salesPerformanceData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" angle={-45} textAnchor="end" height={60} />
                  <YAxis yAxisId="left" />
                  <YAxis yAxisId="right" orientation="right" />
                  <Tooltip 
                    formatter={(value, name) => {
                      if (name === 'yoyChange') return [`${value}%`, 'YoY Change'];
                      return [`$${value?.toLocaleString()}`, name];
                    }}
                  />
                  <Bar yAxisId="left" dataKey="booked" fill="#22c55e" name="Booked" />
                  <Bar yAxisId="left" dataKey="pending" fill="#f59e0b" name="Pending" />
                  <Line yAxisId="right" type="monotone" dataKey="yoyChange" stroke="#ef4444" strokeWidth={3} name="YoY Change %" />
                </LineChart>
              </ResponsiveContainer>
            </div>

            {/* Performance Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-2 font-medium text-gray-600">Month</th>
                    <th className="text-right py-2 font-medium text-gray-600">Booked</th>
                    <th className="text-right py-2 font-medium text-gray-600">Pending</th>
                    <th className="text-right py-2 font-medium text-gray-600">Finalized</th>
                    <th className="text-right py-2 font-medium text-gray-600">Projection</th>
                    <th className="text-right py-2 font-medium text-gray-600">Pacing %</th>
                    <th className="text-right py-2 font-medium text-gray-600">YoY Change</th>
                  </tr>
                </thead>
                <tbody>
                  {salesPerformanceData.slice(-6).map((row, index) => (
                    <tr key={index} className="border-b border-gray-100">
                      <td className="py-2 font-medium">{row.month}</td>
                      <td className="py-2 text-right">${row.booked.toLocaleString()}</td>
                      <td className="py-2 text-right text-orange-600">${row.pending.toLocaleString()}</td>
                      <td className="py-2 text-right text-green-600">${row.finalized.toLocaleString()}</td>
                      <td className="py-2 text-right text-blue-600">${row.projection.toLocaleString()}</td>
                      <td className={`py-2 text-right font-medium ${
                        parseFloat(calculatePacing(row.booked, row.projection)) >= 100 ? 'text-green-600' : 'text-orange-600'
                      }`}>
                        {calculatePacing(row.booked, row.projection)}%
                      </td>
                      <td className={`py-2 text-right font-medium ${
                        row.yoyChange >= 0 ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {row.yoyChange >= 0 ? '+' : ''}{row.yoyChange}%
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      ) : (
        /* End-of-Day Booking Extract */
        <Card>
          <CardHeader>
            <CardTitle>End-of-Day Booking Extract</CardTitle>
            <CardDescription>Daily booking activity by station, agency, and advertiser</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-2 font-medium text-gray-600">Station</th>
                    <th className="text-left py-2 font-medium text-gray-600">Agency</th>
                    <th className="text-left py-2 font-medium text-gray-600">Advertiser</th>
                    <th className="text-left py-2 font-medium text-gray-600">Buyer/Affiliation</th>
                    <th className="text-left py-2 font-medium text-gray-600">Office/AE</th>
                    <th className="text-right py-2 font-medium text-gray-600">Share %</th>
                    <th className="text-right py-2 font-medium text-gray-600">Current $</th>
                    <th className="text-right py-2 font-medium text-gray-600">Previous $</th>
                    <th className="text-right py-2 font-medium text-gray-600">Difference</th>
                    <th className="text-right py-2 font-medium text-gray-600">Market $</th>
                  </tr>
                </thead>
                <tbody>
                  {bookingExtractData.map((row, index) => (
                    <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="py-3 font-medium">{row.station}</td>
                      <td className="py-3">{row.agency}</td>
                      <td className="py-3 font-medium text-blue-600">{row.advertiser}</td>
                      <td className="py-3">
                        <div>{row.buyerName}</div>
                        <div className="text-xs text-gray-500">{row.affiliation}</div>
                      </td>
                      <td className="py-3">
                        <div>{row.office}</div>
                        <div className="text-xs text-gray-500">{row.aeName}</div>
                      </td>
                      <td className="py-3 text-right font-medium">{row.stationShare}%</td>
                      <td className="py-3 text-right font-bold">${row.current.toLocaleString()}</td>
                      <td className="py-3 text-right text-gray-600">${row.previous.toLocaleString()}</td>
                      <td className={`py-3 text-right font-medium ${
                        row.difference >= 0 ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {row.difference >= 0 ? '+' : ''}${row.difference.toLocaleString()}
                      </td>
                      <td className="py-3 text-right text-blue-600 font-medium">${row.market.toLocaleString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default DailyStationStatus;
