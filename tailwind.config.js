import daisyui from "daisyui";
/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./index.html"],
  daisyui: {
    themes: [
      {
        light: {
          colorScheme: "light",

          primary: "#07231A",

          secondary: "#40B68F",

          accent: "#DCF9F0",

          neutral: "#3A4455",

          baseContent: "#758095",

          info: "#578FC7",

          success: "#1C875B",

          warning: "#F0C505",

          error: "#D90812",
        },
      },
    ], // true: all themes | false: only light + dark | array: specific themes like this ["light", "dark", "cupcake"]
  },
  plugins: [daisyui],
};
