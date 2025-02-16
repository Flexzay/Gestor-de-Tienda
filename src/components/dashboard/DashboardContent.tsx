import type React from "react";
import { TrendingUp, Users, DollarSign, Briefcase } from "lucide-react";

const DashboardCard: React.FC<{ title: string; value: string; icon: React.ReactNode; trend: string }> = ({
  title,
  value,
  icon,
  trend,
}) => (
  <div className="bg-white rounded-xl shadow-lg p-6 transition-all duration-300 hover:shadow-xl hover:scale-105 flex flex-col min-w-0">
    <div className="flex justify-between items-center mb-4">
      <div className="p-3 rounded-full bg-[#ff204e]/10">{icon}</div>
      <span className={`text-sm font-semibold ${trend.startsWith("+") ? "text-green-500" : "text-red-500"}`}>
        {trend}
      </span>
    </div>
    <h3 className="text-lg font-semibold text-gray-700 mb-2">{title}</h3>
    <p className="text-3xl font-bold text-[#ff204e]">{value}</p>
  </div>
);

const DashboardContent: React.FC = () => {
  return (
    <main className="p-6 bg-gray-100 w-full overflow-hidden">
      <h2 className="text-3xl font-bold mb-6 text-gray-800">Dashboard Overview</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        <DashboardCard title="Total Revenue" value="$56,789" icon={<DollarSign className="text-[#ff204e]" size={24} />} trend="+2.5%" />
        <DashboardCard title="Total Users" value="1,234" icon={<Users className="text-[#ff204e]" size={24} />} trend="+3.2%" />
        <DashboardCard title="New Clients" value="34" icon={<TrendingUp className="text-[#ff204e]" size={24} />} trend="+1.8%" />
        <DashboardCard title="Active Projects" value="23" icon={<Briefcase className="text-[#ff204e]" size={24} />} trend="-0.5%" />
      </div>
      <div className="mt-8 bg-white rounded-xl shadow-lg p-6 w-full">
        <h3 className="text-xl font-semibold mb-4 text-gray-800">Recent Activity</h3>
        <div className="space-y-4">
          {[1, 2, 3].map((item) => (
            <div key={item} className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
              <div className="h-12 w-12 rounded-full bg-[#ff204e]/20 flex items-center justify-center">
                <Users className="text-[#ff204e]" size={24} />
              </div>
              <div>
                <p className="font-medium text-gray-800">New user registered</p>
                <p className="text-sm text-gray-500">2 minutes ago</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
};

export default DashboardContent;
