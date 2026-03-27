-- users table (extends auth.users)
CREATE TABLE public.users (
  id UUID PRIMARY KEY REFERENCES auth.users(id),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  role TEXT NOT NULL CHECK (role IN ('admin', 'va')),
  created_at TIMESTAMPTZ DEFAULT now()
);

-- ads_reports table
CREATE TABLE public.ads_reports (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  date DATE NOT NULL,
  ad_spend DECIMAL(10,2) NOT NULL,
  conversions INTEGER NOT NULL DEFAULT 0,
  clicks INTEGER DEFAULT 0,
  ctr DECIMAL(5,2) DEFAULT 0,
  cost_per_conversion DECIMAL(10,2) DEFAULT 0,
  notes TEXT,
  created_by UUID REFERENCES public.users(id),
  created_at TIMESTAMPTZ DEFAULT now()
);

-- weekly_reports table
CREATE TABLE public.weekly_reports (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES public.users(id),
  week_start DATE NOT NULL,
  week_end DATE NOT NULL,
  tasks_completed TEXT,
  results TEXT,
  issues TEXT,
  next_plan TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- RLS Setup
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ads_reports ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.weekly_reports ENABLE ROW LEVEL SECURITY;

-- users policies
CREATE POLICY "Users can view all users"
  ON public.users FOR SELECT USING (true);

-- ads_reports policies
CREATE POLICY "Users can view all ads_reports"
  ON public.ads_reports FOR SELECT USING (true);

CREATE POLICY "VAs can insert ads_reports"
  ON public.ads_reports FOR INSERT WITH CHECK (auth.uid() = created_by);

-- weekly_reports policies
CREATE POLICY "Users can view all weekly_reports"
  ON public.weekly_reports FOR SELECT USING (true);

CREATE POLICY "VAs can insert weekly_reports"
  ON public.weekly_reports FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Create a trigger function to automatically insert a user record when a new auth user signs up
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.users (id, email, name, role)
  values (new.id, new.email, coalesce(new.raw_user_meta_data->>'name', split_part(new.email, '@', 1)), coalesce(new.raw_user_meta_data->>'role', 'va'));
  return new;
end;  
$$;

-- Trigger the function every time a user is created
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();
