-- ============================================
-- PrintAlliance Complete Database Schema
-- ============================================
-- Run this COMPLETE script in Supabase SQL Editor
-- Includes: Chat system + All form data storage
-- ============================================

-- ============================================
-- PART 1: Chat System Tables
-- ============================================

-- Create chat_sessions table
DROP TABLE IF EXISTS public.chat_sessions CASCADE;

CREATE TABLE public.chat_sessions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_name TEXT DEFAULT 'Guest User',
  status TEXT DEFAULT 'waiting' CHECK (status IN ('waiting', 'connected', 'closed')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create chat_messages table
DROP TABLE IF EXISTS public.chat_messages CASCADE;

CREATE TABLE public.chat_messages (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  session_id UUID NOT NULL REFERENCES public.chat_sessions(id) ON DELETE CASCADE,
  content TEXT NOT NULL,
  sender TEXT NOT NULL CHECK (sender IN ('user', 'expert')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================
-- PART 2: Form Data Tables
-- ============================================

-- Troubleshooting Requests Table
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

-- Contact Requests Table
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

-- Support Requests Table
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
-- PART 3: Indexes for Performance
-- ============================================

-- Chat tables indexes
CREATE INDEX idx_chat_messages_session_id ON public.chat_messages(session_id);
CREATE INDEX idx_chat_messages_created_at ON public.chat_messages(created_at);
CREATE INDEX idx_chat_sessions_status ON public.chat_sessions(status);
CREATE INDEX idx_chat_sessions_created_at ON public.chat_sessions(created_at);

-- Form tables indexes
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
-- PART 4: Row Level Security (RLS)
-- ============================================

ALTER TABLE public.chat_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.chat_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.troubleshooting_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contact_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.support_requests ENABLE ROW LEVEL SECURITY;

-- ============================================
-- PART 5: Drop Existing Policies
-- ============================================

DO $$ 
DECLARE
    r RECORD;
    tables TEXT[] := ARRAY['chat_sessions', 'chat_messages', 'troubleshooting_requests', 'contact_requests', 'support_requests'];
    table_name TEXT;
BEGIN
    FOREACH table_name IN ARRAY tables LOOP
        FOR r IN (SELECT policyname FROM pg_policies WHERE tablename = table_name) LOOP
            EXECUTE 'DROP POLICY IF EXISTS ' || quote_ident(r.policyname) || ' ON public.' || quote_ident(table_name);
        END LOOP;
    END LOOP;
END $$;

-- ============================================
-- PART 6: Create Permissive Policies
-- ============================================

CREATE POLICY "chat_sessions_all_access" 
ON public.chat_sessions
FOR ALL 
USING (true) 
WITH CHECK (true);

CREATE POLICY "chat_messages_all_access" 
ON public.chat_messages
FOR ALL 
USING (true) 
WITH CHECK (true);

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
-- PART 7: Trigger Function for updated_at
-- ============================================

CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- ============================================
-- PART 8: Create Triggers
-- ============================================

DROP TRIGGER IF EXISTS update_chat_sessions_updated_at ON public.chat_sessions;
CREATE TRIGGER update_chat_sessions_updated_at
  BEFORE UPDATE ON public.chat_sessions
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

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
-- PART 9: Grant Permissions
-- ============================================

GRANT ALL ON public.chat_sessions TO anon, authenticated, service_role;
GRANT ALL ON public.chat_messages TO anon, authenticated, service_role;
GRANT ALL ON public.troubleshooting_requests TO anon, authenticated, service_role;
GRANT ALL ON public.contact_requests TO anon, authenticated, service_role;
GRANT ALL ON public.support_requests TO anon, authenticated, service_role;
GRANT USAGE ON SCHEMA public TO anon, authenticated, service_role;

-- ============================================
-- PART 10: Enable Realtime (Optional)
-- ============================================

DO $$
BEGIN
  IF EXISTS (SELECT 1 FROM pg_publication WHERE pubname = 'supabase_realtime') THEN
    BEGIN
      ALTER PUBLICATION supabase_realtime ADD TABLE public.chat_sessions;
      ALTER PUBLICATION supabase_realtime ADD TABLE public.chat_messages;
      ALTER PUBLICATION supabase_realtime ADD TABLE public.troubleshooting_requests;
      ALTER PUBLICATION supabase_realtime ADD TABLE public.contact_requests;
      ALTER PUBLICATION supabase_realtime ADD TABLE public.support_requests;
    EXCEPTION WHEN OTHERS THEN
      RAISE NOTICE 'Realtime publication updated. Enable manually in Dashboard if needed.';
    END;
  END IF;
END $$;

-- ============================================
-- VERIFICATION
-- ============================================

SELECT 'All tables created successfully!' as status;

-- List all created tables
SELECT table_name 
FROM information_schema.tables 
WHERE table_schema = 'public' 
AND table_name IN (
  'chat_sessions', 
  'chat_messages', 
  'troubleshooting_requests', 
  'contact_requests', 
  'support_requests'
)
ORDER BY table_name;

-- ============================================
-- IMPORTANT: After running this script:
-- ============================================
-- 1. Go to Supabase Dashboard > Database > Replication
-- 2. Enable replication for all tables if you need real-time:
--    - chat_sessions
--    - chat_messages
--    - troubleshooting_requests
--    - contact_requests
--    - support_requests
-- 3. All form data will now be automatically saved to Supabase
-- ============================================

