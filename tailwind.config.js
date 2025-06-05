/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
    "./src/app/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        rentio: {
          green: "#00C48C", // Main Rentio green
          dark: "#222B45",  // Rentio dark
          gray: "#F7F9FC",  // Rentio light gray background
          accent: "#009B72", // Accent green
        },
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        xl: "1rem",
        lg: "0.75rem",
      },
      boxShadow: {
        card: "0 2px 8px 0 rgba(34, 43, 69, 0.06)",
      },
    },
  },
  plugins: [],
} 