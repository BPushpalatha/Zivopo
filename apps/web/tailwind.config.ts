import type { Config } from 'tailwindcss';

export default {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        navy: '#071A2F',
        gold: '#D4AF37',
        cream: '#F7F3E8',
        charcoal: '#121212',
      },
    },
  },
  plugins: [],
} satisfies Config;
