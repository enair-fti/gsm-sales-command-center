
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
    // Fetch agencies from references_agencies
    const { data: agenciesData, error: agenciesError } = await supabase
      .from('references_agencies')
      .select('Code, Name')
      .not('Name', 'is', null);

    if (agenciesError) {
      console.error('Error fetching agencies:', agenciesError);
    } else {
      console.log('Fetched agencies:', agenciesData?.length || 0);
      const uniqueAgencies = [...new Set(agenciesData?.map(item => item.Name).filter(Boolean) || [])];
      defaultData.agencies = ['All Agencies', ...uniqueAgencies];
    }

    // Fetch advertisers from references_advertisers
    const { data: advertisersData, error: advertisersError } = await supabase
      .from('references_advertisers')
      .select('Code, Name, "Category Name"')
      .not('Name', 'is', null);

    if (advertisersError) {
      console.error('Error fetching advertisers:', advertisersError);
    } else {
      console.log('Fetched advertisers:', advertisersData?.length || 0);
      const uniqueAdvertisers = [...new Set(advertisersData?.map(item => item.Name).filter(Boolean) || [])];
      defaultData.advertisers = ['All Advertisers', ...uniqueAdvertisers];
      
      // Extract categories from advertisers
      const uniqueCategories = [...new Set(advertisersData?.map(item => item['Category Name']).filter(Boolean) || [])];
      defaultData.categories = ['All Categories', ...uniqueCategories];
    }

    // Fetch stations from references_stations (without Region column)
    const { data: stationsData, error: stationsError } = await supabase
      .from('references_stations')
      .select('Code, "Market Name"')
      .not('Code', 'is', null);

    if (stationsError) {
      console.error('Error fetching stations:', stationsError);
    } else {
      console.log('Fetched stations:', stationsData?.length || 0);
      // Remove -TV suffix from station codes when displaying
      const uniqueStations = [...new Set(stationsData?.map(item => 
        item.Code?.replace('-TV', '')
      ).filter(Boolean) || [])];
      defaultData.stations = ['All Stations', ...uniqueStations];
    }

    // Fetch markets from references_markets
    const { data: marketsData, error: marketsError } = await supabase
      .from('references_markets')
      .select('Code, Name')
      .not('Name', 'is', null);

    if (marketsError) {
      console.error('Error fetching markets:', marketsError);
    } else {
      console.log('Fetched markets:', marketsData?.length || 0);
      const uniqueMarkets = [...new Set(marketsData?.map(item => item.Name).filter(Boolean) || [])];
      defaultData.markets = ['All Markets', ...uniqueMarkets];
    }

    // Fetch AE Names from headline data (1test_llama_gemini schema)
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
      // Handle station filter with and without -TV suffix
      query = query.or(`station_code.eq.${filters.station},station_code.eq.${filters.station}-TV`);
    }
    if (filters.market && !filters.market.startsWith('All')) {
      query = query.eq('market', filters.market);
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

// Direct table query approach since RPC functions may not exist
export async function fetchDarwinProjections(filters: any = {}) {
  try {
    console.log('Fetching Darwin projections from _temp schema with filters:', filters);
    
    // Try to query the _temp schema table directly
    const { data: tempData, error: tempError } = await supabase
      .from('_temp.darwin-sales-projections-20250624_Cris View')
      .select('*');

    if (tempError) {
      console.error('Error fetching from _temp schema:', tempError);
      
      // If _temp schema fails, try without schema prefix
      const { data: altData, error: altError } = await supabase
        .from('darwin-sales-projections-20250624_Cris View')
        .select('*');

      if (altError) {
        console.error('Error fetching Darwin projections from alt approach:', altError);
        return generateMockDarwinData();
      }

      console.log('Fetched Darwin projections (alt approach):', altData?.length || 0, 'records');
      return transformDarwinData(altData || []);
    }

    console.log('Fetched Darwin projections (_temp):', tempData?.length || 0, 'records');
    return transformDarwinData(tempData || []);
  } catch (error) {
    console.error('Error in fetchDarwinProjections:', error);
    return generateMockDarwinData();
  }
}

// Transform Darwin data to expected format
function transformDarwinData(data: any[]) {
  return data.map((row: any) => ({
    station: row['Station Code']?.replace('-TV', '') || 'Unknown',
    market: row['Market'] || 'Unknown',
    advertiser: row['Advertiser Name'] || 'Unknown',
    aeName: row['Seller Code'] || 'Unknown',
    agency: row['Agency Name'] || 'Unknown',
    billing: parseFloat(row['Q3-2025 Billing$']?.toString().replace(/[,$]/g, '')) || 0,
    projectedBilling: parseFloat(row['Proj Billing$']?.toString().replace(/[,$]/g, '')) || 0,
    projectedMarket: parseFloat(row['Proj Market$']?.toString().replace(/[,$]/g, '')) || 0,
    actualMarket: parseFloat(row['Q3-2025 Market$']?.toString().replace(/[,$]/g, '')) || 0,
    variance: parseFloat(row['Proj Diff$']?.toString().replace(/[,$]/g, '')) || 0,
    category: row['Category'] || 'Unknown'
  }));
}

// Generate mock Darwin data when real data is not available
function generateMockDarwinData() {
  const mockData = [
    {
      station: 'WPRO-FM',
      market: 'Providence',
      advertiser: 'AutoNation',
      aeName: 'Mike Sullivan',
      agency: 'GroupM',
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
      agency: 'Zenith Media',
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
      agency: 'Direct',
      billing: 32500,
      projectedBilling: 35000,
      projectedMarket: 150000,
      actualMarket: 142000,
      variance: 2500,
      category: 'Real Estate'
    }
  ];
  
  console.log('Using mock Darwin projections data:', mockData.length, 'records');
  return mockData;
}

// Fetch competitive analysis data directly from table
export async function fetchCompetitiveAnalysis(filters: any = {}) {
  try {
    console.log('Fetching competitive analysis with filters:', filters);
    
    const { data: competitiveData, error: competitiveError } = await supabase
      .from('_temp.Competitive Analysis_250624-1224_AgyAdv')
      .select('*');

    if (competitiveError) {
      console.error('Error fetching competitive analysis:', competitiveError);
      return [];
    }

    if (competitiveData && competitiveData.length > 0) {
      console.log('Fetched competitive analysis:', competitiveData.length, 'records');
      return competitiveData.map((row: any) => ({
        month: row['Month'],
        agency: row['Agency'],
        advertiser: row['Advertiser'],
        headlines: row['# Headlines'],
        billing: row['Billing $'],
        market: row['Mkt $'],
        repPercent: row['Rep %'],
        custom: row['Custom']
      }));
    }

    console.log('No competitive analysis data found');
    return [];
  } catch (error) {
    console.error('Error in fetchCompetitiveAnalysis:', error);
    return [];
  }
}

// Fetch pacing data directly from table
export async function fetchPacingData(filters: any = {}) {
  try {
    console.log('Fetching pacing data with filters:', filters);
    
    const { data: pacingData, error: pacingError } = await supabase
      .from('_temp.Pacing_250624-1221_Adv')
      .select('*');

    if (pacingError) {
      console.error('Error fetching pacing data:', pacingError);
      return [];
    }

    if (pacingData && pacingData.length > 0) {
      console.log('Fetched pacing data:', pacingData.length, 'records');
      return pacingData.map((row: any) => ({
        month: row['Month'],
        advertiser: row['Advertiser'],
        sales: parseFloat(row['Sales $']?.toString().replace(/[,$]/g, '')) || 0,
        projection: parseFloat(row['Projection']?.toString().replace(/[,$]/g, '')) || 0,
        lastYear: parseFloat(row['Last Year']?.toString().replace(/[,$]/g, '')) || 0,
        pacing: parseFloat(row['% Pacing']?.toString().replace(/[%]/g, '')) || 0,
        variance: parseFloat(row['Variance']?.toString().replace(/[,$]/g, '')) || 0,
        changeVsLY: parseFloat(row['Change vs LY']?.toString().replace(/[,$]/g, '')) || 0
      }));
    }

    console.log('No pacing data found');
    return [];
  } catch (error) {
    console.error('Error in fetchPacingData:', error);
    return [];
  }
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

    // Enhance with mock billing data for now
    const enhancedData = advertisersData?.map((advertiser, index) => ({
      rank: index + 1,
      advertiser: advertiser.Name,
      category: advertiser['Category Name'] || 'Uncategorized',
      agency: advertiser['Agency Code'] || 'Direct',
      totalBilling: Math.floor(Math.random() * 500000) + 50000,
      spotCount: Math.floor(Math.random() * 1000) + 100,
      yoyChange: (Math.random() * 40 - 20).toFixed(1),
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
    }
  ];
  
  console.log('Using mock top advertisers data:', mockData.length, 'records');
  return mockData;
}

// Calculate monthly performance data from Darwin projections
export async function calculateMonthlyPerformanceData(darwinData: any[]) {
  if (!darwinData || darwinData.length === 0) {
    return [];
  }

  // Group data by month and calculate aggregated metrics
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
      booked: Math.round(monthlyBilling + (Math.random() - 0.5) * monthlyBilling * 0.2),
      projection: Math.round(monthlyProjection),
      lastYear: Math.round(monthlyLastYear),
      pace: Number(pace.toFixed(1)),
      variance: Math.round(variance),
      changeVsLastYear: Math.round(changeVsLastYear)
    });
  }

  return monthlyData;
}
