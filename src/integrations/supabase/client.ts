
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://cxngbscjdugksftndvgl.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImN4bmdic2NqZHVna3NmdG5kdmdsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDg3ODc0NzUsImV4cCI6MjA2NDM2MzQ3NX0.t_AS0_Ganjhj_Q1b22lCpBbibbXQPjaCG1Tt8vUmoaQ'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
