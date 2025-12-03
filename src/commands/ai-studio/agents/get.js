'use strict';

const BoxCommand = require('../../../box-command');
const { Args } = require('@oclif/core');

class AiStudioAgentsGetCommand extends BoxCommand {
	async run() {
		const { args } = await this.parse(AiStudioAgentsGetCommand);

		let agent = await this.tsClient.aiStudio.getAiAgentById(args.id);
		delete agent.rawData;

		await this.output(agent);
	}
}

AiStudioAgentsGetCommand.description = 'Get an AI agent by ID';
AiStudioAgentsGetCommand.examples = ['box ai-studio:agents:get 12345'];
AiStudioAgentsGetCommand._endpoint = 'get_ai_agents_id';

AiStudioAgentsGetCommand.args = {
	id: Args.string({
		required: true,
		description: 'The ID of the AI agent to retrieve',
	}),
};

AiStudioAgentsGetCommand.flags = {
	...BoxCommand.flags,
};

module.exports = AiStudioAgentsGetCommand;
