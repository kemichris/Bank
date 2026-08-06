import { IoIosSettings } from "react-icons/io";
import { FaBell } from "react-icons/fa";
import { FaChevronDown } from "react-icons/fa";
import { FaUser } from "react-icons/fa";


export function Header() {
    return (
        <header className="h-20 bg-surface-1 border-b border-border flex items-center justify-between py-4 px-8 pl-64 fixed w-full ">
            {/* Left */}
            <div>
                <h1 className="text-2xl font-bold text-text">Dashboard</h1>

                <p className="text-text-muted text-sm">Welcome back, Maihi</p>
            </div>

            {/* Right */}
            <div className="flex items-center gap-6">
                <button className="p-3 bg-surface-2 text-yellow-400 text-2xl rounded-2xl " >
                    <IoIosSettings />
                </button>

                <button className="p-3 bg-surface-2 text-text text-2xl rounded-2xl ">
                    <FaBell />
                </button>

                <button className="flex items-center p-2 gap-3 rounded-lg hover:bg-surface-2">
                    <div className="w-11 h-11 rounded-full bg-primary flex items-center justify-center border-2 border-amber-50">
                        <FaUser className="text-text" />
                    </div>

                    <div className="text-left">
                        <p className="font-semibold text-text">Maihi</p>

                        <p className="text-sm text-text-muted">maihiben@gmail.com</p>
                    </div>

                    <FaChevronDown className="text-text" />
                </button>
            </div>
        </header>
    );
}
