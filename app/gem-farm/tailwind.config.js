module.exports = {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "imso-violet": "rgba(188,75,188,0.5)",
        "imso-violet-hover": "rgba(188,75,188,0.8)",
        "imso-yellow": "rgba(234,232,74)",
        "imso-greena": "rgba(91,234,189,0.5)",
        "imso-greenb": "rgba(91,234,189,0.8)",
        "imso-blue": "rgba(0,208,255,0.7)",
        "imso-bg-blue": "rgba(0,208,255,0.4)",
        "imso-bg-gray": "rgba(80,180,180,0.2)",
      },
      fontSize: {
        xxs: ".5rem",
      },
    },
  },
  plugins: [],
};