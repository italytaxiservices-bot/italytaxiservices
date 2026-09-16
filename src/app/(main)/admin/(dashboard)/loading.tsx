export default function DashboardLoading() {
  return (
    <div className="animate-pulse space-y-6">
      <div className="flex items-center justify-between">
        <div className="h-7 w-48 bg-admin-line/60 rounded-sm" />
        <div className="h-9 w-32 bg-admin-line/60 rounded-sm" />
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="h-20 bg-white border border-admin-line rounded-sm" />
        ))}
      </div>
      <div className="bg-white border border-admin-line rounded-sm">
        <div className="h-11 border-b border-admin-line" />
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="h-12 border-b border-admin-line last:border-0 flex items-center px-4">
            <div className="h-3.5 w-1/3 bg-admin-line/60 rounded-sm" />
          </div>
        ))}
      </div>
    </div>
  );
}
