
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import DailyStationStatus from '@/components/dashboard/DailyStationStatus';
import DailyDeclinersAdders from '@/components/dashboard/DailyDeclinersAdders';
import TopAdvertisers from '@/components/dashboard/TopAdvertisers';
import QuarterlyPerformance from '@/components/dashboard/QuarterlyPerformance';
import MonthlyProjections from '@/components/dashboard/MonthlyProjections';
import OpenHeadlines from '@/components/dashboard/OpenHeadlines';
import GlobalFilters from '@/components/dashboard/GlobalFilters';
import AIChatbot from '@/components/dashboard/AIChatbot';

const Index = () => {
  const [selectedStation, setSelectedStation] = useState('All Stations');
  const [globalFilters, setGlobalFilters] = useState({
    agency: 'All Agencies',
    advertiser: 'All Advertisers',
    station: 'All Stations',
    quarter: 'All Quarters',
    year: 'All Years'
  });

  const handleFilterChange = (key: string, value: string) => {
    setGlobalFilters(prev => ({
      ...prev,
      [key]: value
    }));
    
    // Sync station filter with selectedStation for backward compatibility
    if (key === 'station') {
      setSelectedStation(value);
    }
  };

  const handleClearFilters = () => {
    const clearedFilters = {
      agency: 'All Agencies',
      advertiser: 'All Advertisers',
      station: 'All Stations',
      quarter: 'All Quarters',
      year: 'All Years'
    };
    setGlobalFilters(clearedFilters);
    setSelectedStation('All Stations');
  };
  
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4 shadow-sm">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Sales Enablement Dashboard</h1>
            <p className="text-sm text-gray-600">Professional broadcast media analytics for General Sales Managers</p>
          </div>
          <div className="flex items-center space-x-4">
            <select 
              value={selectedStation}
              onChange={(e) => {
                setSelectedStation(e.target.value);
                handleFilterChange('station', e.target.value);
              }}
              className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
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
        <div className="flex-1 p-6 overflow-auto">
          {/* Global Filters */}
          <GlobalFilters
            filters={globalFilters}
            onFilterChange={handleFilterChange}
            onClearFilters={handleClearFilters}
          />

          <Tabs defaultValue="daily-status" className="h-full">
            <TabsList className="grid w-full grid-cols-6 mb-6 bg-white border border-gray-200">
              <TabsTrigger value="daily-status" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white">
                Daily Status
              </TabsTrigger>
              <TabsTrigger value="top-advertisers" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white">
                Top 100 Advertisers
              </TabsTrigger>
              <TabsTrigger value="decliners-adders" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white">
                Decliners/Adders
              </TabsTrigger>
              <TabsTrigger value="quarterly-performance" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white">
                Quarterly Performance
              </TabsTrigger>
              <TabsTrigger value="monthly-projections" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white">
                Monthly Projections
              </TabsTrigger>
              <TabsTrigger value="open-headlines" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white">
                Open Headlines
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="daily-status" className="h-[calc(100%-60px)]">
              <DailyStationStatus station={selectedStation} filters={globalFilters} />
            </TabsContent>
            
            <TabsContent value="top-advertisers" className="h-[calc(100%-60px)]">
              <TopAdvertisers station={selectedStation} filters={globalFilters} />
            </TabsContent>
            
            <TabsContent value="decliners-adders" className="h-[calc(100%-60px)]">
              <DailyDeclinersAdders station={selectedStation} filters={globalFilters} />
            </TabsContent>
            
            <TabsContent value="quarterly-performance" className="h-[calc(100%-60px)]">
              <QuarterlyPerformance station={selectedStation} filters={globalFilters} />
            </TabsContent>
            
            <TabsContent value="monthly-projections" className="h-[calc(100%-60px)]">
              <MonthlyProjections station={selectedStation} filters={globalFilters} />
            </TabsContent>
            
            <TabsContent value="open-headlines" className="h-[calc(100%-60px)]">
              <OpenHeadlines filters={globalFilters} />
            </TabsContent>
          </Tabs>
        </div>

        {/* AI Chatbot Panel */}
        <div className="w-80 bg-white border-l border-gray-200 shadow-sm">
          <AIChatbot />
        </div>
      </div>
    </div>
  );
};

export default Index;
