import { StatsSection } from "../../components/dashboard/StatsSection";
import { AccountSection } from "../../components/dashboard/AccountSection";
export function Dashboard() {
    return (
        <div className="h-full bg-surface-1 pb-8 pt-25 lg:ml-50 lg:pl-14 px-8 ">
            <AccountSection />
            <StatsSection />
            
        </div>
    );
}
