`box ai-studio`
===============

Manage AI Studio agents

* [`box ai-studio:agents`](#box-ai-studioagents)
* [`box ai-studio:agents:create`](#box-ai-studioagentscreate)
* [`box ai-studio:agents:delete ID`](#box-ai-studioagentsdelete-id)
* [`box ai-studio:agents:get ID`](#box-ai-studioagentsget-id)
* [`box ai-studio:agents:update ID`](#box-ai-studioagentsupdate-id)

## `box ai-studio:agents`

List AI agents in Box AI Studio

```
USAGE
  $ box ai-studio:agents [-t <value>] [--as-user <value>] [--no-color] [--json | --csv] [-s |
    --save-to-file-path <value>] [--fields <value>] [--bulk-file-path <value>] [-h] [-v] [-y] [-q] [--mode <value>...]
    [--agent-state <value>...] [--include-box-default | --no-include-box-default] [--limit <value>]

FLAGS
  -h, --help                       Show CLI help
  -q, --quiet                      Suppress any non-error output to stderr
  -s, --save                       Save report to default reports folder on disk
  -t, --token=<value>              Provide a token to perform this call
  -v, --verbose                    Show verbose output, which can be helpful for debugging
  -y, --yes                        Automatically respond yes to all confirmation prompts
      --agent-state=<value>...     Filter by agent state (enabled, disabled, enabled_for_selected_users)
      --as-user=<value>            Provide an ID for a user
      --bulk-file-path=<value>     File path to bulk .csv or .json objects
      --csv                        Output formatted CSV
      --fields=<value>             Comma separated list of fields to show
      --include-box-default        Include Box default agents in the response
      --json                       Output formatted JSON
      --limit=<value>              Maximum number of agents to return
      --mode=<value>...            Filter by agent mode (ask, text_gen, extract)
      --no-color                   Turn off colors for logging
      --save-to-file-path=<value>  Override default file path to save report

DESCRIPTION
  List AI agents in Box AI Studio

EXAMPLES
  $ box ai-studio:agents

  $ box ai-studio:agents --mode=ask

  $ box ai-studio:agents --agent-state=enabled
```

_See code: [src/commands/ai-studio/agents.js](https://github.com/box/boxcli/blob/v4.5.0/src/commands/ai-studio/agents.js)_

## `box ai-studio:agents:create`

Create a new AI agent in Box AI Studio

```
USAGE
  $ box ai-studio:agents:create --name <value> --access-state enabled|disabled|enabled_for_selected_users [-t <value>]
    [--as-user <value>] [--no-color] [--json | --csv] [-s | --save-to-file-path <value>] [--fields <value>]
    [--bulk-file-path <value>] [-h] [-v] [-y] [-q] [--icon-reference <value>] [--ask <value>] [--text-gen <value>]
    [--extract <value>]

FLAGS
  -h, --help                       Show CLI help
  -q, --quiet                      Suppress any non-error output to stderr
  -s, --save                       Save report to default reports folder on disk
  -t, --token=<value>              Provide a token to perform this call
  -v, --verbose                    Show verbose output, which can be helpful for debugging
  -y, --yes                        Automatically respond yes to all confirmation prompts
      --access-state=<option>      (required) The state of the AI agent (enabled, disabled, enabled_for_selected_users)
                                   <options: enabled|disabled|enabled_for_selected_users>
      --as-user=<value>            Provide an ID for a user
      --ask=<value>                The ask capability configuration as a JSON string
      --bulk-file-path=<value>     File path to bulk .csv or .json objects
      --csv                        Output formatted CSV
      --extract=<value>            The extract capability configuration as a JSON string
      --fields=<value>             Comma separated list of fields to show
      --icon-reference=<value>     The icon reference of the AI agent. Format:
                                   https://cdn01.boxcdn.net/app-assets/aistudio/avatars/<file_name>
      --json                       Output formatted JSON
      --name=<value>               (required) The name of the AI agent
      --no-color                   Turn off colors for logging
      --save-to-file-path=<value>  Override default file path to save report
      --text-gen=<value>           The text generation capability configuration as a JSON string

DESCRIPTION
  Create a new AI agent in Box AI Studio

EXAMPLES
  $ box ai-studio:agents:create --name="Contract Review Agent" --access-state=enabled

  $ box ai-studio:agents:create --name="My Agent" --access-state=disabled --ask='{"accessState":"enabled"}'
```

_See code: [src/commands/ai-studio/agents/create.js](https://github.com/box/boxcli/blob/v4.5.0/src/commands/ai-studio/agents/create.js)_

## `box ai-studio:agents:delete ID`

Delete an AI agent from Box AI Studio

```
USAGE
  $ box ai-studio:agents:delete ID [-t <value>] [--as-user <value>] [--no-color] [--json | --csv] [-s |
    --save-to-file-path <value>] [--fields <value>] [--bulk-file-path <value>] [-h] [-v] [-y] [-q]

ARGUMENTS
  ID  The ID of the AI agent to delete

FLAGS
  -h, --help                       Show CLI help
  -q, --quiet                      Suppress any non-error output to stderr
  -s, --save                       Save report to default reports folder on disk
  -t, --token=<value>              Provide a token to perform this call
  -v, --verbose                    Show verbose output, which can be helpful for debugging
  -y, --yes                        Automatically respond yes to all confirmation prompts
      --as-user=<value>            Provide an ID for a user
      --bulk-file-path=<value>     File path to bulk .csv or .json objects
      --csv                        Output formatted CSV
      --fields=<value>             Comma separated list of fields to show
      --json                       Output formatted JSON
      --no-color                   Turn off colors for logging
      --save-to-file-path=<value>  Override default file path to save report

DESCRIPTION
  Delete an AI agent from Box AI Studio

EXAMPLES
  $ box ai-studio:agents:delete 12345
```

_See code: [src/commands/ai-studio/agents/delete.js](https://github.com/box/boxcli/blob/v4.5.0/src/commands/ai-studio/agents/delete.js)_

## `box ai-studio:agents:get ID`

Get an AI agent by ID

```
USAGE
  $ box ai-studio:agents:get ID [-t <value>] [--as-user <value>] [--no-color] [--json | --csv] [-s |
    --save-to-file-path <value>] [--fields <value>] [--bulk-file-path <value>] [-h] [-v] [-y] [-q]

ARGUMENTS
  ID  The ID of the AI agent to retrieve

FLAGS
  -h, --help                       Show CLI help
  -q, --quiet                      Suppress any non-error output to stderr
  -s, --save                       Save report to default reports folder on disk
  -t, --token=<value>              Provide a token to perform this call
  -v, --verbose                    Show verbose output, which can be helpful for debugging
  -y, --yes                        Automatically respond yes to all confirmation prompts
      --as-user=<value>            Provide an ID for a user
      --bulk-file-path=<value>     File path to bulk .csv or .json objects
      --csv                        Output formatted CSV
      --fields=<value>             Comma separated list of fields to show
      --json                       Output formatted JSON
      --no-color                   Turn off colors for logging
      --save-to-file-path=<value>  Override default file path to save report

DESCRIPTION
  Get an AI agent by ID

EXAMPLES
  $ box ai-studio:agents:get 12345
```

_See code: [src/commands/ai-studio/agents/get.js](https://github.com/box/boxcli/blob/v4.5.0/src/commands/ai-studio/agents/get.js)_

## `box ai-studio:agents:update ID`

Update an AI agent in Box AI Studio

```
USAGE
  $ box ai-studio:agents:update ID --name <value> --access-state enabled|disabled|enabled_for_selected_users [-t
    <value>] [--as-user <value>] [--no-color] [--json | --csv] [-s | --save-to-file-path <value>] [--fields <value>]
    [--bulk-file-path <value>] [-h] [-v] [-y] [-q] [--icon-reference <value>] [--ask <value>] [--text-gen <value>]
    [--extract <value>]

ARGUMENTS
  ID  The ID of the AI agent to update

FLAGS
  -h, --help                       Show CLI help
  -q, --quiet                      Suppress any non-error output to stderr
  -s, --save                       Save report to default reports folder on disk
  -t, --token=<value>              Provide a token to perform this call
  -v, --verbose                    Show verbose output, which can be helpful for debugging
  -y, --yes                        Automatically respond yes to all confirmation prompts
      --access-state=<option>      (required) The state of the AI agent (enabled, disabled, enabled_for_selected_users)
                                   <options: enabled|disabled|enabled_for_selected_users>
      --as-user=<value>            Provide an ID for a user
      --ask=<value>                The ask capability configuration as a JSON string
      --bulk-file-path=<value>     File path to bulk .csv or .json objects
      --csv                        Output formatted CSV
      --extract=<value>            The extract capability configuration as a JSON string
      --fields=<value>             Comma separated list of fields to show
      --icon-reference=<value>     The icon reference of the AI agent. Format:
                                   https://cdn01.boxcdn.net/app-assets/aistudio/avatars/<file_name>
      --json                       Output formatted JSON
      --name=<value>               (required) The name of the AI agent
      --no-color                   Turn off colors for logging
      --save-to-file-path=<value>  Override default file path to save report
      --text-gen=<value>           The text generation capability configuration as a JSON string

DESCRIPTION
  Update an AI agent in Box AI Studio

EXAMPLES
  $ box ai-studio:agents:update 12345 --name="Updated Agent Name" --access-state=enabled
```

_See code: [src/commands/ai-studio/agents/update.js](https://github.com/box/boxcli/blob/v4.5.0/src/commands/ai-studio/agents/update.js)_
