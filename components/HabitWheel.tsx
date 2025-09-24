'use client';

import { useState } from 'react';
import { DailyHabit } from '../lib/types';

interface HabitWheelProps {
  habits: DailyHabit[];
  onHabitComplete: (habitId: string) => void;
  onSpin: () => void;
}

export function HabitWheel({ habits, onHabitComplete, onSpin }: HabitWheelProps) {
  const [isSpinning, setIsSpinning] = useState(false);
  const [selectedHabit, setSelectedHabit] = useState<string | null>(null);

  const handleSpin = () => {
    if (isSpinning) return;
    
    setIsSpinning(true);
    setSelectedHabit(null);
    
    // Simulate spinning animation
    setTimeout(() => {
      const randomHabit = habits[Math.floor(Math.random() * habits.length)];
      setSelectedHabit(randomHabit.habit.habitId);
      setIsSpinning(false);
      onSpin();
    }, 3000);
  };

  const handleHabitClick = (habitId: string) => {
    const habit = habits.find(h => h.habit.habitId === habitId);
    if (habit && !habit.isCompleted) {
      onHabitComplete(habitId);
    }
  };

  return (
    <div className="habit-wheel">
      {/* Wheel segments */}
      <div className={`relative w-64 h-64 mx-auto ${isSpinning ? 'spinning' : ''}`}>
        {habits.map((dailyHabit, index) => {
          const angle = (360 / habits.length) * index;
          const isSelected = selectedHabit === dailyHabit.habit.habitId;
          
          return (
            <div
              key={dailyHabit.habit.habitId}
              className={`habit-segment ${dailyHabit.habit.color} ${isSelected ? 'active' : ''}`}
              style={{
                transform: `rotate(${angle}deg)`,
                clipPath: `polygon(50% 50%, 50% 0%, ${50 + 50 * Math.cos((360 / habits.length) * Math.PI / 180)}% ${50 - 50 * Math.sin((360 / habits.length) * Math.PI / 180)}%)`,
              }}
              onClick={() => handleHabitClick(dailyHabit.habit.habitId)}
            >
              <div
                className="absolute inset-0 flex items-center justify-center"
                style={{
                  transform: `rotate(${-angle}deg)`,
                }}
              >
                <div className="text-center">
                  <div className="text-2xl mb-1">{dailyHabit.habit.icon}</div>
                  {dailyHabit.isCompleted && (
                    <div className="text-green-600 text-sm">✓</div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
        
        {/* Center spinner button */}
        <button
          className="spinner-button"
          onClick={handleSpin}
          disabled={isSpinning}
          aria-label="Spin the wheel"
        >
          <div className={`text-2xl transition-transform duration-200 ${isSpinning ? 'animate-spin' : ''}`}>
            ▶️
          </div>
        </button>
      </div>
      
      {/* Wheel pointer */}
      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-2">
        <div className="w-0 h-0 border-l-4 border-r-4 border-b-8 border-l-transparent border-r-transparent border-b-primary"></div>
      </div>
    </div>
  );
}
