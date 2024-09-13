// export default interface admin {
//   admin_id: number;
//   fullName: string;
//   email: string;
//   password: string;
//   phoneNumber: string;
//   user_group_id: number;
//   token: string;
//   isActive: boolean;
//   UserGroup: {
//     user_group_id: number;
//     user_group_name: string;
//   };
// }
export default interface admin {
  admin_id: number;
  fullName: string;
  email: string;
  password: string;
  phoneNumber: string;
  user_group_id: number;
  token: string;
  country: string;
  city: string;
  profile_image: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  table_id: number | null;
  UserGroupRole: {
    user_group_id: number;
    user_group_name: string;
    role: {
      can_add: boolean;
      can_edit: boolean;
      can_view: boolean;
      page_name: string;
      can_delete: boolean;
    }[];
    is_active: boolean;
    createdAt: string;
    updatedAt: string;
  };
}
