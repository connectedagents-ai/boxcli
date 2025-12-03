'use strict';

const BoxCommand = require('../../../box-command');
const { Args } = require('@oclif/core');

class AiStudioAgentsDeleteCommand extends BoxCommand {
	async run() {
		const { args } = await this.parse(AiStudioAgentsDeleteCommand);

		const shouldDelete = await this.confirm(
			`Are you sure you want to delete AI agent ${args.id}?`
		);

		if (!shouldDelete) {
			return;
		}

		await this.tsClient.aiStudio.deleteAiAgentById(args.id);

		this.info(`Successfully deleted AI agent ${args.id}`);
	}
}

AiStudioAgentsDeleteCommand.description =
	'Delete an AI agent from Box AI Studio';
AiStudioAgentsDeleteCommand.examples = ['box ai-studio:agents:delete 12345'];
AiStudioAgentsDeleteCommand._endpoint = 'delete_ai_agents_id';

AiStudioAgentsDeleteCommand.args = {
	id: Args.string({
		required: true,
		description: 'The ID of the AI agent to delete',
	}),
};

AiStudioAgentsDeleteCommand.flags = {
	...BoxCommand.flags,
};

module.exports = AiStudioAgentsDeleteCommand;
