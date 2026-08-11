import {
    HiOutlineChatBubbleLeftRight,
    HiOutlineClock,
    HiOutlineShieldCheck,
    HiOutlinePhone,
} from 'react-icons/hi2';

import { Link } from 'react-router-dom';

export function AssistanceCard() {
    return (
        <div
            className="
                rounded-2xl
                border
                border-border
                bg-surface-2
                p-5
                text-center
                sm:p-6
            "
        >

            {/* Icon */}
            <div
                className="
                    mx-auto
                    flex
                    h-14
                    w-14
                    items-center
                    justify-center
                    rounded-2xl
                    bg-primary
                    text-white
                "
            >
                <HiOutlineChatBubbleLeftRight size={27} />
            </div>


            {/* Heading */}
            <h2 className="mt-4 text-lg font-bold text-text">
                Need Assistance?
            </h2>

            <p className="mt-1 text-sm text-text-muted">
                Our expert support team is available
            </p>


            {/* Availability */}
            <p className="mt-1 text-sm font-semibold text-primary">
                <span className="mr-1 inline-block h-2 w-2 rounded-full bg-green-400" />

                24/7 Live Support
            </p>


            {/* Support Features */}
            <div className="mt-5 grid grid-cols-2 gap-3">

                {/* Quick Response */}
                <div
                    className="
                        rounded-xl
                        border
                        border-border
                        bg-surface-3
                        px-3
                        py-3
                    "
                >

                    <HiOutlineClock
                        className="mx-auto text-text-muted"
                        size={20}
                    />

                    <p className="mt-1 text-xs font-semibold text-text">
                        Quick Response
                    </p>

                    <p className="mt-0.5 text-xs text-text-muted">
                        &lt; 5 minutes
                    </p>

                </div>


                {/* Secure Chat */}
                <div
                    className="
                        rounded-xl
                        border
                        border-border
                        bg-surface-3
                        px-3
                        py-3
                    "
                >

                    <HiOutlineShieldCheck
                        className="mx-auto text-green-400"
                        size={20}
                    />

                    <p className="mt-1 text-xs font-semibold text-text">
                        Secure Chat
                    </p>

                    <p className="mt-0.5 text-xs text-text-muted">
                        Encrypted
                    </p>

                </div>

            </div>


            {/* Chat Button */}
            <Link
                to="/dashboard/support"
                className="
                    mt-5
                    flex
                    w-full
                    items-center
                    justify-center
                    gap-2
                    rounded-xl
                    bg-primary
                    px-5
                    py-3
                    text-sm
                    font-semibold
                    text-white
                    transition
                    hover:opacity-90
                "
            >
                <HiOutlineChatBubbleLeftRight size={18} />

                Start Live Chat

                <span className="h-2 w-2 rounded-full bg-green-400" />
            </Link>


            {/* Phone */}
            <div className="mt-4 flex items-center justify-center gap-2">

                <HiOutlinePhone
                    className="text-primary"
                    size={17}
                />

                <p className="text-xs text-text-muted">
                    Or call us directly for urgent matters
                </p>

            </div>

        </div>
    );
}