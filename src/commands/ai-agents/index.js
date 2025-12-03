'use strict';

const BoxCommand = require('../../box-command');
const { Flags } = require('@oclif/core');

class AiAgentsListCommand extends BoxCommand {
	async run() {
		const { flags } = await this.parse(AiAgentsListCommand);
		let queryParams = {};

		if (flags.mode) {
			queryParams.mode = flags.mode;
		}
		if (flags.fields) {
			queryParams.fields = flags.fields.split(',');
		}
		if (flags['agent-state']) {
			queryParams.agentState = flags['agent-state'];
		}
		if (flags['include-box-default'] !== undefined) {
			queryParams.includeBoxDefault = flags['include-box-default'];
		}
		if (flags.marker) {
			queryParams.marker = flags.marker;
		}
		if (flags.limit) {
			queryParams.limit = flags.limit;
		}

		let agents = await this.tsClient.aiStudio.getAiAgents(queryParams);
		delete agents.rawData;
		await this.output(agents);
	}
}

AiAgentsListCommand.aliases = ['ai-agents:list'];

AiAgentsListCommand.description =
	'List AI agents. Box AI Studio is only available for Enterprise Advance accounts.';
AiAgentsListCommand.examples = [
	'box ai-agents',
	'box ai-agents --mode ask --mode text_gen',
	'box ai-agents --agent-state enabled',
];
AiAgentsListCommand._endpoint = 'get_ai_agents';

AiAgentsListCommand.flags = {
	...BoxCommand.flags,
	mode: Flags.string({
		description:
			'The mode to filter the agent config to return. Can be specified multiple times.',
		multiple: true,
		options: ['ask', 'text_gen', 'extract'],
	}),
	'agent-state': Flags.string({
		description: 'The state of the agents to return.',
		multiple: true,
		options: ['enabled', 'disabled', 'enabled_for_selected_users'],
	}),
	'include-box-default': Flags.boolean({
		description: 'Whether to include the Box default agents in the response.',
		allowNo: true,
	}),
	marker: Flags.string({
		description:
			'Defines the position marker at which to begin returning results.',
	}),
	limit: Flags.integer({
		description: 'The maximum number of items to return per page.',
	}),
};

module.exports = AiAgentsListCommand;
