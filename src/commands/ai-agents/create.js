'use strict';

const BoxCommand = require('../../box-command');
const { Flags } = require('@oclif/core');

class AiAgentsCreateCommand extends BoxCommand {
	async run() {
		const { flags } = await this.parse(AiAgentsCreateCommand);
		let requestBody = {
			name: flags.name,
		};

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

		let agent = await this.tsClient.aiStudio.createAiAgent(requestBody);
		delete agent.rawData;
		await this.output(agent);
	}
}

AiAgentsCreateCommand.description =
	'Create an AI agent. At least one of the following capabilities must be provided: ask, text-gen, extract. Box AI Studio is only available for Enterprise Advance accounts.';
AiAgentsCreateCommand.examples = [
	'box ai-agents:create --name "My Agent" --ask \'{"accessState": "enabled"}\'',
	'box ai-agents:create --name "Text Generator" --text-gen \'{"accessState": "enabled"}\'',
	'box ai-agents:create --name "Full Agent" --ask \'{"accessState": "enabled"}\' --text-gen \'{"accessState": "enabled"}\' --extract \'{"accessState": "enabled"}\'',
];
AiAgentsCreateCommand._endpoint = 'post_ai_agents';

AiAgentsCreateCommand.flags = {
	...BoxCommand.flags,
	name: Flags.string({
		required: true,
		description: 'The name of the AI agent.',
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

module.exports = AiAgentsCreateCommand;
