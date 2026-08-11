import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { FaBell, FaUser } from 'react-icons/fa';
import {
    HiOutlineBars3,
    HiOutlineXMark,
    HiOutlineUser,
    HiOutlineQuestionMarkCircle,
    HiOutlineArrowRightOnRectangle,
} from 'react-icons/hi2';

import { logout } from '../../services/auth.service';

export function Header({
    username,
    sidebarOpen,
    setSidebarOpen
}) {
    const [profileOpen, setProfileOpen] = useState(false);

    const navigate = useNavigate();

    const handleLogout = () => {
        logout();

        setProfileOpen(false);

        navigate('/login', {
            replace: true
        });
    };

    return (
        <header
            className="
                fixed
                top-0
                right-0
                z-50
                flex
                h-20
                w-full
                items-center
                justify-between
                border-b
                border-border
                bg-surface-1
                px-6
                py-4
            "
        >

            {/* Mobile menu */}
            <button
                type="button"
                className="rounded-md p-2 text-text lg:hidden"
                onClick={() => setSidebarOpen(!sidebarOpen)}
            >
                {sidebarOpen ? (
                    <HiOutlineXMark size={24} />
                ) : (
                    <HiOutlineBars3 size={24} />
                )}
            </button>


            {/* Left */}
            <div>
                <h1 className="text-2xl font-bold text-text">
                    Dashboard
                </h1>

                <p className="text-sm text-text-muted">
                    Welcome back, {username}
                </p>
            </div>


            {/* Right */}
            <div className="flex items-center gap-3">

                {/* Notification */}
                <button
                    type="button"
                    className="
                        rounded-2xl
                        bg-surface-2
                        p-3
                        text-text
                        transition
                        hover:bg-surface-3
                    "
                >
                    <FaBell />
                </button>


                {/* Profile wrapper */}
                <div className="relative">

                    {/* Profile button */}
                    <button
                        type="button"
                        onClick={() =>
                            setProfileOpen(previous => !previous)
                        }
                        className="
                            rounded-lg
                            p-2
                            transition
                            hover:bg-surface-2
                        "
                    >
                        <div
                            className="
                                flex
                                h-8
                                w-8
                                items-center
                                justify-center
                                rounded-full
                                border
                                border-amber-50
                                bg-primary
                            "
                        >
                            <FaUser className="text-text" />
                        </div>
                    </button>


                    {/* Dropdown */}
                    {profileOpen && (
                        <div
                            className="
                                absolute
                                right-0
                                top-13
                                z-999
                                w-72
                                overflow-hidden
                                rounded-2xl
                                border
                                border-border
                                bg-surface-2
                                shadow-2xl
                            "
                        >

                            {/* User information */}
                            <div className="px-5 py-4">

                                <div className="flex items-center gap-3">

                                    <div
                                        className="
                                            flex
                                            h-12
                                            w-12
                                            shrink-0
                                            items-center
                                            justify-center
                                            rounded-full
                                            border
                                            border-amber-50
                                            bg-primary
                                        "
                                    >
                                        <FaUser className="text-lg text-text" />
                                    </div>

                                    <div className="min-w-0">
                                        <p className="truncate font-semibold text-text">
                                            {username}
                                        </p>

                                        <p className="text-sm text-text-muted">
                                            Account
                                        </p>
                                    </div>

                                </div>

                            </div>


                            {/* Menu */}
                            <div className="border-t border-border py-2">

                                {/* Profile Settings */}
                                <button
                                    type="button"
                                    onClick={() => {
                                        setProfileOpen(false);
                                        navigate('/dashboard/settings');
                                    }}
                                    className="
                                        flex
                                        w-full
                                        items-center
                                        gap-4
                                        px-5
                                        py-3
                                        text-left
                                        text-text
                                        transition
                                        hover:bg-surface-3
                                    "
                                >
                                    <span
                                        className="
                                            flex
                                            h-10
                                            w-10
                                            items-center
                                            justify-center
                                            rounded-xl
                                            bg-surface-3
                                            text-text-muted
                                        "
                                    >
                                        <HiOutlineUser size={21} />
                                    </span>

                                    <span className="font-medium">
                                        Profile Settings
                                    </span>

                                </button>


                                {/* Help */}
                                <button
                                    type="button"
                                    onClick={() => {
                                        setProfileOpen(false);
                                        navigate('/dashboard/support');
                                    }}
                                    className="
                                        flex
                                        w-full
                                        items-center
                                        gap-4
                                        px-5
                                        py-3
                                        text-left
                                        text-text
                                        transition
                                        hover:bg-surface-3
                                    "
                                >
                                    <span
                                        className="
                                            flex
                                            h-10
                                            w-10
                                            items-center
                                            justify-center
                                            rounded-xl
                                            bg-surface-3
                                            text-text-muted
                                        "
                                    >
                                        <HiOutlineQuestionMarkCircle
                                            size={21}
                                        />
                                    </span>

                                    <span className="font-medium">
                                        Help & Support
                                    </span>

                                </button>

                            </div>


                            {/* Sign out */}
                            <div className="border-t border-border px-4 py-3">

                                <button
                                    type="button"
                                    onClick={handleLogout}
                                    className="
                                        flex
                                        w-full
                                        items-center
                                        gap-4
                                        rounded-xl
                                        px-3
                                        py-3
                                        text-left
                                        text-red-400
                                        transition
                                        hover:bg-red-500/10
                                    "
                                >
                                    <span
                                        className="
                                            flex
                                            h-10
                                            w-10
                                            items-center
                                            justify-center
                                            rounded-xl
                                            bg-red-500/10
                                        "
                                    >
                                        <HiOutlineArrowRightOnRectangle
                                            size={21}
                                        />
                                    </span>

                                    <span className="font-semibold">
                                        Sign Out
                                    </span>

                                </button>

                            </div>

                        </div>
                    )}

                </div>

            </div>

        </header>
    );
}