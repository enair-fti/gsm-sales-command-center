
import React, { useState, useEffect } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Filter, X } from 'lucide-react';
import { fetchReferenceData, ReferenceData } from '@/utils/referenceData';
import { Combobox, ComboboxOption } from '@/components/ui/combobox';

interface SearchableFiltersProps {
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

const SearchableFilters: React.FC<SearchableFiltersProps> = ({
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

  const createOptions = (items: string[]): ComboboxOption[] => 
    items.map(item => ({ value: item, label: item }));

  return (
    <Card className="mb-6">
      <CardContent className="p-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <Filter className="w-4 h-4 text-gray-500" />
            <span className="text-sm font-medium text-gray-700">Searchable Filters</span>
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
            <Combobox
              options={createOptions(referenceData.agencies)}
              value={filters.agency}
              onValueChange={(value) => onFilterChange('agency', value)}
              placeholder="Select Agency"
              searchPlaceholder="Search agencies..."
              disabled={loading}
            />
          </div>

          <div>
            <label className="text-xs text-gray-600 mb-1 block">Advertiser</label>
            <Combobox
              options={createOptions(referenceData.advertisers)}
              value={filters.advertiser}
              onValueChange={(value) => onFilterChange('advertiser', value)}
              placeholder="Select Advertiser"
              searchPlaceholder="Search advertisers..."
              disabled={loading}
            />
          </div>

          <div>
            <label className="text-xs text-gray-600 mb-1 block">Station</label>
            <Combobox
              options={createOptions(referenceData.stations)}
              value={filters.station}
              onValueChange={(value) => onFilterChange('station', value)}
              placeholder="Select Station"
              searchPlaceholder="Search stations..."
              disabled={loading}
            />
          </div>

          <div>
            <label className="text-xs text-gray-600 mb-1 block">Market</label>
            <Combobox
              options={createOptions(referenceData.markets)}
              value={filters.market}
              onValueChange={(value) => onFilterChange('market', value)}
              placeholder="Select Market"
              searchPlaceholder="Search markets..."
              disabled={loading}
            />
          </div>
        </div>

        <div className="grid grid-cols-4 gap-4 mb-3">
          <div>
            <label className="text-xs text-gray-600 mb-1 block">Category</label>
            <Combobox
              options={createOptions(referenceData.categories)}
              value={filters.category}
              onValueChange={(value) => onFilterChange('category', value)}
              placeholder="Select Category"
              searchPlaceholder="Search categories..."
              disabled={loading}
            />
          </div>

          <div>
            <label className="text-xs text-gray-600 mb-1 block">AE Name</label>
            <Combobox
              options={createOptions(referenceData.aeNames)}
              value={filters.aeName}
              onValueChange={(value) => onFilterChange('aeName', value)}
              placeholder="Select AE"
              searchPlaceholder="Search AE names..."
              disabled={loading}
            />
          </div>

          <div>
            <label className="text-xs text-gray-600 mb-1 block">Quarter</label>
            <Combobox
              options={createOptions(quarters)}
              value={filters.quarter}
              onValueChange={(value) => onFilterChange('quarter', value)}
              placeholder="Select Quarter"
              searchPlaceholder="Search quarters..."
            />
          </div>

          <div>
            <label className="text-xs text-gray-600 mb-1 block">Year</label>
            <Combobox
              options={createOptions(years)}
              value={filters.year}
              onValueChange={(value) => onFilterChange('year', value)}
              placeholder="Select Year"
              searchPlaceholder="Search years..."
            />
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

export default SearchableFilters;
