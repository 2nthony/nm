const superb = require('superb')

module.exports = {
  prompts() {
    return [
      {
        name: 'name',
        message: 'What is the name of the new project',
        default: this.outFolder
      },
      {
        name: 'description',
        message: 'How would you describe the new project',
        default: `My ${superb.random()} project`
      },
      {
        name: 'author',
        message: 'What is your name',
        default: this.gitUser.username || this.gitUser.name,
        store: true,
        required: true
      },
      {
        name: 'username',
        message: 'What is your GitHub username',
        default: ({ author }) => author.toLowerCase(),
        store: true
      },
      {
        name: 'email',
        message: 'What is your GitHub email',
        default: this.gitUser.email,
        store: true,
        validate: v => /.+@.+/.test(v)
      },
      {
        name: 'website',
        message: 'What is the url of your website',
        default: ({ username }) => `https://github.com/${username}`,
        store: true
      },
      {
        name: 'eslint',
        message: 'Choose a ESLint tool',
        type: 'list',
        default: 'xo',
        choices: ['xo', 'standard', 'disabled']
      },
      {
        name: 'compile',
        message: 'Do you need to compile ES2015 code',
        type: 'confirm',
        default: false
      },
      {
        name: 'badges',
        message: 'Choose the badge you wanna show in README.md',
        type: 'checkbox',
        default: [
          'npm-version',
          'npm-download',
          'circleci',
          'license',
          'patreon'
        ],
        choices: [
          {
            name: 'NPM version',
            value: 'npm-version'
          },
          {
            name: 'NPM download',
            value: 'npm-download'
          },
          {
            name: 'CircleCI',
            value: 'circleci'
          },
          {
            name: 'License',
            value: 'license'
          },
          {
            name: 'Patreon',
            value: 'patreon'
          }
        ]
      },
      {
        name: 'patreon',
        message: 'What is your Patreon username',
        default: ({ username }) => username,
        store: true,
        when: ({ badges }) => badges.includes('patreon')
      },
      {
        name: 'twitter',
        message: 'What is your Twitter username',
        store: true
      }
    ]
  },
  actions() {
    return [
      {
        type: 'add',
        files: '**',
        filters: {
          'src/**': 'compile',
          'index.js': '!compile'
        }
      },
      {
        type: 'move',
        patterns: {
          _gitignore: '.gitignore'
        }
      },
      {
        type: 'modify',
        files: 'package.json',
        handler: data => require('./lib/update-pkg')(this.answers, data)
      }
    ]
  },
  async completed() {
    await this.gitInit()
    await this.npmInstall()
    this.showProjectTips()
  }
}
