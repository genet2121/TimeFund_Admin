export interface Response {
  response_id: number;
  contact_id: number;
  admin_id: number;
  response: string;
  subject: string;
  createdAt: string;
  updatedAt: string;
}

export default interface ContactUs {
  contact_id: number;
  name: string;
  email: string;
  subject: string;
  message: string;
  has_answered: boolean;
  created_at: string;
  Response?: Response;
}
