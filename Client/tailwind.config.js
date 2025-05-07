// /** @type {import('tailwindcss').Config} */
// module.exports = {
//   content: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
//   theme: {
//     extend: {
//       backgroundImage: {
//         'radial-gradient': 'radial-gradient(circle, var(--tw-gradient-stops))',
//       },
//     },
//   },
//   plugins: [],
// };
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        'neon-blue': '#00f3ff',
        'neon-purple': '#bc13fe',
        'neon-pink': '#ff00ff',
        'neon-green': '#39ff14',
        'glass': 'rgba(255, 255, 255, 0.1)',
        'glass-dark': 'rgba(0, 0, 0, 0.2)',
      },
      boxShadow: {
        'neon': '0 0 5px theme(colors.neon-blue), 0 0 20px theme(colors.neon-blue)',
        'neon-purple': '0 0 5px theme(colors.neon-purple), 0 0 20px theme(colors.neon-purple)',
        'neon-pink': '0 0 5px theme(colors.neon-pink), 0 0 20px theme(colors.neon-pink)',
        'neon-green': '0 0 5px theme(colors.neon-green), 0 0 20px theme(colors.neon-green)',
        'glow': '0 0 15px rgba(255, 255, 255, 0.5)',
      },
      backdropBlur: {
        'glass': 'blur(10px)',
      },
      keyframes: {
        slideInLeft: {
          '0%': { transform: 'translateX(-100%)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slidein: {
          from: {
            opacity: "0",
            transform: "translateY(-10px)",
          },
          to: {
            opacity: "1",
            transform: "translateY(0)",
          },
        },
        pulse: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.5' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        glow: {
          '0%, 100%': { boxShadow: '0 0 5px theme(colors.neon-blue), 0 0 20px theme(colors.neon-blue)' },
          '50%': { boxShadow: '0 0 10px theme(colors.neon-blue), 0 0 30px theme(colors.neon-blue)' },
        },
      },
      animation: {
        slidein: "slidein 1s ease 300ms",
        fadeIn: 'fadeIn 1s ease-out',
        'slide-in-left': 'slideInLeft 1s ease-out',
        pulse: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        float: 'float 3s ease-in-out infinite',
        glow: 'glow 2s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};