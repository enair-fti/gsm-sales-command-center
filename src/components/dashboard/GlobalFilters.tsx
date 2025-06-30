
import React, { useState, useEffect } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Filter, X } from 'lucide-react';
import { fetchReferenceData, ReferenceData } from '@/utils/referenceData';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface GlobalFiltersProps {
  filters: {
    agency: string;
    advertiser: string;
    station: string;
    market: string;
    category: string;
    aeName: string;
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
  const [referenceData, setReferenceData] = useState<ReferenceData>({
    agencies: ['All Agencies'],
    advertisers: ['All Advertisers'],
    stations: ['All Stations'],
    markets: ['All Markets'],
    categories: ['All Categories'],
    aeNames: ['All AE Names']
  });
  const [loading, setLoading] = useState(true);

  // Static data for quarters and years
  const quarters = ['All Quarters', 'Q1', 'Q2', 'Q3', 'Q4'];
  const years = ['All Years', '2024', '2025'];

  useEffect(() => {
    const loadReferenceData = async () => {
      try {
        const data = await fetchReferenceData();
        setReferenceData(data);
      } catch (error) {
        console.error('Failed to load reference data:', error);
      } finally {
        setLoading(false);
      }
    };

    loadReferenceData();
  }, []);

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
            {loading && <span className="text-xs text-gray-500">(Loading...)</span>}
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

        <div className="grid grid-cols-4 gap-4 mb-3">
          <div>
            <label className="text-xs text-gray-600 mb-1 block">Agency</label>
            <Select
              value={filters.agency}
              onValueChange={(value) => onFilterChange('agency', value)}
              disabled={loading}
            >
              <SelectTrigger className="w-full text-sm">
                <SelectValue placeholder="Select Agency" />
              </SelectTrigger>
              <SelectContent>
                {referenceData.agencies.map(agency => (
                  <SelectItem key={agency} value={agency}>{agency}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="text-xs text-gray-600 mb-1 block">Advertiser</label>
            <Select
              value={filters.advertiser}
              onValueChange={(value) => onFilterChange('advertiser', value)}
              disabled={loading}
            >
              <SelectTrigger className="w-full text-sm">
                <SelectValue placeholder="Select Advertiser" />
              </SelectTrigger>
              <SelectContent>
                {referenceData.advertisers.map(advertiser => (
                  <SelectItem key={advertiser} value={advertiser}>{advertiser}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="text-xs text-gray-600 mb-1 block">Station</label>
            <Select
              value={filters.station}
              onValueChange={(value) => onFilterChange('station', value)}
              disabled={loading}
            >
              <SelectTrigger className="w-full text-sm">
                <SelectValue placeholder="Select Station" />
              </SelectTrigger>
              <SelectContent>
                {referenceData.stations.map(station => (
                  <SelectItem key={station} value={station}>{station}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="text-xs text-gray-600 mb-1 block">Market</label>
            <Select
              value={filters.market}
              onValueChange={(value) => onFilterChange('market', value)}
              disabled={loading}
            >
              <SelectTrigger className="w-full text-sm">
                <SelectValue placeholder="Select Market" />
              </SelectTrigger>
              <SelectContent>
                {referenceData.markets.map(market => (
                  <SelectItem key={market} value={market}>{market}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="grid grid-cols-4 gap-4 mb-3">
          <div>
            <label className="text-xs text-gray-600 mb-1 block">Category</label>
            <Select
              value={filters.category}
              onValueChange={(value) => onFilterChange('category', value)}
              disabled={loading}
            >
              <SelectTrigger className="w-full text-sm">
                <SelectValue placeholder="Select Category" />
              </SelectTrigger>
              <SelectContent>
                {referenceData.categories.map(category => (
                  <SelectItem key={category} value={category}>{category}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="text-xs text-gray-600 mb-1 block">AE Name</label>
            <Select
              value={filters.aeName}
              onValueChange={(value) => onFilterChange('aeName', value)}
              disabled={loading}
            >
              <SelectTrigger className="w-full text-sm">
                <SelectValue placeholder="Select AE" />
              </SelectTrigger>
              <SelectContent>
                {referenceData.aeNames.map(aeName => (
                  <SelectItem key={aeName} value={aeName}>{aeName}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="text-xs text-gray-600 mb-1 block">Quarter</label>
            <Select
              value={filters.quarter}
              onValueChange={(value) => onFilterChange('quarter', value)}
            >
              <SelectTrigger className="w-full text-sm">
                <SelectValue placeholder="Select Quarter" />
              </SelectTrigger>
              <SelectContent>
                {quarters.map(quarter => (
                  <SelectItem key={quarter} value={quarter}>{quarter}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="text-xs text-gray-600 mb-1 block">Year</label>
            <Select
              value={filters.year}
              onValueChange={(value) => onFilterChange('year', value)}
            >
              <SelectTrigger className="w-full text-sm">
                <SelectValue placeholder="Select Year" />
              </SelectTrigger>
              <SelectContent>
                {years.map(year => (
                  <SelectItem key={year} value={year}>{year}</SelectItem>
                ))}
              </SelectContent>
            </Select>
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
