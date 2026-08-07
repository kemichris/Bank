
import { FaBell } from "react-icons/fa";
import { FaUser } from "react-icons/fa";
import { HiOutlineBars3, HiOutlineXMark } from "react-icons/hi2";


export function Header({ sidebarOpen, setSidebarOpen }) {
    return (
        <header className={`
            h-20 
            bg-surface-1 
            border-b 
            border-border 
            flex 
            items-center
            justify-between 
            fixed
            z-30
            right-0
            top-0
            w-full
            max-w-screen
            py-4
            px-6
             `}>


            <button
                className="rounded-md p-2 text-text lg:hidden"
                onClick={() => setSidebarOpen(!sidebarOpen)}
            >
                {sidebarOpen ? <HiOutlineXMark size={24} /> : <HiOutlineBars3 size={24} />}
            </button>


            {/* Left */}
            <div>
                <h1 className="text-2xl font-bold text-text">Dashboard</h1>

                <p className="text-text-muted text-sm">Welcome back, Maihi</p>
            </div>

            {/* Right */}
            <div className="flex items-center gap-3">
                <button className="p-3 bg-surface-2 text-text text-base rounded-2xl ">
                    <FaBell />
                </button>

                <button className="p-2 rounded-lg hover:bg-surface-2">
                    <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center border border-amber-50">
                        <FaUser className="text-text" />
                    </div>
                </button>
            </div>
        </header>
    );
}
