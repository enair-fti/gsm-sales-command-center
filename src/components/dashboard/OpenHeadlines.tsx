
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Download, Filter, MessageSquare } from 'lucide-react';
import { fetchHeadlineData } from '@/utils/referenceData';

interface OpenHeadlinesProps {
  filters: {
    agency: string;
    advertiser: string;
    station: string;
    market: string;
    quarter: string;
    year: string;
  };
}

const OpenHeadlines: React.FC<OpenHeadlinesProps> = ({ filters }) => {
  const [headlineData, setHeadlineData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [filterStatus, setFilterStatus] = useState('All');

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const data = await fetchHeadlineData(filters);
        setHeadlineData(data);
      } catch (error) {
        console.error('Error fetching headline data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [filters, filterStatus]);

  const exportData = () => {
    const csvContent = "data:text/csv;charset=utf-8," 
      + "Client,Product,Access,Station,Market,Flight Schedule,Cost,Length,Programming,Days,Times\n"
      + headlineData.map(row => 
          `"${row.client_name || ''}","${row.product_name || ''}","${row.access_name || ''}","${row.station_name || ''}","${row.market || ''}","${row.flight_schedule || ''}","${row.cost || ''}","${row.len || ''}","${row.programming || ''}","${row.days || ''}","${row.times || ''}"`
        ).join("\n");
    
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "headline_data.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (loading) {
    return (
      <div className="h-full flex items-center justify-center">
        <div className="text-lg text-gray-600">Loading headline data...</div>
      </div>
    );
  }

  return (
    <div className="h-full overflow-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-gray-900">Open Headlines & Buylines</h2>
          <p className="text-sm text-gray-600">Headlines from media schedules and order data</p>
        </div>
        <div className="flex items-center space-x-3">
          <button
            onClick={exportData}
            className="flex items-center space-x-2 px-3 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
          >
            <Download className="w-4 h-4" />
            <span>Export</span>
          </button>
          <Badge variant="outline" className="text-sm">
            {headlineData.length} Headlines
          </Badge>
        </div>
      </div>

      {/* Summary Cards */}
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
            <div className="text-2xl font-bold text-gray-900">
              {new Set(headlineData.map(item => item.client_name).filter(Boolean)).size}
            </div>
            <div className="text-sm text-gray-600">Different advertisers</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Stations</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">
              {new Set(headlineData.map(item => item.station_name).filter(Boolean)).size}
            </div>
            <div className="text-sm text-gray-600">Active stations</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Markets</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">
              {new Set(headlineData.map(item => item.market).filter(Boolean)).size}
            </div>
            <div className="text-sm text-gray-600">Different markets</div>
          </CardContent>
        </Card>
      </div>

      {/* Headlines Table */}
      <Card>
        <CardHeader>
          <CardTitle>Headlines Detail</CardTitle>
          <CardDescription>Data from 1test_llama_gemini table</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Client</TableHead>
                  <TableHead>Product</TableHead>
                  <TableHead>Access/Agency</TableHead>
                  <TableHead>Station</TableHead>
                  <TableHead>Market</TableHead>
                  <TableHead>Flight Schedule</TableHead>
                  <TableHead>Cost</TableHead>
                  <TableHead>Length</TableHead>
                  <TableHead>Programming</TableHead>
                  <TableHead>Days</TableHead>
                  <TableHead>Times</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {headlineData.map((row, index) => (
                  <TableRow key={index} className="hover:bg-gray-50">
                    <TableCell className="font-medium">{row.client_name || '-'}</TableCell>
                    <TableCell>{row.product_name || '-'}</TableCell>
                    <TableCell>{row.access_name || '-'}</TableCell>
                    <TableCell>{row.station_name || '-'}</TableCell>
                    <TableCell>{row.market || '-'}</TableCell>
                    <TableCell>{row.flight_schedule || '-'}</TableCell>
                    <TableCell>{row.cost || '-'}</TableCell>
                    <TableCell>{row.len || '-'}</TableCell>
                    <TableCell>{row.programming || '-'}</TableCell>
                    <TableCell>{row.days || '-'}</TableCell>
                    <TableCell>{row.times || '-'}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default OpenHeadlines;
