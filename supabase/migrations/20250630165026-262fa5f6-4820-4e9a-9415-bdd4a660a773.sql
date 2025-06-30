
-- Update the fetch_competitive_analysis function to match the actual table structure
DROP FUNCTION IF EXISTS public.fetch_competitive_analysis(text, text);

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
  ORDER BY c."Month"
  LIMIT 100;
END;
$function$
