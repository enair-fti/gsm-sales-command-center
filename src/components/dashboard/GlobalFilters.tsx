
import React, { useState, useEffect } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Filter, X } from 'lucide-react';
import { fetchReferenceData, ReferenceData } from '@/utils/referenceData';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Button } from "@/components/ui/button"
import { Check, ChevronsUpDown } from "lucide-react"
import { cn } from "@/lib/utils"

interface GlobalFiltersProps {
  filters: {
    agency: string;
    advertiser: string;
    station: string;
    market: string;
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
    aeNames: ['All AE Names']
  });
  const [loading, setLoading] = useState(true);
  const [openPopovers, setOpenPopovers] = useState<Record<string, boolean>>({});

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

  const setPopoverOpen = (key: string, open: boolean) => {
    setOpenPopovers(prev => ({ ...prev, [key]: open }));
  };

  const SearchableSelect = ({ 
    value, 
    onSelect, 
    options, 
    placeholder, 
    popoverKey 
  }: { 
    value: string;
    onSelect: (value: string) => void;
    options: string[];
    placeholder: string;
    popoverKey: string;
  }) => {
    return (
      <Popover 
        open={openPopovers[popoverKey]} 
        onOpenChange={(open) => setPopoverOpen(popoverKey, open)}
      >
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={openPopovers[popoverKey]}
            className="w-full justify-between text-sm"
            disabled={loading}
          >
            {value}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-full p-0" style={{ width: 'var(--radix-popover-trigger-width)' }}>
          <Command>
            <CommandInput placeholder={`Search ${placeholder.toLowerCase()}...`} />
            <CommandEmpty>No {placeholder.toLowerCase()} found.</CommandEmpty>
            <CommandGroup className="max-h-64 overflow-auto">
              {options.map((option) => (
                <CommandItem
                  key={option}
                  value={option}
                  onSelect={(currentValue) => {
                    onSelect(currentValue);
                    setPopoverOpen(popoverKey, false);
                  }}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      value === option ? "opacity-100" : "opacity-0"
                    )}
                  />
                  {option}
                </CommandItem>
              ))}
            </CommandGroup>
          </Command>
        </PopoverContent>
      </Popover>
    );
  };

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

        <div className="grid grid-cols-3 gap-4 mb-3">
          <div>
            <label className="text-xs text-gray-600 mb-1 block">Agency</label>
            <SearchableSelect
              value={filters.agency}
              onSelect={(value) => onFilterChange('agency', value)}
              options={referenceData.agencies}
              placeholder="Agency"
              popoverKey="agency"
            />
          </div>

          <div>
            <label className="text-xs text-gray-600 mb-1 block">Advertiser</label>
            <SearchableSelect
              value={filters.advertiser}
              onSelect={(value) => onFilterChange('advertiser', value)}
              options={referenceData.advertisers}
              placeholder="Advertiser"
              popoverKey="advertiser"
            />
          </div>

          <div>
            <label className="text-xs text-gray-600 mb-1 block">Station</label>
            <SearchableSelect
              value={filters.station}
              onSelect={(value) => onFilterChange('station', value)}
              options={referenceData.stations}
              placeholder="Station"
              popoverKey="station"
            />
          </div>
        </div>

        <div className="grid grid-cols-4 gap-4 mb-3">
          <div>
            <label className="text-xs text-gray-600 mb-1 block">Market</label>
            <SearchableSelect
              value={filters.market}
              onSelect={(value) => onFilterChange('market', value)}
              options={referenceData.markets}
              placeholder="Market"
              popoverKey="market"
            />
          </div>

          <div>
            <label className="text-xs text-gray-600 mb-1 block">AE Name</label>
            <SearchableSelect
              value={filters.aeName}
              onSelect={(value) => onFilterChange('aeName', value)}
              options={referenceData.aeNames}
              placeholder="AE Name"
              popoverKey="aeName"
            />
          </div>

          <div>
            <label className="text-xs text-gray-600 mb-1 block">Quarter</label>
            <SearchableSelect
              value={filters.quarter}
              onSelect={(value) => onFilterChange('quarter', value)}
              options={quarters}
              placeholder="Quarter"
              popoverKey="quarter"
            />
          </div>

          <div>
            <label className="text-xs text-gray-600 mb-1 block">Year</label>
            <SearchableSelect
              value={filters.year}
              onSelect={(value) => onFilterChange('year', value)}
              options={years}
              placeholder="Year"
              popoverKey="year"
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

export default GlobalFilters;
