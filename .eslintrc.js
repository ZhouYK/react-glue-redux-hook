module.exports = {
  "parser": "babel-eslint",
  "parserOptions": {
    "ecmaVersion": 8,
    "ecmaFeatures": {
      "experimentalObjectRestSpread": true,
      "jsx": true
    },
    "sourceType": "module"
  },
  "settings": {
    "import/resolver": {
      "node": {
        "extensions": [
          ".js",
          ".jsx",
          ".ts",
          ".tsx",
          ".json"
        ]
      }
    }
  },
  "env": {
    "es6": true,
    "node": true,
    "jest": true
  },

  "plugins": [
    "react",
    "import",
    "react-hooks"
  ],

  "globals": {
    "document": false,
    "navigator": false,
    "window": false,
    "Image": true,
    "JSX": true,
  },

  "rules": {
    "react-hooks/rules-of-hooks": "error",
    "react-hooks/exhaustive-deps": "warn",
    "import/no-dynamic-require": 0,
    "import/no-named-as-default": 0,
    "import/no-extraneous-dependencies": 0,
    "import/no-mutable-exports": 0,
    "import/prefer-default-export": ["warn"],
    "react/jsx-filename-extension": ["warn", {"extensions": [".js", ".jsx", ".tsx"]}],
    "react/forbid-prop-types": ["error", {
      forbid: [],
      checkContextTypes: true,
      checkChildContextTypes: true,
    }],
    "react/destructuring-assignment": "warn",
    "global-require": 0,
    "react/sort-comp": 0,
    "no-param-reassign": 0
  },
  "extends": "airbnb",
}