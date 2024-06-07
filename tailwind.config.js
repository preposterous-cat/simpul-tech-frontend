/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,jsx}",
    "./components/**/*.{js,jsx}",
    "./app/**/*.{js,jsx}",
    "./src/**/*.{js,jsx}",
  ],
  prefix: "",
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
        primary: {
          DEFAULT: "var(--primary)",
          foreground: "var(--primary-foreground)",
          background: "var(--primary-background)",
          text: "var(--primary-text)",
        },
        indicator: {
          orange: "var(--indicator-orange)",
          blue: "var(--indicator-blue)",
          red: "var(--indicator-red)",
          yellow: "var(--indicator-yellow)",
        },
        chats: {
          yellow: "var(--chats-yellow)",
          lightyellow: "var(--chats-lightyellow)",
          purple: "var(--chats-purple)",
          lightpurple: "var(--chats-lightpurple)",
          green: "var(--chats-green)",
          lightgreen: "var(--chats-lightgreen)",
        },
        stickers: {
          one: "var(--stickers-one)",
          two: "var(--stickers-two)",
          three: "var(--stickers-three)",
          four: "var(--stickers-four)",
          five: "var(--stickers-five)",
          six: "var(--stickers-six)",
          seven: "var(--stickers-seven)",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
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
