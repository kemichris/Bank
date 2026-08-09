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

    // Remove spaces first in case the card number comes formatted
    const cleanCardNumber = String(cardNumber).replace(/\s/g, '');

    // Split card number into groups of 4
    const formattedCardNumber =
        cleanCardNumber.match(/.{1,4}/g)?.join('  ') || '';

    return (
        <div className="relative w-full max-w-md overflow-hidden rounded-2xl border border-white/20 bg-linear-to-br from-sky-500 via-blue-600 to-slate-900 px-5 py-4 text-white shadow-2xl sm:rounded-[22px] sm:px-6 sm:py-5">

            {/* Top-right decorative circles */}
            <div className="absolute -right-12 -top-12 h-32 w-32 rounded-full bg-white/10 sm:-right-14 sm:-top-14 sm:h-36 sm:w-36" />

            <div className="absolute -right-5 -top-5 h-20 w-20 rounded-full bg-white/5 sm:h-24 sm:w-24" />

            {/* Bottom glow */}
            <div className="absolute -bottom-20 left-1/3 h-36 w-36 rounded-full bg-blue-400/20 blur-3xl" />

            {/* Card content */}
            <div className="relative z-10">

                {/* Top */}
                <div className="flex items-start justify-between">

                    <div>
                        <p className="text-base font-semibold tracking-wide sm:text-lg">
                            NEON
                        </p>

                        <p className="mt-0.5 text-[9px] uppercase tracking-[0.18em] text-blue-100 sm:text-[10px]">
                            Virtual Card
                        </p>
                    </div>

                    {/* Top right */}
                    <div className="flex items-center gap-3">

                        {/* Contactless */}
                        <div className="text-lg font-light text-white/90 sm:text-xl">
                            )))
                        </div>

                        {/* Show / hide button */}
                        <button
                            type="button"
                            onClick={() =>
                                setShowDetails((previous) => !previous)
                            }
                            className="
                                rounded-full
                                p-1.5
                                text-white/80
                                transition
                                hover:bg-white/10
                                hover:text-white
                            "
                            aria-label={
                                showDetails
                                    ? 'Hide card details'
                                    : 'Show card details'
                            }
                        >
                            {showDetails ? (
                                <HiOutlineEyeSlash size={18} />
                            ) : (
                                <HiOutlineEye size={18} />
                            )}
                        </button>

                    </div>

                </div>


                {/* Chip */}
                <div className="mt-6 h-7 w-10 overflow-hidden rounded-md border border-white/20 bg-linear-to-br from-yellow-100 to-yellow-400 shadow-inner sm:mt-7 sm:h-8 sm:w-12">

                    <div className="relative h-full w-full">

                        <div className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-yellow-700/30" />

                        <div className="absolute left-0 top-1/2 h-px w-full -translate-y-1/2 bg-yellow-700/30" />

                        <div className="absolute left-1 top-1 h-3.5 w-2.5 rounded border border-yellow-700/30 sm:left-1.5 sm:top-1.5 sm:h-4 sm:w-3" />

                        <div className="absolute right-1 top-1 h-3.5 w-2.5 rounded border border-yellow-700/30 sm:right-1.5 sm:top-1.5 sm:h-4 sm:w-3" />

                    </div>

                </div>


                {/* Card number */}
                <div className="mt-4 whitespace-nowrap text-sm font-medium tracking-widest sm:mt-5 sm:text-lg sm:tracking-[0.15em]">

                    {showDetails ? (
                        formattedCardNumber
                    ) : (
                        '••••  ••••  ••••  ••••'
                    )}

                </div>


                {/* Bottom information */}
                <div className="mt-5 flex items-end justify-between gap-3 sm:mt-6 sm:gap-4">

                    {/* Card holder */}
                    <div className="min-w-0">

                        <p className="text-[7px] uppercase tracking-widest text-blue-100/70 sm:text-[8px]">
                            Card Holder
                        </p>

                        <p className="mt-0.5 truncate text-[11px] font-medium uppercase tracking-wide sm:text-xs">
                            {cardHolder}
                        </p>

                    </div>


                    {/* Expiry */}
                    <div className="shrink-0">

                        <p className="text-[7px] uppercase tracking-widest text-blue-100/70 sm:text-[8px]">
                            Expires
                        </p>

                        <p className="mt-0.5 text-[11px] font-medium sm:text-xs">
                            {showDetails ? expires : '**/**'}
                        </p>

                    </div>


                    {/* CVV */}
                    <div className="shrink-0">

                        <p className="text-[7px] uppercase tracking-widest text-blue-100/70 sm:text-[8px]">
                            CVV
                        </p>

                        <p className="mt-0.5 text-[11px] font-medium tracking-wider sm:text-xs">
                            {showDetails ? cvv : '•••'}
                        </p>

                    </div>


                    {/* VISA */}
                    <div className="shrink-0">

                        <p className="text-lg font-black italic tracking-tight sm:text-xl">
                            {type}
                        </p>

                    </div>

                </div>

            </div>
        </div>
    );
}