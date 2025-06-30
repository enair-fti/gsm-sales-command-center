
-- Create/update the fetch_darwin_projections function  
CREATE OR REPLACE FUNCTION public.fetch_darwin_projections(station_filter text DEFAULT NULL::text, agency_filter text DEFAULT NULL::text, advertiser_filter text DEFAULT NULL::text)
 RETURNS TABLE("Station Code" text, "Market" text, "Advertiser Name" text, "Seller Code" text, "Agency Name" text, "Q3-2025 Billing$" text, "Proj Billing$" text, "Proj Market$" text, "Q3-2025 Market$" text, "Proj Diff$" text, "Category" text, "Quarter" text, "Proj Share%" text)
 LANGUAGE plpgsql
AS $function$
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
  ORDER BY d."Station Code"
  LIMIT 100;
END;
$function$;
