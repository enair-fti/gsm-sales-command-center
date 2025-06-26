
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
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Sales Enablement Dashboard</h1>
            <p className="text-sm text-gray-600">Real-time broadcast media analytics for General Sales Managers</p>
          </div>
          <div className="flex items-center space-x-4">
            <select 
              value={selectedStation}
              onChange={(e) => setSelectedStation(e.target.value)}
              className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option>All Stations</option>
              <option>Providence</option>
              <option>Boston Metro</option>
              <option>Hartford</option>
              <option>Springfield</option>
            </select>
            <div className="text-right">
              <div className="text-sm font-medium text-gray-900">Q4 2024</div>
              <div className="text-xs text-gray-500">Last updated: 2 min ago</div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex h-[calc(100vh-80px)]">
        {/* Main Dashboard Content */}
        <div className="flex-1 p-6">
          <Tabs defaultValue="daily-status" className="h-full">
            <TabsList className="grid w-full grid-cols-5 mb-6">
              <TabsTrigger value="daily-status">Daily Status</TabsTrigger>
              <TabsTrigger value="monthly-projections">Monthly Projections</TabsTrigger>
              <TabsTrigger value="decliners-adders">Decliners/Adders</TabsTrigger>
              <TabsTrigger value="top-advertisers">Top 100 Advertisers</TabsTrigger>
              <TabsTrigger value="quarterly-performance">Quarterly Performance</TabsTrigger>
            </TabsList>
            
            <TabsContent value="daily-status" className="h-[calc(100%-60px)]">
              <DailyStationStatus station={selectedStation} />
            </TabsContent>
            
            <TabsContent value="monthly-projections" className="h-[calc(100%-60px)]">
              <MonthlyProjections station={selectedStation} />
            </TabsContent>
            
            <TabsContent value="decliners-adders" className="h-[calc(100%-60px)]">
              <DailyDeclinersAdders station={selectedStation} />
            </TabsContent>
            
            <TabsContent value="top-advertisers" className="h-[calc(100%-60px)]">
              <TopAdvertisers station={selectedStation} />
            </TabsContent>
            
            <TabsContent value="quarterly-performance" className="h-[calc(100%-60px)]">
              <QuarterlyPerformance station={selectedStation} />
            </TabsContent>
          </Tabs>
        </div>

        {/* AI Chatbot Panel */}
        <div className="w-80 bg-white border-l border-gray-200">
          <AIChatbot />
        </div>
      </div>
    </div>
  );
};

export default Index;
