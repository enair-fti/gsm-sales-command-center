
import { supabase } from '@/integrations/supabase/client';

// Helper function to get real filter options from Supabase
export const getFilterOptions = async () => {
  try {
    // Get advertisers from darwin-extract-data (since references tables may not exist)
    const { data: advertiserData } = await supabase
      .from('darwin-extract-data')
      .select('Client')
      .not('Client', 'is', null);

    // Get agencies from darwin-extract-data
    const { data: agencyData } = await supabase
      .from('darwin-extract-data')
      .select('AgencyName')
      .not('AgencyName', 'is', null);

    // Get stations from available data
    const { data: stationData } = await supabase
      .from('darwin-extract-data')
      .select('Station')
      .not('Station', 'is', null);

    // Extract unique values
    const advertisers = [...new Set(advertiserData?.map(item => item.Client) || [])]
      .filter(Boolean)
      .sort();
    
    const agencies = [...new Set(agencyData?.map(item => item.AgencyName) || [])]
      .filter(Boolean)
      .sort();
    
    const stations = [...new Set(stationData?.map(item => item.Station) || [])]
      .filter(Boolean)
      .sort();

    return {
      advertisers: ['All Advertisers', ...advertisers],
      agencies: ['All Agencies', ...agencies],
      stations: ['All Stations', ...stations],
      quarters: ['All Quarters', 'Q1', 'Q2', 'Q3', 'Q4'],
      years: ['All Years', '2024', '2025']
    };
  } catch (error) {
    console.error('Error fetching filter options:', error);
    return {
      advertisers: ['All Advertisers'],
      agencies: ['All Agencies'],
      stations: ['All Stations'],
      quarters: ['All Quarters', 'Q1', 'Q2', 'Q3', 'Q4'],
      years: ['All Years', '2024', '2025']
    };
  }
};

// Get daily station performance data
export const getDailyStationData = async (filters: any) => {
  try {
    let query = supabase
      .from('extended_media_orders')
      .select('*');

    // Apply filters
    if (filters.advertiser && !filters.advertiser.startsWith('All')) {
      query = query.ilike('client', `%${filters.advertiser}%`);
    }
    if (filters.station && !filters.station.startsWith('All')) {
      query = query.ilike('station', `%${filters.station}%`);
    }

    const { data, error } = await query.limit(500);
    
    if (error) throw error;
    
    return data || [];
  } catch (error) {
    console.error('Error fetching daily station data:', error);
    return [];
  }
};

// Get top advertisers data
export const getTopAdvertisersData = async (filters: any) => {
  try {
    let query = supabase
      .from('darwin-extract-data')
      .select('*');

    // Apply filters
    if (filters.advertiser && !filters.advertiser.startsWith('All')) {
      query = query.ilike('Client', `%${filters.advertiser}%`);
    }
    if (filters.agency && !filters.agency.startsWith('All')) {
      query = query.ilike('AgencyName', `%${filters.agency}%`);
    }
    if (filters.station && !filters.station.startsWith('All')) {
      query = query.ilike('Station', `%${filters.station}%`);
    }

    const { data, error } = await query.limit(100);
    
    if (error) throw error;
    
    return data || [];
  } catch (error) {
    console.error('Error fetching top advertisers data:', error);
    return [];
  }
};

// Get quarterly performance data
export const getQuarterlyData = async (filters: any) => {
  try {
    let query = supabase
      .from('darwin-extract-data')
      .select('*');

    // Apply filters
    if (filters.advertiser && !filters.advertiser.startsWith('All')) {
      query = query.ilike('Client', `%${filters.advertiser}%`);
    }
    if (filters.agency && !filters.agency.startsWith('All')) {
      query = query.ilike('AgencyName', `%${filters.agency}%`);
    }

    const { data, error } = await query.limit(200);
    
    if (error) throw error;
    
    return data || [];
  } catch (error) {
    console.error('Error fetching quarterly data:', error);
    return [];
  }
};

// Get decliners/adders data from order comparisons
export const getDeclinersAddersData = async (filters: any) => {
  try {
    const [currentOrders, pastOrders] = await Promise.all([
      supabase
        .from('extended_media_orders')
        .select('*')
        .limit(100),
      supabase
        .from('new_order_table')
        .select('*')
        .limit(100)
    ]);

    return {
      current: currentOrders.data || [],
      past: pastOrders.data || []
    };
  } catch (error) {
    console.error('Error fetching decliners/adders data:', error);
    return { current: [], past: [] };
  }
};

// Get monthly projections data
export const getMonthlyProjectionsData = async (filters: any) => {
  try {
    let query = supabase
      .from('1test_llama_gemini')
      .select('*');

    // Apply filters
    if (filters.advertiser && !filters.advertiser.startsWith('All')) {
      query = query.ilike('client_name', `%${filters.advertiser}%`);
    }
    if (filters.agency && !filters.agency.startsWith('All')) {
      query = query.ilike('access_name', `%${filters.agency}%`);
    }
    if (filters.station && !filters.station.startsWith('All')) {
      query = query.ilike('station_name', `%${filters.station}%`);
    }

    const { data, error } = await query.limit(100);
    
    if (error) throw error;
    
    return data || [];
  } catch (error) {
    console.error('Error fetching monthly projections data:', error);
    return [];
  }
};

// Calculation utilities
export const calculatePacing = (booked: number, projection: number): number => {
  if (!projection || projection === 0) return 0;
  return (booked / projection) * 100;
};

export const calculateRepPercent = (billing: number, market: number): number => {
  if (!market || market === 0) return 0;
  return (billing / market) * 100;
};

export const calculateChangeVsLastYear = (current: number, lastYear: number): number => {
  return current - lastYear;
};

export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
};

export const formatPercentage = (value: number): string => {
  return `${value.toFixed(1)}%`;
};
