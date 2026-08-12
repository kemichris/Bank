import { NavLink } from "react-router-dom";

export function AdminSidebarItem({ link, setSidebarOpen }) {
    const Icon = link.icon;

    const handleClick = () => {
        if (window.innerWidth < 1024) {
            setSidebarOpen(false);
        }
    };

    return (
        <NavLink
            to={link.path}
            end={link.path === "/admin"}
            onClick={handleClick}
            className={({ isActive }) => `
                flex
                items-center
                gap-4
                px-4
                py-3
                rounded-xl
                mb-2
                transition-all
                ${isActive ? "bg-primary text-white" : "text-text hover:bg-surface-2"}
            `}
        >
            <Icon size={20} />
            <span className="text-sm">{link.name}</span>
        </NavLink>
    );
}
