/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        'custom-blue': '#f4faff', // Add your custom color here
        'card-box': 'rgba(230, 241, 250, 0.5)',
      },
    },
  },
  plugins: [require('@tailwindcss/line-clamp')],
};
