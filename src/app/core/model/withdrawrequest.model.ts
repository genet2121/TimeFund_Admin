import { Fundraising } from './fundraiser.model';
import user from './user.model';

export default interface withdrawrequstmodel {
  request_id: number;
  amount: number;
  description: string;
  status: string;
  user_id: number;
  createdAt: string;
  updatedAt: string;
  Wegen_User: user;
  Wegen_Fundraising: Fundraising;
}
