'use strict';

const BoxCommand = require('../../../box-command');
const { Flags } = require('@oclif/core');

class AiStudioAgentsCreateCommand extends BoxCommand {
	async run() {
		const { flags } = await this.parse(AiStudioAgentsCreateCommand);

		let requestBody = {
			name: flags.name,
			accessState: flags['access-state'],
		};

		if (flags['icon-reference']) {
			requestBody.iconReference = flags['icon-reference'];
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

AiStudioAgentsCreateCommand.description =
	'Create a new AI agent in Box AI Studio';
AiStudioAgentsCreateCommand.examples = [
	'box ai-studio:agents:create --name="Contract Review Agent" --access-state=enabled',
	'box ai-studio:agents:create --name="My Agent" --access-state=disabled --ask=\'{"accessState":"enabled"}\'',
];
AiStudioAgentsCreateCommand._endpoint = 'post_ai_agents';

AiStudioAgentsCreateCommand.flags = {
	...BoxCommand.flags,
	name: Flags.string({
		required: true,
		description: 'The name of the AI agent',
	}),
	'access-state': Flags.string({
		required: true,
		description:
			'The state of the AI agent (enabled, disabled, enabled_for_selected_users)',
		options: ['enabled', 'disabled', 'enabled_for_selected_users'],
	}),
	'icon-reference': Flags.string({
		description:
			'The icon reference of the AI agent. Format: https://cdn01.boxcdn.net/app-assets/aistudio/avatars/<file_name>',
	}),
	ask: Flags.string({
		description:
			'The ask capability configuration as a JSON string',
		parse(input) {
			try {
				return JSON.parse(input);
			} catch (error) {
				throw new Error('Error parsing ask configuration: ' + error.message);
			}
		},
	}),
	'text-gen': Flags.string({
		description:
			'The text generation capability configuration as a JSON string',
		parse(input) {
			try {
				return JSON.parse(input);
			} catch (error) {
				throw new Error('Error parsing text-gen configuration: ' + error.message);
			}
		},
	}),
	extract: Flags.string({
		description:
			'The extract capability configuration as a JSON string',
		parse(input) {
			try {
				return JSON.parse(input);
			} catch (error) {
				throw new Error('Error parsing extract configuration: ' + error.message);
			}
		},
	}),
};

module.exports = AiStudioAgentsCreateCommand;
