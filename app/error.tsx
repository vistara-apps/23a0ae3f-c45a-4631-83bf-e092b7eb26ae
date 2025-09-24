'use client'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="text-center space-y-4 px-4">
        <h2 className="text-2xl font-bold text-foreground">
          Something went wrong!
        </h2>
        <p className="text-muted-foreground">
          We encountered an error while loading your habits.
        </p>
        <button
          onClick={reset}
          className="bg-primary text-white px-6 py-2 rounded-lg hover:bg-primary/90 transition-colors duration-200"
        >
          Try again
        </button>
      </div>
    </div>
  )
}
