
import { supabase } from '@/integrations/supabase/client';

export interface ReferenceData {
  agencies: string[];
  advertisers: string[];
  stations: string[];
  markets: string[];
}

export async function fetchReferenceData(): Promise<ReferenceData> {
  const defaultData: ReferenceData = {
    agencies: ['All Agencies'],
    advertisers: ['All Advertisers'],
    stations: ['All Stations'],
    markets: ['All Markets']
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
