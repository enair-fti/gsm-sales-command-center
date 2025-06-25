
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';

interface DailyStationStatusProps {
  station: string;
}

const DailyStationStatus: React.FC<DailyStationStatusProps> = ({ station }) => {
  // Mock data - in real app this would come from API
  const kpiData = [
    { title: "Today's Booked Revenue", value: "$47,250", change: "+12.5%", positive: true },
    { title: "Projected Revenue", value: "$52,800", change: "+8.2%", positive: true },
    { title: "Open Orders", value: "23", change: "-3", positive: false },
    { title: "Spots Scheduled", value: "156", change: "+24", positive: true },
  ];

  const chartData = [
    { time: '6AM', booked: 2400, projected: 2800 },
    { time: '9AM', booked: 5600, projected: 6200 },
    { time: '12PM', booked: 8900, projected: 9500 },
    { time: '3PM', booked: 12400, projected: 13200 },
    { time: '6PM', booked: 15800, projected: 16800 },
    { time: '9PM', booked: 18900, projected: 19500 },
  ];

  return (
    <div className="h-full overflow-auto space-y-6">
      {/* KPI Cards */}
      <div className="grid grid-cols-4 gap-4">
        {kpiData.map((kpi, index) => (
          <Card key={index}>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">{kpi.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">{kpi.value}</div>
              <div className={`text-sm ${kpi.positive ? 'text-green-600' : 'text-red-600'}`}>
                {kpi.change} from yesterday
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Revenue Tracking Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Daily Revenue Tracking</CardTitle>
          <CardDescription>Booked vs Projected Revenue Throughout the Day</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="time" />
                <YAxis />
                <Tooltip formatter={(value) => [`$${value}`, '']} />
                <Line 
                  type="monotone" 
                  dataKey="booked" 
                  stroke="#22c55e" 
                  strokeWidth={3}
                  name="Booked Revenue"
                />
                <Line 
                  type="monotone" 
                  dataKey="projected" 
                  stroke="#3b82f6" 
                  strokeWidth={2}
                  strokeDasharray="5 5"
                  name="Projected Revenue"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Recent Bookings */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Bookings (Last 2 Hours)</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {[
              { advertiser: "AutoNation", amount: "$2,400", time: "14:32", spots: "8 spots" },
              { advertiser: "Local Restaurant Group", amount: "$1,850", time: "14:18", spots: "12 spots" },
              { advertiser: "Medical Center", amount: "$3,200", time: "13:45", spots: "6 spots" },
              { advertiser: "Real Estate Agency", amount: "$950", time: "13:22", spots: "4 spots" },
            ].map((booking, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <div className="font-medium text-gray-900">{booking.advertiser}</div>
                  <div className="text-sm text-gray-600">{booking.spots}</div>
                </div>
                <div className="text-right">
                  <div className="font-bold text-green-600">{booking.amount}</div>
                  <div className="text-sm text-gray-500">{booking.time}</div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DailyStationStatus;
