interface FundraisingMedia {
  fundraising_media_id: number;
  fundraising_id: number;
  fundraising_image_path: string;
  fundraising_video_path: string | null;
}

interface FundraisingStatus {
  fundrasing_status_id: number;
  fundraising_id: number;
  raised_amount: number;
  net_earned_amount: number | null;
  status: string;
}

interface Currency {
  currency_id: number;
  currency_type: string;
  is_active: boolean;
  createdAt: string;
  updatedAt: string;
}

interface FundraisingType {
  fundraising_type_id: number;
  fundraising_type: string;
  fundraising_type_description: string;
  is_active: boolean;
  createdAt: string;
  updatedAt: string;
}

interface SubCategory {
  sub_category_id: number;
  category_id: number;
  sub_category_type: string;
  sub_category_type_description: string;
  is_active: boolean;
  admin_id: number;
  createdAt: string;
  updatedAt: string;
}

interface Category {
  category_id: number;
  category_type: string;
  category_type_description: string;
  is_active: boolean;
  admin_id: number;
  createdAt: string;
  updatedAt: string;
}

export interface Fundraising {
  fundraising_id: number;
  title: string;
  description: string;
  category_id: number;
  sub_category_id: number;
  admin_id: number | null;
  business_category_id: number | null;
  business_sub_category_id: number | null;
  fundraising_type_id: number;
  organizer_name: string;
  organizer_address: string;
  beneficiary_name: string;
  allow_donation: boolean;
  allow_wordofsupport: boolean;
  available_onsuggestedsearch: boolean;
  recieve_donationemail: boolean;
  beneficiary_address: string;
  beneficiary_email: string;
  goal: number;
  charity_id: number | null;
  business_id: number | null;
  shortenedUrl: string | null;
  currency_id: number;
  for_project: boolean;
  is_active: boolean;
  is_verified: boolean;
  start_date: string;
  end_date: string;
  createdAt: string;
  updatedAt: string;
  Wegen_FundraisingMedium: FundraisingMedia;
  Wegen_FundraisingStatus: FundraisingStatus;
  Wegen_Currency: Currency;
  Wegen_FundraisingType: FundraisingType;
  Wegen_BusinessCategory: any;
  Wegen_BusinessSubCategory: any;
  Wegen_SubCategory: SubCategory;
  Category: Category;
}
