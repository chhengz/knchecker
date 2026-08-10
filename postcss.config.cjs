let tailwindPlugin
try {
  tailwindPlugin = require('@tailwindcss/postcss')
} catch (e) {
  tailwindPlugin = require('tailwindcss')
}

module.exports = {
  plugins: [
    tailwindPlugin,
    require('autoprefixer'),
  ],
}
