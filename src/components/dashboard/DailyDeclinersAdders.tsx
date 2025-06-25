
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface DailyDeclinersAddersProps {
  station: string;
}

const DailyDeclinersAdders: React.FC<DailyDeclinersAddersProps> = ({ station }) => {
  const decliners = [
    { advertiser: "Tech Startup", previousBudget: "$5,200", newBudget: "$3,800", change: -1400, reason: "Budget cuts", account: "Sarah Johnson" },
    { advertiser: "Furniture Store", previousBudget: "$3,100", newBudget: "$2,400", change: -700, reason: "Seasonal adjustment", account: "Mike Chen" },
    { advertiser: "Insurance Agency", previousBudget: "$4,800", newBudget: "$4,100", change: -700, reason: "Campaign end", account: "Lisa Wong" },
  ];

  const adders = [
    { advertiser: "Holiday Resort", previousBudget: "$2,800", newBudget: "$4,200", change: 1400, reason: "Summer promotion", account: "Tom Rodriguez" },
    { advertiser: "Auto Dealership", previousBudget: "$6,200", newBudget: "$8,800", change: 2600, reason: "New model launch", account: "Jennifer Davis" },
    { advertiser: "Healthcare Network", previousBudget: "$3,500", newBudget: "$5,100", change: 1600, reason: "Expansion campaign", account: "David Kim" },
  ];

  const openOrders = [
    { id: "ORD-2024-0847", advertiser: "Coffee Chain", amount: "$2,400", deadline: "Today 5PM", status: "Pending approval", priority: "high" },
    { id: "ORD-2024-0848", advertiser: "Gym Franchise", amount: "$1,850", deadline: "Tomorrow 10AM", status: "Awaiting creative", priority: "medium" },
    { id: "ORD-2024-0849", advertiser: "Law Firm", amount: "$3,200", deadline: "Dec 28", status: "In production", priority: "low" },
    { id: "ORD-2024-0850", advertiser: "Restaurant", amount: "$950", deadline: "Today 3PM", status: "Spot conflict", priority: "high" },
  ];

  return (
    <div className="h-full overflow-auto">
      <Tabs defaultValue="changes" className="h-full">
        <TabsList className="grid w-full grid-cols-2 mb-6">
          <TabsTrigger value="changes">Budget Changes</TabsTrigger>
          <TabsTrigger value="open-orders">Open Orders</TabsTrigger>
        </TabsList>
        
        <TabsContent value="changes" className="space-y-6">
          {/* Summary Cards */}
          <div className="grid grid-cols-3 gap-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">Decliners Today</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-red-600">3</div>
                <div className="text-sm text-gray-500">-$2,800 total impact</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">Adders Today</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-600">3</div>
                <div className="text-sm text-gray-500">+$5,600 total impact</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">Net Change</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-600">+$2,800</div>
                <div className="text-sm text-gray-500">Positive day overall</div>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-2 gap-6">
            {/* Decliners */}
            <Card>
              <CardHeader>
                <CardTitle className="text-red-600">Budget Decliners</CardTitle>
                <CardDescription>Accounts that reduced their spending today</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {decliners.map((item, index) => (
                    <div key={index} className="border-l-4 border-red-500 pl-4 py-2">
                      <div className="flex justify-between items-start">
                        <div>
                          <div className="font-medium text-gray-900">{item.advertiser}</div>
                          <div className="text-sm text-gray-600">{item.reason}</div>
                          <div className="text-xs text-gray-500">Account: {item.account}</div>
                        </div>
                        <div className="text-right">
                          <div className="text-sm text-gray-500">{item.previousBudget} → {item.newBudget}</div>
                          <div className="font-bold text-red-600">{item.change}</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Adders */}
            <Card>
              <CardHeader>
                <CardTitle className="text-green-600">Budget Adders</CardTitle>
                <CardDescription>Accounts that increased their spending today</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {adders.map((item, index) => (
                    <div key={index} className="border-l-4 border-green-500 pl-4 py-2">
                      <div className="flex justify-between items-start">
                        <div>
                          <div className="font-medium text-gray-900">{item.advertiser}</div>
                          <div className="text-sm text-gray-600">{item.reason}</div>
                          <div className="text-xs text-gray-500">Account: {item.account}</div>
                        </div>
                        <div className="text-right">
                          <div className="text-sm text-gray-500">{item.previousBudget} → {item.newBudget}</div>
                          <div className="font-bold text-green-600">+{item.change}</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="open-orders" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Open Orders Requiring Attention</CardTitle>
              <CardDescription>Orders pending action or experiencing issues</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {openOrders.map((order, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2">
                        <div className="font-medium text-gray-900">{order.advertiser}</div>
                        <Badge variant={order.priority === 'high' ? 'destructive' : order.priority === 'medium' ? 'default' : 'secondary'}>
                          {order.priority}
                        </Badge>
                      </div>
                      <div className="text-sm text-gray-600">{order.id}</div>
                      <div className="text-sm text-gray-500">{order.status}</div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-gray-900">{order.amount}</div>
                      <div className="text-sm text-gray-500">Due: {order.deadline}</div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default DailyDeclinersAdders;
