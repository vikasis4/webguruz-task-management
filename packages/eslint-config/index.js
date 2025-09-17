// packages/eslint-config/index.js
// This is the CommonJS entry point
const { Linter } = require("eslint");
const { rules } = require("./base.js"); // Assuming base.js is your actual config

module.exports = {
  rules: rules,
};
