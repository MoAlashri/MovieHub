/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        background: "#0D0D0D", // خلفية أساسية (أسود سينمائي)
        surface: "#1A1A1A", // كروت/سيكشن رمادي غامق
        primary: "#E50914", // أحمر Netflix
        secondary: "#F5C518", // أصفر IMDb (للهايلايت أو التقييم)
        accent: "#6C63FF", // بنفسجي عصري
        text: {
          primary: "#FFFFFF", // نص أبيض
          secondary: "#B3B3B3", // نص رمادي
        },
        rating: {
          good: "#21D07A", // تقييم عالي
          medium: "#D2D531", // متوسط
          bad: "#DB2360", // ضعيف
        },
      },
      fontFamily: {
        vibes: ["'Great Vibes'", "cursive"],
      },
    },
  },
  plugins: [],
};
