import { Outlet } from 'react-router-dom';
import { useState } from 'react';
import { Sidebar } from '../../components/dashboard/Sidebar';
import { Header } from '../../components/dashboard/Header';
export function DashboardLayout() {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const username = localStorage.getItem('username');
    return (
        <div className="min-h-screen bg-surface-1">
            <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
            <main className='pb-20 pt-25 lg:ml-50 lg:pl-14 px-8 '>
                <Header username={username} sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

                <Outlet />
            </main>
        </div>
    );
}