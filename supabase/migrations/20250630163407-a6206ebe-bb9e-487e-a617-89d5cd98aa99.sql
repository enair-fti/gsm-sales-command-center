
-- Create RPC functions to access _temp schema tables properly

-- Function to fetch Darwin projections
CREATE OR REPLACE FUNCTION fetch_darwin_projections(
  station_filter TEXT DEFAULT NULL,
  agency_filter TEXT DEFAULT NULL,
  advertiser_filter TEXT DEFAULT NULL
)
RETURNS TABLE (
  "Station Code" TEXT,
  "Market" TEXT,
  "Advertiser Name" TEXT,
  "Seller Code" TEXT,
  "Agency Name" TEXT,
  "Q3-2025 Billing$" TEXT,
  "Proj Billing$" TEXT,
  "Proj Market$" TEXT,
  "Q3-2025 Market$" TEXT,
  "Proj Diff$" TEXT,
  "Category" TEXT,
  "Quarter" TEXT,
  "Proj Share%" TEXT
)
LANGUAGE plpgsql
AS $$
BEGIN
  RETURN QUERY
  SELECT 
    d."Station Code",
    d."Market",
    d."Advertiser Name",
    d."Seller Code",
    d."Agency Name",
    d."Q3-2025 Billing$",
    d."Proj Billing$",
    d."Proj Market$",
    d."Q3-2025 Market$",
    d."Proj Diff$",
    d."Category",
    d."Quarter",
    d."Proj Share%"
  FROM _temp."darwin-sales-projections-20250624_Cris View" d
  WHERE 
    (station_filter IS NULL OR d."Station Code" = station_filter)
    AND (agency_filter IS NULL OR d."Agency Name" = agency_filter)
    AND (advertiser_filter IS NULL OR d."Advertiser Name" = advertiser_filter)
  LIMIT 100;
END;
$$;

-- Function to fetch competitive analysis data
CREATE OR REPLACE FUNCTION fetch_competitive_analysis(
  agency_filter TEXT DEFAULT NULL,
  advertiser_filter TEXT DEFAULT NULL
)
RETURNS TABLE (
  "Month" TEXT,
  "Agency" TEXT,
  "Advertiser" TEXT,
  "# Headlines" TEXT,
  "Billing $" TEXT,
  "Mkt $" TEXT,
  "Rep %" TEXT,
  "Custom" TEXT
)
LANGUAGE plpgsql
AS $$
BEGIN
  RETURN QUERY
  SELECT 
    c."Month",
    c."Agency",
    c."Advertiser",
    c."# Headlines",
    c."Billing $",
    c."Mkt $",
    c."Rep %",
    c."Custom"
  FROM _temp."Competitive Analysis_250624-1224_AgyAdv" c
  WHERE 
    (agency_filter IS NULL OR c."Agency" = agency_filter)
    AND (advertiser_filter IS NULL OR c."Advertiser" = advertiser_filter)
  LIMIT 100;
END;
$$;

-- Function to fetch pacing data
CREATE OR REPLACE FUNCTION fetch_pacing_data(
  advertiser_filter TEXT DEFAULT NULL
)
RETURNS TABLE (
  "Month" TEXT,
  "Advertiser" TEXT,
  "Sales $" TEXT,
  "Projection" TEXT,
  "Last Year" TEXT,
  "% Pacing" TEXT,
  "Variance" TEXT,
  "Change vs LY" TEXT
)
LANGUAGE plpgsql
AS $$
BEGIN
  RETURN QUERY
  SELECT 
    p."Month",
    p."Advertiser",
    p."Sales $",
    p."Projection",
    p."Last Year",
    p."% Pacing",
    p."Variance",
    p."Change vs LY"
  FROM _temp."Pacing_250624-1221_Adv" p
  WHERE 
    (advertiser_filter IS NULL OR p."Advertiser" = advertiser_filter)
  LIMIT 100;
END;
$$;
