import { useEffect, useState } from 'react';

import { PageLoader } from '../common/PageLoader';
import { ProfileSidebar } from './ProfileSidebar';
import { ProfileInformation } from './ProfileInformation';
import { AssistanceCard } from './AssistanceCard';
import { profileData } from '../../services/settings.service';
import { PasswordSetting } from './PasswordSetting';
import { ResetPin } from './ResetPin';


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
                        profile={profile}
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

                    {activeSection === 'pin' && (
                        <ResetPin />
                    )}

                </div>

            </div>

        </div>
    );
}