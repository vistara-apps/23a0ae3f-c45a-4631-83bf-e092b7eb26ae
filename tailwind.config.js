/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: 'hsl(220, 20%, 95%)',
        foreground: 'hsl(220, 20%, 30%)',
        accent: 'hsl(120, 80%, 50%)',
        primary: 'hsl(240, 80%, 50%)',
        surface: 'hsl(0, 0%, 100%)',
        muted: 'hsl(220, 20%, 85%)',
        'muted-foreground': 'hsl(220, 20%, 50%)',
      },
      borderRadius: {
        lg: '16px',
        md: '12px',
        sm: '8px',
      },
      spacing: {
        lg: '24px',
        md: '16px',
        sm: '8px',
      },
      boxShadow: {
        card: '0 4px 12px hsla(0, 0%, 0%, 0.08)',
      },
      animation: {
        'spin-slow': 'spin 3s ease-out',
        'bounce-gentle': 'bounce 1s ease-in-out 3',
      },
    },
  },
  plugins: [],
}
