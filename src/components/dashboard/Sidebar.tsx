import type React from "react"
import { Link } from "react-router-dom"
import { Home, BarChart2, Users, Settings, Layers } from "lucide-react"

const Sidebar: React.FC = () => {
  return (
    <aside className="bg-gray-900 text-white w-64 min-h-screen p-4">
      <div className="flex items-center space-x-2 mb-8">
        <Layers size={32} className="text-[#ff204e]" />
        <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#ff204e] to-pink-500">
          Dashboard
        </span>
      </div>
      <nav>
        <ul className="space-y-2">
          {[
            { icon: Home, label: "Home", path: "/" },
            { icon: BarChart2, label: "Analytics", path: "/analytics" },
            { icon: Users, label: "Users", path: "/users" },
            { icon: Settings, label: "Settings", path: "/settings" },
          ].map((item) => (
            <li key={item.path}>
              <Link
                to={item.path}
                className="flex items-center space-x-2 p-2 rounded-lg transition-all duration-300 ease-in-out hover:bg-[#ff204e] hover:shadow-lg hover:shadow-[#ff204e]/50"
              >
                <item.icon size={20} />
                <span>{item.label}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  )
}

export default Sidebar

