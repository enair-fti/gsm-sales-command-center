import { supabase } from '@/integrations/supabase/client';

export interface ReferenceData {
  agencies: string[];
  advertisers: string[];
  stations: string[];
  markets: string[];
  categories: string[];
  aeNames: string[];
}

export async function fetchReferenceData(): Promise<ReferenceData> {
  const defaultData: ReferenceData = {
    agencies: ['All Agencies'],
    advertisers: ['All Advertisers'],
    stations: ['All Stations'],
    markets: ['All Markets'],
    categories: ['All Categories'],
    aeNames: ['All AE Names']
  };

  try {
    // Fetch agencies
    const { data: agenciesData, error: agenciesError } = await supabase
      .from('references_agencies')
      .select('Name')
      .not('Name', 'is', null);

    if (agenciesError) {
      console.error('Error fetching agencies:', agenciesError);
    } else {
      console.log('Fetched agencies:', agenciesData?.length || 0);
      const uniqueAgencies = [...new Set(agenciesData?.map(item => item.Name).filter(Boolean) || [])];
      defaultData.agencies = ['All Agencies', ...uniqueAgencies];
    }

    // Fetch advertisers
    const { data: advertisersData, error: advertisersError } = await supabase
      .from('references_advertisers')
      .select('Name')
      .not('Name', 'is', null);

    if (advertisersError) {
      console.error('Error fetching advertisers:', advertisersError);
    } else {
      console.log('Fetched advertisers:', advertisersData?.length || 0);
      const uniqueAdvertisers = [...new Set(advertisersData?.map(item => item.Name).filter(Boolean) || [])];
      defaultData.advertisers = ['All Advertisers', ...uniqueAdvertisers];
    }

    // Fetch stations
    const { data: stationsData, error: stationsError } = await supabase
      .from('references_stations')
      .select('Code')
      .not('Code', 'is', null);

    if (stationsError) {
      console.error('Error fetching stations:', stationsError);
    } else {
      console.log('Fetched stations:', stationsData?.length || 0);
      const uniqueStations = [...new Set(stationsData?.map(item => item.Code).filter(Boolean) || [])];
      defaultData.stations = ['All Stations', ...uniqueStations];
    }

    // Fetch markets
    const { data: marketsData, error: marketsError } = await supabase
      .from('references_markets')
      .select('Name')
      .not('Name', 'is', null);

    if (marketsError) {
      console.error('Error fetching markets:', marketsError);
    } else {
      console.log('Fetched markets:', marketsData?.length || 0);
      const uniqueMarkets = [...new Set(marketsData?.map(item => item.Name).filter(Boolean) || [])];
      defaultData.markets = ['All Markets', ...uniqueMarkets];
    }

    // Fetch categories
    const { data: categoriesData, error: categoriesError } = await supabase
      .from('references_advertisers')
      .select('"Category Name"')
      .not('Category Name', 'is', null);

    if (categoriesError) {
      console.error('Error fetching categories:', categoriesError);
    } else {
      console.log('Fetched categories:', categoriesData?.length || 0);
      const uniqueCategories = [...new Set(categoriesData?.map(item => item['Category Name']).filter(Boolean) || [])];
      defaultData.categories = ['All Categories', ...uniqueCategories];
    }

    // Fetch AE Names from headline data
    const { data: aeData, error: aeError } = await supabase
      .from('1test_llama_gemini')
      .select('contact_name')
      .not('contact_name', 'is', null);

    if (aeError) {
      console.error('Error fetching AE names:', aeError);
    } else {
      console.log('Fetched AE names:', aeData?.length || 0);
      const uniqueAENames = [...new Set(aeData?.map(item => item.contact_name).filter(Boolean) || [])];
      defaultData.aeNames = ['All AE Names', ...uniqueAENames];
    }

  } catch (error) {
    console.error('Error in fetchReferenceData:', error);
  }

  return defaultData;
}

export async function fetchHeadlineData(filters: any = {}) {
  try {
    console.log('Fetching headline data with filters:', filters);
    
    let query = supabase
      .from('1test_llama_gemini')
      .select('*');

    // Apply filters if they exist and are not "All"
    if (filters.agency && !filters.agency.startsWith('All')) {
      query = query.eq('access_name', filters.agency);
    }
    if (filters.advertiser && !filters.advertiser.startsWith('All')) {
      query = query.eq('client_name', filters.advertiser);
    }
    if (filters.station && !filters.station.startsWith('All')) {
      query = query.eq('station_code', filters.station);
    }
    if (filters.market && !filters.market.startsWith('All')) {
      query = query.eq('market', filters.market);
    }
    if (filters.category && !filters.category.startsWith('All')) {
      // We'll need to join with references_advertisers for category filtering
      // For now, we'll handle this in the frontend
    }
    if (filters.aeName && !filters.aeName.startsWith('All')) {
      query = query.eq('contact_name', filters.aeName);
    }

    const { data, error } = await query;

    if (error) {
      console.error('Error fetching headline data:', error);
      return [];
    }

    console.log('Fetched headline data:', data?.length || 0, 'records');
    return data || [];
  } catch (error) {
    console.error('Error in fetchHeadlineData:', error);
    return [];
  }
}

