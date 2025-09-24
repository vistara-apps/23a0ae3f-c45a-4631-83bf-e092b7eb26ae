'use client';

interface StreakCounterProps {
  currentStreak: number;
  longestStreak: number;
  completedToday: boolean;
}

export function StreakCounter({ currentStreak, longestStreak, completedToday }: StreakCounterProps) {
  return (
    <div className="grid grid-cols-3 gap-4 text-center">
      <div className="space-y-2">
        <div className="text-2xl">📊</div>
        <div className="text-xs text-muted-foreground uppercase tracking-wide">STREAK</div>
        <div className="text-lg font-bold text-foreground">{currentStreak}</div>
      </div>
      
      <div className="space-y-2">
        <div className="text-2xl">🔥</div>
        <div className="text-xs text-muted-foreground uppercase tracking-wide">STRETCH</div>
        <div className="text-lg font-bold text-foreground">{longestStreak}</div>
      </div>
      
      <div className="space-y-2">
        <div className="text-2xl">👥</div>
        <div className="text-xs text-muted-foreground uppercase tracking-wide">SPAT TUGS</div>
        <div className="text-lg font-bold text-foreground">
          {completedToday ? '✓' : '○'}
        </div>
      </div>
    </div>
  );
}
