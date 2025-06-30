
-- Grant permissions for anon role to access _temp schema and execute RPC functions
GRANT USAGE ON SCHEMA _temp TO anon;
GRANT SELECT ON ALL TABLES IN SCHEMA _temp TO anon;

-- Grant execute permissions on the RPC functions
GRANT EXECUTE ON FUNCTION public.fetch_darwin_projections TO anon;
GRANT EXECUTE ON FUNCTION public.fetch_competitive_analysis TO anon;
GRANT EXECUTE ON FUNCTION public.fetch_pacing_data TO anon;
