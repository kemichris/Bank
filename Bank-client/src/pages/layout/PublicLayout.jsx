import { Outlet } from 'react-router-dom';

import { Navbar } from '../../components/layout/Navbar';
import { Footer } from '../../components/layout/Footer';

import "../../styles/style.css"

export function PublicLayout() {
    return (
        <>
            <Navbar />
            <Outlet />
            <Footer />
        </>
    );
}
