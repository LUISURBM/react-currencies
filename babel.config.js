module.exports = {
  "presets": [
    "react-app",
    ['@babel/preset-typescript', {
      onlyRemoveTypeImports: true,
  }]
  ],
  "plugins": [
    "@babel/plugin-proposal-class-properties",
    "@babel/plugin-proposal-optional-chaining"
  ]
};