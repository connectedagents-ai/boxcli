'use strict';

const { test } = require('@oclif/test');
const assert = require('chai').assert;
const { TEST_API_ROOT, getFixture } = require('../helpers/test-helper');

describe('AI Studio', function () {
	describe('ai-studio:agents', function () {
		const expectedResponseBody = {
			limit: 25,
			next_marker: null,
			prev_marker: null,
			entries: [
				{
					id: '12345',
					type: 'ai_agent',
					origin: 'box_custom',
					name: 'Contract Review Agent',
					access_state: 'enabled',
					created_at: '2024-01-15T10:30:00Z',
					modified_at: '2024-01-15T10:30:00Z',
				},
			],
		};

		const fixture = getFixture('ai-studio/get_ai_agents_response');

		test.nock(TEST_API_ROOT, (api) =>
			api.get('/2.0/ai_agents').reply(200, expectedResponseBody)
		)
			.stdout()
			.command(['ai-studio:agents', '--json', '--token=test'])
			.it(
				'should list AI agents and output the response (JSON Output)',
				(context) => {
					assert.equal(context.stdout, fixture);
				}
			);

		test.nock(TEST_API_ROOT, (api) =>
			api
				.get('/2.0/ai_agents')
				.query({ mode: 'ask' })
				.reply(200, expectedResponseBody)
		)
			.stdout()
			.command([
				'ai-studio:agents',
				'--mode=ask',
				'--json',
				'--token=test',
			])
			.it('should filter AI agents by mode', (context) => {
				assert.equal(context.stdout, fixture);
			});
	});

	describe('ai-studio:agents:get', function () {
		const expectedResponseBody = {
			id: '12345',
			type: 'ai_agent',
			origin: 'box_custom',
			name: 'Contract Review Agent',
			access_state: 'enabled',
			created_at: '2024-01-15T10:30:00Z',
			modified_at: '2024-01-15T10:30:00Z',
		};

		const fixture = getFixture('ai-studio/get_ai_agent_by_id_response');

		test.nock(TEST_API_ROOT, (api) =>
			api.get('/2.0/ai_agents/12345').reply(200, expectedResponseBody)
		)
			.stdout()
			.command([
				'ai-studio:agents:get',
				'12345',
				'--json',
				'--token=test',
			])
			.it(
				'should get an AI agent by ID and output the response (JSON Output)',
				(context) => {
					assert.equal(context.stdout, fixture);
				}
			);
	});

	describe('ai-studio:agents:create', function () {
		const expectedRequestBody = {
			type: 'ai_agent',
			name: 'Contract Review Agent',
			access_state: 'enabled',
		};

		const expectedResponseBody = {
			id: '12345',
			type: 'ai_agent',
			origin: 'box_custom',
			name: 'Contract Review Agent',
			access_state: 'enabled',
			created_at: '2024-01-15T10:30:00Z',
			modified_at: '2024-01-15T10:30:00Z',
		};

		const fixture = getFixture('ai-studio/create_ai_agent_response');

		test.nock(TEST_API_ROOT, (api) =>
			api
				.post('/2.0/ai_agents', expectedRequestBody)
				.reply(201, expectedResponseBody)
		)
			.stdout()
			.command([
				'ai-studio:agents:create',
				'--name=Contract Review Agent',
				'--access-state=enabled',
				'--json',
				'--token=test',
			])
			.it(
				'should create an AI agent and output the response (JSON Output)',
				(context) => {
					assert.equal(context.stdout, fixture);
				}
			);
	});

	describe('ai-studio:agents:update', function () {
		const expectedRequestBody = {
			type: 'ai_agent',
			name: 'Updated Contract Review Agent',
			access_state: 'disabled',
		};

		const expectedResponseBody = {
			id: '12345',
			type: 'ai_agent',
			origin: 'box_custom',
			name: 'Updated Contract Review Agent',
			access_state: 'disabled',
			created_at: '2024-01-15T10:30:00Z',
			modified_at: '2024-01-16T10:30:00Z',
		};

		const fixture = getFixture('ai-studio/update_ai_agent_response');

		test.nock(TEST_API_ROOT, (api) =>
			api
				.put('/2.0/ai_agents/12345', expectedRequestBody)
				.reply(200, expectedResponseBody)
		)
			.stdout()
			.command([
				'ai-studio:agents:update',
				'12345',
				'--name=Updated Contract Review Agent',
				'--access-state=disabled',
				'--json',
				'--token=test',
			])
			.it(
				'should update an AI agent and output the response (JSON Output)',
				(context) => {
					assert.equal(context.stdout, fixture);
				}
			);
	});

	describe('ai-studio:agents:delete', function () {
		test.nock(TEST_API_ROOT, (api) =>
			api.delete('/2.0/ai_agents/12345').reply(204)
		)
			.stdout()
			.stderr()
			.command([
				'ai-studio:agents:delete',
				'12345',
				'--yes',
				'--token=test',
			])
			.it('should delete an AI agent', (context) => {
				assert.include(context.stderr, 'Successfully deleted AI agent 12345');
			});
	});
});
