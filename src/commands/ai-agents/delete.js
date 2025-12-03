'use strict';

const BoxCommand = require('../../box-command');
const { Args } = require('@oclif/core');

class AiAgentsDeleteCommand extends BoxCommand {
	async run() {
		const { args } = await this.parse(AiAgentsDeleteCommand);

		await this.tsClient.aiStudio.deleteAiAgentById(args.id);
		this.info(`Deleted AI agent ${args.id}`);
	}
}

AiAgentsDeleteCommand.description =
	'Delete an AI agent. Box AI Studio is only available for Enterprise Advance accounts.';
AiAgentsDeleteCommand.examples = ['box ai-agents:delete 12345'];
AiAgentsDeleteCommand._endpoint = 'delete_ai_agents_id';

AiAgentsDeleteCommand.flags = {
	...BoxCommand.flags,
};

AiAgentsDeleteCommand.args = {
	id: Args.string({
		name: 'id',
		required: true,
		hidden: false,
		description: 'The ID of the AI agent to delete',
	}),
};

module.exports = AiAgentsDeleteCommand;
