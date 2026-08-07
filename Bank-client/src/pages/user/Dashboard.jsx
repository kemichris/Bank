import { StatsSection } from "../../components/dashboard/StatsSection";
import { AccountSection } from "../../components/dashboard/AccountSection";
import { RecentTransaction } from "../../components/dashboard/RecentTransaction";
export function Dashboard() {
    return (
        <div className="h-full bg-surface-1">
            <AccountSection />
            <StatsSection />
            <RecentTransaction />
        </div>
    );
}
