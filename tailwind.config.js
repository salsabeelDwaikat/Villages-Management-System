// tailwind.config.js
module.exports = {
  content: [
    './src/**/*.{html,js,jsx,ts,tsx}', // Make sure your Tailwind scans your files
  ],
  theme: {
    extend: {
      colors: {
        'background': '#1e1e2f',   // Custom background color
        'text': '#ffffff',         // Custom text color
        'primary': '#76c7c0',      // Custom primary color
        'card-background': '#2c2c3d', // Custom card background color
        'border': '#444',          // Custom border color
      },
    },
  },
  plugins: [],
}
