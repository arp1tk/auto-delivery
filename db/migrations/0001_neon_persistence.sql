CREATE TABLE IF NOT EXISTS waitlist_submissions (
  id uuid PRIMARY KEY,
  email text NOT NULL,
  phone text,
  country_code text,
  source text NOT NULL,
  user_agent text,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS waitlist_submissions_created_at_idx
  ON waitlist_submissions (created_at DESC);

CREATE TABLE IF NOT EXISTS tyohar_orders (
  id text PRIMARY KEY,
  status text NOT NULL CHECK (status = 'confirmed'),
  payment_mode text NOT NULL CHECK (payment_mode = 'demo'),
  total integer NOT NULL CHECK (total > 0),
  is_annual boolean NOT NULL,
  delivery jsonb NOT NULL,
  items jsonb NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS tyohar_orders_created_at_idx
  ON tyohar_orders (created_at DESC);

CREATE TABLE IF NOT EXISTS annual_gifting_schedules (
  id text PRIMARY KEY,
  sender text NOT NULL,
  recipient text NOT NULL,
  occasion text NOT NULL,
  annual_date date NOT NULL,
  city text NOT NULL,
  gift text NOT NULL,
  reminder_days jsonb NOT NULL,
  proof_status text NOT NULL CHECK (proof_status = 'photo_confirmation_pending'),
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS annual_gifting_schedules_created_at_idx
  ON annual_gifting_schedules (created_at DESC);
