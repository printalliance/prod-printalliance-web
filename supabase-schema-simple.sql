-- ============================================
-- SIMPLE VERSION - Run this first
-- ============================================

-- Step 1: Create chat_sessions table (drop if exists first)
DROP TABLE IF EXISTS public.chat_sessions CASCADE;
DROP TABLE IF EXISTS public.chat_messages CASCADE;

CREATE TABLE public.chat_sessions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_name TEXT DEFAULT 'Guest User',
  status TEXT DEFAULT 'waiting' CHECK (status IN ('waiting', 'connected', 'closed')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Step 2: Create chat_messages table
CREATE TABLE public.chat_messages (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  session_id UUID NOT NULL REFERENCES public.chat_sessions(id) ON DELETE CASCADE,
  content TEXT NOT NULL,
  sender TEXT NOT NULL CHECK (sender IN ('user', 'expert')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Step 3: Create indexes
CREATE INDEX idx_chat_messages_session_id ON public.chat_messages(session_id);
CREATE INDEX idx_chat_messages_created_at ON public.chat_messages(created_at);
CREATE INDEX idx_chat_sessions_status ON public.chat_sessions(status);
CREATE INDEX idx_chat_sessions_created_at ON public.chat_sessions(created_at);

-- Step 4: Disable RLS temporarily to test
ALTER TABLE public.chat_sessions DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.chat_messages DISABLE ROW LEVEL SECURITY;

-- Step 5: Grant permissions
GRANT ALL ON public.chat_sessions TO anon, authenticated, service_role;
GRANT ALL ON public.chat_messages TO anon, authenticated, service_role;

-- Step 6: Test insert
INSERT INTO public.chat_sessions (user_name, status) 
VALUES ('Test User', 'waiting') 
RETURNING *;

-- Step 7: Verify tables exist
SELECT table_name 
FROM information_schema.tables 
WHERE table_schema = 'public' 
AND table_name IN ('chat_sessions', 'chat_messages');

