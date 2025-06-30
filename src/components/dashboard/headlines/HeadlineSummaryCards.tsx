
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface HeadlineSummaryCardsProps {
  headlineData: any[];
}

export const HeadlineSummaryCards: React.FC<HeadlineSummaryCardsProps> = ({ headlineData }) => {
  const uniqueClients = new Set(headlineData.map(item => item.client_name).filter(Boolean)).size;
  const uniqueStations = new Set(headlineData.map(item => item.station_name).filter(Boolean)).size;
  const uniqueMarkets = new Set(headlineData.map(item => item.market).filter(Boolean)).size;

  return (
    <div className="grid grid-cols-4 gap-4">
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-gray-600">Total Headlines</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-gray-900">{headlineData.length}</div>
          <div className="text-sm text-gray-600">Records found</div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-gray-600">Unique Clients</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-gray-900">{uniqueClients}</div>
          <div className="text-sm text-gray-600">Different advertisers</div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-gray-600">Stations</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-gray-900">{uniqueStations}</div>
          <div className="text-sm text-gray-600">Active stations</div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-gray-600">Markets</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-gray-900">{uniqueMarkets}</div>
          <div className="text-sm text-gray-600">Different markets</div>
        </CardContent>
      </Card>
    </div>
  );
};
