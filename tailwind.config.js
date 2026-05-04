/*
 파일명 : tailwind.config.js
 작성일 : 2026-05-04
 작성자 : 김호성
 수정내역 : 초기등록
*/
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./App.{js,jsx,ts,tsx}', './src/**/*.{js,jsx,ts,tsx}'],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      colors: {
        primary: '#FF6B35',
        'primary-light': '#FF8C5A',
        'primary-dark': '#E55A2B',
        cream: '#FFF8F0',
        navy: '#1A1F36',
      },
    },
  },
  plugins: [],
};
