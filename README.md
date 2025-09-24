# HabitFlow - Base MiniApp

A Base MiniApp that provides users with a randomized daily habit suggestion to foster consistency and track progress.

## Features

- **Daily Habit Spinner**: Get 3 randomized habits each day from your personalized selection
- **Customizable Habit Wheel**: Choose from 8 different habit categories (health, fitness, mindfulness, learning)
- **Streak Tracking**: Visual progress tracking with current and longest streaks
- **Base MiniApp Integration**: Seamless integration with Base App and Farcaster

## Getting Started

1. Install dependencies:
```bash
npm install
```

2. Set up environment variables:
```bash
cp .env.local.example .env.local
```
Add your OnchainKit API key to `.env.local`

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Tech Stack

- **Framework**: Next.js 15 with App Router
- **Styling**: Tailwind CSS
- **Base Integration**: MiniKit SDK
- **Blockchain**: OnchainKit for Base integration
- **Storage**: Local Storage for user data and habits

## Project Structure

```
├── app/                 # Next.js App Router pages
├── components/          # React components
├── lib/                # Utilities and types
├── public/             # Static assets
└── README.md
```

## Key Components

- **AppShell**: Main application container
- **HabitWheel**: Interactive spinning wheel for habit selection
- **StreakCounter**: Progress tracking display
- **HabitCustomizer**: Habit selection and customization
- **UserProfile**: User information display

## Deployment

This app is designed to be deployed as a Base MiniApp. Make sure to:

1. Update the manifest.json with your actual domain
2. Set up proper environment variables
3. Configure your OnchainKit API key
4. Test in Base App environment

## License

MIT License
