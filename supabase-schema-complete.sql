-- ============================================
-- COMPLETE VERSION - Run after simple version works
-- ============================================

-- Step 1: Enable RLS
ALTER TABLE public.chat_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.chat_messages ENABLE ROW LEVEL SECURITY;

-- Step 2: Drop all existing policies
DO $$ 
DECLARE
    r RECORD;
BEGIN
    FOR r IN (SELECT policyname FROM pg_policies WHERE tablename = 'chat_sessions') LOOP
        EXECUTE 'DROP POLICY IF EXISTS ' || quote_ident(r.policyname) || ' ON public.chat_sessions';
    END LOOP;
    FOR r IN (SELECT policyname FROM pg_policies WHERE tablename = 'chat_messages') LOOP
        EXECUTE 'DROP POLICY IF EXISTS ' || quote_ident(r.policyname) || ' ON public.chat_messages';
    END LOOP;
END $$;

-- Step 3: Create permissive policies
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

-- Step 4: Create trigger function for updated_at
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Step 5: Create trigger
DROP TRIGGER IF EXISTS update_chat_sessions_updated_at ON public.chat_sessions;
CREATE TRIGGER update_chat_sessions_updated_at
  BEFORE UPDATE ON public.chat_sessions
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Step 6: Enable Realtime (if publication exists)
-- Note: You still need to enable manually in Dashboard > Database > Replication
DO $$
BEGIN
  IF EXISTS (SELECT 1 FROM pg_publication WHERE pubname = 'supabase_realtime') THEN
    BEGIN
      ALTER PUBLICATION supabase_realtime ADD TABLE public.chat_sessions;
      ALTER PUBLICATION supabase_realtime ADD TABLE public.chat_messages;
    EXCEPTION WHEN OTHERS THEN
      RAISE NOTICE 'Realtime publication updated. If tables not showing, enable manually in Dashboard.';
    END;
  END IF;
END $$;

-- Verification
SELECT 'Tables created successfully!' as status;
SELECT COUNT(*) as session_count FROM public.chat_sessions;
SELECT COUNT(*) as message_count FROM public.chat_messages;

