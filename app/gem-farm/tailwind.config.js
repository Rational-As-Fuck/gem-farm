module.exports = {
  purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      screens: {
        w700: '700px',
        w650: '650px',
        w600: '600px',
        w550: '550px',
        w500: '500px',
        w450: '450px',
        w400: '400px',
        w350: '350px',
        w300: '300px',
      },
      colors: {
        rb: {
          yellow: 'rgb(242,196,10)',
          green: 'rgb(0,255,0)',
          blue: 'rgb(0,255,255)',
          pink: 'rgb(255,0,255)',
          dark: '#21252A',
        },
        rarity: {
          legendary: '#fda219',
          epic: '#d261ff',
          rare: '#5cc2fc',
          uncommon: '#63fa4c',
          common: '#d7d7d7',
        },
        solana: {
          verylightgreen: '#dcf2ea',
          lightgreen: '#7fe8c1',
          green: '#01f39d',
          darkgreen: '#015e3a',
          verydarkgreen: '#002b1b',

          verylightblue: '#d7e0ef',
          lightblue: '#91ade0',
          blue: '#3764BB',
          darkblue: '#274682',
          verydarkblue: '#1c325b',

          verylightpink: '#efceec',
          lightpink: '#e0a6da',
          pink: '#FE47ED',
          darkpink: '#b733aa',
          verydarkpink: '#601b59',

          verylightpurple: '#e5d5f2',
          lightpurple: '#c08fe8',
          purple: '#9c22fb',
          darkpurple: '#6e19b5',
          verydarkpurple: '#3b105e',
        },
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
  variants: {
    extend: {
      backgroundColor: ['checked'],
      borderColor: ['checked'],
    },
  },
  plugins: [],
};
