import { Outlet } from 'react-router-dom';
import { useState } from 'react';
import { Sidebar } from '../../components/dashboard/Sidebar';
import { Header } from '../../components/dashboard/Header';
export function DashboardLayout() {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    return (

        <div>
            <Sidebar 
                sidebarOpen={sidebarOpen}
            />
            <main className='h-full bg-surface-2 '>
                <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

                <Outlet />
            </main>
        </div>
    );
}