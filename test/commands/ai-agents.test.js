'use strict';

const { test } = require('@oclif/test');
const assert = require('chai').assert;
const { TEST_API_ROOT, getFixture } = require('../helpers/test-helper');

describe('AI Agents', function () {
	describe('ai-agents (list)', function () {
		const expectedResponseBody = {
			entries: [
				{
					type: 'ai_agent',
					id: '12345',
					origin: 'enterprise',
					name: 'Contract Review Agent',
					access_state: 'enabled',
					created_at: '2025-01-15T10:00:00Z',
					modified_at: '2025-01-15T10:00:00Z',
					created_by: {
						type: 'user',
						id: '33333',
						name: 'Test User',
						login: 'test@example.com',
					},
					modified_by: {
						type: 'user',
						id: '33333',
						name: 'Test User',
						login: 'test@example.com',
					},
					icon_reference:
						'https://cdn01.boxcdn.net/app-assets/aistudio/avatars/logo_legal.png',
				},
				{
					type: 'ai_agent',
					id: '12346',
					origin: 'enterprise',
					name: 'Document Analysis Agent',
					access_state: 'disabled',
					created_at: '2025-01-14T10:00:00Z',
					modified_at: '2025-01-14T10:00:00Z',
				},
			],
			next_marker: null,
		};

		const fixture = getFixture('ai-agents/get_ai_agents_response');
		const yamlFixture = getFixture(
			'ai-agents/get_ai_agents_response_yaml.txt'
		);

		test.nock(TEST_API_ROOT, (api) =>
			api.get('/2.0/ai_agents').reply(200, expectedResponseBody)
		)
			.stdout()
			.command(['ai-agents', '--json', '--token=test'])
			.it(
				'should list AI agents and output response (JSON Output)',
				(context) => {
					assert.equal(context.stdout, fixture);
				}
			);

		test.nock(TEST_API_ROOT, (api) =>
			api.get('/2.0/ai_agents').reply(200, expectedResponseBody)
		)
			.stdout()
			.command(['ai-agents', '--token=test'])
			.it(
				'should list AI agents and output response (YAML Output)',
				(context) => {
					assert.equal(context.stdout, yamlFixture);
				}
			);

		test.nock(TEST_API_ROOT, (api) =>
			api
				.get('/2.0/ai_agents')
				.query({ mode: 'ask,extract' })
				.reply(200, expectedResponseBody)
		)
			.stdout()
			.command([
				'ai-agents',
				'--mode=ask,extract',
				'--json',
				'--token=test',
			])
			.it('should list AI agents with mode filter', (context) => {
				assert.equal(context.stdout, fixture);
			});
	});

	describe('ai-agents:get', function () {
		const expectedResponseBody = {
			type: 'ai_agent',
			id: '12345',
			origin: 'enterprise',
			name: 'Contract Review Agent',
			access_state: 'enabled',
			created_at: '2025-01-15T10:00:00Z',
			modified_at: '2025-01-15T10:00:00Z',
			created_by: {
				type: 'user',
				id: '33333',
				name: 'Test User',
				login: 'test@example.com',
			},
			modified_by: {
				type: 'user',
				id: '33333',
				name: 'Test User',
				login: 'test@example.com',
			},
			icon_reference:
				'https://cdn01.boxcdn.net/app-assets/aistudio/avatars/logo_legal.png',
			ask: {
				type: 'ai_agent_ask',
				access_state: 'enabled',
				description: 'Ask questions about contracts',
			},
			extract: {
				type: 'ai_agent_extract',
				access_state: 'enabled',
				description: 'Extract key contract clauses and deadlines',
			},
		};

		const fixture = getFixture('ai-agents/get_ai_agent_by_id_response');
		const yamlFixture = getFixture(
			'ai-agents/get_ai_agent_by_id_response_yaml.txt'
		);

		test.nock(TEST_API_ROOT, (api) =>
			api.get('/2.0/ai_agents/12345').reply(200, expectedResponseBody)
		)
			.stdout()
			.command(['ai-agents:get', '12345', '--json', '--token=test'])
			.it(
				'should get AI agent by ID and output response (JSON Output)',
				(context) => {
					assert.equal(context.stdout, fixture);
				}
			);

		test.nock(TEST_API_ROOT, (api) =>
			api.get('/2.0/ai_agents/12345').reply(200, expectedResponseBody)
		)
			.stdout()
			.command(['ai-agents:get', '12345', '--token=test'])
			.it(
				'should get AI agent by ID and output response (YAML Output)',
				(context) => {
					assert.equal(context.stdout, yamlFixture);
				}
			);
	});

	describe('ai-agents:create', function () {
		const expectedRequestBody = {
			type: 'ai_agent',
			name: 'Contract Review Agent',
			access_state: 'enabled',
			extract: {
				access_state: 'enabled',
				description: 'Extract key contract clauses and deadlines',
			},
		};

		const expectedResponseBody = {
			type: 'ai_agent',
			id: '12345',
			origin: 'enterprise',
			name: 'Contract Review Agent',
			access_state: 'enabled',
			created_at: '2025-01-15T10:00:00Z',
			modified_at: '2025-01-15T10:00:00Z',
			created_by: {
				type: 'user',
				id: '33333',
				name: 'Test User',
				login: 'test@example.com',
			},
			modified_by: {
				type: 'user',
				id: '33333',
				name: 'Test User',
				login: 'test@example.com',
			},
			icon_reference:
				'https://cdn01.boxcdn.net/app-assets/aistudio/avatars/logo_legal.png',
			extract: {
				type: 'ai_agent_extract',
				access_state: 'enabled',
				description: 'Extract key contract clauses and deadlines',
			},
		};

		const fixture = getFixture('ai-agents/post_ai_agent_response');
		const yamlFixture = getFixture(
			'ai-agents/post_ai_agent_response_yaml.txt'
		);

		test.nock(TEST_API_ROOT, (api) =>
			api
				.post('/2.0/ai_agents', expectedRequestBody)
				.reply(200, expectedResponseBody)
		)
			.stdout()
			.command([
				'ai-agents:create',
				'Contract Review Agent',
				'--access-state=enabled',
				'--extract={"accessState":"enabled","description":"Extract key contract clauses and deadlines"}',
				'--json',
				'--token=test',
			])
			.it(
				'should create AI agent and output response (JSON Output)',
				(context) => {
					assert.equal(context.stdout, fixture);
				}
			);

		test.nock(TEST_API_ROOT, (api) =>
			api
				.post('/2.0/ai_agents', expectedRequestBody)
				.reply(200, expectedResponseBody)
		)
			.stdout()
			.command([
				'ai-agents:create',
				'Contract Review Agent',
				'--access-state=enabled',
				'--extract={"accessState":"enabled","description":"Extract key contract clauses and deadlines"}',
				'--token=test',
			])
			.it(
				'should create AI agent and output response (YAML Output)',
				(context) => {
					assert.equal(context.stdout, yamlFixture);
				}
			);
	});

	describe('ai-agents:update', function () {
		const expectedRequestBody = {
			type: 'ai_agent',
			name: 'Updated Contract Review Agent',
			access_state: 'disabled',
		};

		const expectedResponseBody = {
			type: 'ai_agent',
			id: '12345',
			origin: 'enterprise',
			name: 'Updated Contract Review Agent',
			access_state: 'disabled',
			created_at: '2025-01-15T10:00:00Z',
			modified_at: '2025-01-16T10:00:00Z',
			created_by: {
				type: 'user',
				id: '33333',
				name: 'Test User',
				login: 'test@example.com',
			},
			modified_by: {
				type: 'user',
				id: '33333',
				name: 'Test User',
				login: 'test@example.com',
			},
			icon_reference:
				'https://cdn01.boxcdn.net/app-assets/aistudio/avatars/logo_legal.png',
			extract: {
				type: 'ai_agent_extract',
				access_state: 'enabled',
				description: 'Extract key contract clauses and deadlines',
			},
		};

		const fixture = getFixture('ai-agents/put_ai_agent_response');
		const yamlFixture = getFixture(
			'ai-agents/put_ai_agent_response_yaml.txt'
		);

		test.nock(TEST_API_ROOT, (api) =>
			api
				.put('/2.0/ai_agents/12345', expectedRequestBody)
				.reply(200, expectedResponseBody)
		)
			.stdout()
			.command([
				'ai-agents:update',
				'12345',
				'--name=Updated Contract Review Agent',
				'--access-state=disabled',
				'--json',
				'--token=test',
			])
			.it(
				'should update AI agent and output response (JSON Output)',
				(context) => {
					assert.equal(context.stdout, fixture);
				}
			);

		test.nock(TEST_API_ROOT, (api) =>
			api
				.put('/2.0/ai_agents/12345', expectedRequestBody)
				.reply(200, expectedResponseBody)
		)
			.stdout()
			.command([
				'ai-agents:update',
				'12345',
				'--name=Updated Contract Review Agent',
				'--access-state=disabled',
				'--token=test',
			])
			.it(
				'should update AI agent and output response (YAML Output)',
				(context) => {
					assert.equal(context.stdout, yamlFixture);
				}
			);
	});

	describe('ai-agents:delete', function () {
		test.nock(TEST_API_ROOT, (api) =>
			api.delete('/2.0/ai_agents/12345').reply(204)
		)
			.stderr()
			.command(['ai-agents:delete', '12345', '--token=test'])
			.it('should delete AI agent and output success message', (context) => {
				assert.include(context.stderr, 'Deleted AI agent 12345');
			});
	});
});
