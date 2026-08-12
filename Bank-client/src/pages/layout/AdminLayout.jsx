import { Outlet } from 'react-router-dom';
import { useState } from 'react';
import { AdminSidebar } from '../../components/adminDashboard/AdminSideBar';
import { AdminHeader } from '../../components/adminDashboard/AdminHeader';
export function AdminLayout() {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const username = localStorage.getItem('username');
    const profileImage = localStorage.getItem('profileImage')
    return (
        <div className="min-h-screen bg-surface-1">
            <AdminSidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
            <main className='pb-6 pt-25 lg:ml-50 lg:pl-14 px-8 '>
                <AdminHeader username={username} profileimage={profileImage} sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

                <Outlet />
            </main>
        </div>
    );
}