
import { supabase } from '@/integrations/supabase/client';

// Helper function to safely parse billing values
const parseBillingValue = (value: any): number => {
  if (typeof value === 'number') return value;
  if (typeof value === 'string') {
    const cleanValue = value.replace(/[,$]/g, '');
    const parsed = parseFloat(cleanValue);
    return isNaN(parsed) ? 0 : parsed;
  }
  return 0;
};

// Fetch Darwin projections data
export const fetchDarwinProjections = async (filters: any = {}) => {
  try {
    console.log('Fetching Darwin projections with filters:', filters);
    
    const { data, error } = await supabase.rpc('fetch_darwin_projections', {
      station_filter: filters.station && !filters.station.startsWith('All') ? filters.station : null,
      agency_filter: filters.agency && !filters.agency.startsWith('All') ? filters.agency : null,
      advertiser_filter: filters.advertiser && !filters.advertiser.startsWith('All') ? filters.advertiser : null
    });

    if (error) {
      console.error('Error fetching Darwin projections:', error);
      return [];
    }

    console.log('Successfully fetched Darwin projections:', data?.length || 0, 'records');
    
    // Transform the data to standardize field names
    return (data || []).map((item: any) => ({
      stationCode: item['Station Code'],
      market: item['Market'],
      advertiserName: item['Advertiser Name'],
      sellerCode: item['Seller Code'],
      agencyName: item['Agency Name'],
      q3Billing: item['Q3-2025 Billing$'],
      projectedBilling: parseBillingValue(item['Proj Billing$']),
      projectedMarket: parseBillingValue(item['Proj Market$']),
      q3Market: parseBillingValue(item['Q3-2025 Market$']),
      projectedDiff: parseBillingValue(item['Proj Diff$']),
      category: item['Category'],
      quarter: item['Quarter'],
      projectedShare: parseFloat(item['Proj Share%']?.toString().replace(/%/g, '')) || 0,
      // Map to expected field names for compatibility
      'Station Code': item['Station Code'],
      'Market': item['Market'], 
      'Advertiser Name': item['Advertiser Name'],
      'Seller Code': item['Seller Code'],
      'Agency Name': item['Agency Name'],
      'Q3-2025 Billing$': item['Q3-2025 Billing$'],
      'Proj Billing$': item['Proj Billing$'],
      'Proj Market$': item['Proj Market$'],
      'Q3-2025 Market$': item['Q3-2025 Market$'],
      'Proj Diff$': item['Proj Diff$'],
      'Category': item['Category'],
      'Quarter': item['Quarter'],
      'Proj Share%': item['Proj Share%'],
      billing: parseBillingValue(item['Q3-2025 Billing$']),
      category: item['Category'] || 'Other'
    }));
  } catch (error) {
    console.error('Error in fetchDarwinProjections:', error);
    return [];
  }
};

// Fetch competitive analysis data
export const fetchCompetitiveAnalysisData = async (filters: any = {}) => {
  try {
    console.log('Fetching competitive analysis with filters:', filters);
    
    const { data, error } = await supabase.rpc('fetch_competitive_analysis', {
      agency_filter: filters.agency && !filters.agency.startsWith('All') ? filters.agency : null,
      advertiser_filter: filters.advertiser && !filters.advertiser.startsWith('All') ? filters.advertiser : null
    });

    if (error) {
      console.error('Error fetching competitive analysis:', error);
      return [];
    }

    console.log('Successfully fetched competitive analysis:', data?.length || 0, 'records');
    return data || [];
  } catch (error) {
    console.error('Error in fetchCompetitiveAnalysisData:', error);
    return [];
  }
};

// Fetch pacing data
export const fetchPacingData = async (filters: any = {}) => {
  try {
    console.log('Fetching pacing data with filters:', filters);
    
    const { data, error } = await supabase.rpc('fetch_pacing_data', {
      advertiser_filter: filters.advertiser && !filters.advertiser.startsWith('All') ? filters.advertiser : null
    });

    if (error) {
      console.error('Error fetching pacing data:', error);
      return [];
    }

    console.log('Successfully fetched pacing data:', data?.length || 0, 'records');
    return data || [];
  } catch (error) {
    console.error('Error in fetchPacingData:', error);
    return [];
  }
};

// Calculate monthly performance data from available sources
export const calculateMonthlyPerformanceData = async (darwinData: any[] = [], pacingData: any[] = []) => {
  const monthlyData = [];
  
  // Generate months for the current year
  const months = [
    'January 2025', 'February 2025', 'March 2025', 'April 2025', 
    'May 2025', 'June 2025', 'July 2025', 'August 2025',
    'September 2025', 'October 2025', 'November 2025', 'December 2025'
  ];

  for (let i = 0; i < months.length; i++) {
    const month = months[i];
    let booked = 0;
    let projection = 0;
    let lastYear = 0;

    // Use pacing data if available
    if (pacingData.length > 0) {
      const monthPacing = pacingData[i % pacingData.length];
      booked = parseBillingValue(monthPacing?.['Sales $']) || 0;
      projection = parseBillingValue(monthPacing?.['Projection']) || 0;
      lastYear = parseBillingValue(monthPacing?.['Last Year']) || 0;
    } 
    // Fallback to Darwin data
    else if (darwinData.length > 0) {
      const monthDarwin = darwinData[i % darwinData.length];
      booked = parseBillingValue(monthDarwin?.['Q3-2025 Billing$']) || 0;
      projection = parseBillingValue(monthDarwin?.['Proj Billing$']) || 0;
      lastYear = booked * 0.85; // Estimate last year as 85% of current
    }

    const pace = projection > 0 ? (booked / projection) * 100 : 0;
    const variance = booked - projection;
    const changeVsLastYear = booked - lastYear;

    monthlyData.push({
      month,
      booked,
      projection,
      lastYear,
      pace: Number(pace.toFixed(1)),
      variance,
      changeVsLastYear
    });
  }

  return monthlyData;
};
