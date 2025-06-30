
import React from 'react';
import { Download, Badge } from 'lucide-react';
import { Badge as UIBadge } from "@/components/ui/badge";

interface HeadlineHeaderProps {
  recordCount: number;
  onExport: () => void;
}

export const HeadlineHeader: React.FC<HeadlineHeaderProps> = ({ recordCount, onExport }) => {
  return (
    <div className="flex items-center justify-between">
      <div>
        <h2 className="text-xl font-bold text-gray-900">Open Headlines & Buylines</h2>
        <p className="text-sm text-gray-600">Headlines from media schedules and order data</p>
      </div>
      <div className="flex items-center space-x-3">
        <button
          onClick={onExport}
          className="flex items-center space-x-2 px-3 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
        >
          <Download className="w-4 h-4" />
          <span>Export</span>
        </button>
        <UIBadge variant="outline" className="text-sm">
          {recordCount} Headlines
        </UIBadge>
      </div>
    </div>
  );
};
