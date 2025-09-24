import { User, Habit, DailyHabit } from './types';
import { DEFAULT_HABITS, STORAGE_KEYS } from './constants';

export function cn(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

export function getRandomHabits(habits: Habit[], count: number = 3): Habit[] {
  const shuffled = [...habits].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}

export function getTodayString(): string {
  return new Date().toISOString().split('T')[0];
}

export function isToday(dateString: string): boolean {
  return dateString === getTodayString();
}

export function calculateStreak(completionDates: string[]): number {
  if (completionDates.length === 0) return 0;
  
  const sortedDates = completionDates.sort().reverse();
  const today = getTodayString();
  let streak = 0;
  
  // Check if today is completed
  if (sortedDates[0] === today) {
    streak = 1;
    
    // Count consecutive days backwards
    for (let i = 1; i < sortedDates.length; i++) {
      const currentDate = new Date(sortedDates[i]);
      const previousDate = new Date(sortedDates[i - 1]);
      const dayDiff = (previousDate.getTime() - currentDate.getTime()) / (1000 * 60 * 60 * 24);
      
      if (dayDiff === 1) {
        streak++;
      } else {
        break;
      }
    }
  }
  
  return streak;
}

export function getUserData(): User {
  if (typeof window === 'undefined') {
    return {
      userId: 'default',
      preferredHabits: DEFAULT_HABITS.slice(0, 6).map(h => h.habitId),
      currentStreak: 0,
      longestStreak: 0,
      lastCompletionDate: null,
    };
  }
  
  const stored = localStorage.getItem(STORAGE_KEYS.USER_DATA);
  if (stored) {
    return JSON.parse(stored);
  }
  
  const defaultUser: User = {
    userId: 'default',
    preferredHabits: DEFAULT_HABITS.slice(0, 6).map(h => h.habitId),
    currentStreak: 0,
    longestStreak: 0,
    lastCompletionDate: null,
  };
  
  localStorage.setItem(STORAGE_KEYS.USER_DATA, JSON.stringify(defaultUser));
  return defaultUser;
}

export function saveUserData(userData: User): void {
  if (typeof window !== 'undefined') {
    localStorage.setItem(STORAGE_KEYS.USER_DATA, JSON.stringify(userData));
  }
}

export function getDailyHabits(): DailyHabit[] {
  if (typeof window === 'undefined') return [];
  
  const stored = localStorage.getItem(STORAGE_KEYS.DAILY_HABITS);
  const lastSpinDate = localStorage.getItem(STORAGE_KEYS.LAST_SPIN_DATE);
  
  // If it's a new day or no habits stored, generate new ones
  if (!stored || !lastSpinDate || !isToday(lastSpinDate)) {
    return [];
  }
  
  return JSON.parse(stored);
}

export function saveDailyHabits(habits: DailyHabit[]): void {
  if (typeof window !== 'undefined') {
    localStorage.setItem(STORAGE_KEYS.DAILY_HABITS, JSON.stringify(habits));
    localStorage.setItem(STORAGE_KEYS.LAST_SPIN_DATE, getTodayString());
  }
}

export function generateDailyHabits(preferredHabitIds: string[]): DailyHabit[] {
  const preferredHabits = DEFAULT_HABITS.filter(h => preferredHabitIds.includes(h.habitId));
  const selectedHabits = getRandomHabits(preferredHabits, 3);
  
  return selectedHabits.map(habit => ({
    habit,
    isCompleted: false,
  }));
}
