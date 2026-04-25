import { Skeleton } from '@/components/ui/skeleton'

export function RepoDetailSkeleton() {
  return (
    <div className="w-full min-w-0 overflow-hidden p-6 lg:p-8 bg-card border border-border rounded-md shadow-sm">
      <div className="flex items-center gap-4">
        <Skeleton className="h-12 w-12 rounded-full" />
        <div className="min-w-0 flex-1 space-y-2">
          <Skeleton className="h-6 w-full max-w-[18rem]" />
          <Skeleton className="h-4 w-20" />
        </div>
      </div>

      <div className="mt-6 space-y-2">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-[88%]" />
        <Skeleton className="h-4 w-[76%]" />
      </div>

      <div className="mt-6 flex flex-wrap gap-6">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="flex items-center gap-2">
            <Skeleton className="h-4 w-4 rounded" />
            <Skeleton className="h-4 w-14 rounded" />
          </div>
        ))}
      </div>
    </div>
  )
}
