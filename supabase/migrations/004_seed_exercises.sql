-- ============================================================
-- Seed: Sample exercises (representative set for each topic type)
-- Full 500+ exercises would be loaded via admin panel or CSV import
-- ============================================================

-- Helper: get topic id by code
create or replace function public.topic_id(p_code text) returns uuid language sql as $$
  select id from public.topics where code = p_code limit 1
$$;

-- ============================================================
-- FIS-01: Magnitudes y vectores
-- ============================================================
insert into public.exercises (topic_id, level, type, question, options, correct_answer, explanation) values

(topic_id('FIS-01'), 0, 'multiple_choice',
 '¿Cuál es la unidad del Sistema Internacional para la fuerza?',
 '[{"id":"a","text":"Joule","is_correct":false},{"id":"b","text":"Newton","is_correct":true},{"id":"c","text":"Pascal","is_correct":false},{"id":"d","text":"Watt","is_correct":false}]',
 'b', 'La fuerza se mide en Newton (N = kg·m/s²) en el SI.'),

(topic_id('FIS-01'), 1, 'numeric',
 'Un vector tiene componentes Fx = 3 N y Fy = 4 N. Calcula su módulo en Newton.',
 null, '5', 'Por Pitágoras: |F| = √(3² + 4²) = √(9 + 16) = √25 = 5 N'),

(topic_id('FIS-01'), 2, 'numeric',
 'La aceleración de la gravedad es g = 9.8 m/s². Expresa su valor en cm/s².',
 null, '980', 'g = 9.8 m/s² × 100 cm/m = 980 cm/s²'),

-- ============================================================
-- FIS-02: Cinemática MRU y MRUA
-- ============================================================
(topic_id('FIS-02'), 0, 'multiple_choice',
 'En un MRU, si la velocidad es constante:',
 '[{"id":"a","text":"La aceleración es igual a g","is_correct":false},{"id":"b","text":"La aceleración es cero","is_correct":true},{"id":"c","text":"La posición es constante","is_correct":false},{"id":"d","text":"La velocidad aumenta linealmente","is_correct":false}]',
 'b', 'En el MRU la aceleración es nula por definición.'),

(topic_id('FIS-02'), 1, 'numeric',
 'Un coche acelera desde el reposo con a = 2 m/s² durante 5 s. ¿Cuál es su velocidad final en m/s?',
 null, '10', 'v = v₀ + a·t = 0 + 2·5 = 10 m/s'),

(topic_id('FIS-02'), 2, 'numeric',
 'Un tren parte del reposo y alcanza 72 km/h en 20 s. ¿Cuántos metros recorre en ese tiempo?',
 null, '200', 'v = 72 km/h = 20 m/s. Con MRUA: d = v₀t + ½at² = ½·1·400 = 200 m'),

(topic_id('FIS-02'), 3, 'numeric',
 'Un objeto cae libremente desde h = 45 m. ¿Con qué velocidad (m/s) llega al suelo? (g = 10 m/s²)',
 null, '30', 'v² = 2gh → v = √(2·10·45) = √900 = 30 m/s'),

-- ============================================================
-- FIS-04: Leyes de Newton
-- ============================================================
(topic_id('FIS-04'), 0, 'multiple_choice',
 'Según la 3ª ley de Newton (acción-reacción):',
 '[{"id":"a","text":"Las fuerzas actúan sobre el mismo cuerpo","is_correct":false},{"id":"b","text":"Una fuerza es mayor que la otra","is_correct":false},{"id":"c","text":"Las fuerzas son iguales en módulo y opuestas en dirección","is_correct":true},{"id":"d","text":"Solo se cumple en el vacío","is_correct":false}]',
 'c', 'La fuerza de acción y la de reacción son iguales en módulo, misma dirección y sentido contrario.'),

(topic_id('FIS-04'), 1, 'numeric',
 'Una fuerza neta de 60 N actúa sobre una masa de 4 kg. ¿Cuál es la aceleración en m/s²?',
 null, '15', 'F = m·a → a = F/m = 60/4 = 15 m/s²'),

(topic_id('FIS-04'), 2, 'numeric',
 'Un bloque de 10 kg se desliza por un plano horizontal con μ = 0.3. ¿Cuál es la fuerza de rozamiento en N? (g = 10 m/s²)',
 null, '30', 'Fr = μ·N = μ·m·g = 0.3·10·10 = 30 N'),

-- ============================================================
-- FIS-07: Energía mecánica
-- ============================================================
(topic_id('FIS-07'), 1, 'numeric',
 'Un objeto de 2 kg se mueve a 10 m/s. ¿Cuál es su energía cinética en Joules?',
 null, '100', 'Ec = ½mv² = ½·2·100 = 100 J'),

(topic_id('FIS-07'), 2, 'numeric',
 'Una pelota de 0.5 kg se lanza verticalmente con v₀ = 20 m/s. ¿Cuál es la altura máxima en metros? (g = 10 m/s²)',
 null, '20', 'Por conservación: ½mv² = mgh → h = v²/(2g) = 400/20 = 20 m'),

-- ============================================================
-- FIS-23: Circuitos eléctricos
-- ============================================================
(topic_id('FIS-23'), 0, 'multiple_choice',
 'La ley de Ohm establece que:',
 '[{"id":"a","text":"V = R/I","is_correct":false},{"id":"b","text":"V = I·R","is_correct":true},{"id":"c","text":"I = V·R","is_correct":false},{"id":"d","text":"R = V·I","is_correct":false}]',
 'b', 'La tensión (V) es igual a la corriente (I) multiplicada por la resistencia (R).'),

