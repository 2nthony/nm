# <%= name %>

> <%= description %>

Please consider starring the project to show your ❤️ and support.

<% if (badges.includes('npm-version')) { -%>
[![NPM version](https://badgen.net/npm/v/<%= name %>?icon=npm)](https://npmjs.com/package/<%= name %>)
<% } -%>
<% if (badges.includes('npm-download')) { -%>
[![NPM download](https://badgen.net/npm/dm/<%= name %>?icon=npm)](https://npmjs.com/package/<%= name %>)
<% } -%>
<% if (badges.includes('circleci')) { -%>
[![CircleCI](https://badgen.net/circleci/github/evillt/<%= name %>?icon=circleci)](https://circleci.com/gh/evillt/<%= name %>/tree/master)
<% } -%>
<% if (badges.includes('license')) { -%>
[![License](https://badgen.net/npm/license/<%= name %>)](./LICENSE)
<% } -%>
<% if (badges.includes('patreon')) { -%>
[![donate](https://badgen.net/badge/support%20me/donate/f2a)](https://patreon.com/<%= patreon %>)
<% } -%>

## Contributing

1. Fork it!
2. Create your feature branch: `git checkout -b my-new-feature`
3. Commit your changes: `git commit -am 'Add some feature'`
4. Push to the branch: `git push origin my-new-feature`
5. Submit a pull request :D

## Author

**<%= name %>** © [<%= author %>](https://github.com/<%= username %>), Released under the [MIT](./LICENSE) License.

Authored and maintained by **<%= author.toUpperCase() %>** with help from contributors ([list](https://github.com/<%= username %>/<%= name %>/contributors)).

> [<%= website.replace(/^https?:\/\//, '') %>](<%= website %>) · GitHub [@<%= author %>](https://github.com/<%= username %>)<% if (twitter) { %> · Twitter [@<%= twitter %>](https://twitter.com/<%= twitter %>)<% } %>
