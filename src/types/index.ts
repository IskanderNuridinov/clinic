export type InquiryStatus = "new" | "called" | "done";
export type Channel = "whatsapp" | "instagram";
export type MessageDirection = "in" | "out";

export interface Inquiry {
  id: string;
  name: string;
  phone: string;
  message: string | null;
  source: string;
  status: InquiryStatus;
  created_at: string;
}

export interface Appointment {
  id: string;
  patient_name: string;
  doctor: string;
  datetime: string;
  google_event_id: string | null;
  notes: string | null;
  created_at: string;
}

export interface Conversation {
  id: string;
  channel: Channel;
  contact_id: string;
  contact_name: string | null;
  last_message: string | null;
  updated_at: string;
}

export interface Message {
  id: string;
  conversation_id: string;
  direction: MessageDirection;
  body: string;
  created_at: string;
}
