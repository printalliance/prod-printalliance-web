import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://flfjzyxibzfuqcfyexfx.supabase.co';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZsZmp6eXhpYnpmdXFjZnlleGZ4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjM5OTQ1OTIsImV4cCI6MjA3OTU3MDU5Mn0.HMOis-EUYG7VMaSw9kWZj6abysDmihz31HPVhXhxE8Y';
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZsZmp6eXhpYnpmdXFjZnlleGZ4Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2Mzk5NDU5MiwiZXhwIjoyMDc5NTcwNTkyfQ.sp89VOMZCGQNYDirHnz8_VMxpz_ZusBkQtP6CsdQgggs';

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn('Supabase environment variables are missing. Using default values.');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Admin client - Use anon key for client-side, service role only works server-side
// For admin operations, we'll use the regular client but with proper RLS policies
export const supabaseAdmin = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
});

// Note: Service role key should only be used in API routes (server-side)
// For client-side admin, we rely on RLS policies that allow all operations

