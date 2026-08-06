import { Outlet } from 'react-router-dom';
import { Sidebar } from '../../components/dashboard/Sidebar';
import { Header } from '../../components/dashboard/Header';
export function DashboardLayout() {
    return (
        <div className="dashboard-layout">
            <Sidebar />

            <main>
                <Header />

                <Outlet />
            </main>
        </div>
    );
}