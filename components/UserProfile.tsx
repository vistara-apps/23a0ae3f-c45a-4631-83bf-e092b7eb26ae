'use client';

import { useMiniKit } from '@coinbase/minikit';

export function UserProfile() {
  const { context } = useMiniKit();
  
  const displayName = context?.user?.displayName || 'Friend';
  const avatar = context?.user?.pfpUrl;

  return (
    <div className="flex items-center space-x-3">
      <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center overflow-hidden">
        {avatar ? (
          <img 
            src={avatar} 
            alt={displayName}
            className="w-full h-full object-cover"
          />
        ) : (
          <span className="text-lg">👤</span>
        )}
      </div>
      <div>
        <p className="text-sm font-medium text-foreground">
          Hello, {displayName}!
        </p>
      </div>
    </div>
  );
}
