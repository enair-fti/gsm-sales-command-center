import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Download, Filter, MessageSquare } from 'lucide-react';
import { getHeadlinesData } from '@/utils/supabaseQueries';

interface OpenHeadlinesProps {
  filters: {
    agency: string;
    advertiser: string;
    station: string;
    quarter: string;
    year: string;
  };
}

const OpenHeadlines: React.FC<OpenHeadlinesProps> = ({ filters }) => {
  const [headlineData, setHeadlineData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [filterStatus, setFilterStatus] = useState('All');
  const [filterDateRange, setFilterDateRange] = useState('All');

  useEffect(() => {
    const fetchHeadlineData = async () => {
      try {
        setLoading(true);
        console.log('Fetching headline data with filters:', filters);
        
        const data = await getHeadlinesData(filters);
        
        // If no real data, use mock data
        if (!data || data.length === 0) {
          console.log('No real headline data found, using mock data');
          const mockHeadlines = [
            {
              headline_id: 'HL-2024-001',
              buyline_number: 'BL-001',
              status: 'Active',
              start_date: '2024-01-15',
              end_date: '2024-03-15',
              spot_length: 30,
              total_spots: 120,
              daypart: 'Prime Time',
              market: 'Providence',
              agency: 'Zenith Media',
              advertiser: 'Toyota',
              station: 'WPRO-FM',
              comments: 'Standard automotive campaign',
              billing_amount: 45000,
              spots_ordered: 120,
              spots_delivered: 98
            },
            {
              headline_id: 'HL-2024-002',
              buyline_number: 'BL-002',
              status: 'Pending',
              start_date: '2024-02-01',
              end_date: '2024-04-01',
              spot_length: 60,
              total_spots: 80,
              daypart: 'Morning Drive',
              market: 'Boston Metro',
              agency: 'GroupM',
              advertiser: 'McDonald\'s',
              station: 'WXKS-FM',
              comments: 'Q1 promotional campaign',
              billing_amount: 32000,
              spots_ordered: 80,
              spots_delivered: 65
            },
            {
              headline_id: 'HL-2024-003',
              buyline_number: 'BL-003',
              status: 'Incomplete',
              start_date: '2024-01-08',
              end_date: '2024-02-28',
              spot_length: 30,
              total_spots: 150,
              daypart: 'Afternoon',
              market: 'Hartford',
              agency: 'Publicis',
              advertiser: 'Coca-Cola',
              station: 'WKFD-FM',
              comments: 'Missing creative approval',
              billing_amount: 28500,
              spots_ordered: 150,
              spots_delivered: 140
            },
            {
              headline_id: 'HL-2024-004',
              buyline_number: 'BL-004',
              status: 'Cancelled',
              start_date: '2024-03-01',
              end_date: '2024-05-01',
              spot_length: 15,
              total_spots: 200,
              daypart: 'Evening',
              market: 'Springfield',
              agency: 'Omnicom',
              advertiser: 'Walmart',
              station: 'WFHN-FM',
              comments: 'Budget reallocation',
              billing_amount: 15000,
              spots_ordered: 200,
              spots_delivered: 0
            }
          ];
          setHeadlineData(mockHeadlines);
        } else {
          console.log('Using real headline data:', data.length, 'records');
          setHeadlineData(data);
        }

        // Apply filters
        let filteredData = headlineData;
        
        if (filters.agency && !filters.agency.startsWith('All')) {
          filteredData = filteredData.filter(item => item.agency === filters.agency);
        }
        if (filters.advertiser && !filters.advertiser.startsWith('All')) {
          filteredData = filteredData.filter(item => item.advertiser === filters.advertiser);
        }
        if (filters.station && !filters.station.startsWith('All')) {
          filteredData = filteredData.filter(item => item.station?.includes(filters.station));
        }
        if (filterStatus !== 'All') {
          filteredData = filteredData.filter(item => item.status === filterStatus);
        }

        setHeadlineData(filteredData);
      } catch (error) {
        console.error('Error fetching headline data:', error);
        console.log('Using fallback mock data due to error');
        // Set minimal mock data on error
        setHeadlineData([
          {
            headline_id: 'HL-MOCK-001',
            buyline_number: 'BL-MOCK-001',
            status: 'Active',
            start_date: '2024-01-15',
            end_date: '2024-03-15',
            advertiser: 'Sample Advertiser',
            agency: 'Sample Agency',
            station: 'Sample Station',
            spots_ordered: 100,
            spots_delivered: 85,
            billing_amount: 25000
          }
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchHeadlineData();
  }, [filters, filterStatus, filterDateRange]);

  const exportData = () => {
    const csvContent = "data:text/csv;charset=utf-8," 
      + "Headline ID,Buyline,Status,Start Date,End Date,Spot Length,Total Spots,Daypart,Market,Agency,Advertiser,Station,Comments,Billing Amount\n"
      + headlineData.map(row => 
          `${row.headline_id},${row.buyline_number},${row.status},${row.start_date},${row.end_date},${row.spot_length},${row.total_spots},${row.daypart},${row.market},${row.agency},${row.advertiser},${row.station},"${row.comments}",${row.billing_amount}`
        ).join("\n");
    
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "open_headlines_buylines.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active': return 'bg-green-100 text-green-800';
      case 'Pending': return 'bg-yellow-100 text-yellow-800';
      case 'Incomplete': return 'bg-orange-100 text-orange-800';
      case 'Cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getDeliveryStatus = (delivered: number, ordered: number) => {
    const percentage = (delivered / ordered) * 100;
    if (percentage >= 95) return 'text-green-600';
    if (percentage >= 80) return 'text-yellow-600';
    return 'text-red-600';
  };

  if (loading) {
    return (
      <div className="h-full flex items-center justify-center">
        <div className="text-lg text-gray-600">Loading headlines data...</div>
      </div>
    );
  }

  return (
    <div className="h-full overflow-auto space-y-6">
      {/* Header with Filters */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-gray-900">Open Headlines & Buylines</h2>
          <p className="text-sm text-gray-600">Active and pending headline/buyline status tracking</p>
        </div>
        <div className="flex items-center space-x-3">
          <div className="flex items-center space-x-2">
            <Filter className="w-4 h-4 text-gray-500" />
            <select 
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="border border-gray-300 rounded-md px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="All">All Status</option>
              <option value="Active">Active</option>
              <option value="Pending">Pending</option>
              <option value="Incomplete">Incomplete</option>
              <option value="Cancelled">Cancelled</option>
            </select>
          </div>
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
            <div className="text-sm text-gray-600">Active campaigns</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Total Billing</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">
              ${headlineData.reduce((sum, item) => sum + (item.billing_amount || 0), 0).toLocaleString()}
            </div>
            <div className="text-sm text-gray-600">Combined value</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Spots Ordered</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">
              {headlineData.reduce((sum, item) => sum + (item.spots_ordered || 0), 0).toLocaleString()}
            </div>
            <div className="text-sm text-gray-600">Total spots</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Delivery Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">
              {headlineData.length > 0 ? 
                ((headlineData.reduce((sum, item) => sum + (item.spots_delivered || 0), 0) / 
                  headlineData.reduce((sum, item) => sum + (item.spots_ordered || 1), 0)) * 100).toFixed(1) : '0.0'}%
            </div>
            <div className="text-sm text-gray-600">Spots delivered</div>
          </CardContent>
        </Card>
      </div>

      {/* Headlines Table */}
      <Card>
        <CardHeader>
          <CardTitle>Headlines & Buylines Detail</CardTitle>
          <CardDescription>Complete view of all headline and buyline activity</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Headline ID</TableHead>
                  <TableHead>Buyline #</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Advertiser</TableHead>
                  <TableHead>Agency</TableHead>
                  <TableHead>Market</TableHead>
                  <TableHead>Station</TableHead>
                  <TableHead>Flight Dates</TableHead>
                  <TableHead>Daypart</TableHead>
                  <TableHead>Length</TableHead>
                  <TableHead className="text-right">Billing $</TableHead>
                  <TableHead className="text-right">Spots</TableHead>
                  <TableHead className="text-right">Delivery %</TableHead>
                  <TableHead>Comments</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {headlineData.map((row, index) => (
                  <TableRow key={index} className="hover:bg-gray-50">
                    <TableCell className="font-medium text-blue-600">{row.headline_id}</TableCell>
                    <TableCell>{row.buyline_number}</TableCell>
                    <TableCell>
                      <Badge className={`${getStatusColor(row.status)} text-xs`}>
                        {row.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="font-medium">{row.advertiser}</TableCell>
                    <TableCell>{row.agency}</TableCell>
                    <TableCell>{row.market}</TableCell>
                    <TableCell>{row.station}</TableCell>
                    <TableCell>
                      <div className="text-sm">
                        <div>{row.start_date}</div>
                        <div className="text-gray-500">to {row.end_date}</div>
                      </div>
                    </TableCell>
                    <TableCell>{row.daypart}</TableCell>
                    <TableCell>{row.spot_length}s</TableCell>
                    <TableCell className="text-right font-bold">
                      ${(row.billing_amount || 0).toLocaleString()}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="text-sm">
                        <div>{row.spots_delivered || 0}</div>
                        <div className="text-gray-500">of {row.spots_ordered || 0}</div>
                      </div>
                    </TableCell>
                    <TableCell className={`text-right font-medium ${getDeliveryStatus(row.spots_delivered || 0, row.spots_ordered || 1)}`}>
                      {row.spots_ordered ? (((row.spots_delivered || 0) / row.spots_ordered) * 100).toFixed(1) : '0.0'}%
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-1">
                        <MessageSquare className="w-3 h-3 text-gray-400" />
                        <span className="text-xs text-gray-600 truncate max-w-32">
                          {row.comments || 'No comments'}
                        </span>
                      </div>
                    </TableCell>
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
