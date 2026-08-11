import { useEffect, useState } from 'react';

import { PageLoader } from '../common/PageLoader';
import { ProfileSidebar } from './ProfileSidebar';
import { ProfileInformation } from './ProfileInformation';
import { AssistanceCard } from './AssistanceCard';
import { profileData } from '../../services/settings.service';
import { PasswordSetting } from './PasswordSetting';


export function Profile() {
    const [activeSection, setActiveSection] = useState('profile');

    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getProfile = async () => {
            try {
                const response = await profileData();

                setProfile(response.data);
            } catch (error) {
                console.error('Failed to load profile:', error);
            } finally {
                setLoading(false);
            }
        };

        getProfile();
    }, []);

    if (loading) {
        return <PageLoader />;
    }


    return (
        <div className="w-full">

            <div
                className="
                    grid
                    grid-cols-1
                    gap-6
                    xl:grid-cols-[360px_minmax(0,1fr)]
                "
            >

                {/* Left column */}
                <div className="space-y-6">

                    <ProfileSidebar
                        activeSection={activeSection}
                        onSectionChange={setActiveSection}
                        firstName={profile?.firstName}
                        lastName={profile?.lastName}
                    />

                    <AssistanceCard
                        chatPath="/dashboard/support"
                    />

                </div>


                {/* Right column */}
                <div>

                    {activeSection === 'profile' && (
                        <ProfileInformation
                            profile={profile}
                        />
                    )}


                    {activeSection === 'password' && (
                        <PasswordSetting />
                    )}


                    {activeSection === 'two-factor' && (
                        <div className="rounded-2xl border border-border bg-surface-2 p-6">

                            <h2 className="text-lg font-semibold text-text">
                                Two-Factor Authentication
                            </h2>

                            <p className="mt-2 text-sm text-text-muted">
                                Two-factor authentication settings will go here.
                            </p>

                        </div>
                    )}


                    {activeSection === 'pin' && (
                        <div className="rounded-2xl border border-border bg-surface-2 p-6">

                            <h2 className="text-lg font-semibold text-text">
                                Transaction PIN
                            </h2>

                            <p className="mt-2 text-sm text-text-muted">
                                Transaction PIN settings will go here.
                            </p>

                        </div>
                    )}

                </div>

            </div>

        </div>
    );
}