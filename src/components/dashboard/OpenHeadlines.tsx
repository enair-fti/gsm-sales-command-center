
import React from 'react';
import { useHeadlineData } from '@/hooks/useHeadlineData';
import { HeadlineHeader } from './headlines/HeadlineHeader';
import { HeadlineSummaryCards } from './headlines/HeadlineSummaryCards';
import { HeadlineTable } from './headlines/HeadlineTable';
import { exportHeadlineData } from '@/utils/headlineExport';

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
  const { headlineData, loading } = useHeadlineData(filters);

  const handleExport = () => {
    exportHeadlineData(headlineData);
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
      <HeadlineHeader recordCount={headlineData.length} onExport={handleExport} />
      <HeadlineSummaryCards headlineData={headlineData} />
      <HeadlineTable headlineData={headlineData} />
    </div>
  );
};

export default OpenHeadlines;
