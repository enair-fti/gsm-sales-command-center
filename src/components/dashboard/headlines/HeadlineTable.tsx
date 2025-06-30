
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

interface HeadlineTableProps {
  headlineData: any[];
}

export const HeadlineTable: React.FC<HeadlineTableProps> = ({ headlineData }) => {
  return (
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
  );
};
