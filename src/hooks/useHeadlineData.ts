
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

  // Clean station name by removing -TV suffix
  const cleanStationName = (stationName: string) => {
    if (!stationName) return stationName;
    return stationName.replace(/-TV$/i, '').trim();
  };

  // Normalize strings for comparison
  const normalizeString = (str: string) => {
    if (!str) return '';
    return str.replace(/[-\s()]/g, '').toLowerCase().trim();
  };

  // Check if a value matches a filter
  const matchesFilter = (value: string, filter: string) => {
    if (!filter || filter.startsWith('All')) return true;
    if (!value) return false;
    
    const normalizedValue = normalizeString(value);
    const normalizedFilter = normalizeString(filter);
    
    return normalizedValue === normalizedFilter || 
           normalizedValue.includes(normalizedFilter) || 
           normalizedFilter.includes(normalizedValue);
  };

  // Fetch all data once on mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const data = await fetchHeadlineData();
        
        // Clean station names
        const cleanedData = data.map(item => ({
          ...item,
          station_name: cleanStationName(item.station_name)
        }));
        
        setAllHeadlineData(cleanedData);
        console.log('Fetched all headline data:', cleanedData.length, 'records');
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
    return allHeadlineData.filter(item => {
      return matchesFilter(item.access_name, filters.agency) &&
             matchesFilter(item.client_name, filters.advertiser) &&
             (matchesFilter(item.station_name, filters.station) || matchesFilter(item.station_code, filters.station)) &&
             matchesFilter(item.market, filters.market) &&
             matchesFilter(item.contact_name, filters.aeName);
    });
  }, [allHeadlineData, filters]);

  return {
    headlineData: filteredData,
    loading,
    totalRecords: allHeadlineData.length
  };
};
