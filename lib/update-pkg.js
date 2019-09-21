const when = (condition, value, fallback) => (condition ? value : fallback)

module.exports = (
  {
    name,
    description,
    username,
    email,
    eslint,
    compile,
    website
  }
) => {
  const useLinter = eslint !== 'disabled'
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
    main: when(compile, `dist/${name}.cjs.js`, 'index.js'),
    scripts: {
      lint: when(useLinter, eslint),
      prepublishOnly: when(compile, 'npm run build'),
      build: when(compile, 'bili')
    },
    dependencies: {},
    devDependencies: {
      bili: when(compile, '^4.8.1'),
      xo: when(useXo, '^0.24.0'),
      'eslint-config-rem': when(useXo, '^4.0.0'),
      prettier: '^1.18.2',
      'eslint-config-prettier': when(useXo, '^6.3.0'),
      'eslint-plugin-prettier': when(useXo, '^3.1.1'),
      standard: when(useStandard, '^14.3.1'),
      'lint-staged': '^9.2.5',
      husky: '^3.0.5'
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
