
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import DailyStationStatus from '@/components/dashboard/DailyStationStatus';
import DailyDeclinersAdders from '@/components/dashboard/DailyDeclinersAdders';
import TopAdvertisers from '@/components/dashboard/TopAdvertisers';
import QuarterlyPerformance from '@/components/dashboard/QuarterlyPerformance';
import MonthlyProjections from '@/components/dashboard/MonthlyProjections';
import CompetitiveAnalysis from '@/components/dashboard/CompetitiveAnalysis';
import PacingView from '@/components/dashboard/PacingView';
import DeclinersAdders from '@/components/dashboard/DeclinersAdders';
import AIChatbot from '@/components/dashboard/AIChatbot';

const Index = () => {
  const [selectedStation, setSelectedStation] = useState('All Stations');
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 border-b-4 border-yellow-400 px-6 py-6 shadow-lg">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-white drop-shadow-lg">Sales Enablement Dashboard</h1>
            <p className="text-lg text-blue-100 mt-1">Real-time broadcast media analytics for General Sales Managers</p>
          </div>
          <div className="flex items-center space-x-4">
            <select 
              value={selectedStation}
              onChange={(e) => setSelectedStation(e.target.value)}
              className="border-2 border-white bg-white/95 backdrop-blur rounded-lg px-4 py-3 text-sm font-medium focus:outline-none focus:ring-4 focus:ring-yellow-300 shadow-lg"
            >
              <option>All Stations</option>
              <option>Providence</option>
              <option>Boston Metro</option>
              <option>Hartford</option>
              <option>Springfield</option>
            </select>
            <div className="text-right bg-white/20 backdrop-blur rounded-lg p-3 border border-white/30">
              <div className="text-sm font-bold text-white">Q4 2024</div>
              <div className="text-xs text-blue-100">Last updated: 2 min ago</div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex h-[calc(100vh-120px)]">
        {/* Main Dashboard Content */}
        <div className="flex-1 p-6">
          <Tabs defaultValue="competitive-analysis" className="h-full">
            <TabsList className="grid w-full grid-cols-7 mb-6 bg-white/80 backdrop-blur border-2 border-purple-200 shadow-lg rounded-xl p-2">
              <TabsTrigger value="competitive-analysis" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-500 data-[state=active]:to-pink-500 data-[state=active]:text-white font-semibold rounded-lg transition-all duration-200">
                Competitive Analysis
              </TabsTrigger>
              <TabsTrigger value="pacing-view" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-cyan-500 data-[state=active]:to-blue-500 data-[state=active]:text-white font-semibold rounded-lg transition-all duration-200">
                13-Month Pacing
              </TabsTrigger>
              <TabsTrigger value="daily-status" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-green-500 data-[state=active]:to-emerald-500 data-[state=active]:text-white font-semibold rounded-lg transition-all duration-200">
                Daily Status
              </TabsTrigger>
              <TabsTrigger value="monthly-projections" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-indigo-500 data-[state=active]:text-white font-semibold rounded-lg transition-all duration-200">
                Monthly Projections
              </TabsTrigger>
              <TabsTrigger value="decliners-adders" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-orange-500 data-[state=active]:to-red-500 data-[state=active]:text-white font-semibold rounded-lg transition-all duration-200">
                Decliners/Adders
              </TabsTrigger>
              <TabsTrigger value="top-advertisers" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-yellow-500 data-[state=active]:to-orange-500 data-[state=active]:text-white font-semibold rounded-lg transition-all duration-200">
                Top 100 Advertisers
              </TabsTrigger>
              <TabsTrigger value="quarterly-performance" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-teal-500 data-[state=active]:to-cyan-500 data-[state=active]:text-white font-semibold rounded-lg transition-all duration-200">
                Quarterly Performance
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="competitive-analysis" className="h-[calc(100%-80px)] overflow-y-auto">
              <CompetitiveAnalysis station={selectedStation} />
            </TabsContent>
            
            <TabsContent value="pacing-view" className="h-[calc(100%-80px)] overflow-y-auto">
              <PacingView station={selectedStation} />
            </TabsContent>
            
            <TabsContent value="daily-status" className="h-[calc(100%-80px)] overflow-y-auto">
              <DailyStationStatus station={selectedStation} />
            </TabsContent>
            
            <TabsContent value="monthly-projections" className="h-[calc(100%-80px)] overflow-y-auto">
              <MonthlyProjections station={selectedStation} />
            </TabsContent>
            
            <TabsContent value="decliners-adders" className="h-[calc(100%-80px)] overflow-y-auto">
              <DeclinersAdders station={selectedStation} />
            </TabsContent>
            
            <TabsContent value="top-advertisers" className="h-[calc(100%-80px)] overflow-y-auto">
              <TopAdvertisers station={selectedStation} />
            </TabsContent>
            
            <TabsContent value="quarterly-performance" className="h-[calc(100%-80px)] overflow-y-auto">
              <QuarterlyPerformance station={selectedStation} />
            </TabsContent>
          </Tabs>
        </div>

        {/* AI Chatbot Panel */}
        <div className="w-80 bg-white/90 backdrop-blur border-l-4 border-purple-300 shadow-2xl">
          <AIChatbot />
        </div>
      </div>
    </div>
  );
};

export default Index;
