/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Light Mode Colors
        'light-bg': '#F8F9FA',
        'light-surface': '#FFFFFF',
        'light-text-primary': '#212529',
        'light-text-secondary': '#6C757D',
        'light-accent': '#6A44E5',
        'light-user-bubble': '#E9ECEF',

        // Dark Mode Colors
        'dark-bg': '#121218',
        'dark-surface': '#1A1A22',
        'dark-text-primary': '#F8F9FA',
        'dark-text-secondary': '#A9B1BD',
        'dark-accent': '#7F5AF0',
        'dark-ai-bubble': '#2A2A3A',
      }
    },
  },
  plugins: [],
}