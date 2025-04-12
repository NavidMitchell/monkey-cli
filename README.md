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
* [`monkey config`](#monkey-config)
* [`monkey enable-marketing`](#monkey-enable-marketing)
* [`monkey help [COMMAND]`](#monkey-help-command)
* [`monkey search-customers`](#monkey-search-customers)

## `monkey config`

Configures the Monkey CLI with an API key

```
USAGE
  $ monkey config

DESCRIPTION
  Configures the Monkey CLI with an API key

EXAMPLES
  $ monkey config
```

_See code: [src/commands/config.ts](https://github.com/navidmitchell/monkey-cli/blob/v0.0.0/src/commands/config.ts)_

## `monkey enable-marketing`

Enables marketing opt-in for a customer or all customers

```
USAGE
  $ monkey enable-marketing [-s <value>] [-d]

FLAGS
  -d, --dry-run         Run search without updating
  -s, --search=<value>  Company name to search

DESCRIPTION
  Enables marketing opt-in for a customer or all customers

EXAMPLES
  $ monkey enable-marketing --search "Company Name"

  $ monkey enable-marketing --dry-run

  $ monkey enable-marketing --search "Company Name" --dry-run
```

_See code: [src/commands/enable-marketing.ts](https://github.com/navidmitchell/monkey-cli/blob/v0.0.0/src/commands/enable-marketing.ts)_

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

## `monkey search-customers`

Searches for customers by company name

```
USAGE
  $ monkey search-customers -s <value>

FLAGS
  -s, --search=<value>  (required) Company name to search

DESCRIPTION
  Searches for customers by company name

EXAMPLES
  $ monkey search-customers --search "Company Name"
```

_See code: [src/commands/search-customers.ts](https://github.com/navidmitchell/monkey-cli/blob/v0.0.0/src/commands/search-customers.ts)_
<!-- commandsstop -->
