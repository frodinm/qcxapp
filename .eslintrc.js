module.exports = {
  root: true,
  env: {
    es6: true,
    jest: true,
    browser: true,
    node: true,
    "react-native/react-native": true
  },
  globals: {
    React: true
  },
  ecmaFeatures: {
    modules: true,
    spread: true,
    restParams: true
  },
  parserOptions: {
    ecmaVersion: 2017,
    ecmaFeatures: {
      experimentalObjectRestSpread: true,
      jsx: true,
    },
    sourceType: "module"
  },
  // https://github.com/feross/standard/blob/master/RULES.md#javascript-standard-style
  extends: ["eslint:recommended", "plugin:react/recommended"],
  // required to lint *.vue files
  plugins: [
    "react",
    "react-native"
  ],
  // add your custom rules here
  'rules': {
    // allow paren-less arrow functions
    'arrow-parens': 0,
    // allow async-await
    'generator-star-spacing': 0,
    //keep syntax uniform
    "semi": ["error", "always"],

    'react/prop-types': 0,
    'react/jsx-key': 0,

    // allow console during development
    'no-console': process.env.NODE_ENV === 'production' ? 2 : 0,
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0,
    "react-native/no-unused-styles": 2,
    "react-native/split-platform-components": 2,
    "no-undef": 0
  }
}