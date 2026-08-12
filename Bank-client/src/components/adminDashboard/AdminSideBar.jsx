
import { adminSidebarData } from "./adminSidebarData";
import { AdminSidebarItem } from "./adminSidebarItem";

import Logo from "../../assets/cm-logo.png";

export function AdminSidebar({ sidebarOpen, setSidebarOpen }) {
    return (
        <aside
            className={`
                w-60 
              bg-surface-1 
                fixed 
                left-0 
                top-20
                h-screen 
                overflow-y-auto
                px-4
                py-8
                pb-20
                z-20
                scrollbar-thumb-sky-700
                border-r
                border-border
                transition-transform 
                duration-300
                ${sidebarOpen
                    ? "translate-x-0"
                    : "-translate-x-full"
                }
                lg:translate-x-0
            `}
        >


            <div className="h-15 flex items-center px-6 border-b mb-6 border-border">
                <img src={Logo} alt="" className="w-22 h-auto" />
            </div>
            {adminSidebarData.map((section) => (
                <div key={section.title} className="mb-8">
                    <p className="text-xs text-text-muted mb-4">{section.title}</p>

                    {section.links.map((link) => (
                        <AdminSidebarItem key={link.path} link={link} setSidebarOpen={setSidebarOpen} />
                    ))}
                </div>
            ))}

        </aside>
    );
}
