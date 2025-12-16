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
		if (flags.fields) {
			queryParams.fields = flags.fields.split(',');
		}

		let agents = await this.tsClient.aiStudio.getAiAgents(queryParams);
		delete agents.rawData;
		await this.output(agents);
	}
}

AiAgentsListCommand.aliases = ['ai-agents:list'];

AiAgentsListCommand.description = 'List AI agents';
AiAgentsListCommand.examples = [
	'box ai-agents',
	'box ai-agents --mode=ask,text_gen --agent-state=enabled',
];
AiAgentsListCommand._endpoint = 'get_ai_agents';

AiAgentsListCommand.flags = {
	...BoxCommand.flags,
	mode: Flags.string({
		description:
			'Comma-separated list of modes to filter agents. Possible values: ask, text_gen, extract',
		parse: (input) => input.split(','),
	}),
	'agent-state': Flags.string({
		description:
			'Comma-separated list of agent states to filter. Possible values: enabled, disabled, enabled_for_selected_users',
		parse: (input) => input.split(','),
	}),
	'include-box-default': Flags.boolean({
		description: 'Include Box default agents in the response',
		allowNo: true,
	}),
	marker: Flags.string({
		description: 'Marker for pagination',
	}),
	limit: Flags.integer({
		description: 'Maximum number of agents to return',
	}),
};

module.exports = AiAgentsListCommand;
