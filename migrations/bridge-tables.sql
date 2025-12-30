-- Claude File Bridge - Database Schema
-- Run in Supabase SQL Editor

-- Users table (with API keys and gem balance)
CREATE TABLE IF NOT EXISTS bridge_users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email TEXT UNIQUE NOT NULL,
    api_key TEXT UNIQUE NOT NULL,  -- 35-char key starting with fb_
    gems_balance INTEGER DEFAULT 50,
    created_at TIMESTAMP DEFAULT NOW(),
    last_active TIMESTAMP DEFAULT NOW()
);

-- File queue (uploads from phone/claude TO home PC)
CREATE TABLE IF NOT EXISTS bridge_queue (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES bridge_users(id) ON DELETE CASCADE,
    direction TEXT NOT NULL,  -- 'to_pc' or 'to_phone'
    filename TEXT NOT NULL,
    content_base64 TEXT,
    size_bytes INTEGER,
    status TEXT DEFAULT 'pending',  -- pending, delivered, expired
    created_at TIMESTAMP DEFAULT NOW(),
    delivered_at TIMESTAMP
);

-- Pull requests (request file FROM home PC)
CREATE TABLE IF NOT EXISTS bridge_requests (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES bridge_users(id) ON DELETE CASCADE,
    filepath TEXT NOT NULL,
    status TEXT DEFAULT 'pending',  -- pending, ready, downloaded, expired, error
    content_base64 TEXT,  -- filled by PC poller
    size_bytes INTEGER,
    error_message TEXT,
    gems_spent INTEGER,
    created_at TIMESTAMP DEFAULT NOW(),
    fulfilled_at TIMESTAMP
);

-- Usage log (for billing/analytics)
CREATE TABLE IF NOT EXISTS bridge_usage (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES bridge_users(id) ON DELETE CASCADE,
    action TEXT NOT NULL,  -- upload, download, pull
    filename TEXT,
    size_bytes INTEGER,
    gems_spent INTEGER,
    created_at TIMESTAMP DEFAULT NOW()
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_bridge_users_api_key ON bridge_users(api_key);
CREATE INDEX IF NOT EXISTS idx_bridge_users_email ON bridge_users(email);
CREATE INDEX IF NOT EXISTS idx_bridge_queue_user_status ON bridge_queue(user_id, status);
CREATE INDEX IF NOT EXISTS idx_bridge_requests_user_status ON bridge_requests(user_id, status);

-- RLS Policies (users can only access their own data)
ALTER TABLE bridge_users ENABLE ROW LEVEL SECURITY;
ALTER TABLE bridge_queue ENABLE ROW LEVEL SECURITY;
ALTER TABLE bridge_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE bridge_usage ENABLE ROW LEVEL SECURITY;

-- For now, allow all (service key handles auth)
CREATE POLICY "Allow all bridge_users" ON bridge_users FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow all bridge_queue" ON bridge_queue FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow all bridge_requests" ON bridge_requests FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow all bridge_usage" ON bridge_usage FOR ALL USING (true) WITH CHECK (true);

-- Cleanup function (run as cron job)
-- Deletes pending requests older than 1 hour
CREATE OR REPLACE FUNCTION cleanup_bridge_data() RETURNS void AS $$
BEGIN
    -- Expire old pending requests
    UPDATE bridge_requests
    SET status = 'expired'
    WHERE status = 'pending'
    AND created_at < NOW() - INTERVAL '1 hour';

    -- Delete old delivered queue items
    DELETE FROM bridge_queue
    WHERE status = 'delivered'
    AND delivered_at < NOW() - INTERVAL '24 hours';

    -- Delete expired requests
    DELETE FROM bridge_requests
    WHERE status IN ('expired', 'downloaded')
    AND created_at < NOW() - INTERVAL '24 hours';
END;
$$ LANGUAGE plpgsql;
