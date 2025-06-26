
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { ComposedChart, Bar, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip } from 'recharts';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, Calendar, Info } from 'lucide-react';

interface PacingData {
  quarter: string;
  year: string;
  booked: number;
  pending: number;
  final: number;
  percentOf2024Final: number;
  percentOf2024Pace: number;
}

const PacingView: React.FC<{ station: string }> = ({ station }) => {
  const [selectedAdvertiser, setSelectedAdvertiser] = useState('Southeast Toyota');
  const [showTooltip, setShowTooltip] = useState('');

  const advertisers = ['Southeast Toyota', 'Publix', 'Home Depot', 'AutoNation', 'Regional Medical'];

  // Mock 13-month pacing data
  const mockPacingData: PacingData[] = [
    { quarter: 'Q1', year: '2024', booked: 395000, pending: 45000, final: 440000, percentOf2024Final: 100, percentOf2024Pace: 100 },
    { quarter: 'Q2', year: '2024', booked: 425000, pending: 52000, final: 477000, percentOf2024Final: 108.4, percentOf2024Pace: 105.2 },
    { quarter: 'Q3', year: '2024', booked: 389000, pending: 38000, final: 427000, percentOf2024Final: 97.0, percentOf2024Pace: 98.1 },
    { quarter: 'Q4', year: '2024', booked: 456000, pending: 41000, final: 497000, percentOf2024Final: 112.9, percentOf2024Pace: 110.3 },
    { quarter: 'Q1', year: '2025', booked: 445000, pending: 67000, final: 512000, percentOf2024Final: 116.4, percentOf2024Pace: 112.7 },
    { quarter: 'Q2', year: '2025', booked: 478000, pending: 73000, final: 551000, percentOf2024Final: 125.2, percentOf2024Pace: 120.8 },
    { quarter: 'Q3', year: '2025', booked: 425000, pending: 89000, final: 514000, percentOf2024Final: 116.8, percentOf2024Pace: 114.5 }
  ];

  const yearTotals = {
    '2024': {
      booked: mockPacingData.filter(d => d.year === '2024').reduce((sum, d) => sum + d.booked, 0),
      final: mockPacingData.filter(d => d.year === '2024').reduce((sum, d) => sum + d.final, 0)
    },
    '2025': {
      booked: mockPacingData.filter(d => d.year === '2025').reduce((sum, d) => sum + d.booked, 0),
      final: mockPacingData.filter(d => d.year === '2025').reduce((sum, d) => sum + d.final, 0)
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const chartConfig = {
    booked: { label: "Booked $", color: "#8b5cf6" },
    pending: { label: "Pending $", color: "#06b6d4" },
    final: { label: "Final $", color: "#10b981" },
    percentOf2024Final: { label: "% of 2024 Final", color: "#f59e0b" }
  };

  return (
    <div className="space-y-6">
      <Card className="border-2 border-cyan-200 bg-gradient-to-br from-cyan-50 to-blue-50">
        <CardHeader className="bg-gradient-to-r from-cyan-600 to-blue-600 text-white rounded-t-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Calendar className="w-6 h-6" />
              <div>
                <CardTitle className="text-xl font-bold">13-Month Pacing Analysis</CardTitle>
                <CardDescription className="text-cyan-100">
                  Visualize advertiser pacing over 13+ months - {station}
                </CardDescription>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <select 
                value={selectedAdvertiser}
                onChange={(e) => setSelectedAdvertiser(e.target.value)}
                className="bg-white text-cyan-600 rounded-md px-3 py-2 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-cyan-300"
              >
                {advertisers.map(advertiser => (
                  <option key={advertiser} value={advertiser}>{advertiser}</option>
                ))}
              </select>
            </div>
          </div>
        </CardHeader>

        <CardContent className="p-6">
          {/* Year-level Totals */}
          <div className="grid grid-cols-2 gap-6 mb-6">
            <div className="bg-gradient-to-r from-purple-100 to-purple-200 p-4 rounded-lg">
              <h3 className="text-lg font-bold text-purple-800 mb-2">2024 Performance</h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-purple-700">Total Booked:</span>
                  <span className="font-bold text-purple-900">{formatCurrency(yearTotals['2024'].booked)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-purple-700">Total Final:</span>
                  <span className="font-bold text-purple-900">{formatCurrency(yearTotals['2024'].final)}</span>
                </div>
              </div>
            </div>
            <div className="bg-gradient-to-r from-green-100 to-green-200 p-4 rounded-lg">
              <h3 className="text-lg font-bold text-green-800 mb-2">2025 Performance</h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-green-700">Total Booked:</span>
                  <span className="font-bold text-green-900">{formatCurrency(yearTotals['2025'].booked)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-green-700">YoY Growth:</span>
                  <span className="font-bold text-green-900">
                    {((yearTotals['2025'].booked / yearTotals['2024'].booked - 1) * 100).toFixed(1)}%
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Chart */}
          <div className="bg-white rounded-lg shadow-lg p-4 mb-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-gray-800">Quarterly Pacing Trends</h3>
              <div className="flex space-x-4 text-sm">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                  <span>Booked $</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-cyan-500 rounded-full"></div>
                  <span>Pending $</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
                  <span>% of 2024 Final</span>
                </div>
              </div>
            </div>
            
            <ChartContainer config={chartConfig} className="h-80">
              <ComposedChart data={mockPacingData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis 
                  dataKey={(data) => `${data.quarter} ${data.year}`}
                  tick={{ fontSize: 12 }}
                  angle={-45}
                  textAnchor="end"
                  height={80}
                />
                <YAxis yAxisId="left" tick={{ fontSize: 12 }} />
                <YAxis yAxisId="right" orientation="right" tick={{ fontSize: 12 }} />
                <Tooltip 
                  content={({ active, payload, label }) => {
                    if (active && payload && payload.length) {
                      return (
                        <div className="bg-white p-4 border rounded-lg shadow-lg">
                          <p className="font-bold text-gray-800 mb-2">{label}</p>
                          {payload.map((entry, index) => (
                            <div key={index} className="flex justify-between items-center mb-1">
                              <span className="text-gray-600 mr-4">{entry.name}:</span>
                              <span className="font-bold" style={{ color: entry.color }}>
                                {entry.name?.includes('%') ? `${entry.value}%` : formatCurrency(Number(entry.value))}
                              </span>
                            </div>
                          ))}
                          <div className="mt-2 pt-2 border-t text-xs text-gray-500">
                            <div>% of 2024 Final = (2025 Booked / 2024 Final) × 100</div>
                            <div>% of 2024 Pace = (2025 Booked / 2024 Pace) × 100</div>
                          </div>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <Bar yAxisId="left" dataKey="booked" fill="#8b5cf6" name="Booked $" />
                <Bar yAxisId="left" dataKey="pending" fill="#06b6d4" name="Pending $" />
                <Line yAxisId="right" type="monotone" dataKey="percentOf2024Final" stroke="#f59e0b" strokeWidth={3} name="% of 2024 Final" />
              </ComposedChart>
            </ChartContainer>
          </div>

          {/* Formula Legend */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="flex items-center space-x-2 mb-3">
              <Info className="w-5 h-5 text-blue-500" />
              <h4 className="font-bold text-gray-800">Calculation Formulas</h4>
            </div>
            <div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
              <div>
                <span className="font-medium">% of 2024 Final:</span> (2025 Booked / 2024 Final) × 100
              </div>
              <div>
                <span className="font-medium">% of 2024 Pace:</span> (2025 Booked / 2024 Pace) × 100
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PacingView;
