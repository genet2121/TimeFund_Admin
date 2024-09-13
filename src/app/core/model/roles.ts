export interface Role{
  id: number | null;
  page_name: string;
  can_add: boolean;
  can_edit: boolean;
  can_view: boolean;
  can_delete: boolean;
  can_view_detail: boolean;
  required_on_menu: boolean;

}
