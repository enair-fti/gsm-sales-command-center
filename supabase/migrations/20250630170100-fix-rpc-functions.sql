
-- Fix the fetch_darwin_projections function with correct column names and remove limit
CREATE OR REPLACE FUNCTION public.fetch_darwin_projections(station_filter text DEFAULT NULL::text, agency_filter text DEFAULT NULL::text, advertiser_filter text DEFAULT NULL::text)
 RETURNS TABLE("Station Code" text, "Market" text, "Advertiser Name" text, "Seller Code" text, "Agency Name" text, "Q3-2025 Billing$" text, "Proj Billing$" text, "Proj Market$" text, "Q3-2025 Market$" text, "Proj Diff$" text, "Category" text, "Quarter" text, "Proj Share%" text)
 LANGUAGE plpgsql
AS $function$
BEGIN
  RETURN QUERY
  SELECT 
    d."Station Code",
    COALESCE(d."Proj Market$", d."Q3-2025 Market$", 'Unknown') as "Market",
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
  ORDER BY d."Station Code";
END;
$function$;

-- Fix the fetch_pacing_data function with correct column handling and remove limit
CREATE OR REPLACE FUNCTION public.fetch_pacing_data(advertiser_filter text DEFAULT NULL::text)
 RETURNS TABLE("Month" text, "Advertiser" text, "Sales $" text, "Projection" text, "Last Year" text, "% Pacing" text, "Variance" text, "Change vs LY" text)
 LANGUAGE plpgsql
AS $function$
BEGIN
  RETURN QUERY
  SELECT 
    COALESCE(p."Q2 2025Booked", 'Q2 2025') as "Month",
    p."Advertiser",
    p."Q2 2025Booked" as "Sales $",
    p."Q2 2025Projection" as "Projection",
    p."Q2 2024" as "Last Year",
    p."Q2 2025% Pacing" as "% Pacing",
    p."Q2 2025Variance" as "Variance",
    p."Q2 2025Change vs LY" as "Change vs LY"
  FROM _temp."Pacing_250624-1221_Adv" p
  WHERE 
    (advertiser_filter IS NULL OR p."Advertiser" = advertiser_filter)
  ORDER BY p."Advertiser";
END;
$function$;

-- Fix the fetch_competitive_analysis function and remove limit
CREATE OR REPLACE FUNCTION public.fetch_competitive_analysis(agency_filter text DEFAULT NULL::text, advertiser_filter text DEFAULT NULL::text)
 RETURNS TABLE("Month" character varying, "Agency" character varying, "Advertiser" character varying, "# Headlines" integer, "Billing $" integer, "Mkt $" integer, "Rep %" double precision, "Custom" integer)
 LANGUAGE plpgsql
AS $function$
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
  ORDER BY c."Month";
END;
$function$;
