-- Tabla de precios
CREATE TABLE IF NOT EXISTS pricing (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  description TEXT,
  price DECIMAL(10, 2) NOT NULL,
  frequency TEXT DEFAULT 'pago único',
  features TEXT[] DEFAULT '{}',
  recommended BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- RLS: cualquiera puede leer precios
ALTER TABLE pricing ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read pricing" ON pricing
  FOR SELECT USING (true);

-- Datos iniciales
INSERT INTO pricing (name, description, price, frequency, features, recommended) VALUES
(
  'Curso completo',
  'Preparación de las 4 pruebas.',
  1134,
  'pago único (o 9 cuotas de 140€)',
  ARRAY[
    'Programación, Defensa, Problemas, Temas',
    'Corrección continua',
    'Simulacros con rúbrica de tribunal',
    'Seguimiento semanal individual'
  ],
  true
),
(
  'Preparación de 1 prueba',
  'Refuerza una sola parte.',
  450,
  'pago único por prueba',
  ARRAY[
    'Temas, Problemas, Programación o Defensa',
    'Mismo nivel de corrección',
    'Simulacros y rúbricas',
    'Ideal si ya tienes otras preparadas'
  ],
  false
);