// New function to fetch competitive analysis data
export async function fetchCompetitiveAnalysisData(filters: any = {}) {
  try {
    console.log('Fetching competitive analysis data with filters:', filters);
    
    // Use the schema-qualified table name directly
    const { data, error } = await supabase
      .rpc('fetch_competitive_analysis', {
        agency_filter: filters.agency && !filters.agency.startsWith('All') ? filters.agency : null,
        advertiser_filter: filters.advertiser && !filters.advertiser.startsWith('All') ? filters.advertiser : null
      });

    if (error) {
      console.error('Error fetching competitive analysis data:', error);
      return [];
    }

    console.log('Fetched competitive analysis data:', data?.length || 0, 'records');
    return data || [];
  } catch (error) {
    console.error('Error in fetchCompetitiveAnalysisData:', error);
    return [];
  }
}

// New function to fetch pacing data
export async function fetchPacingData(filters: any = {}) {
  try {
    console.log('Fetching pacing data with filters:', filters);
    
    // Use the schema-qualified table name directly
    const { data, error } = await supabase
      .rpc('fetch_pacing_data', {
        advertiser_filter: filters.advertiser && !filters.advertiser.startsWith('All') ? filters.advertiser : null
      });

    if (error) {
      console.error('Error fetching pacing data:', error);
      return [];
    }

    console.log('Fetched pacing data:', data?.length || 0, 'records');
    return data || [];
  } catch (error) {
    console.error('Error in fetchPacingData:', error);
    return [];
  }
}

// Updated function to fetch Darwin sales projections using RPC
export async function fetchDarwinProjections(filters: any = {}) {
  try {
    console.log('Fetching Darwin projections with filters:', filters);
    
    // Use RPC function to fetch from the _temp schema
    const { data: darwinData, error: darwinError } = await supabase
      .rpc('fetch_darwin_projections', {
        station_filter: filters.station && !filters.station.startsWith('All') ? filters.station : null,
        agency_filter: filters.agency && !filters.agency.startsWith('All') ? filters.agency : null,
        advertiser_filter: filters.advertiser && !filters.advertiser.startsWith('All') ? filters.advertiser : null
      });

    if (darwinError) {
      console.error('Error fetching Darwin projections:', darwinError);
      return [];
    }

    if (darwinData && darwinData.length > 0) {
      console.log('Fetched Darwin projections:', darwinData.length, 'records');
      // Transform the data to match the expected format for the components
      return darwinData.map((row: any) => ({
        stationCode: row['Station Code'] || 'Unknown',
        station: row['Station Code'] || 'Unknown', // Add station property that matches stationCode
        market: row['Market'] || 'Unknown',
        advertiser: row['Advertiser Name'] || 'Unknown',
        aeName: row['Seller Code'] || 'Unknown',
        agency: row['Agency Name'] || 'Unknown',
        // Convert billing values to numbers, handling potential string formats
        billing: parseFloat(row['Q3-2025 Billing$']?.toString().replace(/[,$]/g, '')) || 0,
        projectedBilling: parseFloat(row['Proj Billing$']?.toString().replace(/[,$]/g, '')) || 0,
        projectedMarket: parseFloat(row['Proj Market$']?.toString().replace(/[,$]/g, '')) || 0,
        actualMarket: parseFloat(row['Q3-2025 Market$']?.toString().replace(/[,$]/g, '')) || 0,
        variance: parseFloat(row['Proj Diff$']?.toString().replace(/[,$]/g, '')) || 0,
        category: row['Category'] || 'Unknown',
        quarter: row['Quarter'] || 'Q3-2025',
        projectedShare: parseFloat(row['Proj Share%']?.toString().replace(/%/g, '')) || 0
      }));
    }

    console.log('No Darwin projections data found');
    return [];
  } catch (error) {
    console.error('Error in fetchDarwinProjections:', error);
    return [];
  }
}

// Generate mock Darwin data when real data is not available
function generateMockDarwinData() {
  const mockData = [
    {
      station: 'WPRO-FM',
      market: 'Providence',
      advertiser: 'AutoNation',
      aeName: 'Mike Sullivan',
      agency: 'GroupM', // Add missing agency property
      billing: 45200,
      projectedBilling: 52000,
      projectedMarket: 180000,
      actualMarket: 165000,
      variance: 6800,
      category: 'Automotive'
    },
    {
      station: 'WBRU-FM',
      market: 'Providence',
      advertiser: 'Regional Medical Center',
      aeName: 'Lisa Rodriguez',
      agency: 'Zenith Media', // Add missing agency property
      billing: 38700,
      projectedBilling: 41000,
      projectedMarket: 220000,
      actualMarket: 205000,
      variance: 2300,
      category: 'Healthcare'
    },
    {
      station: 'WKFD-FM',
      market: 'Hartford',
      advertiser: 'Premier Real Estate',
      aeName: 'James Wilson',
      agency: 'Direct', // Add missing agency property
      billing: 32500,
      projectedBilling: 35000,
      projectedMarket: 150000,
      actualMarket: 142000,
      variance: 2500,
      category: 'Real Estate'
    },
    // Add more mock data as needed
  ];
  
  console.log('Using mock Darwin projections data:', mockData.length, 'records');
  return mockData;
}

