import { LucideIcon } from "lucide-react";
interface Store {
  id: number;
  name: string;
  type: string;
  location: string;
  hours: string;
  color: string;
  image?: string;
  icon: LucideIcon; 
}
export default Store;