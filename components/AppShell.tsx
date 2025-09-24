'use client';

import { useState, useEffect } from 'react';
import { HabitWheel } from './HabitWheel';
import { StreakCounter } from './StreakCounter';
import { HabitCustomizer } from './HabitCustomizer';
import { UserProfile } from './UserProfile';
import { User, DailyHabit } from '../lib/types';
import { getUserData, saveUserData, getDailyHabits, saveDailyHabits, generateDailyHabits, getTodayString, calculateStreak } from '../lib/utils';

export function AppShell() {
  const [user, setUser] = useState<User | null>(null);
  const [dailyHabits, setDailyHabits] = useState<DailyHabit[]>([]);
  const [showCustomizer, setShowCustomizer] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Initialize user data and daily habits
    const userData = getUserData();
    setUser(userData);

    let habits = getDailyHabits();
    if (habits.length === 0) {
      habits = generateDailyHabits(userData.preferredHabits);
      saveDailyHabits(habits);
    }
    setDailyHabits(habits);
    setIsLoading(false);
  }, []);

  const handleHabitComplete = (habitId: string) => {
    if (!user) return;

    const updatedHabits = dailyHabits.map(dh => 
      dh.habit.habitId === habitId 
        ? { ...dh, isCompleted: true, completedAt: new Date().toISOString() }
        : dh
    );

    setDailyHabits(updatedHabits);
    saveDailyHabits(updatedHabits);

    // Update user streak if all habits completed
    const allCompleted = updatedHabits.every(dh => dh.isCompleted);
    if (allCompleted && user.lastCompletionDate !== getTodayString()) {
      const newStreak = user.lastCompletionDate === getTodayString() ? user.currentStreak : user.currentStreak + 1;
      const updatedUser: User = {
        ...user,
        currentStreak: newStreak,
        longestStreak: Math.max(user.longestStreak, newStreak),
        lastCompletionDate: getTodayString(),
      };
      setUser(updatedUser);
      saveUserData(updatedUser);
    }
  };

  const handleCustomizeHabits = (selectedHabitIds: string[]) => {
    if (!user) return;

    const updatedUser: User = {
      ...user,
      preferredHabits: selectedHabitIds,
    };
    setUser(updatedUser);
    saveUserData(updatedUser);

    // Generate new daily habits with updated preferences
    const newHabits = generateDailyHabits(selectedHabitIds);
    setDailyHabits(newHabits);
    saveDailyHabits(newHabits);
    setShowCustomizer(false);
  };

  const handleSpin = () => {
    if (!user) return;
    
    // Generate new daily habits
    const newHabits = generateDailyHabits(user.preferredHabits);
    setDailyHabits(newHabits);
    saveDailyHabits(newHabits);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-pulse space-y-4 w-full max-w-sm px-4">
          <div className="h-8 bg-muted rounded w-3/4 mx-auto"></div>
          <div className="w-64 h-64 bg-muted rounded-full mx-auto"></div>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <p className="text-muted-foreground">Failed to load user data</p>
        </div>
      </div>
    );
  }

  if (showCustomizer) {
    return (
      <HabitCustomizer
        currentHabits={user.preferredHabits}
        onSave={handleCustomizeHabits}
        onCancel={() => setShowCustomizer(false)}
      />
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-sm mx-auto px-4 py-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <UserProfile />
          <button
            onClick={() => setShowCustomizer(true)}
            className="p-2 text-muted-foreground hover:text-foreground transition-colors duration-200"
            aria-label="Settings"
          >
            ⚙️
          </button>
        </div>

        {/* Title */}
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-foreground mb-2">Habit wheel</h1>
          <p className="text-muted-foreground">Tap in your wheel is in they labi?</p>
        </div>

        {/* Habit Wheel */}
        <div className="mb-8">
          <HabitWheel
            habits={dailyHabits}
            onHabitComplete={handleHabitComplete}
            onSpin={handleSpin}
          />
        </div>

        {/* Habit Options */}
        <div className="space-y-3 mb-8">
          {dailyHabits.map((dailyHabit, index) => (
            <div
              key={dailyHabit.habit.habitId}
              className={`habit-option ${dailyHabit.isCompleted ? 'selected' : ''}`}
            >
              <div className="flex items-center space-x-3">
                <span className="text-2xl">{dailyHabit.habit.icon}</span>
                <span className="font-medium text-foreground">{dailyHabit.habit.name}</span>
              </div>
              <div className="flex items-center space-x-2">
                {index === 0 && <span className="text-xs text-muted-foreground">Spin on</span>}
                {index === 2 && <span className="text-xs text-muted-foreground">Daily</span>}
                <div className={`w-4 h-4 rounded-full border-2 ${
                  dailyHabit.isCompleted 
                    ? 'bg-accent border-accent' 
                    : 'border-muted-foreground'
                }`}>
                  {dailyHabit.isCompleted && (
                    <div className="w-full h-full flex items-center justify-center">
                      <span className="text-white text-xs">✓</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="w-full bg-muted rounded-full h-2">
            <div 
              className="bg-accent h-2 rounded-full transition-all duration-300"
              style={{ 
                width: `${(dailyHabits.filter(dh => dh.isCompleted).length / dailyHabits.length) * 100}%` 
              }}
            ></div>
          </div>
        </div>

        {/* Bottom Stats */}
        <StreakCounter
          currentStreak={user.currentStreak}
          longestStreak={user.longestStreak}
          completedToday={dailyHabits.every(dh => dh.isCompleted)}
        />
      </div>
    </div>
  );
}
