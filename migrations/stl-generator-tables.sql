-- STL Generator Tables
-- Run this in Supabase SQL Editor

-- Jobs queue table
CREATE TABLE IF NOT EXISTS stl_jobs (
    id SERIAL PRIMARY KEY,
    job_id TEXT UNIQUE NOT NULL,
    status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'processing', 'complete', 'error')),
    pattern_type TEXT DEFAULT 'relief' CHECK (pattern_type IN ('relief', 'lithophane', 'cutter')),
    original_filename TEXT,
    image_base64 TEXT,
    size_bytes INTEGER,
    preview_url TEXT,
    stl_url TEXT,
    error_message TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    completed_at TIMESTAMPTZ
);

-- Index for polling
CREATE INDEX IF NOT EXISTS idx_stl_jobs_status ON stl_jobs(status);
CREATE INDEX IF NOT EXISTS idx_stl_jobs_created ON stl_jobs(created_at);

-- Storage buckets (run these separately or in Supabase dashboard)
-- INSERT INTO storage.buckets (id, name, public) VALUES ('stl-files', 'stl-files', true);
-- INSERT INTO storage.buckets (id, name, public) VALUES ('stl-previews', 'stl-previews', true);

-- RLS policies (allow public read, authenticated write)
ALTER TABLE stl_jobs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can read completed jobs" ON stl_jobs
    FOR SELECT USING (status = 'complete');

CREATE POLICY "Service can manage all jobs" ON stl_jobs
    FOR ALL USING (true);

-- Cleanup old jobs (keep 7 days)
CREATE OR REPLACE FUNCTION cleanup_old_stl_jobs()
RETURNS void AS $$
BEGIN
    DELETE FROM stl_jobs
    WHERE created_at < NOW() - INTERVAL '7 days';
END;
$$ LANGUAGE plpgsql;
