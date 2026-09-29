const path = require('node:path');
const tailwindcss = require('tailwindcss');

module.exports = {
  plugins: [tailwindcss(path.resolve(__dirname, '../../tailwind.config.js'))],
};
