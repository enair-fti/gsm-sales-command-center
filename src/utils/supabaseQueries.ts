
import { supabase } from '@/integrations/supabase/client';

// Helper function to get real filter options from available Supabase tables
export const getFilterOptions = async () => {
  try {
    console.log('Fetching filter options from available tables...');
    
    // Try to get advertisers from references_advertisers table
    const { data: advertiserData, error: advertiserError } = await supabase
      .from('references_advertisers')
      .select('Name')
      .not('Name', 'is', null)
      .limit(100);

    if (advertiserError) {
      console.error('Error fetching from references_advertisers:', advertiserError);
      console.log('Trying darwin-extract-data for advertisers...');
      
      // Fallback to darwin-extract-data
      const { data: fallbackAdvertiserData } = await supabase
        .from('darwin-extract-data')
        .select('Client')
        .not('Client', 'is', null)
        .limit(50);
      
      console.log('Fallback advertiser data:', fallbackAdvertiserData?.length || 0);
    } else {
      console.log('Fetched advertisers from references_advertisers:', advertiserData?.length || 0);
    }

    // Try to get agencies from references_agencies table
    const { data: agencyData, error: agencyError } = await supabase
      .from('references_agencies')
      .select('Name')
      .not('Name', 'is', null)
      .limit(100);

    if (agencyError) {
      console.error('Error fetching from references_agencies:', agencyError);
      console.log('Trying darwin-extract-data for agencies...');
      
      // Fallback to darwin-extract-data
      const { data: fallbackAgencyData } = await supabase
        .from('darwin-extract-data')
        .select('AgencyName')
        .not('AgencyName', 'is', null)
        .limit(50);
      
      console.log('Fallback agency data:', fallbackAgencyData?.length || 0);
    } else {
      console.log('Fetched agencies from references_agencies:', agencyData?.length || 0);
    }

    // Try to get stations from references_stations table
    const { data: stationData, error: stationError } = await supabase
      .from('references_stations')
      .select('Code')
      .not('Code', 'is', null)
      .limit(100);

    if (stationError) {
      console.error('Error fetching from references_stations:', stationError);
      console.log('Trying darwin-extract-data for stations...');
      
      // Fallback to darwin-extract-data
      const { data: fallbackStationData } = await supabase
        .from('darwin-extract-data')
        .select('Station')
        .not('Station', 'is', null)
        .limit(50);
      
      console.log('Fallback station data:', fallbackStationData?.length || 0);
    } else {
      console.log('Fetched stations from references_stations:', stationData?.length || 0);
    }

    // Extract unique values and create arrays
    const advertisers = [...new Set([
      ...(advertiserData?.map(item => item.Name) || []),
      ...(fallbackAdvertiserData?.map(item => item.Client) || []),
    ])].filter(Boolean).sort();
    
    const agencies = [...new Set([
      ...(agencyData?.map(item => item.Name) || []),
      ...(fallbackAgencyData?.map(item => item.AgencyName) || []),
    ])].filter(Boolean).sort();
    
    const stations = [...new Set([
      ...(stationData?.map(item => item.Code) || []),
      ...(fallbackStationData?.map(item => item.Station) || []),
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
    console.log('Using fallback mock filter options');
    // Return fallback options if there's an error
    return {
      advertisers: ['All Advertisers', 'McDonald\'s', 'Toyota', 'Walmart', 'Apple', 'CVS Health'],
      agencies: ['All Agencies', 'OMD', 'Saatchi & Saatchi', 'Haworth Marketing', 'Media Arts Lab'],
      stations: ['All Stations', 'WHDH', 'WLVI', 'WPEC-TV', 'WFXT', 'WCVB'],
      quarters: ['All Quarters', 'Q1', 'Q2', 'Q3', 'Q4'],
      years: ['All Years', '2024', '2025']
    };
  }
};

// Get top advertisers data with real Supabase queries
export const getTopAdvertisersData = async (filters: any) => {
  try {
    console.log('Fetching top advertisers data with filters:', filters);
    
    // Try to get from references_advertisers first
    const { data: advertiserData, error: advertiserError } = await supabase
      .from('references_advertisers')
      .select('Name, "Agency Code", "Category Name"')
      .limit(100);

    if (advertiserError) {
      console.error('Error querying references_advertisers:', advertiserError);
      console.log('Trying darwin-extract-data for advertiser data...');
      
      // Fallback to darwin-extract-data
      const { data: fallbackData } = await supabase
        .from('darwin-extract-data')
        .select('Client, AgencyName, Market')
        .limit(100);
      
      console.log('Fallback advertiser data fetched:', fallbackData?.length || 0);
      return fallbackData || [];
    }
    
    console.log('Fetched advertisers from references_advertisers:', advertiserData?.length || 0);
    return advertiserData || [];
  } catch (error) {
    console.error('Error in getTopAdvertisersData:', error);
    console.log('Using mock advertiser data');
    return [];
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
      console.log('Trying alternative table...');
      // Try alternative table
      const { data: altData } = await supabase
        .from('new_order_table')
        .select('*')
        .limit(100);
      console.log('Alternative daily data fetched:', altData?.length || 0);
      return altData || [];
    }
    
    console.log('Daily station data fetched:', data?.length || 0, 'records');
    return data || [];
  } catch (error) {
    console.error('Error in getDailyStationData:', error);
    console.log('Using mock daily station data');
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

// Get headlines and buylines data
export const getHeadlinesData = async (filters: any) => {
  try {
    console.log('Fetching headlines data with filters:', filters);
    
    // Try to get from _darwin.headline_buyline first
    const { data: headlineData, error: headlineError } = await supabase
      .from('_darwin.headline_buyline')
      .select('*')
      .limit(100);

    if (headlineError) {
      console.error('Error fetching from _darwin.headline_buyline:', headlineError);
      console.log('Using mock headlines data');
      
      // Return mock headlines data
      return [
        {
          headline_id: 'HL-2024-001',
          buyline_number: 'BL-001',
          status: 'Active',
          start_date: '2024-01-15',
          end_date: '2024-03-15',
          advertiser: 'Toyota',
          agency: 'Zenith Media',
          station: 'WPRO-FM',
          spots_ordered: 120,
          spots_delivered: 98,
          billing_amount: 45000
        },
        {
          headline_id: 'HL-2024-002',
          buyline_number: 'BL-002',
          status: 'Pending',
          start_date: '2024-02-01',
          end_date: '2024-04-01',
          advertiser: 'McDonald\'s',
          agency: 'GroupM',
          station: 'WXKS-FM',
          spots_ordered: 80,
          spots_delivered: 65,
          billing_amount: 32000
        }
      ];
    }
    
    console.log('Fetched headlines from _darwin.headline_buyline:', headlineData?.length || 0);
    return headlineData || [];
  } catch (error) {
    console.error('Error in getHeadlinesData:', error);
    console.log('Using fallback mock headlines data');
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
