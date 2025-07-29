/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'sans': ['Inter', 'system-ui', 'sans-serif'],
        'display': ['Inter', 'system-ui', 'sans-serif'],
      },
      colors: {
        // Monochromatic color scheme
        background: '#000000',
        surface: '#111111',
        primary: '#ffffff',
        secondary: '#888888',
        accent: '#ffffff',
        muted: '#333333',
        border: '#222222',
      },
      animation: {
        'fade-in': 'fadeIn 0.6s cubic-bezier(0.4, 0, 0.2) forwards',
        'slide-up': 'slideUp 0.6s cubic-bezier(0.4, 0, 0.2) forwards',
        'scale-in': 'scaleIn 0.4s cubic-bezier(0.4, 0, 0.2) forwards',
        'float': 'float 4s ease-in-out infinite',
        'glow': 'glow 3s ease-in-out infinite alternate',
        'text-outline': 'textOutline 0.3s cubic-bezier(0.4, 0, 0.2) forwards',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.95)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        float: {
          '0%, 10%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        glow: {
          '0%': { boxShadow: '0 0 20px rgba(255, 107, 53, 0.3)' },
          '100%': { boxShadow: '0 0 40px rgba(255, 107, 53, 0.6)' },
        },
        textOutline: {
          '0%': {
            color: 'rgba(255, 1, 0.1)',
            textShadow: 'none'
          },
          '100%': {
            color: 'transparent',
            textShadow: `
              -100px 100px 0px rgba(255, 255, 255, 0.1),
              100px -100px 0px rgba(255, 255, 255, 0.1),
              -100px -100px 0px rgba(255, 255, 255, 0.1),
              100px 100px 0px rgba(255, 255, 255, 0.1)
            `
          },
        },
      },
      fontSize: {
        '9xl': ['8rem', { lineHeight: '0.8' }],
        '10xl': ['10rem', { lineHeight: '0.8' }],
        '11xl': ['12rem', { lineHeight: '0.8' }],
        '12xl': ['14rem', { lineHeight: '0.8' }],
      },
      backdropBlur: {
        xs: '2px',
      },
      // Performance optimizations
      transitionTimingFunction: {
        smooth: 'cubic-bezier(0.4, 0, 0.2, 1)',
      },
    },
  },
  plugins: [],
} 