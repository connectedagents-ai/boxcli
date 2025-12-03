'use strict';

const { Args } = require('@oclif/core');
const BoxCommand = require('../../box-command');

class AiAgentsGetCommand extends BoxCommand {
	async run() {
		const { flags, args } = await this.parse(AiAgentsGetCommand);
		let queryParams = {};

		if (flags.fields) {
			queryParams.fields = flags.fields.split(',');
		}

		let agent = await this.tsClient.aiStudio.getAiAgentById(
			args.id,
			{ queryParams }
		);
		delete agent.rawData;
		await this.output(agent);
	}
}

AiAgentsGetCommand.description =
	'Get an AI agent by ID. Box AI Studio is only available for Enterprise Advance accounts.';
AiAgentsGetCommand.examples = ['box ai-agents:get 12345'];
AiAgentsGetCommand._endpoint = 'get_ai_agents_id';

AiAgentsGetCommand.flags = {
	...BoxCommand.flags,
};

AiAgentsGetCommand.args = {
	id: Args.string({
		name: 'id',
		required: true,
		hidden: false,
		description: 'The ID of the AI agent to retrieve',
	}),
};

module.exports = AiAgentsGetCommand;
