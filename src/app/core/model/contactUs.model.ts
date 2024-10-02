export default interface ContactUs {
  contact_id: number;
  name: string;
  email: string;
  subject: string;
  message: string;
  has_answered: boolean;
  created_at: string;
}
