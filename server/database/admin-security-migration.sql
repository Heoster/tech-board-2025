-- Admin Security Enhancement Migration
-- Add security fields to admins table

-- Add security columns to admins table if they don't exist
ALTER TABLE admins ADD COLUMN failed_attempts INTEGER DEFAULT 0;
ALTER TABLE admins ADD COLUMN locked_until TEXT DEFAULT NULL;
ALTER TABLE admins ADD COLUMN last_login TEXT DEFAULT NULL;

-- Create admin sessions table for security logging
CREATE TABLE IF NOT EXISTS admin_sessions (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    admin_id INTEGER NOT NULL,
    ip_address TEXT NOT NULL,
    user_agent TEXT,
    login_time TEXT NOT NULL,
    logout_time TEXT DEFAULT NULL,
    browser_info TEXT DEFAULT NULL,
    session_duration INTEGER DEFAULT NULL,
    FOREIGN KEY (admin_id) REFERENCES admins (id) ON DELETE CASCADE
);

-- Create index for faster lookups
CREATE INDEX IF NOT EXISTS idx_admin_sessions_admin_id ON admin_sessions(admin_id);
CREATE INDEX IF NOT EXISTS idx_admin_sessions_login_time ON admin_sessions(login_time);
CREATE INDEX IF NOT EXISTS idx_admin_sessions_ip ON admin_sessions(ip_address);

-- Create admin activity log table
CREATE TABLE IF NOT EXISTS admin_activity_log (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    admin_id INTEGER NOT NULL,
    action TEXT NOT NULL,
    details TEXT,
    ip_address TEXT,
    user_agent TEXT,
    timestamp TEXT NOT NULL DEFAULT (datetime('now')),
    FOREIGN KEY (admin_id) REFERENCES admins (id) ON DELETE CASCADE
);

-- Create index for admin activity log
CREATE INDEX IF NOT EXISTS idx_admin_activity_admin_id ON admin_activity_log(admin_id);
CREATE INDEX IF NOT EXISTS idx_admin_activity_timestamp ON admin_activity_log(timestamp);

-- Insert initial security settings
INSERT OR IGNORE INTO admin_activity_log (admin_id, action, details, timestamp)
SELECT id, 'SECURITY_UPGRADE', 'Enhanced security features enabled', datetime('now')
FROM admins;