@navidmitchell/monkey-cli
=================

CLI to interact with the Shop Monkey API


[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![Version](https://img.shields.io/npm/v/@navidmitchell/monkey-cli.svg)](https://npmjs.org/package/@navidmitchell/monkey-cli)
[![Downloads/week](https://img.shields.io/npm/dw/@navidmitchell/monkey-cli.svg)](https://npmjs.org/package/@navidmitchell/monkey-cli)


<!-- toc -->
* [Usage](#usage)
* [Commands](#commands)
<!-- tocstop -->
# Usage
<!-- usage -->
```sh-session
$ npm install -g @navidmitchell/monkey-cli
$ monkey COMMAND
running command...
$ monkey (--version)
@navidmitchell/monkey-cli/0.0.0 darwin-arm64 node-v22.13.1
$ monkey --help [COMMAND]
USAGE
  $ monkey COMMAND
...
```
<!-- usagestop -->
# Commands
<!-- commands -->
* [`monkey hello PERSON`](#monkey-hello-person)
* [`monkey hello world`](#monkey-hello-world)
* [`monkey help [COMMAND]`](#monkey-help-command)
* [`monkey plugins`](#monkey-plugins)
* [`monkey plugins add PLUGIN`](#monkey-plugins-add-plugin)
* [`monkey plugins:inspect PLUGIN...`](#monkey-pluginsinspect-plugin)
* [`monkey plugins install PLUGIN`](#monkey-plugins-install-plugin)
* [`monkey plugins link PATH`](#monkey-plugins-link-path)
* [`monkey plugins remove [PLUGIN]`](#monkey-plugins-remove-plugin)
* [`monkey plugins reset`](#monkey-plugins-reset)
* [`monkey plugins uninstall [PLUGIN]`](#monkey-plugins-uninstall-plugin)
* [`monkey plugins unlink [PLUGIN]`](#monkey-plugins-unlink-plugin)
* [`monkey plugins update`](#monkey-plugins-update)

## `monkey hello PERSON`

Say hello

```
USAGE
  $ monkey hello PERSON -f <value>

ARGUMENTS
  PERSON  Person to say hello to

FLAGS
  -f, --from=<value>  (required) Who is saying hello

DESCRIPTION
  Say hello

EXAMPLES
  $ monkey hello friend --from oclif
  hello friend from oclif! (./src/commands/hello/index.ts)
```

_See code: [src/commands/hello/index.ts](https://github.com/navidmitchell/monkey-cli/blob/v0.0.0/src/commands/hello/index.ts)_

## `monkey hello world`

Say hello world

```
USAGE
  $ monkey hello world

DESCRIPTION
  Say hello world

EXAMPLES
  $ monkey hello world
  hello world! (./src/commands/hello/world.ts)
```

_See code: [src/commands/hello/world.ts](https://github.com/navidmitchell/monkey-cli/blob/v0.0.0/src/commands/hello/world.ts)_

## `monkey help [COMMAND]`

Display help for monkey.

```
USAGE
  $ monkey help [COMMAND...] [-n]

ARGUMENTS
  COMMAND...  Command to show help for.

FLAGS
  -n, --nested-commands  Include all nested commands in the output.

DESCRIPTION
  Display help for monkey.
```

_See code: [@oclif/plugin-help](https://github.com/oclif/plugin-help/blob/v6.2.27/src/commands/help.ts)_

## `monkey plugins`

List installed plugins.

```
USAGE
  $ monkey plugins [--json] [--core]

FLAGS
  --core  Show core plugins.

GLOBAL FLAGS
  --json  Format output as json.

DESCRIPTION
  List installed plugins.

EXAMPLES
  $ monkey plugins
```

_See code: [@oclif/plugin-plugins](https://github.com/oclif/plugin-plugins/blob/v5.4.36/src/commands/plugins/index.ts)_

## `monkey plugins add PLUGIN`

Installs a plugin into monkey.

```
USAGE
  $ monkey plugins add PLUGIN... [--json] [-f] [-h] [-s | -v]

ARGUMENTS
  PLUGIN...  Plugin to install.

FLAGS
  -f, --force    Force npm to fetch remote resources even if a local copy exists on disk.
  -h, --help     Show CLI help.
  -s, --silent   Silences npm output.
  -v, --verbose  Show verbose npm output.

GLOBAL FLAGS
  --json  Format output as json.

DESCRIPTION
  Installs a plugin into monkey.

  Uses npm to install plugins.

  Installation of a user-installed plugin will override a core plugin.

  Use the MONKEY_NPM_LOG_LEVEL environment variable to set the npm loglevel.
  Use the MONKEY_NPM_REGISTRY environment variable to set the npm registry.

ALIASES
  $ monkey plugins add

EXAMPLES
  Install a plugin from npm registry.

    $ monkey plugins add myplugin

  Install a plugin from a github url.

    $ monkey plugins add https://github.com/someuser/someplugin

  Install a plugin from a github slug.

    $ monkey plugins add someuser/someplugin
```

## `monkey plugins:inspect PLUGIN...`

Displays installation properties of a plugin.

```
USAGE
  $ monkey plugins inspect PLUGIN...

ARGUMENTS
  PLUGIN...  [default: .] Plugin to inspect.

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

GLOBAL FLAGS
  --json  Format output as json.

DESCRIPTION
  Displays installation properties of a plugin.

EXAMPLES
  $ monkey plugins inspect myplugin
```

_See code: [@oclif/plugin-plugins](https://github.com/oclif/plugin-plugins/blob/v5.4.36/src/commands/plugins/inspect.ts)_

## `monkey plugins install PLUGIN`

Installs a plugin into monkey.

```
USAGE
  $ monkey plugins install PLUGIN... [--json] [-f] [-h] [-s | -v]

ARGUMENTS
  PLUGIN...  Plugin to install.

FLAGS
  -f, --force    Force npm to fetch remote resources even if a local copy exists on disk.
  -h, --help     Show CLI help.
  -s, --silent   Silences npm output.
  -v, --verbose  Show verbose npm output.

GLOBAL FLAGS
  --json  Format output as json.

DESCRIPTION
  Installs a plugin into monkey.

  Uses npm to install plugins.

  Installation of a user-installed plugin will override a core plugin.

  Use the MONKEY_NPM_LOG_LEVEL environment variable to set the npm loglevel.
  Use the MONKEY_NPM_REGISTRY environment variable to set the npm registry.

ALIASES
  $ monkey plugins add

EXAMPLES
  Install a plugin from npm registry.

    $ monkey plugins install myplugin

  Install a plugin from a github url.

    $ monkey plugins install https://github.com/someuser/someplugin

  Install a plugin from a github slug.

    $ monkey plugins install someuser/someplugin
```

_See code: [@oclif/plugin-plugins](https://github.com/oclif/plugin-plugins/blob/v5.4.36/src/commands/plugins/install.ts)_

## `monkey plugins link PATH`

Links a plugin into the CLI for development.

```
USAGE
  $ monkey plugins link PATH [-h] [--install] [-v]

ARGUMENTS
  PATH  [default: .] path to plugin

FLAGS
  -h, --help          Show CLI help.
  -v, --verbose
      --[no-]install  Install dependencies after linking the plugin.

DESCRIPTION
  Links a plugin into the CLI for development.

  Installation of a linked plugin will override a user-installed or core plugin.

  e.g. If you have a user-installed or core plugin that has a 'hello' command, installing a linked plugin with a 'hello'
  command will override the user-installed or core plugin implementation. This is useful for development work.


EXAMPLES
  $ monkey plugins link myplugin
```

_See code: [@oclif/plugin-plugins](https://github.com/oclif/plugin-plugins/blob/v5.4.36/src/commands/plugins/link.ts)_

## `monkey plugins remove [PLUGIN]`

Removes a plugin from the CLI.

```
USAGE
  $ monkey plugins remove [PLUGIN...] [-h] [-v]

ARGUMENTS
  PLUGIN...  plugin to uninstall

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Removes a plugin from the CLI.

ALIASES
  $ monkey plugins unlink
  $ monkey plugins remove

EXAMPLES
  $ monkey plugins remove myplugin
```

## `monkey plugins reset`

Remove all user-installed and linked plugins.

```
USAGE
  $ monkey plugins reset [--hard] [--reinstall]

FLAGS
  --hard       Delete node_modules and package manager related files in addition to uninstalling plugins.
  --reinstall  Reinstall all plugins after uninstalling.
```

_See code: [@oclif/plugin-plugins](https://github.com/oclif/plugin-plugins/blob/v5.4.36/src/commands/plugins/reset.ts)_

## `monkey plugins uninstall [PLUGIN]`

Removes a plugin from the CLI.

```
USAGE
  $ monkey plugins uninstall [PLUGIN...] [-h] [-v]

ARGUMENTS
  PLUGIN...  plugin to uninstall

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Removes a plugin from the CLI.

ALIASES
  $ monkey plugins unlink
  $ monkey plugins remove

EXAMPLES
  $ monkey plugins uninstall myplugin
```

_See code: [@oclif/plugin-plugins](https://github.com/oclif/plugin-plugins/blob/v5.4.36/src/commands/plugins/uninstall.ts)_

## `monkey plugins unlink [PLUGIN]`

Removes a plugin from the CLI.

```
USAGE
  $ monkey plugins unlink [PLUGIN...] [-h] [-v]

ARGUMENTS
  PLUGIN...  plugin to uninstall

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Removes a plugin from the CLI.

ALIASES
  $ monkey plugins unlink
  $ monkey plugins remove

EXAMPLES
  $ monkey plugins unlink myplugin
```

## `monkey plugins update`

Update installed plugins.

```
USAGE
  $ monkey plugins update [-h] [-v]

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Update installed plugins.
```

_See code: [@oclif/plugin-plugins](https://github.com/oclif/plugin-plugins/blob/v5.4.36/src/commands/plugins/update.ts)_
<!-- commandsstop -->
