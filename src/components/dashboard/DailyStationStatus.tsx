
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';
import { Calendar, TrendingUp, DollarSign, Target } from 'lucide-react';

interface DailyStationStatusProps {
  station: string;
}

const DailyStationStatus: React.FC<DailyStationStatusProps> = ({ station }) => {
  const [viewMode, setViewMode] = useState<'daily' | 'monthly'>('monthly');

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
      title: "💰 Booked Revenue", 
      value: "$267,000", 
      change: "+8.9%", 
      positive: true,
      icon: DollarSign,
      tooltip: "Total confirmed revenue for current period",
      gradient: "from-green-400 to-emerald-500"
    },
    { 
      title: "🎯 Pacing %", 
      value: "94.7%", 
      change: "vs projection", 
      positive: false,
      icon: Target,
      tooltip: "Booked Revenue / Projection Target",
      gradient: "from-orange-400 to-red-500"
    },
    { 
      title: "⏳ Pending Orders", 
      value: "$41,000", 
      change: "+$3K", 
      positive: true,
      icon: Calendar,
      tooltip: "Revenue pending finalization",
      gradient: "from-blue-400 to-cyan-500"
    },
    { 
      title: "📈 YoY Growth", 
      value: "+8.9%", 
      change: "vs Jan 23", 
      positive: true,
      icon: TrendingUp,
      tooltip: "Year-over-year growth comparison",
      gradient: "from-purple-400 to-pink-500"
    },
  ];

  const calculatePacing = (booked: number, projection: number) => {
    return ((booked / projection) * 100).toFixed(1);
  };

  return (
    <div className="h-full overflow-auto space-y-6 p-4 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 rounded-2xl">
      {/* View Toggle */}
      <div className="flex items-center justify-between">
        <div className="flex space-x-3">
          <button
            onClick={() => setViewMode('monthly')}
            className={`px-6 py-3 rounded-xl text-sm font-black transition-all duration-300 transform hover:scale-105 shadow-lg border-2 ${
              viewMode === 'monthly' 
                ? 'bg-gradient-to-r from-yellow-400 to-orange-500 text-gray-900 border-white shadow-2xl' 
                : 'bg-gradient-to-r from-gray-200 to-gray-300 text-gray-700 hover:from-gray-300 hover:to-gray-400 border-gray-300'
            }`}
          >
            📊 13-Month Trend
          </button>
          <button
            onClick={() => setViewMode('daily')}
            className={`px-6 py-3 rounded-xl text-sm font-black transition-all duration-300 transform hover:scale-105 shadow-lg border-2 ${
              viewMode === 'daily' 
                ? 'bg-gradient-to-r from-cyan-400 to-blue-500 text-white border-white shadow-2xl' 
                : 'bg-gradient-to-r from-gray-200 to-gray-300 text-gray-700 hover:from-gray-300 hover:to-gray-400 border-gray-300'
            }`}
          >
            📅 Daily View
          </button>
        </div>
        <Badge variant="outline" className="text-sm bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-bold border-2 border-white px-4 py-2 rounded-xl shadow-lg">
          🏢 Station: {station}
        </Badge>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-4 gap-6">
        {kpiData.map((kpi, index) => (
          <Card key={index} className={`relative group cursor-help transform hover:scale-105 transition-all duration-300 shadow-xl bg-gradient-to-br ${kpi.gradient} border-2 border-white/50 backdrop-blur-sm`}>
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-bold text-white drop-shadow-md">{kpi.title}</CardTitle>
                <kpi.icon className="w-5 h-5 text-white drop-shadow-md" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-black text-white drop-shadow-lg">{kpi.value}</div>
              <div className={`text-sm font-bold ${kpi.positive ? 'text-yellow-200' : 'text-orange-200'} drop-shadow-md`}>
                {kpi.change}
              </div>
              {/* Tooltip */}
              <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-gray-900 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-10 font-medium shadow-xl">
                {kpi.tooltip}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {viewMode === 'monthly' ? (
        /* Sales Performance Report (13-Month View) */
        <Card className="shadow-2xl bg-gradient-to-br from-white to-blue-50 border-2 border-blue-200 rounded-2xl">
          <CardHeader className="bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-t-2xl">
            <CardTitle className="text-xl font-black drop-shadow-md">📊 Sales Performance Report (13-Month Trend)</CardTitle>
            <CardDescription className="text-blue-100 font-medium">📈 Booked vs Projected Revenue with YoY Growth</CardDescription>
          </CardHeader>
          <CardContent className="p-6">
            <div className="h-80 mb-6 bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl p-4 border-2 border-blue-200">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={salesPerformanceData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e0e7ff" />
                  <XAxis dataKey="month" angle={-45} textAnchor="end" height={60} stroke="#4338ca" fontWeight="bold" />
                  <YAxis yAxisId="left" stroke="#059669" fontWeight="bold" />
                  <YAxis yAxisId="right" orientation="right" stroke="#dc2626" fontWeight="bold" />
                  <Tooltip 
                    formatter={(value, name) => {
                      if (name === 'yoyChange') return [`${value}%`, '📈 YoY Change'];
                      return [`$${value?.toLocaleString()}`, name];
                    }}
                    contentStyle={{
                      backgroundColor: 'rgba(255, 255, 255, 0.95)',
                      border: '2px solid #3b82f6',
                      borderRadius: '12px',
                      fontWeight: 'bold',
                      boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)'
                    }}
                  />
                  <Bar yAxisId="left" dataKey="booked" fill="url(#bookedGradient)" name="💰 Booked" />
                  <Bar yAxisId="left" dataKey="pending" fill="url(#pendingGradient)" name="⏳ Pending" />
                  <Line yAxisId="right" type="monotone" dataKey="yoyChange" stroke="#ef4444" strokeWidth={4} name="📈 YoY Change %" />
                  <defs>
                    <linearGradient id="bookedGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#10b981" />
                      <stop offset="100%" stopColor="#059669" />
                    </linearGradient>
                    <linearGradient id="pendingGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#f59e0b" />
                      <stop offset="100%" stopColor="#d97706" />
                    </linearGradient>
                  </defs>
                </LineChart>
              </ResponsiveContainer>
            </div>

            {/* Performance Table with bright styling */}
            <div className="overflow-x-auto bg-gradient-to-br from-white to-blue-50 rounded-xl border-2 border-blue-200 shadow-lg">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-gradient-to-r from-blue-500 to-purple-600 text-white">
                    <th className="text-left py-3 px-4 font-black">📅 Month</th>
                    <th className="text-right py-3 px-4 font-black">💰 Booked</th>
                    <th className="text-right py-3 px-4 font-black">⏳ Pending</th>
                    <th className="text-right py-3 px-4 font-black">✅ Finalized</th>
                    <th className="text-right py-3 px-4 font-black">🎯 Projection</th>
                    <th className="text-right py-3 px-4 font-black">📊 Pacing %</th>
                    <th className="text-right py-3 px-4 font-black">📈 YoY Change</th>
                  </tr>
                </thead>
                <tbody>
                  {salesPerformanceData.slice(-6).map((row, index) => (
                    <tr key={index} className="border-b border-blue-100 hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 transition-all duration-200">
                      <td className="py-3 px-4 font-bold text-blue-900">{row.month}</td>
                      <td className="py-3 px-4 text-right font-bold text-green-700">${row.booked.toLocaleString()}</td>
                      <td className="py-3 px-4 text-right font-bold text-orange-600">${row.pending.toLocaleString()}</td>
                      <td className="py-3 px-4 text-right font-bold text-emerald-600">${row.finalized.toLocaleString()}</td>
                      <td className="py-3 px-4 text-right font-bold text-blue-600">${row.projection.toLocaleString()}</td>
                      <td className={`py-3 px-4 text-right font-black ${
                        parseFloat(calculatePacing(row.booked, row.projection)) >= 100 ? 'text-green-600' : 'text-orange-600'
                      }`}>
                        {calculatePacing(row.booked, row.projection)}%
                      </td>
                      <td className={`py-3 px-4 text-right font-black ${
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
        /* End-of-Day Booking Extract with bright styling */
        <Card className="shadow-2xl bg-gradient-to-br from-white to-cyan-50 border-2 border-cyan-200 rounded-2xl">
          <CardHeader className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-t-2xl">
            <CardTitle className="text-xl font-black drop-shadow-md">📊 End-of-Day Booking Extract</CardTitle>
            <CardDescription className="text-cyan-100 font-medium">📅 Daily booking activity by station, agency, and advertiser</CardDescription>
          </CardHeader>
          <CardContent className="p-6">
            <div className="overflow-x-auto bg-gradient-to-br from-white to-cyan-50 rounded-xl border-2 border-cyan-200 shadow-lg">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white">
                    <th className="text-left py-3 px-4 font-black">🏢 Station</th>
                    <th className="text-left py-3 px-4 font-black">🏢 Agency</th>
                    <th className="text-left py-3 px-4 font-black">📺 Advertiser</th>
                    <th className="text-left py-3 px-4 font-black">👤 Buyer/Affiliation</th>
                    <th className="text-left py-3 px-4 font-black">🏢 Office/AE</th>
                    <th className="text-right py-3 px-4 font-black">📊 Share %</th>
                    <th className="text-right py-3 px-4 font-black">💰 Current $</th>
                    <th className="text-right py-3 px-4 font-black">📈 Previous $</th>
                    <th className="text-right py-3 px-4 font-black">📊 Difference</th>
                    <th className="text-right py-3 px-4 font-black">🌟 Market $</th>
                  </tr>
                </thead>
                <tbody>
                  {bookingExtractData.map((row, index) => (
                    <tr key={index} className="border-b border-cyan-100 hover:bg-gradient-to-r hover:from-cyan-50 hover:to-blue-50 transition-all duration-200">
                      <td className="py-4 px-4 font-bold text-cyan-900">{row.station}</td>
                      <td className="py-4 px-4 font-medium text-blue-800">{row.agency}</td>
                      <td className="py-4 px-4 font-bold text-blue-600">{row.advertiser}</td>
                      <td className="py-4 px-4">
                        <div className="font-medium text-gray-900">{row.buyerName}</div>
                        <div className="text-xs text-gray-600 font-medium">{row.affiliation}</div>
                      </td>
                      <td className="py-4 px-4">
                        <div className="font-medium text-gray-900">{row.office}</div>
                        <div className="text-xs text-gray-600 font-medium">{row.aeName}</div>
                      </td>
                      <td className="py-4 px-4 text-right font-black text-purple-600">{row.stationShare}%</td>
                      <td className="py-4 px-4 text-right font-black text-green-700">${row.current.toLocaleString()}</td>
                      <td className="py-4 px-4 text-right font-medium text-gray-600">${row.previous.toLocaleString()}</td>
                      <td className={`py-4 px-4 text-right font-black ${
                        row.difference >= 0 ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {row.difference >= 0 ? '+' : ''}${row.difference.toLocaleString()}
                      </td>
                      <td className="py-4 px-4 text-right text-blue-600 font-black">${row.market.toLocaleString()}</td>
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
