export function LoadingSkeleton() {
  return (
    <div className="space-y-6 p-6">
      {/* Header Skeleton */}
      <div className="flex items-center justify-between">
        <div className="space-y-2">
          <div className="h-8 w-48 bg-card-elevated rounded-lg skeleton-shimmer" />
          <div className="h-4 w-64 bg-card-elevated rounded-lg skeleton-shimmer" />
        </div>
        <div className="h-10 w-32 bg-card-elevated rounded-lg skeleton-shimmer" />
      </div>

      {/* Cards Skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="glass-card rounded-[20px] p-6 space-y-4">
            <div className="flex items-start justify-between">
              <div className="space-y-2 flex-1">
                <div className="h-4 w-24 bg-card-elevated rounded skeleton-shimmer" />
                <div className="h-8 w-32 bg-card-elevated rounded skeleton-shimmer" />
              </div>
              <div className="w-12 h-12 bg-card-elevated rounded-[14px] skeleton-shimmer" />
            </div>
            <div className="h-4 w-20 bg-card-elevated rounded skeleton-shimmer" />
          </div>
        ))}
      </div>

      {/* Chart Skeleton */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {[1, 2].map((i) => (
          <div key={i} className="glass-card rounded-[20px] p-6 space-y-4">
            <div className="h-6 w-40 bg-card-elevated rounded skeleton-shimmer" />
            <div className="h-64 bg-card-elevated rounded-lg skeleton-shimmer" />
          </div>
        ))}
      </div>
    </div>
  );
}
