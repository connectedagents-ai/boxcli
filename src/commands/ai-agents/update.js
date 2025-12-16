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

AiAgentsUpdateCommand.description =
	'Update an AI agent. Box AI Studio is only available for Enterprise Advance accounts.';
AiAgentsUpdateCommand.examples = [
	'box ai-agents:update 12345 --name "Updated Agent Name"',
	'box ai-agents:update 12345 --access-state disabled',
	'box ai-agents:update 12345 --ask \'{"accessState": "enabled"}\'',
];
AiAgentsUpdateCommand._endpoint = 'put_ai_agents_id';

AiAgentsUpdateCommand.flags = {
	...BoxCommand.flags,
	name: Flags.string({
		description: 'The new name of the AI agent.',
	}),
	'access-state': Flags.string({
		description: 'The access state of the AI agent.',
		options: ['enabled', 'disabled', 'enabled_for_selected_users'],
	}),
	'icon-reference': Flags.string({
		description:
			'The icon reference for the AI agent, provided as a JSON string.',
		parse(input) {
			try {
				return JSON.parse(input);
			} catch (error) {
				throw new Error('Error parsing icon-reference: ' + error.message);
			}
		},
	}),
	'allowed-entities': Flags.string({
		description:
			'List of allowed users or groups, provided as a JSON string. Example: [{"type": "user", "id": "12345"}]',
		parse(input) {
			try {
				return JSON.parse(input);
			} catch (error) {
				throw new Error('Error parsing allowed-entities: ' + error.message);
			}
		},
	}),
	ask: Flags.string({
		description:
			'The ask capability configuration, provided as a JSON string.',
		parse(input) {
			try {
				return JSON.parse(input);
			} catch (error) {
				throw new Error('Error parsing ask: ' + error.message);
			}
		},
	}),
	'text-gen': Flags.string({
		description:
			'The text generation capability configuration, provided as a JSON string.',
		parse(input) {
			try {
				return JSON.parse(input);
			} catch (error) {
				throw new Error('Error parsing text-gen: ' + error.message);
			}
		},
	}),
	extract: Flags.string({
		description:
			'The extract capability configuration, provided as a JSON string.',
		parse(input) {
			try {
				return JSON.parse(input);
			} catch (error) {
				throw new Error('Error parsing extract: ' + error.message);
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
