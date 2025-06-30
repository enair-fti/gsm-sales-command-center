
-- Create/update the fetch_pacing_data function
CREATE OR REPLACE FUNCTION public.fetch_pacing_data(advertiser_filter text DEFAULT NULL::text)
 RETURNS TABLE("Month" text, "Advertiser" text, "Sales $" text, "Projection" text, "Last Year" text, "% Pacing" text, "Variance" text, "Change vs LY" text)
 LANGUAGE plpgsql
AS $function$
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
  ORDER BY p."Month"
  LIMIT 100;
END;
$function$;
