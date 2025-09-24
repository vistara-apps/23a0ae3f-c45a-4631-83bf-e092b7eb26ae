import { Habit } from './types';

export const DEFAULT_HABITS: Habit[] = [
  {
    habitId: 'drink-water',
    name: 'Drink water',
    category: 'health',
    icon: '💧',
    color: 'bg-blue-200',
  },
  {
    habitId: 'gratitude',
    name: 'Gratitude',
    category: 'mindfulness',
    icon: '🙏',
    color: 'bg-green-200',
  },
  {
    habitId: 'stretch',
    name: 'Stretch',
    category: 'fitness',
    icon: '🧘',
    color: 'bg-purple-200',
  },
  {
    habitId: 'read',
    name: 'Read',
    category: 'learning',
    icon: '📚',
    color: 'bg-yellow-200',
  },
  {
    habitId: 'meditate',
    name: 'Meditate',
    category: 'mindfulness',
    icon: '🧠',
    color: 'bg-indigo-200',
  },
  {
    habitId: 'walk',
    name: 'Take a walk',
    category: 'fitness',
    icon: '🚶',
    color: 'bg-orange-200',
  },
  {
    habitId: 'journal',
    name: 'Journal',
    category: 'mindfulness',
    icon: '✍️',
    color: 'bg-pink-200',
  },
  {
    habitId: 'exercise',
    name: 'Exercise',
    category: 'fitness',
    icon: '💪',
    color: 'bg-red-200',
  },
];

export const STORAGE_KEYS = {
  USER_DATA: 'habitflow_user_data',
  DAILY_HABITS: 'habitflow_daily_habits',
  LAST_SPIN_DATE: 'habitflow_last_spin_date',
} as const;
