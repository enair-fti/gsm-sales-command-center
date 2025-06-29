
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Filter, X } from 'lucide-react';

interface GlobalFiltersProps {
  filters: {
    agency: string;
    advertiser: string;
    station: string;
    quarter: string;
    year: string;
  };
  onFilterChange: (key: string, value: string) => void;
  onClearFilters: () => void;
}

const GlobalFilters: React.FC<GlobalFiltersProps> = ({
  filters,
  onFilterChange,
  onClearFilters
}) => {
  const agencies = ['All Agencies', 'Zenith Media', 'GroupM', 'Publicis', 'Omnicom', 'Havas'];
  const advertisers = ['All Advertisers', 'Toyota', 'McDonald\'s', 'Coca-Cola', 'Walmart', 'Apple'];
  const stations = ['All Stations', 'Providence', 'Boston Metro', 'Hartford', 'Springfield'];
  const quarters = ['All Quarters', 'Q1', 'Q2', 'Q3', 'Q4'];
  const years = ['All Years', '2024', '2025'];

  const activeFilters = Object.entries(filters).filter(([_, value]) => 
    value && !value.startsWith('All')
  );

  return (
    <Card className="mb-6">
      <CardContent className="p-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <Filter className="w-4 h-4 text-gray-500" />
            <span className="text-sm font-medium text-gray-700">Global Filters</span>
          </div>
          {activeFilters.length > 0 && (
            <button
              onClick={onClearFilters}
              className="text-sm text-gray-500 hover:text-gray-700 flex items-center space-x-1"
            >
              <X className="w-3 h-3" />
              <span>Clear All</span>
            </button>
          )}
        </div>

        <div className="grid grid-cols-5 gap-4 mb-3">
          <div>
            <label className="text-xs text-gray-600 mb-1 block">Agency</label>
            <select
              value={filters.agency}
              onChange={(e) => onFilterChange('agency', e.target.value)}
              className="w-full text-sm border border-gray-300 rounded-md px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {agencies.map(agency => (
                <option key={agency} value={agency}>{agency}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="text-xs text-gray-600 mb-1 block">Advertiser</label>
            <select
              value={filters.advertiser}
              onChange={(e) => onFilterChange('advertiser', e.target.value)}
              className="w-full text-sm border border-gray-300 rounded-md px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {advertisers.map(advertiser => (
                <option key={advertiser} value={advertiser}>{advertiser}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="text-xs text-gray-600 mb-1 block">Station</label>
            <select
              value={filters.station}
              onChange={(e) => onFilterChange('station', e.target.value)}
              className="w-full text-sm border border-gray-300 rounded-md px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {stations.map(station => (
                <option key={station} value={station}>{station}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="text-xs text-gray-600 mb-1 block">Quarter</label>
            <select
              value={filters.quarter}
              onChange={(e) => onFilterChange('quarter', e.target.value)}
              className="w-full text-sm border border-gray-300 rounded-md px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {quarters.map(quarter => (
                <option key={quarter} value={quarter}>{quarter}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="text-xs text-gray-600 mb-1 block">Year</label>
            <select
              value={filters.year}
              onChange={(e) => onFilterChange('year', e.target.value)}
              className="w-full text-sm border border-gray-300 rounded-md px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {years.map(year => (
                <option key={year} value={year}>{year}</option>
              ))}
            </select>
          </div>
        </div>

        {activeFilters.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {activeFilters.map(([key, value]) => (
              <Badge key={key} variant="secondary" className="text-xs">
                {key}: {value}
                <button
                  onClick={() => onFilterChange(key, `All ${key.charAt(0).toUpperCase() + key.slice(1)}s`)}
                  className="ml-1 hover:text-red-600"
                >
                  <X className="w-3 h-3" />
                </button>
              </Badge>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default GlobalFilters;
