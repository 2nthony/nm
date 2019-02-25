const when = (condition, value, fallback) => (condition ? value : fallback)

module.exports = (
  {
    name,
    description,
    username,
    email,
    eslint,
    website
  }
) => {
  const useLinter = eslint !== 'disable'
  const useXo = eslint === 'xo'
  const useStandard = eslint === 'standard'

  return {
    name,
    description,
    version: '0.0.0',
    license: 'MIT',
    repository: {
      type: 'git',
      url: `${username}/${name}`
    },
    author: `${username} <${email}> (${website})`,
    main: 'index.js',
    scripts: {
      lint: when(useLinter, eslint)
    },
    dependencies: {},
    devDependencies: {
      xo: when(useXo, '^0.23.0'),
      'eslint-config-rem': when(useXo, '^4.0.0'),
      prettier: when(useLinter, '^1.15.2'),
      'eslint-config-prettier': when(useXo, '^3.3.0'),
      'eslint-plugin-prettier': when(useXo, '^3.0.0'),
      standard: when(useStandard, '^12.0.0'),
      'lint-staged': '^7.2.0',
      husky: '^1.0.0-rc.13'
    },
    xo: when(useXo, {
      extends: ['rem', 'plugin:prettier/recommended']
    }),
    husky: {
      hooks: {
        'pre-commit': 'lint-staged'
      }
    },
    'lint-staged': {
      '*.js': when(useLinter, [`${eslint} --fix`, 'git add']),
      [when(useLinter, '*.{json,md}', '*.{js,json,md}')]: [
        'prettier --write',
        'git add'
      ]
    }
  }
}
