-- ============================================
-- PrintAlliance Support Plan Requests - Database Setup
-- ============================================
-- Run this script in your Supabase SQL Editor
-- This creates the table for support plan form submissions
-- ============================================

-- ============================================
-- Step 1: Create Support Plan Requests Table
-- ============================================
-- Stores data from the support plan form modal
DROP TABLE IF EXISTS public.support_plan_requests CASCADE;

CREATE TABLE public.support_plan_requests (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  plan_name TEXT NOT NULL,
  plan_title TEXT NOT NULL,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  country TEXT NOT NULL,
  issue_type TEXT NOT NULL,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'contacted', 'in_progress', 'resolved', 'closed')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================
-- Step 2: Create Indexes for Performance
-- ============================================
CREATE INDEX idx_support_plan_requests_plan_name ON public.support_plan_requests(plan_name);
CREATE INDEX idx_support_plan_requests_status ON public.support_plan_requests(status);
CREATE INDEX idx_support_plan_requests_created_at ON public.support_plan_requests(created_at);
CREATE INDEX idx_support_plan_requests_email ON public.support_plan_requests(email);
CREATE INDEX idx_support_plan_requests_country ON public.support_plan_requests(country);

-- ============================================
-- Step 3: Enable Row Level Security (RLS)
-- ============================================
ALTER TABLE public.support_plan_requests ENABLE ROW LEVEL SECURITY;

-- ============================================
-- Step 4: Drop Existing Policies (if any)
-- ============================================
DO $$ 
DECLARE
    r RECORD;
BEGIN
    FOR r IN (SELECT policyname FROM pg_policies WHERE tablename = 'support_plan_requests') LOOP
        EXECUTE 'DROP POLICY IF EXISTS ' || quote_ident(r.policyname) || ' ON public.support_plan_requests';
    END LOOP;
END $$;

-- ============================================
-- Step 5: Create Permissive Policy
-- ============================================
-- Allow all operations (we handle auth in the app)
CREATE POLICY "support_plan_requests_all_access" 
ON public.support_plan_requests
FOR ALL 
USING (true) 
WITH CHECK (true);

-- ============================================
-- Step 6: Create Trigger Function for updated_at
-- ============================================
-- Use existing function if it exists, otherwise create it
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- ============================================
-- Step 7: Create Trigger for Auto-update
-- ============================================
DROP TRIGGER IF EXISTS update_support_plan_requests_updated_at ON public.support_plan_requests;
CREATE TRIGGER update_support_plan_requests_updated_at
  BEFORE UPDATE ON public.support_plan_requests
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- ============================================
-- Step 8: Grant Permissions
-- ============================================
GRANT ALL ON public.support_plan_requests TO anon, authenticated, service_role;
GRANT USAGE ON SCHEMA public TO anon, authenticated, service_role;

-- ============================================
-- Step 9: Enable Realtime (Optional)
-- ============================================
-- Note: Enable manually in Dashboard > Database > Replication if needed
DO $$
BEGIN
  IF EXISTS (SELECT 1 FROM pg_publication WHERE pubname = 'supabase_realtime') THEN
    BEGIN
      ALTER PUBLICATION supabase_realtime ADD TABLE public.support_plan_requests;
    EXCEPTION WHEN OTHERS THEN
      RAISE NOTICE 'Realtime publication updated. If table not showing, enable manually in Dashboard.';
    END;
  END IF;
END $$;

-- ============================================
-- Verification Queries
-- ============================================
SELECT 'Support plan requests table created successfully!' as status;

-- Verify table exists
SELECT table_name 
FROM information_schema.tables 
WHERE table_schema = 'public' 
AND table_name = 'support_plan_requests';

-- Show table structure
SELECT 
  column_name,
  data_type,
  is_nullable,
  column_default
FROM information_schema.columns
WHERE table_schema = 'public'
AND table_name = 'support_plan_requests'
ORDER BY ordinal_position;

-- ============================================
-- IMPORTANT: After running this script:
-- ============================================
-- 1. Go to Supabase Dashboard > Database > Replication
-- 2. Enable replication for the table if you need real-time updates:
--    - support_plan_requests
-- 3. All support plan form submissions will now be stored in Supabase
-- ============================================


