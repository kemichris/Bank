import { NavLink } from "react-router-dom";

export function SidebarItem({ link }) {
    const Icon = link.icon;

    return (
        <NavLink to={link.path} className={({ isActive }) => `
        flex
        items-center
        gap-4
        px-4
        py-3
        rounded-xl
        mb-2
        transition-all

        ${isActive ? "bg-primary text-white" : "text-text hover:bg-surface-2"}
        `
            }
        >
            <Icon size={20} />

            <span className="text-sm" >{link.name}</span>
        </NavLink>
    );
}
