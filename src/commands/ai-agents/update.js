'use strict';

const BoxCommand = require('../../box-command');
const { Flags, Args } = require('@oclif/core');

class AiAgentsUpdateCommand extends BoxCommand {
	async run() {
		const { flags, args } = await this.parse(AiAgentsUpdateCommand);
		let requestBody = {};

		if (flags.name) {
			requestBody.name = flags.name;
		}
		if (flags['access-state']) {
			requestBody.accessState = flags['access-state'];
		}
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

		let agent = await this.tsClient.aiStudio.updateAiAgentById(
			args.id,
			requestBody
		);
		delete agent.rawData;
		await this.output(agent);
	}
}

AiAgentsUpdateCommand.description = 'Update an AI agent';
AiAgentsUpdateCommand.examples = [
	'box ai-agents:update 12345 --name="Updated Agent Name"',
	'box ai-agents:update 12345 --access-state=disabled',
];
AiAgentsUpdateCommand._endpoint = 'put_ai_agents_id';

AiAgentsUpdateCommand.flags = {
	...BoxCommand.flags,
	name: Flags.string({
		char: 'n',
		description: 'The new name of the AI agent',
	}),
	'access-state': Flags.string({
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
};

AiAgentsUpdateCommand.args = {
	id: Args.string({
		name: 'id',
		required: true,
		hidden: false,
		description: 'The ID of the AI agent to update',
	}),
};

module.exports = AiAgentsUpdateCommand;