(topic_id('FIS-23'), 1, 'numeric',
 'Tres resistencias de 6 Ω están en paralelo. ¿Cuál es la resistencia equivalente en Ω?',
 null, '2', '1/Req = 1/6 + 1/6 + 1/6 = 3/6 = 1/2 → Req = 2 Ω'),

(topic_id('FIS-23'), 2, 'numeric',
 'Una pila de 12 V tiene una resistencia interna de 0.5 Ω y alimenta una carga de 5.5 Ω. ¿Qué corriente (A) circula?',
 null, '2', 'I = V/(R+r) = 12/(5.5+0.5) = 12/6 = 2 A'),

-- ============================================================
-- QUI-08: Mol y masa molar
-- ============================================================
(topic_id('QUI-08'), 0, 'multiple_choice',
 '¿Cuántas moléculas hay en 1 mol de cualquier sustancia?',
 '[{"id":"a","text":"6.022 × 10²³","is_correct":true},{"id":"b","text":"6.022 × 10²²","is_correct":false},{"id":"c","text":"6.022 × 10²⁴","is_correct":false},{"id":"d","text":"6.022 × 10¹²","is_correct":false}]',
 'a', 'El número de Avogadro es NA = 6.022 × 10²³ entidades por mol.'),

(topic_id('QUI-08'), 1, 'numeric',
 '¿Cuántos gramos equivalen a 2 mol de H₂O? (M: H = 1, O = 16)',
 null, '36', 'M(H₂O) = 2·1 + 16 = 18 g/mol. 2 mol × 18 g/mol = 36 g'),

(topic_id('QUI-08'), 2, 'numeric',
 '¿Cuántos moles hay en 44 g de CO₂? (M: C = 12, O = 16)',
 null, '1', 'M(CO₂) = 12 + 2·16 = 44 g/mol → n = 44/44 = 1 mol'),

-- ============================================================
-- QUI-09: Estequiometría de reacciones
-- ============================================================
(topic_id('QUI-09'), 1, 'numeric',
 'En la reacción 2H₂ + O₂ → 2H₂O, si reaccionan 4 mol de H₂, ¿cuántos mol de H₂O se producen?',
 null, '4', 'La relación estequiométrica H₂:H₂O es 2:2 = 1:1. 4 mol H₂ → 4 mol H₂O'),

(topic_id('QUI-09'), 2, 'numeric',
 'Si el rendimiento de una reacción es 80% y la producción teórica es 50 g, ¿cuántos gramos se obtienen?',
 null, '40', 'Rendimiento = (real/teórico)·100 → real = 0.80 × 50 = 40 g'),

-- ============================================================
-- QUI-17: Equilibrio químico
-- ============================================================
(topic_id('QUI-17'), 0, 'multiple_choice',
 'La constante de equilibrio Kc depende de:',
 '[{"id":"a","text":"La concentración inicial","is_correct":false},{"id":"b","text":"La presión del sistema","is_correct":false},{"id":"c","text":"La temperatura","is_correct":true},{"id":"d","text":"La cantidad de catalizador","is_correct":false}]',
 'c', 'Kc es constante a temperatura fija; si cambia T, cambia Kc.'),

(topic_id('QUI-17'), 1, 'numeric',
 'Para la reacción A ⇌ B, en el equilibrio [A] = 0.2 M y [B] = 0.8 M. Calcula Kc.',
 null, '4', 'Kc = [B]/[A] = 0.8/0.2 = 4'),

-- ============================================================
-- QUI-20: pH y ácido-base
-- ============================================================
(topic_id('QUI-20'), 0, 'multiple_choice',
 'Una disolución con pH = 3 es:',
 '[{"id":"a","text":"Básica","is_correct":false},{"id":"b","text":"Neutra","is_correct":false},{"id":"c","text":"Ácida","is_correct":true},{"id":"d","text":"Anfótera","is_correct":false}]',
 'c', 'pH < 7 → ácida; pH = 7 → neutra; pH > 7 → básica.'),

(topic_id('QUI-20'), 1, 'numeric',
 'Calcula el pH de una disolución con [H⁺] = 0.01 M.',
 null, '2', 'pH = -log[H⁺] = -log(10⁻²) = 2'),

(topic_id('QUI-20'), 2, 'numeric',
 'Una disolución de NaOH 0.001 M. ¿Cuál es su pH? (Kw = 10⁻¹⁴)',
 null, '11', 'pOH = -log(0.001) = 3 → pH = 14 - 3 = 11'),

-- ============================================================
-- QUI-23: Electroquímica - pilas
-- ============================================================
(topic_id('QUI-23'), 0, 'multiple_choice',
 'En una pila galvánica, la oxidación ocurre en:',
 '[{"id":"a","text":"El cátodo","is_correct":false},{"id":"b","text":"El ánodo","is_correct":true},{"id":"c","text":"El puente salino","is_correct":false},{"id":"d","text":"Ambos electrodos simultáneamente","is_correct":false}]',
 'b', 'En el ánodo se produce la oxidación (pérdida de electrones).'),

(topic_id('QUI-23'), 1, 'numeric',
 'Una pila tiene E°(cátodo) = +0.34 V y E°(ánodo) = -0.76 V. ¿Cuál es la fem estándar en V?',
 null, '1.1', 'fem° = E°(cátodo) - E°(ánodo) = 0.34 - (-0.76) = 1.10 V');

-- Remove helper function
drop function if exists public.topic_id(text);
