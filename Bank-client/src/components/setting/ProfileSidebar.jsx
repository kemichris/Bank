import {
    HiOutlineUser,
    HiOutlineKey,
    HiOutlineCreditCard,
} from 'react-icons/hi2';

export function ProfileSidebar({
    activeSection = 'profile',
    onSectionChange,
    profile
}) {
    const menuItems = [
        {
            id: 'profile',
            label: 'Profile Information',
            icon: HiOutlineUser,
        },
        {
            id: 'password',
            label: 'Password Settings',
            icon: HiOutlineKey,
        },
        {
            id: 'pin',
            label: 'Transaction PIN',
            icon: HiOutlineCreditCard,
        },
    ];

    return (
        <div
            className="
                w-full
                overflow-hidden
                rounded-2xl
                border
                border-border
                bg-surface-2
            "
        >

            {/* Profile Header */}
            <div
                className="
                    flex
                    flex-col
                    items-center
                    bg-primary
                    px-6
                    py-7
                    text-center
                "
            >

                {/* Avatar */}
                <div className="relative">

                    <div
                        className="
                            flex
                            h-20
                            w-20
                            items-center
                            justify-center
                            rounded-2xl
                            border-2
                            border-white/60
                            bg-white/80
                            text-2xl
                            font-bold
                            text-primary
                        "
                    >
                        MA
                    </div>

                    {/* Camera */}
                    <button
                        type="button"
                        className="
                            absolute
                            -bottom-1
                            -right-1
                            flex
                            h-7
                            w-7
                            items-center
                            justify-center
                            rounded-full
                            border-2
                            border-primary
                            bg-surface-1
                            text-text
                        "
                    >
                        <span className="text-xs">
                            📷
                        </span>
                    </button>

                </div>


                <h2 className="mt-3 text-lg font-bold text-white">
                   {`${profile.firstName} ${profile.lastName} `}
                </h2>

                <p className="mt-1 text-sm text-white/80">
                    {profile.account.accountNumber}
                </p>

            </div>


            {/* Navigation */}
            <nav className="p-2">

                {menuItems.map(item => {
                    const Icon = item.icon;

                    const isActive =
                        activeSection === item.id;

                    return (
                        <button
                            key={item.id}
                            type="button"
                            onClick={() =>
                                onSectionChange?.(item.id)
                            }
                            className={`
                                flex
                                w-full
                                items-center
                                gap-3
                                rounded-xl
                                px-4
                                py-3
                                text-left
                                text-sm
                                font-medium
                                transition
                                ${
                                    isActive
                                        ? 'bg-primary/15 text-primary'
                                        : 'text-text-muted hover:bg-surface-3 hover:text-text'
                                }
                            `}
                        >
                            <Icon size={19} />

                            <span>
                                {item.label}
                            </span>
                        </button>
                    );
                })}

            </nav>

        </div>
    );
}