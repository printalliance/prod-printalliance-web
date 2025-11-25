-- ============================================
-- PrintAlliance Chat Support System - Database Setup
-- ============================================
-- Run this script in your Supabase SQL Editor
-- ============================================

-- Step 1: Create chat_sessions table
CREATE TABLE IF NOT EXISTS public.chat_sessions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_name TEXT DEFAULT 'Guest User',
  status TEXT DEFAULT 'waiting' CHECK (status IN ('waiting', 'connected', 'closed')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Step 2: Create chat_messages table
CREATE TABLE IF NOT EXISTS public.chat_messages (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  session_id UUID NOT NULL REFERENCES public.chat_sessions(id) ON DELETE CASCADE,
  content TEXT NOT NULL,
  sender TEXT NOT NULL CHECK (sender IN ('user', 'expert')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Step 3: Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_chat_messages_session_id ON public.chat_messages(session_id);
CREATE INDEX IF NOT EXISTS idx_chat_messages_created_at ON public.chat_messages(created_at);
CREATE INDEX IF NOT EXISTS idx_chat_sessions_status ON public.chat_sessions(status);
CREATE INDEX IF NOT EXISTS idx_chat_sessions_created_at ON public.chat_sessions(created_at);

-- Step 4: Enable Row Level Security (RLS)
ALTER TABLE public.chat_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.chat_messages ENABLE ROW LEVEL SECURITY;

-- Step 5: Drop existing policies if they exist (to avoid conflicts)
DROP POLICY IF EXISTS "Allow all operations on chat_sessions" ON public.chat_sessions;
DROP POLICY IF EXISTS "Allow all operations on chat_messages" ON public.chat_messages;
DROP POLICY IF EXISTS "Enable read access for all users" ON public.chat_sessions;
DROP POLICY IF EXISTS "Enable insert for all users" ON public.chat_sessions;
DROP POLICY IF EXISTS "Enable read access for all users" ON public.chat_messages;
DROP POLICY IF EXISTS "Enable insert for all users" ON public.chat_messages;
DROP POLICY IF EXISTS "Public read access" ON public.chat_sessions;
DROP POLICY IF EXISTS "Public insert access" ON public.chat_sessions;
DROP POLICY IF EXISTS "Public read access" ON public.chat_messages;
DROP POLICY IF EXISTS "Public insert access" ON public.chat_messages;

-- Step 6: Create policies to allow all operations (since we handle auth in the app)
CREATE POLICY "Allow all operations on chat_sessions" 
ON public.chat_sessions
FOR ALL 
USING (true) 
WITH CHECK (true);

CREATE POLICY "Allow all operations on chat_messages" 
ON public.chat_messages
FOR ALL 
USING (true) 
WITH CHECK (true);

-- Step 7: Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Step 8: Drop existing trigger if it exists
DROP TRIGGER IF EXISTS update_chat_sessions_updated_at ON public.chat_sessions;

-- Step 9: Create trigger to automatically update updated_at
CREATE TRIGGER update_chat_sessions_updated_at
  BEFORE UPDATE ON public.chat_sessions
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Step 10: Enable Realtime for both tables
-- Note: You may need to enable this manually in Supabase Dashboard > Database > Replication
-- But we'll try to add them to the publication
DO $$
BEGIN
  -- Try to add tables to realtime publication
  BEGIN
    ALTER PUBLICATION supabase_realtime ADD TABLE public.chat_sessions;
  EXCEPTION WHEN OTHERS THEN
    RAISE NOTICE 'Could not add chat_sessions to realtime publication. Enable manually in Dashboard.';
  END;
  
  BEGIN
    ALTER PUBLICATION supabase_realtime ADD TABLE public.chat_messages;
  EXCEPTION WHEN OTHERS THEN
    RAISE NOTICE 'Could not add chat_messages to realtime publication. Enable manually in Dashboard.';
  END;
END $$;

-- Step 11: Grant necessary permissions
GRANT ALL ON public.chat_sessions TO anon, authenticated;
GRANT ALL ON public.chat_messages TO anon, authenticated;
GRANT USAGE ON SCHEMA public TO anon, authenticated;

-- ============================================
-- Verification Queries (Optional - run to test)
-- ============================================

-- Test insert a session
-- INSERT INTO public.chat_sessions (user_name, status) VALUES ('Test User', 'waiting');

-- View all sessions
-- SELECT * FROM public.chat_sessions ORDER BY created_at DESC;

-- View all messages
-- SELECT * FROM public.chat_messages ORDER BY created_at DESC;

-- ============================================
-- IMPORTANT: After running this script:
-- ============================================
-- 1. Go to Supabase Dashboard > Database > Replication
-- 2. Enable replication for both:
--    - chat_sessions
--    - chat_messages
-- 3. This enables real-time updates
-- ============================================
