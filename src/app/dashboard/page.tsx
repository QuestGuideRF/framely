import React from "react";
import AppSidebar from "../components/dashboard/sidebar";
import SiteList from "../components/dashboard/site-list";
import { SidebarProvider } from "@/компоненты/ui/боковая панель";
const Dashboard = async () => {
  return (
    <SidebarProvider>
      <div className="гибкий w-экран h-экран">
        <AppSidebar />
        <SiteList />
      </div>
    </SidebarProvider>
  );
};
export default Dashboard;