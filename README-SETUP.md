# Live Chat Support Setup Guide

## 1. Environment Variables

Create a `.env.local` file in the root directory with the following:

```env
NEXT_PUBLIC_SUPABASE_URL=https://flfjzyxibzfuqcfyexfx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZsZmp6eXhpYnpmdXFjZnlleGZ4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjM5OTQ1OTIsImV4cCI6MjA3OTU3MDU5Mn0.HMOis-EUYG7VMaSw9kWZj6abysDmihz31HPVhXhxE8Y
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZsZmp6eXhpYnpmdXFjZnlleGZ4Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2Mzk5NDU5MiwiZXhwIjoyMDc5NTcwNTkyfQ.sp89VOMZCGQNYDirHnz8_VMxpz_ZusBkQtP6CsdQgggs

# Admin Support Login Credentials
NEXT_PUBLIC_ADMIN_USERNAME=admin
NEXT_PUBLIC_ADMIN_PASSWORD=PrintAlliance2024!
```

## 2. Supabase Database Setup

1. Go to your Supabase project dashboard
2. Navigate to SQL Editor
3. Run the SQL script from `supabase-schema.sql` to create the necessary tables:
   - `chat_sessions` - Stores chat sessions
   - `chat_messages` - Stores chat messages

## 3. Enable Realtime

1. In Supabase dashboard, go to Database > Replication
2. Enable replication for both `chat_sessions` and `chat_messages` tables

## 4. Features

### User Side:
- Chat widget appears in bottom right corner
- User clicks "Request Support" to start
- User waits for expert to connect
- Real-time messaging once connected

### Admin Side:
- Access at `/adminsupport`
- Login credentials:
  - Username: `admin`
  - Password: `PrintAlliance2024!`
- See all waiting and active sessions
- Click on session to connect and chat
- Real-time message updates

## 5. How It Works

1. User requests support → Creates a session with status "waiting"
2. Admin sees the waiting session in dashboard
3. Admin clicks to connect → Session status changes to "connected"
4. Both user and admin can send messages in real-time
5. Messages are stored in Supabase and synced via realtime subscriptions

