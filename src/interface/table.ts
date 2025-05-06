export interface Table {
  id: string;
  name: string;
  status: boolean;
  delivery: boolean;
}

export interface TableManagementProps {
  shopId: string;
}