export interface Column {
  key: string;
  label: string;
  action?: (element: any) => void;
}
