create extension if not exists "uuid-ossp";

create table inquiries (
  id         uuid primary key default uuid_generate_v4(),
  name       text not null,
  phone      text not null,
  message    text,
  source     text default 'website',
  status     text default 'new',
  created_at timestamptz default now()
);

create table appointments (
  id              uuid primary key default uuid_generate_v4(),
  patient_name    text not null,
  doctor          text not null,
  datetime        timestamptz not null,
  google_event_id text,
  notes           text,
  created_at      timestamptz default now()
);

create table conversations (
  id           uuid primary key default uuid_generate_v4(),
  channel      text not null,
  contact_id   text not null,
  contact_name text,
  last_message text,
  updated_at   timestamptz default now(),
  unique (channel, contact_id)
);

create table messages (
  id              uuid primary key default uuid_generate_v4(),
  conversation_id uuid references conversations(id) on delete cascade,
  direction       text not null,
  body            text not null,
  created_at      timestamptz default now()
);

create index on inquiries (created_at desc);
create index on inquiries (status);
create index on appointments (datetime);
create index on messages (conversation_id, created_at);
