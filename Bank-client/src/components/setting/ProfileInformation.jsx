import {
    HiOutlineUser,
    HiOutlineHashtag,
    HiOutlineEnvelope,
    HiOutlineCalendarDays,
    HiOutlinePhone,
    HiOutlineMapPin,
    HiOutlineInformationCircle,
} from 'react-icons/hi2';


export function ProfileInformation({ profile }) {
    const formatDate = date => {
        if (!date) return '—';

        return new Date(date).toLocaleDateString('en-US', {
            month: 'long',
            day: 'numeric',
            year: 'numeric'
        });
    };


    return (
        <div className="w-full">


            {/* Header */}
            <div className="mb-5 flex items-center gap-3">

                <div
                    className="
                        flex
                        h-9
                        w-9
                        items-center
                        justify-center
                        rounded-full
                        bg-primary/15
                        text-primary
                    "
                >
                    <HiOutlineUser size={19} />
                </div>

                <div>
                    <h3 className="text-lg font-semibold text-text">
                        Profile Information
                    </h3>

                    <p className="text-sm text-text-muted">
                        Your personal information and account details
                    </p>
                </div>

            </div>


            {/* Information Card */}
            <div
                className="
                    rounded-2xl
                    border
                    border-border
                    bg-surface-2
                    p-5
                    sm:p-6
                "
            >


                {/* First / Last Name */}
                <div className="grid grid-cols-1 gap-5 md:grid-cols-2">

                    <ProfileField
                        label="First Name"
                        value={profile?.firstName}
                        icon={HiOutlineUser}
                    />

                    <ProfileField
                        label="Last Name"
                        value={profile?.lastName}
                        icon={HiOutlineUser}
                    />

                </div>


                {/* Account Number */}
                <div className="mt-5">

                    <ProfileField
                        label="Account Number"
                        value={profile?.account.accountNumber}
                        icon={HiOutlineHashtag}
                    />

                    <p className="mt-1 pl-1 text-xs text-text-muted">
                        Your unique account identifier
                    </p>

                </div>


                {/* Email */}
                <div className="mt-5">

                    <ProfileField
                        label="Email Address"
                        value={profile?.email}
                        icon={HiOutlineEnvelope}
                    />

                </div>


                {/* Date of Birth */}
                <div className="mt-5">

                    <ProfileField
                        label="Date of Birth"
                        value={formatDate(profile?.dateOfBirth)}
                        icon={HiOutlineCalendarDays}
                    />

                </div>


                {/* Phone */}
                <div className="mt-5">

                    <ProfileField
                        label="Phone Number"
                        value={profile?.phoneNumber}
                        icon={HiOutlinePhone}
                    />

                </div>


                {/* Address */}
                <div className="mt-5">

                    <div className="mb-2 flex items-center gap-2">

                        <label className="text-sm font-semibold text-text">
                            Address
                        </label>

                    </div>

                    <div
                        className="
                            flex
                            min-h-20
                            items-start
                            gap-3
                            rounded-xl
                            border
                            border-border
                            bg-surface-1
                            px-4
                            py-3
                        "
                    >

                        <HiOutlineMapPin
                            className="mt-0.5 shrink-0 text-text-muted"
                            size={18}
                        />

                        <span className="text-sm text-text">
                            {profile?.address || '—'}
                        </span>

                    </div>

                </div>


                {/* Information Notice */}
                <div
                    className="
                        mt-5
                        flex
                        items-start
                        gap-3
                        rounded-xl
                        border
                        border-primary/40
                        bg-primary/10
                        px-4
                        py-3
                    "
                >

                    <HiOutlineInformationCircle
                        className="mt-0.5 shrink-0 text-primary"
                        size={20}
                    />

                    <div>

                        <p className="text-sm font-semibold text-text">
                            Account Information
                        </p>

                        <p className="mt-1 text-sm text-primary">
                            To update your personal information,
                            please contact our customer support team.
                        </p>

                    </div>

                </div>


            </div>


        </div>
    );
}


function ProfileField({
    label,
    value,
    icon: Icon,
}) {
    return (
        <div>

            <label className="mb-2 block text-sm font-semibold text-text">
                {label}
            </label>

            <div
                className="
                    flex
                    items-center
                    gap-3
                    rounded-xl
                    border
                    border-border
                    bg-surface-1
                    px-4
                    py-3
                "
            >

                <Icon
                    className="shrink-0 text-text-muted"
                    size={18}
                />

                <span className="min-w-0 truncate text-sm text-text">
                    {value || '—'}
                </span>

            </div>

        </div>
    );
}