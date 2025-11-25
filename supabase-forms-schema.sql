-- ============================================
-- PrintAlliance Forms Data - Complete Database Setup
-- ============================================
-- Run this script in your Supabase SQL Editor
-- This creates tables for all form submissions
-- ============================================

-- ============================================
-- Step 1: Create Troubleshooting Requests Table
-- ============================================
-- Stores data from the troubleshooting wizard (/troubleshoot/[brand])
DROP TABLE IF EXISTS public.troubleshooting_requests CASCADE;

CREATE TABLE public.troubleshooting_requests (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  brand TEXT NOT NULL,
  model_number TEXT,
  problem TEXT,
  device_type TEXT,
  email_opt_in BOOLEAN DEFAULT false,
  email TEXT,
  call_opt_in BOOLEAN DEFAULT false,
  user_name TEXT,
  user_email TEXT,
  user_phone TEXT,
  user_address TEXT,
  country TEXT,
  session_id UUID REFERENCES public.chat_sessions(id) ON DELETE SET NULL,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'in_progress', 'resolved', 'closed')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================
-- Step 2: Create Contact Requests Table
-- ============================================
-- Stores data from the contact form
DROP TABLE IF EXISTS public.contact_requests CASCADE;

CREATE TABLE public.contact_requests (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  country TEXT,
  printer_brand TEXT,
  preferred_time TIME,
  issue_description TEXT,
  contact_method TEXT CHECK (contact_method IN ('phone', 'email', 'chat')),
  newsletter BOOLEAN DEFAULT false,
  gdpr BOOLEAN DEFAULT false,
  status TEXT DEFAULT 'new' CHECK (status IN ('new', 'contacted', 'in_progress', 'resolved', 'closed')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================
-- Step 3: Create Support Requests Table
-- ============================================
-- Stores general support requests from Get Started modal
DROP TABLE IF EXISTS public.support_requests CASCADE;

CREATE TABLE public.support_requests (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  brand TEXT NOT NULL,
  session_id UUID REFERENCES public.chat_sessions(id) ON DELETE SET NULL,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'in_progress', 'resolved', 'closed')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================
-- Step 4: Create Indexes for Performance
-- ============================================
CREATE INDEX idx_troubleshooting_requests_brand ON public.troubleshooting_requests(brand);
CREATE INDEX idx_troubleshooting_requests_status ON public.troubleshooting_requests(status);
CREATE INDEX idx_troubleshooting_requests_created_at ON public.troubleshooting_requests(created_at);
CREATE INDEX idx_troubleshooting_requests_email ON public.troubleshooting_requests(email);
CREATE INDEX idx_troubleshooting_requests_session_id ON public.troubleshooting_requests(session_id);

CREATE INDEX idx_contact_requests_status ON public.contact_requests(status);
CREATE INDEX idx_contact_requests_created_at ON public.contact_requests(created_at);
CREATE INDEX idx_contact_requests_email ON public.contact_requests(email);
CREATE INDEX idx_contact_requests_contact_method ON public.contact_requests(contact_method);

CREATE INDEX idx_support_requests_brand ON public.support_requests(brand);
CREATE INDEX idx_support_requests_status ON public.support_requests(status);
CREATE INDEX idx_support_requests_created_at ON public.support_requests(created_at);
CREATE INDEX idx_support_requests_session_id ON public.support_requests(session_id);

-- ============================================
-- Step 5: Enable Row Level Security (RLS)
-- ============================================
ALTER TABLE public.troubleshooting_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contact_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.support_requests ENABLE ROW LEVEL SECURITY;

-- ============================================
-- Step 6: Drop Existing Policies (if any)
-- ============================================
DO $$ 
DECLARE
    r RECORD;
BEGIN
    FOR r IN (SELECT policyname FROM pg_policies WHERE tablename = 'troubleshooting_requests') LOOP
        EXECUTE 'DROP POLICY IF EXISTS ' || quote_ident(r.policyname) || ' ON public.troubleshooting_requests';
    END LOOP;
    FOR r IN (SELECT policyname FROM pg_policies WHERE tablename = 'contact_requests') LOOP
        EXECUTE 'DROP POLICY IF EXISTS ' || quote_ident(r.policyname) || ' ON public.contact_requests';
    END LOOP;
    FOR r IN (SELECT policyname FROM pg_policies WHERE tablename = 'support_requests') LOOP
        EXECUTE 'DROP POLICY IF EXISTS ' || quote_ident(r.policyname) || ' ON public.support_requests';
    END LOOP;
END $$;

-- ============================================
-- Step 7: Create Permissive Policies
-- ============================================
-- Allow all operations (we handle auth in the app)
CREATE POLICY "troubleshooting_requests_all_access" 
ON public.troubleshooting_requests
FOR ALL 
USING (true) 
WITH CHECK (true);

CREATE POLICY "contact_requests_all_access" 
ON public.contact_requests
FOR ALL 
USING (true) 
WITH CHECK (true);

CREATE POLICY "support_requests_all_access" 
ON public.support_requests
FOR ALL 
USING (true) 
WITH CHECK (true);

-- ============================================
-- Step 8: Create Trigger Function for updated_at
-- ============================================
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- ============================================
-- Step 9: Create Triggers for Auto-update
-- ============================================
DROP TRIGGER IF EXISTS update_troubleshooting_requests_updated_at ON public.troubleshooting_requests;
CREATE TRIGGER update_troubleshooting_requests_updated_at
  BEFORE UPDATE ON public.troubleshooting_requests
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

DROP TRIGGER IF EXISTS update_contact_requests_updated_at ON public.contact_requests;
CREATE TRIGGER update_contact_requests_updated_at
  BEFORE UPDATE ON public.contact_requests
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

DROP TRIGGER IF EXISTS update_support_requests_updated_at ON public.support_requests;
CREATE TRIGGER update_support_requests_updated_at
  BEFORE UPDATE ON public.support_requests
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- ============================================
-- Step 10: Grant Permissions
-- ============================================
GRANT ALL ON public.troubleshooting_requests TO anon, authenticated, service_role;
GRANT ALL ON public.contact_requests TO anon, authenticated, service_role;
GRANT ALL ON public.support_requests TO anon, authenticated, service_role;
GRANT USAGE ON SCHEMA public TO anon, authenticated, service_role;

-- ============================================
-- Step 11: Enable Realtime (Optional)
-- ============================================
-- Note: Enable manually in Dashboard > Database > Replication if needed
DO $$
BEGIN
  IF EXISTS (SELECT 1 FROM pg_publication WHERE pubname = 'supabase_realtime') THEN
    BEGIN
      ALTER PUBLICATION supabase_realtime ADD TABLE public.troubleshooting_requests;
      ALTER PUBLICATION supabase_realtime ADD TABLE public.contact_requests;
      ALTER PUBLICATION supabase_realtime ADD TABLE public.support_requests;
    EXCEPTION WHEN OTHERS THEN
      RAISE NOTICE 'Realtime publication updated. If tables not showing, enable manually in Dashboard.';
    END;
  END IF;
END $$;

-- ============================================
-- Verification Queries
-- ============================================
SELECT 'All form tables created successfully!' as status;

-- Verify tables exist
SELECT table_name 
FROM information_schema.tables 
WHERE table_schema = 'public' 
AND table_name IN ('troubleshooting_requests', 'contact_requests', 'support_requests', 'chat_sessions', 'chat_messages')
ORDER BY table_name;

-- Show table structures
SELECT 
  table_name,
  column_name,
  data_type,
  is_nullable
FROM information_schema.columns
WHERE table_schema = 'public'
AND table_name IN ('troubleshooting_requests', 'contact_requests', 'support_requests')
ORDER BY table_name, ordinal_position;

-- ============================================
-- IMPORTANT: After running this script:
-- ============================================
-- 1. Go to Supabase Dashboard > Database > Replication
-- 2. Enable replication for tables if you need real-time updates:
--    - troubleshooting_requests
--    - contact_requests
--    - support_requests
-- 3. All form data will now be stored in Supabase
-- ============================================

