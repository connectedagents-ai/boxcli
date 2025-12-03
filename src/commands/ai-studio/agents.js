'use strict';

const BoxCommand = require('../../box-command');
const { Flags } = require('@oclif/core');

class AiStudioAgentsListCommand extends BoxCommand {
	async run() {
		const { flags } = await this.parse(AiStudioAgentsListCommand);

		let options = {};

		if (flags.mode) {
			options.mode = flags.mode;
		}
		if (flags['agent-state']) {
			options.agentState = flags['agent-state'];
		}
		if (flags['include-box-default'] !== undefined) {
			options.includeBoxDefault = flags['include-box-default'];
		}
		if (flags.limit) {
			options.limit = flags.limit;
		}

		let agents = await this.tsClient.aiStudio.getAiAgents(options);
		delete agents.rawData;

		await this.output(agents);
	}
}

AiStudioAgentsListCommand.description =
	'List AI agents in Box AI Studio';
AiStudioAgentsListCommand.examples = [
	'box ai-studio:agents',
	'box ai-studio:agents --mode=ask',
	'box ai-studio:agents --agent-state=enabled',
];
AiStudioAgentsListCommand._endpoint = 'get_ai_agents';

AiStudioAgentsListCommand.flags = {
	...BoxCommand.flags,
	mode: Flags.string({
		description: 'Filter by agent mode (ask, text_gen, extract)',
		multiple: true,
	}),
	'agent-state': Flags.string({
		description:
			'Filter by agent state (enabled, disabled, enabled_for_selected_users)',
		multiple: true,
	}),
	'include-box-default': Flags.boolean({
		description: 'Include Box default agents in the response',
		allowNo: true,
	}),
	limit: Flags.integer({
		description: 'Maximum number of agents to return',
	}),
};

module.exports = AiStudioAgentsListCommand;
