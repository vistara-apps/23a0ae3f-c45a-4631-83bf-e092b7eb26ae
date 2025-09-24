'use client';

import { useState } from 'react';
import { DEFAULT_HABITS } from '../lib/constants';

interface HabitCustomizerProps {
  currentHabits: string[];
  onSave: (selectedHabits: string[]) => void;
  onCancel: () => void;
}

export function HabitCustomizer({ currentHabits, onSave, onCancel }: HabitCustomizerProps) {
  const [selectedHabits, setSelectedHabits] = useState<string[]>(currentHabits);

  const toggleHabit = (habitId: string) => {
    setSelectedHabits(prev => {
      if (prev.includes(habitId)) {
        return prev.filter(id => id !== habitId);
      } else if (prev.length < 8) { // Limit to 8 habits
        return [...prev, habitId];
      }
      return prev;
    });
  };

  const handleSave = () => {
    if (selectedHabits.length >= 3) {
      onSave(selectedHabits);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-sm mx-auto px-4 py-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={onCancel}
            className="text-muted-foreground hover:text-foreground transition-colors duration-200"
          >
            ← Back
          </button>
          <h1 className="text-lg font-bold text-foreground">Customize Habits</h1>
          <button
            onClick={handleSave}
            disabled={selectedHabits.length < 3}
            className={`px-4 py-2 rounded-lg font-medium transition-colors duration-200 ${
              selectedHabits.length >= 3
                ? 'bg-primary text-white hover:bg-primary/90'
                : 'bg-muted text-muted-foreground cursor-not-allowed'
            }`}
          >
            Save
          </button>
        </div>

        {/* Instructions */}
        <div className="mb-6 p-4 bg-surface rounded-lg shadow-card">
          <p className="text-sm text-muted-foreground">
            Select at least 3 habits for your daily wheel. You can choose up to 8 habits.
          </p>
          <p className="text-xs text-muted-foreground mt-2">
            Selected: {selectedHabits.length}/8
          </p>
        </div>

        {/* Habit Categories */}
        <div className="space-y-6">
          {['health', 'fitness', 'mindfulness', 'learning'].map(category => {
            const categoryHabits = DEFAULT_HABITS.filter(h => h.category === category);
            
            return (
              <div key={category}>
                <h3 className="text-sm font-medium text-foreground mb-3 capitalize">
                  {category}
                </h3>
                <div className="space-y-2">
                  {categoryHabits.map(habit => (
                    <button
                      key={habit.habitId}
                      onClick={() => toggleHabit(habit.habitId)}
                      className={`habit-option w-full ${
                        selectedHabits.includes(habit.habitId) ? 'selected' : ''
                      }`}
                    >
                      <div className="flex items-center space-x-3">
                        <span className="text-2xl">{habit.icon}</span>
                        <span className="font-medium text-foreground">{habit.name}</span>
                      </div>
                      <div className={`w-5 h-5 rounded border-2 flex items-center justify-center ${
                        selectedHabits.includes(habit.habitId)
                          ? 'bg-primary border-primary text-white'
                          : 'border-muted-foreground'
                      }`}>
                        {selectedHabits.includes(habit.habitId) && (
                          <span className="text-xs">✓</span>
                        )}
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
