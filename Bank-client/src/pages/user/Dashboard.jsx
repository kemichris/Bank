import { StatsSection } from "../../components/dashboard/StatsSection";
import { AccountSection } from "../../components/dashboard/AccountSection";
import { RecentTransaction } from "../../components/dashboard/RecentTransaction";
export function Dashboard() {
    return (
        <div className="h-full bg-surface-1 pb-8 pt-25 lg:ml-50 lg:pl-14 px-8 ">
            <AccountSection />
            <StatsSection />
            <RecentTransaction />
        </div>
    );
}
