/** @type {import("prettier").Config} */
module.exports = {
  plugins: [require.resolve("prettier-plugin-tailwindcss")],
  tabWidth: 2,
  semi: false,
  arrowParens: "always",
  singleQuote: true,
  trailingComma: "all",
  printWidth: 110,
};
