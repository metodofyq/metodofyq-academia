-- Tabla de leads (contactos que capturamos antes de que se inscriban)
CREATE TABLE IF NOT EXISTS leads (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT NOT NULL UNIQUE,
  ccaa TEXT NOT NULL, -- comunidad autónoma
  situacion TEXT, -- "primer-vez", "varias-convocatorias", "indecisos"
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  source TEXT DEFAULT 'landing' -- de dónde vino
);

-- RLS: cualquiera puede insertar, solo admin puede leer
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can insert leads" ON leads
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Only authenticated can read leads" ON leads
  FOR SELECT USING (auth.role() = 'authenticated');
