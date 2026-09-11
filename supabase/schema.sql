-- Italy Chauffeur — Supabase Schema
-- Run this in your Supabase SQL editor

-- Leads table
CREATE TABLE leads (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  phone TEXT NOT NULL,
  email TEXT,
  pickup TEXT NOT NULL,
  dropoff TEXT NOT NULL,
  date TEXT NOT NULL,
  time TEXT,
  passengers INTEGER DEFAULT 1,
  vehicle TEXT,
  notes TEXT,
  source_url TEXT,
  status TEXT DEFAULT 'new' CHECK (status IN ('new', 'contacted', 'quoted', 'waiting', 'confirmed', 'completed', 'cancelled', 'lost')),
  assigned_partner UUID,
  quote_amount DECIMAL(10, 2),
  commission_amount DECIMAL(10, 2),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Partners table
CREATE TABLE partners (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  company TEXT,
  phone TEXT NOT NULL,
  whatsapp TEXT,
  email TEXT,
  city TEXT NOT NULL,
  region TEXT,
  ncc_license TEXT,
  vehicle_types TEXT[],
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'inactive', 'suspended')),
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Bookings table
CREATE TABLE bookings (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  lead_id UUID REFERENCES leads(id),
  partner_id UUID REFERENCES partners(id),
  customer_price DECIMAL(10, 2) NOT NULL,
  partner_price DECIMAL(10, 2) NOT NULL,
  commission DECIMAL(10, 2) GENERATED ALWAYS AS (customer_price - partner_price) STORED,
  status TEXT DEFAULT 'confirmed' CHECK (status IN ('confirmed', 'completed', 'cancelled')),
  pickup_date DATE NOT NULL,
  pickup_time TIME,
  pickup_location TEXT NOT NULL,
  dropoff_location TEXT NOT NULL,
  vehicle TEXT,
  passengers INTEGER,
  driver_name TEXT,
  driver_phone TEXT,
  vehicle_plate TEXT,
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes
CREATE INDEX idx_leads_status ON leads(status);
CREATE INDEX idx_leads_created_at ON leads(created_at DESC);
CREATE INDEX idx_bookings_status ON bookings(status);
CREATE INDEX idx_bookings_pickup_date ON bookings(pickup_date);

-- Row Level Security (disable for now, enable when adding auth)
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE partners ENABLE ROW LEVEL SECURITY;
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;

-- Allow service role full access (your API uses anon key for inserts, so create policy)
CREATE POLICY "Allow insert from anon" ON leads FOR INSERT TO anon WITH CHECK (true);
CREATE POLICY "Allow all for service role" ON leads FOR ALL TO service_role USING (true);
CREATE POLICY "Allow all for service role" ON partners FOR ALL TO service_role USING (true);
CREATE POLICY "Allow all for service role" ON bookings FOR ALL TO service_role USING (true);

-- Auto-update updated_at
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER set_leads_updated_at
  BEFORE UPDATE ON leads
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER set_bookings_updated_at
  BEFORE UPDATE ON bookings
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();
