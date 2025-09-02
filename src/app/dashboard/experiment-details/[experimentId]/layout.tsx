import { DashboardBody } from "@/components/dashboard-body";
import { DashboardHeader } from "@/components/dashboard-header";

export default function ExperimentDetailsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-1 flex-col h-full overflow-hidden">
      <DashboardHeader title="Experiment Details" />
      <DashboardBody>
        <div className="flex-1 flex h-full overflow-scroll">{children}</div>
      </DashboardBody>
    </div>
  );
}
