/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        background: "#0D0D0D",
        surface: "#1A1A1A",
        primary: "#E50914",
        secondary: "#F5C518",
        accent: "#6C63FF",
        text: {
          primary: "#FFFFFF",
          secondary: "#B3B3B3",
        },
        rating: {
          good: "#21D07A",
          medium: "#D2D531",
          bad: "#DB2360",
        },
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
        vibes: ["'Great Vibes'", "cursive"],
      },
      animation: {
        shimmer: "shimmer 2s linear infinite",
      },
      keyframes: {
        shimmer: {
          to: { backgroundPosition: "200% center" },
        },
      },
    },
  },
  plugins: [],
};
