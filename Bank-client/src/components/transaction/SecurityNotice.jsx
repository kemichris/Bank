import { FaShieldAlt, FaLock, FaEyeSlash, FaClock } from "react-icons/fa";

export function BankSecurityNotice() {
    return (
        <div className="mt-6 rounded-2xl border border-gray-700 bg-gray-900/80 p-3">
            <div>

                {/* Content */}
                <div className="flex-1">
                    {/* Heading */}
                    <h3 className="text-base font-semibold text-white flex items-center gap-2">
                        <FaShieldAlt className="text-base text-lime-500" />
                        Bank-Level Security
                    </h3>

                    {/* Description */}
                    <p className="mt-2 max-w-5xl text-xs  text-gray-300">
                        All transfers are protected with 256-bit SSL encryption and
                        processed through secure banking channels. Your financial
                        information is never stored on our servers and all transactions are
                        monitored for fraud protection.
                    </p>

                    {/* Security Features */}
                    <div className="mt-4 flex gap-4">
                        <div className="flex items-center gap-2 text-xs font-medium text-white">
                            <FaLock className="text-lime-400" />
                            <span>SSL Encrypted</span>
                        </div>

                        <div className="flex items-center gap-2 text-xs font-medium text-white">
                            <FaEyeSlash className="text-lime-400" />
                            <span>Zero Data Storage</span>
                        </div>

                        <div className="flex items-center gap-2 text-xs font-medium text-white">
                            <FaClock className="text-lime-400" />
                            <span>24/7 Monitoring</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
