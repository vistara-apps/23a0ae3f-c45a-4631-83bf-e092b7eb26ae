'use client';

export function UserProfile() {
  const displayName = 'Friend';

  return (
    <div className="flex items-center space-x-3">
      <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center overflow-hidden">
        <span className="text-lg">👤</span>
      </div>
      <div>
        <p className="text-sm font-medium text-foreground">
          Hello, {displayName}!
        </p>
      </div>
    </div>
  );
}
