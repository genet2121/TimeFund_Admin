
export interface TableName {
  table_id: number;
  tab_name: string;
  createdAt: string;
  updatedAt: string;
}

export interface UserGroup {
  user_group_id: number;
  user_group_name: string;
  is_active: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface PermissionItem {
  permission_id: number;
  table_id: number;
  user_group_id: number;
  can_view: boolean;
  can_add: boolean;
  can_view_detail: boolean;
  can_update: boolean;
  can_delete: boolean;
  createdAt: string;
  updatedAt: string;
  tableName: TableName;
  userGroup: UserGroup;
}

export interface PermissionsResponse {
  total: number;
  page: number;
  perPage: number;
  data: PermissionItem[];
}
