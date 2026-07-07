import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: [
    "./index.html",
    "./src/main.tsx",
    "./src/App.tsx",
    "./src/pages/**/*.{ts,tsx}",
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
      fontFamily: {
        sans: ["IBM Plex Sans", "sans-serif"],
        body: ["IBM Plex Sans", "sans-serif"],
        label: ["Archivo Black", "sans-serif"],
        headline: ["Archivo Black", "sans-serif"],
        display: ["Archivo Black", "sans-serif"],
      },
      colors: {
        // Tokens legados ainda em uso real (ver CLAUDE.md / TASKS_IMPROVEMENTS.md ARQ-3)
        border: "hsl(var(--border))",
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        primary: "var(--primary)",
        secondary: "var(--secondary)",
        background: "var(--background)",
        "on-surface-variant": "var(--on-surface-variant)",

        // Paleta de marca Cognull — única fonte de verdade para as cores
        // hex que antes apareciam soltas (arbitrary values) em Index.tsx/Formulario.tsx.
        brand: {
          DEFAULT: "#3DFF2A",
          light: "#E9FFE6",
        },
        teal: {
          950: "#0D2F2F",
          900: "#0B3F3F",
          800: "#174A4A",
          700: "#1f4f4f",
          600: "#305C5C",
          500: "#336565",
        },
        "avatar-start": "#49d86a",
        "avatar-end": "#2fa14d",
        "success-bg": "#113f2f",
        "success-text": "#d7ffe8",
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
        "fade-in-up": {
          "0%": { opacity: "0", transform: "translateY(30px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        "scale-in": {
          "0%": { opacity: "0", transform: "scale(0.9)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
        "slide-in-left": {
          "0%": { opacity: "0", transform: "translateX(-50px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
        "slide-in-right": {
          "0%": { opacity: "0", transform: "translateX(50px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-20px)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "fade-in-up": "fade-in-up 0.6s ease-out forwards",
        "fade-in": "fade-in 0.5s ease-out forwards",
        "scale-in": "scale-in 0.5s ease-out forwards",
        "slide-in-left": "slide-in-left 0.6s ease-out forwards",
        "slide-in-right": "slide-in-right 0.6s ease-out forwards",
        float: "float 6s ease-in-out infinite",
        "spin-slow": "spin 12s linear infinite",
        "pulse-slow": "pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
      },
    },
  },
  plugins: [],
} satisfies Config;
