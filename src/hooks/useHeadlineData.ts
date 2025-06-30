
import { useState, useEffect, useMemo } from 'react';
import { fetchHeadlineData } from '@/utils/referenceData';

interface HeadlineFilters {
  agency: string;
  advertiser: string;
  station: string;
  market: string;
  category: string;
  aeName: string;
  quarter: string;
  year: string;
}

export const useHeadlineData = (filters: HeadlineFilters) => {
  const [allHeadlineData, setAllHeadlineData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Simple filter check - returns true if filter should include this item
  const shouldInclude = (itemValue: string, filterValue: string) => {
    // If filter is "All X" or empty, include everything
    if (!filterValue || filterValue.startsWith('All ')) {
      return true;
    }
    
    // If item value is empty, exclude it
    if (!itemValue) {
      return false;
    }
    
    // Simple case-insensitive comparison
    return itemValue.toLowerCase().includes(filterValue.toLowerCase()) ||
           filterValue.toLowerCase().includes(itemValue.toLowerCase());
  };

  // Fetch all data once on mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const data = await fetchHeadlineData();
        setAllHeadlineData(data);
        console.log('Fetched all headline data:', data.length, 'records');
        console.log('Sample record:', data[0]);
      } catch (error) {
        console.error('Error fetching headline data:', error);
        setAllHeadlineData([]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Filter data based on current filters
  const filteredData = useMemo(() => {
    console.log('Applying filters:', filters);
    
    const filtered = allHeadlineData.filter(item => {
      const agencyMatch = shouldInclude(item.access_name, filters.agency);
      const advertiserMatch = shouldInclude(item.client_name, filters.advertiser);
      const stationMatch = shouldInclude(item.station_name, filters.station) || 
                          shouldInclude(item.station_code, filters.station);
      const marketMatch = shouldInclude(item.market, filters.market);
      const aeMatch = shouldInclude(item.contact_name, filters.aeName);
      
      const result = agencyMatch && advertiserMatch && stationMatch && marketMatch && aeMatch;
      
      return result;
    });
    
    console.log('Filtered data:', filtered.length, 'records');
    return filtered;
  }, [allHeadlineData, filters]);

  return {
    headlineData: filteredData,
    loading,
    totalRecords: allHeadlineData.length
  };
};
