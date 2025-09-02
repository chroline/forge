export function DashboardBody({ children }: { children: React.ReactNode }) {
  return (
    <div className="px-4 pb-4 flex flex-1">
      <div className="bg-white shadow-sm rounded-lg p-8 flex-1">{children}</div>
    </div>
  );
}
