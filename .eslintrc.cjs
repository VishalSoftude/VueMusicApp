/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution')

module.exports = {
  root: true,   //we can specify an root configuration file by setting this property true
  'extends': [ //here we are applying rules
    'plugin:vue/vue3-essential', //for checking the code quality of vue components
    'eslint:recommended', // these rows are recomended 
    '@vue/eslint-config-prettier/skip-formatting' // this is for not to conflict with pretier
  ],
  overrides: [ // sometimes we may not want to apply the same rows to our files we can use special rows for specific file by adding this array
    {
      files: [   
        'cypress/e2e/**/*.{cy,spec}.{js,ts,jsx,tsx}'
      ],
      'extends': [
        'plugin:cypress/recommended'
      ]
    }
  ],
  parserOptions: {
    ecmaVersion: 'latest'
  }
}
