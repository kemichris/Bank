import { useState } from 'react';
import { HiOutlineEye, HiOutlineEyeSlash } from 'react-icons/hi2';

export function CreditCard({
    cardNumber,
    cardHolder,
    expires,
    cvv,
    type
}) {
    const [showDetails, setShowDetails] = useState(false);

    const cleanCardNumber = String(cardNumber).replace(/\s/g, '');

    const formattedCardNumber =
        cleanCardNumber.match(/.{1,4}/g)?.join('  ') || '';

    return (
        <div className="relative aspect-[1.586/1] w-full max-w-md overflow-hidden rounded-[5%] border border-white/20 bg-linear-to-br from-sky-500 via-blue-600 to-slate-900 p-[5%] text-white shadow-2xl">

            {/* Top-right decorative circles */}
            <div className="absolute right-[10%] top-[10%] h-[32%] w-[32%] rounded-full bg-white/10" />

            <div className="absolute right-[4%] top-[4%] h-[20%] w-[20%] rounded-full bg-white/5" />

            {/* Bottom glow */}
            <div className="absolute bottom-[20%] left-1/3 h-[36%] w-[36%] rounded-full bg-blue-400/20 blur-3xl" />

            {/* Card content */}
            <div className="relative z-10 flex h-full flex-col">

                {/* Top */}
                <div className="flex items-start justify-between">

                    <div>
                        <p className="text-[clamp(10px,2vw,18px)] font-semibold tracking-wide">
                            NEON
                        </p>

                        <p className="mt-[1%] text-[clamp(5px,1vw,10px)] uppercase tracking-[0.18em] text-blue-100">
                            Virtual Card
                        </p>
                    </div>

                    {/* Top right */}
                    <div className="flex items-center gap-[8%]">

                        {/* Contactless */}
                        <div className="text-[clamp(10px,2vw,20px)] font-light text-white/90">
                            )))
                        </div>

                        {/* Show / hide button */}
                        <button
                            type="button"
                            onClick={() =>
                                setShowDetails(previous => !previous)
                            }
                            className="rounded-full p-[4%] text-white/80 transition hover:bg-white/10 hover:text-white"
                            aria-label={
                                showDetails
                                    ? 'Hide card details'
                                    : 'Show card details'
                            }
                        >
                            {showDetails ? (
                                <HiOutlineEyeSlash
                                    className="h-[clamp(12px,2vw,18px)] w-[clamp(12px,2vw,18px)]"
                                />
                            ) : (
                                <HiOutlineEye
                                    className="h-[clamp(12px,2vw,18px)] w-[clamp(12px,2vw,18px)]"
                                />
                            )}
                        </button>

                    </div>

                </div>

                {/* Chip */}
                <div className="mt-[7%] h-[13%] w-[16%] overflow-hidden rounded-[15%] border border-white/20 bg-linear-to-br from-yellow-100 to-yellow-400 shadow-inner">

                    <div className="relative h-full w-full">

                        <div className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-yellow-700/30" />

                        <div className="absolute left-0 top-1/2 h-px w-full -translate-y-1/2 bg-yellow-700/30" />

                        <div className="absolute left-[10%] top-[12%] h-[45%] w-[28%] rounded border border-yellow-700/30" />

                        <div className="absolute right-[10%] top-[12%] h-[45%] w-[28%] rounded border border-yellow-700/30" />

                    </div>

                </div>

                {/* Card number */}
                <div className="mt-[5%] whitespace-nowrap text-[clamp(9px,2vw,18px)] font-medium tracking-[0.12em]">

                    {showDetails
                        ? formattedCardNumber
                        : '••••  ••••  ••••  ••••'}

                </div>

                {/* Bottom information */}
                <div className="mt-auto flex items-end justify-between gap-[3%]">

                    {/* Card holder */}
                    <div className="min-w-0 flex-1">

                        <p className="text-[clamp(5px,0.8vw,8px)] uppercase tracking-widest text-blue-100/70">
                            Card Holder
                        </p>

                        <p className="mt-[1%] truncate text-[clamp(7px,1vw,12px)] font-medium uppercase tracking-wide">
                            {cardHolder}
                        </p>

                    </div>

                    {/* Expiry */}
                    <div className="shrink-0">

                        <p className="text-[clamp(5px,0.8vw,8px)] uppercase tracking-widest text-blue-100/70">
                            Expires
                        </p>

                        <p className="mt-[1%] text-[clamp(7px,1vw,12px)] font-medium">
                            {showDetails ? expires : '**/**'}
                        </p>

                    </div>

                    {/* CVV */}
                    <div className="shrink-0">

                        <p className="text-[clamp(5px,0.8vw,8px)] uppercase tracking-widest text-blue-100/70">
                            CVV
                        </p>

                        <p className="mt-[1%] text-[clamp(7px,1vw,12px)] font-medium tracking-wider">
                            {showDetails ? cvv : '•••'}
                        </p>

                    </div>

                    {/* VISA */}
                    <div className="shrink-0">

                        <p className="text-[clamp(10px,2vw,20px)] font-black italic tracking-tight">
                            {type}
                        </p>

                    </div>

                </div>

            </div>
        </div>
    );
}