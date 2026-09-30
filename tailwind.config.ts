import type { Config } from 'tailwindcss';

export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#064E3B',
          dark: '#0B0F17',
          light: '#FAFAF9',
        },
        accent: {
          DEFAULT: '#B7E84B',
          hover: '#a3d438',
        },
        secondary: '#8FA98F',
        tertiary: '#C3D5BE',
        text: {
          primary: '#1E3A2B',
          muted: '#4A584E',
        },
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
      animation: {
        'float-phone': 'floatPhone 6s ease-in-out infinite',
        'float-cap': 'floatCap 5.2s ease-in-out infinite',
        'float-ball': 'floatBall 6.8s ease-in-out infinite',
        'float-sneaker': 'floatSneaker 5.8s ease-in-out infinite',
        'float-headphones': 'floatHeadphones 6.4s ease-in-out infinite',
        'float-card-1': 'floatCard1 4.8s ease-in-out infinite',
        'float-card-2': 'floatCard2 6.2s ease-in-out infinite',
        'float-card-3': 'floatCard3 5.5s ease-in-out infinite',
        'float-sphere': 'floatSphere 4.5s ease-in-out infinite',
        'shadow-pulse': 'shadowPulse 6s ease-in-out infinite',
        'marquee': 'marquee 38s linear infinite',
      },
      keyframes: {
        floatPhone: {
          '0%, 100%': { transform: 'translateY(0px) rotate(-1.5deg)' },
          '50%': { transform: 'translateY(-14px) rotate(-0.5deg)' },
        },
        floatCap: {
          '0%, 100%': { transform: 'translateY(0px) rotate(8deg)' },
          '50%': { transform: 'translateY(-20px) rotate(11deg)' },
        },
        floatBall: {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '50%': { transform: 'translateY(-16px) rotate(4deg)' },
        },
        floatSneaker: {
          '0%, 100%': { transform: 'translateY(0px) rotate(-4deg)' },
          '50%': { transform: 'translateY(-18px) rotate(-2deg)' },
        },
        floatHeadphones: {
          '0%, 100%': { transform: 'translateY(0px) rotate(6deg)' },
          '50%': { transform: 'translateY(-16px) rotate(2deg)' },
        },
        floatCard1: {
          '0%, 100%': { transform: 'translateY(0px) rotate(2deg)' },
          '50%': { transform: 'translateY(-12px) rotate(4deg)' },
        },
        floatCard2: {
          '0%, 100%': { transform: 'translateY(0px) rotate(-3deg)' },
          '50%': { transform: 'translateY(-15px) rotate(-1deg)' },
        },
        floatCard3: {
          '0%, 100%': { transform: 'translateY(0px) rotate(5deg)' },
          '50%': { transform: 'translateY(-10px) rotate(7deg)' },
        },
        floatSphere: {
          '0%, 100%': { transform: 'translateY(0px) scale(1)' },
          '50%': { transform: 'translateY(-10px) scale(1.05)' },
        },
        shadowPulse: {
          '0%, 100%': { transform: 'scale(1)', opacity: '0.32' },
          '50%': { transform: 'scale(0.92)', opacity: '0.18' },
        },
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      },
    },
  },
  plugins: [],
} satisfies Config;
