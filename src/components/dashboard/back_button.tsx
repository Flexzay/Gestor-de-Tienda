import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

export function BackButton() {
  return (
    <div className="flex items-center justify-between mb-6">
      <Link
        to="/dashboard"
        className="flex items-center text-gray-600 hover:text-[#ff204e] transition-colors duration-300"
      >
        <ArrowLeft size={24} className="mr-2" />
        <span className="font-medium">Volver al Dashboard</span>
      </Link>
    </div>
  );
}

export default BackButton;
