export default function Loading() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="animate-pulse space-y-4 w-full max-w-sm px-4">
        <div className="h-8 bg-muted rounded w-3/4 mx-auto"></div>
        <div className="w-64 h-64 bg-muted rounded-full mx-auto"></div>
        <div className="space-y-3">
          <div className="h-4 bg-muted rounded"></div>
          <div className="h-4 bg-muted rounded w-5/6"></div>
        </div>
      </div>
    </div>
  )
}
