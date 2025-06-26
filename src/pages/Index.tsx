
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import DailyStationStatus from '@/components/dashboard/DailyStationStatus';
import DailyDeclinersAdders from '@/components/dashboard/DailyDeclinersAdders';
import TopAdvertisers from '@/components/dashboard/TopAdvertisers';
import QuarterlyPerformance from '@/components/dashboard/QuarterlyPerformance';
import MonthlyProjections from '@/components/dashboard/MonthlyProjections';
import AIChatbot from '@/components/dashboard/AIChatbot';

const Index = () => {
  const [selectedStation, setSelectedStation] = useState('All Stations');
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-400 via-pink-400 to-orange-400">
      {/* Header */}
      <div className="bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-600 border-b-4 border-yellow-400 px-6 py-6 shadow-2xl">
        <div className="flex items-center justify-between">
          <div className="backdrop-blur-sm bg-white/20 rounded-2xl p-4 border border-white/30">
            <h1 className="text-3xl font-black text-white drop-shadow-lg bg-gradient-to-r from-yellow-300 to-pink-300 bg-clip-text text-transparent">
              Sales Enablement Dashboard
            </h1>
            <p className="text-white/90 text-sm font-medium mt-1">
              🚀 Real-time broadcast media analytics for General Sales Managers
            </p>
          </div>
          <div className="flex items-center space-x-6">
            <div className="backdrop-blur-sm bg-white/20 rounded-xl p-3 border border-white/30">
              <select 
                value={selectedStation}
                onChange={(e) => setSelectedStation(e.target.value)}
                className="bg-gradient-to-r from-yellow-400 to-orange-400 text-gray-900 font-bold border-2 border-white rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-4 focus:ring-pink-300 shadow-lg"
              >
                <option>All Stations</option>
                <option>Providence</option>
                <option>Boston Metro</option>
                <option>Hartford</option>
                <option>Springfield</option>
              </select>
            </div>
            <div className="text-right backdrop-blur-sm bg-white/20 rounded-xl p-3 border border-white/30">
              <div className="text-lg font-black text-yellow-300 drop-shadow-md">Q4 2024</div>
              <div className="text-xs text-white/90 font-medium">⚡ Last updated: 2 min ago</div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex h-[calc(100vh-120px)]">
        {/* Main Dashboard Content */}
        <div className="flex-1 p-6">
          <Tabs defaultValue="daily-status" className="h-full">
            <TabsList className="grid w-full grid-cols-5 mb-6 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 p-2 rounded-2xl shadow-xl border-2 border-white/50">
              <TabsTrigger 
                value="daily-status" 
                className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-yellow-400 data-[state=active]:to-orange-400 data-[state=active]:text-gray-900 data-[state=active]:font-black text-white font-bold rounded-xl transition-all duration-300 hover:scale-105"
              >
                📊 Daily Status
              </TabsTrigger>
              <TabsTrigger 
                value="monthly-projections"
                className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-green-400 data-[state=active]:to-blue-400 data-[state=active]:text-gray-900 data-[state=active]:font-black text-white font-bold rounded-xl transition-all duration-300 hover:scale-105"
              >
                📈 Monthly Projections
              </TabsTrigger>
              <TabsTrigger 
                value="decliners-adders"
                className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-pink-400 data-[state=active]:to-red-400 data-[state=active]:text-gray-900 data-[state=active]:font-black text-white font-bold rounded-xl transition-all duration-300 hover:scale-105"
              >
                📉📈 Decliners/Adders
              </TabsTrigger>
              <TabsTrigger 
                value="top-advertisers"
                className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-cyan-400 data-[state=active]:to-teal-400 data-[state=active]:text-gray-900 data-[state=active]:font-black text-white font-bold rounded-xl transition-all duration-300 hover:scale-105"
              >
                🏆 Top 100 Advertisers
              </TabsTrigger>
              <TabsTrigger 
                value="quarterly-performance"
                className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-400 data-[state=active]:to-indigo-400 data-[state=active]:text-gray-900 data-[state=active]:font-black text-white font-bold rounded-xl transition-all duration-300 hover:scale-105"
              >
                📅 Quarterly Performance
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="daily-status" className="h-[calc(100%-80px)]">
              <DailyStationStatus station={selectedStation} />
            </TabsContent>
            
            <TabsContent value="monthly-projections" className="h-[calc(100%-80px)]">
              <MonthlyProjections station={selectedStation} />
            </TabsContent>
            
            <TabsContent value="decliners-adders" className="h-[calc(100%-80px)]">
              <DailyDeclinersAdders station={selectedStation} />
            </TabsContent>
            
            <TabsContent value="top-advertisers" className="h-[calc(100%-80px)]">
              <TopAdvertisers station={selectedStation} />
            </TabsContent>
            
            <TabsContent value="quarterly-performance" className="h-[calc(100%-80px)]">
              <QuarterlyPerformance station={selectedStation} />
            </TabsContent>
          </Tabs>
        </div>

        {/* AI Chatbot Panel */}
        <div className="w-80 bg-gradient-to-b from-indigo-500 via-purple-500 to-pink-500 border-l-4 border-yellow-400 shadow-2xl">
          <AIChatbot />
        </div>
      </div>
    </div>
  );
};

export default Index;
