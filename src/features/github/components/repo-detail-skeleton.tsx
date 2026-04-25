export function RepoDetailSkeleton() {
  return (
    <div className="animate-pulse space-y-4 p-6">
      <div className="flex items-center gap-4">
        <div className="h-16 w-16 rounded-full bg-muted" />
        <div className="h-6 w-48 rounded bg-muted" />
      </div>
      <div className="h-4 w-24 rounded bg-muted" />
      <div className="flex gap-6">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="h-4 w-16 rounded bg-muted" />
        ))}
      </div>
    </div>
  )
}
