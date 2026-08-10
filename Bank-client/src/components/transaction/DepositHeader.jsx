import { FaPiggyBank } from "react-icons/fa"

export function DepositHeader() {
    return (
        <div className="flex flex-col items-center px-4 py-8 rounded-t-2xl mb-8 bg-linear-to-br from-primary-1 to-surface-1">
            <div className="w-15 h-15 flex items-center  justify-center rounded-lg bg-white/50">
                <FaPiggyBank size={30} className="text-white"/>
            </div>
            <h2 className="text-white font-semibold tex-lg">Fund Your Account</h2>
            <p className="text-white text-sm text-center">Choose your preferred deposit option and amount</p>
        </div>
    )
}