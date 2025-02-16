import type React from "react"
import Sidebar from "../../components/dashboard/Sidebar"
import Header from "../../components/dashboard/Header"
import DashboardContent from "../../components/dashboard/DashboardContent"

const Dashboard: React.FC = () => {
  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <DashboardContent />
      </div>
    </div>
  )
}

export default Dashboard

