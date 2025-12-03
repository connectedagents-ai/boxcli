'use strict';

const BoxCommand = require('../../box-command');
const { Flags, Args } = require('@oclif/core');

class AiAgentsCreateCommand extends BoxCommand {
	async run() {
		const { flags, args } = await this.parse(AiAgentsCreateCommand);
		let requestBody = {
			name: args.name,
			accessState: flags['access-state'],
		};

		if (flags['icon-reference']) {
			requestBody.iconReference = flags['icon-reference'];
		}
		if (flags['allowed-entities']) {
			requestBody.allowedEntities = flags['allowed-entities'];
		}
		if (flags.ask) {
			requestBody.ask = flags.ask;
		}
		if (flags['text-gen']) {
			requestBody.textGen = flags['text-gen'];
		}
		if (flags.extract) {
			requestBody.extract = flags.extract;
		}

		let agent = await this.tsClient.aiStudio.createAiAgent(requestBody);
		delete agent.rawData;
		await this.output(agent);
	}
}

AiAgentsCreateCommand.description =
	'Create an AI agent. At least one of the following capabilities must be provided: ask, text-gen, extract';
AiAgentsCreateCommand.examples = [
	'box ai-agents:create "My Agent" --access-state=enabled --ask=\'{"accessState":"enabled","description":"Ask agent"}\'',
	'box ai-agents:create "Contract Review Agent" --access-state=enabled --extract=\'{"accessState":"enabled","description":"Extract contract data"}\'',
];
AiAgentsCreateCommand._endpoint = 'post_ai_agents';

AiAgentsCreateCommand.flags = {
	...BoxCommand.flags,
	'access-state': Flags.string({
		required: true,
		description:
			'The state of the AI Agent. Possible values: enabled, disabled, enabled_for_selected_users',
		options: ['enabled', 'disabled', 'enabled_for_selected_users'],
	}),
	'icon-reference': Flags.string({
		description:
			'The icon reference URL of the AI Agent. Format: https://cdn01.boxcdn.net/app-assets/aistudio/avatars/<file_name>',
	}),
	'allowed-entities': Flags.string({
		description:
			'List of allowed users or groups as JSON. Example: [{"type":"user","id":"12345"}]',
		parse(input) {
			try {
				return JSON.parse(input);
			} catch {
				throw new Error('Error parsing allowed-entities JSON');
			}
		},
	}),
	ask: Flags.string({
		description:
			'The ask capability configuration as JSON. Example: {"accessState":"enabled","description":"My ask agent"}',
		parse(input) {
			try {
				return JSON.parse(input);
			} catch {
				throw new Error('Error parsing ask JSON');
			}
		},
	}),
	'text-gen': Flags.string({
		description:
			'The text generation capability configuration as JSON. Example: {"accessState":"enabled","description":"My text gen agent"}',
		parse(input) {
			try {
				return JSON.parse(input);
			} catch {
				throw new Error('Error parsing text-gen JSON');
			}
		},
	}),
	extract: Flags.string({
		description:
			'The extract capability configuration as JSON. Example: {"accessState":"enabled","description":"My extract agent"}',
		parse(input) {
			try {
				return JSON.parse(input);
			} catch {
				throw new Error('Error parsing extract JSON');
			}
		},
	}),
	'id-only': Flags.boolean({
		description: 'Return only the ID of the created agent',
	}),
};

AiAgentsCreateCommand.args = {
	name: Args.string({
		name: 'name',
		required: true,
		hidden: false,
		description: 'The name of the AI agent',
	}),
};

module.exports = AiAgentsCreateCommand;
