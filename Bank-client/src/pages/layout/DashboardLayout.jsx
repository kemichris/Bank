import { Outlet } from 'react-router-dom';
import { useState } from 'react';
import { Sidebar } from '../../components/dashboard/Sidebar';
import { Header } from '../../components/dashboard/Header';
export function DashboardLayout() {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    return (
        <div className="min-h-screen bg-surface-1">
            <Sidebar sidebarOpen={sidebarOpen} />
            <main>
                <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

                <Outlet />
            </main>
        </div>
    );
}