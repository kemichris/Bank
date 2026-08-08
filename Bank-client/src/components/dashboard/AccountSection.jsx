import { Link } from "react-router-dom"
import { FaTelegramPlane } from "react-icons/fa";
import { FaPlus } from "react-icons/fa";
import { IoCopy } from "react-icons/io5";
import { BsShieldFillExclamation } from "react-icons/bs";
import { FaDotCircle } from "react-icons/fa";


export function AccountSection({account, user}) {
    return (
        <section className="mt-4 mb-8 flex flex-col gap-8 rounded-[28px] border border-white/20 bg-linear-to-br from-cyan-500 via-blue-700 to-slate-700 px-6 py-8 shadow-[0_20px_60px_-20px_rgba(0,0,0,0.45)]">
            <div className="flex justify-between items-center">
                <div>
                    <h3 className="text-[0.95rem] font-semibold text-white sm:text-lg">Columbia Merchant</h3>
                    <p className="text-[0.72rem] text-slate-200/80 sm:text-sm">{account.accountType} Account</p>

                </div>
                <div className="px-4 py-2 rounded-2xl bg-white/30" >
                    <p className="text-[0.7rem] text-slate-200/80 sm:text-sm">Account Number</p>
                    <p className="mt-1 flex items-center gap-2 text-white">
                        <strong className="text-[0.8rem] sm:text-base">{account.accountNumber}</strong>
                        <IoCopy className="cursor-pointer text-sm transition hover:scale-110" />
                    </p>
                </div>
            </div>
            <div className="flex flex-col items-center">
                <h3 className="text-[1.5rem] font-bold text-white ">${account.balance.toFixed(2)}</h3>
                <p className="text-[0.7rem] text-slate-200/80 sm:text-sm">Available Balance</p>
            </div>
            <div className="flex items-start justify-between ">
                <div>
                    <h3 className="text-[0.95rem] font-semibold text-white sm:text-2xl">{account.accountName}</h3>
                    <p className="text-[0.72rem] text-slate-200/80 sm:text-sm">Account holder</p>
                </div>

                <div>
                    <p className="text-white text-sm flex items-center gap-2" >
                        <FaDotCircle className="text-green-500 text-xs" />
                        Account <span className="font-semibold">{account.status ? account.status.charAt(0).toUpperCase() + account.status.slice(1) : account.status}</span>
                    </p>
                    <p className="text-[0.7rem] text-slate-200/80 sm:text-sm flex items-center gap-2">
                        {user.kycStatus === "unverified" ? (
                            <>
                                <BsShieldFillExclamation className="text-xs text-red-500" />
                                Verification required
                            </>
                        ) : (
                            user.kycStatus
                        )}
                    </p>
                </div>
            </div>
            <div className="flex  items-center justify-end gap-3">
                <Link
                    to="/dashboard/transfer"
                    className="flex items-center gap-2 rounded-2xl bg-white/20 px-4 py-2.5 font-semibold text-white transition hover:-translate-y-0.5 hover:bg-white/30"
                >
                    <FaTelegramPlane /> Transfer
                </Link>
                <Link
                    to="/dashboard/deposit"
                    className="flex items-center gap-2 rounded-2xl bg-white px-4 py-2.5 font-semibold text-slate-900 transition hover:-translate-y-0.5"
                >
                    <FaPlus /> Add Money
                </Link>
            </div>
        </section>
    )
}