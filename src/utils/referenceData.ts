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

// Updated function to fetch Darwin sales projections from the correct table
export async function fetchDarwinProjections(filters: any = {}) {
  try {
    console.log('Fetching Darwin projections with filters:', filters);
    
    // Fetch from the actual Darwin projections table
    let query = supabase
      .from('_temp.darwin-sales-projections-20250624_Cris View')
      .select('*');

    // Apply filters if they exist and are not "All"
    if (filters.station && !filters.station.startsWith('All')) {
      query = query.eq('Station Code', filters.station);
    }
    if (filters.agency && !filters.agency.startsWith('All')) {
      query = query.eq('Agency Name', filters.agency);
    }
    if (filters.advertiser && !filters.advertiser.startsWith('All')) {
      query = query.eq('Advertiser Name', filters.advertiser);
    }

    const { data: darwinData, error: darwinError } = await query.limit(100);

    if (darwinError) {
      console.error('Error fetching Darwin projections:', darwinError);
      // Return mock data if the table query fails
      return generateMockDarwinData();
    }

    if (darwinData && darwinData.length > 0) {
      console.log('Fetched Darwin projections:', darwinData.length, 'records');
      // Transform the data to match the expected format for the components
      return darwinData.map((row: any) => ({
        station: row['Station Code'] || 'Unknown',
        market: 'Unknown', // Not available in Darwin table
        advertiser: row['Advertiser Name'] || 'Unknown',
        aeName: row['Seller Code'] || 'Unknown',
        agency: row['Agency Name'] || 'Unknown', // Add missing agency property
        billing: parseInt(row['Q3-2025 Billing$']) || 0,
        projectedBilling: parseInt(row['Proj Billing$']) || 0,
        projectedMarket: parseInt(row['Proj Market$']) || 0,
        actualMarket: parseInt(row['Q3-2025 Market$']) || 0,
        variance: parseInt(row['Proj Diff$']) || 0,
        category: 'Unknown' // Not available in Darwin table
      }));
    }

    console.log('No Darwin projections data found, using mock data');
    return generateMockDarwinData();
  } catch (error) {
    console.error('Error in fetchDarwinProjections:', error);
    return generateMockDarwinData();
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
