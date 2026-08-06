import { sidebarData } from "./sidebarData";
import { SidebarItem } from "./SidebarItem";

import Logo from "../../assets/cm-logo.png"

export function Sidebar() {
    return (
        <aside className="w-60 bg-surface-1 fixed left-0 top-0 h-screen flex flex-col z-20">
            <div className="h-20 flex items-center px-6 border-b border-border">
                <img src={Logo} alt="" className="w-32 h-auto" />
            </div>
            <nav className="flex-1 overflow-y-auto  px-4 py-8" custom-scrollbar>
                {sidebarData.map((section) => (
                    <div key={section.title} className="mb-8">
                        <p className="text-xs text-text-muted mb-4">{section.title}</p>

                        {section.links.map((link) => (
                            <SidebarItem key={link.path} link={link} />
                        ))}
                    </div>
                ))}
            </nav>
        </aside>
    );
}
