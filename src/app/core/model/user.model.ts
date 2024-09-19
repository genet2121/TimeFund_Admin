export default interface user {
  user_id: number;
  fullName: string;
  email: string;
  password: string;
  avatarUrl:  string| null;
  country: string;
  city: 'Addis Ababa';
  phoneNumber: '+2510944263239';
  user_group_id: 1;
  tin_number: null;
  isemailverified: false;
  ispersonalinformationverified: false;
  has_bankaccount: false;
  has_personalinfo: false;
  hasorganization: false;
  hasbusiness: false;
  hascharity: false;
  isinfluencer: false;
  gettips: false;
  tax_reduction: null;
  createdAt: string;
  updatedAt: string;
  table_id: null | number;
  is_active:boolean
}
