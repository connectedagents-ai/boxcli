'use strict';

const BoxCommand = require('../../../box-command');
const { Args, Flags } = require('@oclif/core');

class AiStudioAgentsUpdateCommand extends BoxCommand {
	async run() {
		const { args, flags } = await this.parse(AiStudioAgentsUpdateCommand);

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

		let agent = await this.tsClient.aiStudio.updateAiAgentById(
			args.id,
			requestBody
		);
		delete agent.rawData;

		await this.output(agent);
	}
}

AiStudioAgentsUpdateCommand.description = 'Update an AI agent in Box AI Studio';
AiStudioAgentsUpdateCommand.examples = [
	'box ai-studio:agents:update 12345 --name="Updated Agent Name" --access-state=enabled',
];
AiStudioAgentsUpdateCommand._endpoint = 'put_ai_agents_id';

AiStudioAgentsUpdateCommand.args = {
	id: Args.string({
		required: true,
		description: 'The ID of the AI agent to update',
	}),
};

AiStudioAgentsUpdateCommand.flags = {
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
		description: 'The ask capability configuration as a JSON string',
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
				throw new Error(
					'Error parsing text-gen configuration: ' + error.message
				);
			}
		},
	}),
	extract: Flags.string({
		description: 'The extract capability configuration as a JSON string',
		parse(input) {
			try {
				return JSON.parse(input);
			} catch (error) {
				throw new Error(
					'Error parsing extract configuration: ' + error.message
				);
			}
		},
	}),
};

module.exports = AiStudioAgentsUpdateCommand;
