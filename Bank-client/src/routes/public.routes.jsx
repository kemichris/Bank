import { PublicLayout } from '../pages/layout/PublicLayout';

import { Home } from '../pages/public/Home';
import { About } from '../pages/public/About';
import { PersonalBanking } from '../pages/public/PersonalBanking';
import { BusinessBanking } from '../pages/public/BusinessBanking';
import { Loans } from '../pages/public/Loans';
import { Contact } from '../pages/public/Contact';
import { PrivacyPolicy } from '../pages/public/PrivacyPolicy';
import { Terms } from '../pages/public/Terms';
import { Register } from '../pages/public/Register';
import { Login } from '../pages/public/Login';

export const publicRoutes = [
    {
        path: '/login',
        element: <Login />,
    },
    {
        path: '/register',
        element: <Register />,
    },
    {
        element: <PublicLayout />,
        children: [
            {
                path: '/',
                element: <Home />,
            },
            {
                path: '/about',
                element: <About />,
            },
            {
                path: '/personal-banking',
                element: <PersonalBanking />,
            },
            {
                path: '/business-banking',
                element: <BusinessBanking />,
            },
            {
                path: '/loans',
                element: <Loans />,
            },
            {
                path: '/contact',
                element: <Contact />,
            },
            {
                path: '/privacy',
                element: <PrivacyPolicy />,
            },
            {
                path: '/terms',
                element: <Terms />,
            },
        ],
    },
];
