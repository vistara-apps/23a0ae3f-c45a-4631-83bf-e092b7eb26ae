export interface User {
  userId: string;
  preferredHabits: string[];
  currentStreak: number;
  longestStreak: number;
  lastCompletionDate: string | null;
}

export interface Habit {
  habitId: string;
  name: string;
  category: string;
  icon: string;
  color: string;
}

export interface HabitLog {
  logId: string;
  userId: string;
  habitId: string;
  completionDate: string;
  isCompleted: boolean;
}

export interface DailyHabit {
  habit: Habit;
  isCompleted: boolean;
  completedAt?: string;
}
