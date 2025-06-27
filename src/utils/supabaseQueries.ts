
import { supabase } from '@/integrations/supabase/client';

// Helper function to get real filter options from available Supabase tables
export const getFilterOptions = async () => {
  try {
    console.log('Fetching filter options from available tables...');
    
    // Try to get advertisers from darwin-extract-data table (which we know exists)
    const { data: advertiserData, error: advertiserError } = await supabase
      .from('darwin-extract-data')
      .select('Client')
      .not('Client', 'is', null);

    if (advertiserError) {
      console.error('Error fetching advertisers:', advertiserError);
    }

    // Try to get agencies from darwin-extract-data table
    const { data: agencyData, error: agencyError } = await supabase
      .from('darwin-extract-data')
      .select('AgencyName')
      .not('AgencyName', 'is', null);

    if (agencyError) {
      console.error('Error fetching agencies:', agencyError);
    }

    // Try to get stations from darwin-extract-data table
    const { data: stationData, error: stationError } = await supabase
      .from('darwin-extract-data')
      .select('Station')
      .not('Station', 'is', null);

    if (stationError) {
      console.error('Error fetching stations:', stationError);
    }

    // Also try extended_media_orders for additional station data
    const { data: extendedStationData } = await supabase
      .from('extended_media_orders')
      .select('station')
      .not('station', 'is', null)
      .limit(50);

    // Extract unique values and create arrays
    const advertisers = [...new Set([
      ...(advertiserData?.map(item => item.Client) || []),
    ])].filter(Boolean).sort();
    
    const agencies = [...new Set([
      ...(agencyData?.map(item => item.AgencyName) || []),
    ])].filter(Boolean).sort();
    
    const stations = [...new Set([
      ...(stationData?.map(item => item.Station) || []),
      ...(extendedStationData?.map(item => item.station) || []),
    ])].filter(Boolean).sort();

    console.log('Filter options loaded:', {
      advertisers: advertisers.length,
      agencies: agencies.length,
      stations: stations.length
    });

    return {
      advertisers: ['All Advertisers', ...advertisers],
      agencies: ['All Agencies', ...agencies],
      stations: ['All Stations', ...stations],
      quarters: ['All Quarters', 'Q1', 'Q2', 'Q3', 'Q4'],
      years: ['All Years', '2024', '2025']
    };
  } catch (error) {
    console.error('Error fetching filter options:', error);
    // Return fallback options if there's an error
    return {
      advertisers: ['All Advertisers', 'Sample Advertiser 1', 'Sample Advertiser 2'],
      agencies: ['All Agencies', 'Sample Agency 1', 'Sample Agency 2'],
      stations: ['All Stations', 'WHDH', 'WLVI', 'WPEC-TV'],
      quarters: ['All Quarters', 'Q1', 'Q2', 'Q3', 'Q4'],
      years: ['All Years', '2024', '2025']
    };
  }
};

// Get daily station performance data with mock calculations
export const getDailyStationData = async (filters: any) => {
  try {
    console.log('Fetching daily station data with filters:', filters);
    
    // Try extended_media_orders first
    let query = supabase
      .from('extended_media_orders')
      .select('*')
      .limit(500);

    // Apply filters if they exist
    if (filters.advertiser && !filters.advertiser.startsWith('All')) {
      query = query.ilike('client', `%${filters.advertiser}%`);
    }
    if (filters.station && !filters.station.startsWith('All')) {
      query = query.ilike('station', `%${filters.station}%`);
    }

    const { data, error } = await query;
    
    if (error) {
      console.error('Error fetching daily station data:', error);
      // Try alternative table
      const { data: altData } = await supabase
        .from('new_order_table')
        .select('*')
        .limit(100);
      return altData || [];
    }
    
    console.log('Daily station data fetched:', data?.length || 0, 'records');
    return data || [];
  } catch (error) {
    console.error('Error in getDailyStationData:', error);
    return [];
  }
};

// Get top advertisers data with mock ranking
export const getTopAdvertisersData = async (filters: any) => {
  try {
    console.log('Fetching top advertisers data with filters:', filters);
    
    // Fetch from darwin-extract-data table
    let query = supabase
      .from('darwin-extract-data')
      .select('*')
      .limit(200);

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

    const { data, error } = await query;
    
    if (error) {
      console.error('Error fetching advertisers data:', error);
      return [];
    }
    
    console.log('Top advertisers data fetched:', data?.length || 0, 'records');
    return data || [];
  } catch (error) {
    console.error('Error in getTopAdvertisersData:', error);
    return [];
  }
};

// Get quarterly performance data
export const getQuarterlyData = async (filters: any) => {
  try {
    console.log('Fetching quarterly data with filters:', filters);
    
    let query = supabase
      .from('darwin-extract-data')
      .select('*')
      .limit(200);

    // Apply filters
    if (filters.advertiser && !filters.advertiser.startsWith('All')) {
      query = query.ilike('Client', `%${filters.advertiser}%`);
    }
    if (filters.agency && !filters.agency.startsWith('All')) {
      query = query.ilike('AgencyName', `%${filters.agency}%`);
    }

    const { data, error } = await query;
    
    if (error) {
      console.error('Error fetching quarterly data:', error);
      return [];
    }
    
    console.log('Quarterly data fetched:', data?.length || 0, 'records');
    return data || [];
  } catch (error) {
    console.error('Error in getQuarterlyData:', error);
    return [];
  }
};

// Get decliners/adders data from order comparisons
export const getDeclinersAddersData = async (filters: any) => {
  try {
    console.log('Fetching decliners/adders data with filters:', filters);
    
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

    console.log('Decliners/adders data fetched:', {
      current: currentOrders.data?.length || 0,
      past: pastOrders.data?.length || 0
    });

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
    console.log('Fetching monthly projections data with filters:', filters);
    
    let query = supabase
      .from('1test_llama_gemini')
      .select('*')
      .limit(100);

    // Apply filters based on available columns
    if (filters.advertiser && !filters.advertiser.startsWith('All')) {
      query = query.ilike('client_name', `%${filters.advertiser}%`);
    }
    if (filters.agency && !filters.agency.startsWith('All')) {
      query = query.ilike('access_name', `%${filters.agency}%`);
    }
    if (filters.station && !filters.station.startsWith('All')) {
      query = query.ilike('station_name', `%${filters.station}%`);
    }

    const { data, error } = await query;
    
    if (error) {
      console.error('Error fetching monthly projections data:', error);
      return [];
    }
    
    console.log('Monthly projections data fetched:', data?.length || 0, 'records');
    return data || [];
  } catch (error) {
    console.error('Error in getMonthlyProjectionsData:', error);
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