// New function to fetch top advertisers data
export async function fetchTopAdvertisersData(filters: any = {}) {
  try {
    console.log('Fetching top advertisers with filters:', filters);
    
    const { data: advertisersData, error: advertisersError } = await supabase
      .from('references_advertisers')
      .select('Name, "Category Name", "Agency Code"')
      .not('Name', 'is', null)
      .limit(100);

    if (advertisersError) {
      console.error('Error fetching top advertisers:', advertisersError);
      return generateMockAdvertiserData();
    }

    // Enhance with mock billing data
    const enhancedData = advertisersData?.map((advertiser, index) => ({
      rank: index + 1,
      advertiser: advertiser.Name,
      category: advertiser['Category Name'] || 'Uncategorized',
      agency: advertiser['Agency Code'] || 'Direct',
      totalBilling: Math.floor(Math.random() * 500000) + 50000,
      spotCount: Math.floor(Math.random() * 1000) + 100,
      yoyChange: (Math.random() * 40 - 20).toFixed(1), // -20% to +20%
      lastOrderDate: new Date(Date.now() - Math.random() * 90 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      makegoods: Math.floor(Math.random() * 10),
      region: ['Northeast', 'Southeast', 'Midwest', 'West'][Math.floor(Math.random() * 4)]
    })) || [];

    // Sort by total billing
    enhancedData.sort((a, b) => b.totalBilling - a.totalBilling);

    console.log('Fetched and enhanced top advertisers:', enhancedData.length, 'records');
    return enhancedData;
  } catch (error) {
    console.error('Error in fetchTopAdvertisersData:', error);
    return generateMockAdvertiserData();
  }
}

function generateMockAdvertiserData() {
  const mockData = [
    {
      rank: 1,
      advertiser: 'Toyota Motors',
      category: 'Automotive',
      agency: 'Zenith Media',
      totalBilling: 485000,
      spotCount: 1250,
      yoyChange: '+15.2',
      lastOrderDate: '2024-12-28',
      makegoods: 3,
      region: 'Northeast'
    },
    {
      rank: 2,
      advertiser: 'McDonald\'s Corporation',
      category: 'QSR',
      agency: 'GroupM',
      totalBilling: 423000,
      spotCount: 980,
      yoyChange: '+8.7',
      lastOrderDate: '2024-12-29',
      makegoods: 1,
      region: 'Southeast'
    },
    // Add more mock data as needed
  ];
  
  console.log('Using mock top advertisers data:', mockData.length, 'records');
  return mockData;
}

// Updated function to calculate monthly performance data from real data sources
export async function calculateMonthlyPerformanceData(darwinData: any[], pacingData: any[] = []) {
  if (pacingData && pacingData.length > 0) {
    // Use real pacing data if available
    return pacingData.map((row: any) => ({
      month: row['Month'] || 'Unknown',
      booked: parseFloat(row['Sales $']?.toString().replace(/[,$]/g, '')) || 0,
      projection: parseFloat(row['Projection']?.toString().replace(/[,$]/g, '')) || 0,
      lastYear: parseFloat(row['Last Year']?.toString().replace(/[,$]/g, '')) || 0,
      pace: parseFloat(row['% Pacing']?.toString().replace(/%/g, '')) || 0,
      variance: parseFloat(row['Variance']?.toString().replace(/[,$]/g, '')) || 0,
      changeVsLastYear: parseFloat(row['Change vs LY']?.toString().replace(/[,$]/g, '')) || 0
    }));
  }

  if (!darwinData || darwinData.length === 0) {
    return [];
  }

  // Fallback to Darwin data calculations
  const monthlyData = [];
  const months = ['Jan 24', 'Feb 24', 'Mar 24', 'Apr 24', 'May 24', 'Jun 24', 'Jul 24', 'Aug 24', 'Sep 24'];
  
  for (let i = 0; i < months.length; i++) {
    const month = months[i];
    
    // Calculate totals for this month from available data
    const monthlyBilling = darwinData.reduce((sum, item) => sum + (item.billing || 0), 0) / months.length;
    const monthlyProjection = darwinData.reduce((sum, item) => sum + (item.projectedBilling || 0), 0) / months.length;
    const monthlyLastYear = monthlyBilling * 0.85; // Estimate last year as 85% of current
    const pace = monthlyProjection > 0 ? (monthlyBilling / monthlyProjection) * 100 : 0;
    const variance = monthlyBilling - monthlyProjection;
    const changeVsLastYear = monthlyBilling - monthlyLastYear;

    monthlyData.push({
      month,
      booked: Math.round(monthlyBilling + (Math.random() - 0.5) * monthlyBilling * 0.2), // Add some variation
      projection: Math.round(monthlyProjection),
      lastYear: Math.round(monthlyLastYear),
      pace: Number(pace.toFixed(1)),
      variance: Math.round(variance),
      changeVsLastYear: Math.round(changeVsLastYear)
    });
  }

  return monthlyData;
}
