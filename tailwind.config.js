/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },

    extend: {
      colors: {
        nubytesPrimary: "#2196F3",
        nubytesSecondary: "#0000fe",
        brightRed: "rgb(251, 184, 169)",
      },
      boxShadow: {
        navShadow: "0px 2px 28px 0px rgba(0, 0, 0, 0.06)",
        cardShadowImg: "rgba(26, 137, 185, 0.1) 0px 4px 20px",
        cardShadow: "rgba(26, 137, 185, 0.07) 0px 6px 20px",
      },
      keyframes: {
        "accordion-down": {
          from: { height: 0 },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: 0 },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};