import { StatsSection } from "../../components/dashboard/StatsSection";

export function Dashboard() {
    return (
        <div className="h-full bg-surface-1 pb-8 pt-25 lg:ml-50 lg:pl-14 px-8 ">
            <StatsSection />
        </div>
    );
}
// bg-gradient-to-br from-primary-600 via-primary-500 to-primary-700