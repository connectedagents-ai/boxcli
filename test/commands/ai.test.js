'use strict';

const { test } = require('@oclif/test');
const assert = require('chai').assert;
const { TEST_API_ROOT, getFixture } = require('../helpers/test-helper');

function getAgentInRequestBody(type) {
	const agent = {
		type,
		basic_text: {
			llm_endpoint_params: {
				type: 'openai_params',
				frequency_penalty: 1.5,
				presence_penalty: 1.5,
				stop: '<|im_end|>',
				temperature: 0,
				top_p: 1,
			},
			model: 'azure__openai__gpt_4o_mini',
			num_tokens_for_completion: 8400,
			prompt_template:
				'It is, consider these travel options and answer the.',
			system_message:
				'You are a helpful travel assistant specialized in budget travel',
		},
		long_text: {
			embeddings: {
				model: 'azure__openai__text_embedding_ada_002',
				strategy: {
					id: 'basic',
					num_tokens_per_chunk: 64,
				},
			},
			llm_endpoint_params: {
				type: 'openai_params',
				frequency_penalty: 1.5,
				presence_penalty: 1.5,
				stop: '<|im_end|>',
				temperature: 0,
				top_p: 1,
			},
			model: 'azure__openai__gpt_4o_mini',
			num_tokens_for_completion: 8400,
			prompt_template:
				'It is , consider these travel options and answer the.',
			system_message:
				'You are a helpful travel assistant specialized in budget travel',
		},
	};
	return agent;
}

describe('AI', function () {
	describe('ai:ask', function () {
		const expectedRequestBody = {
			items: [
				{
					id: '12345',
					type: 'file',
					content: 'one,two,three',
				},
			],
			mode: 'single_item_qa',
			prompt: 'What is the status of this document?',
		};

		const expectedResponseBody = {
			answer: 'The document is currently in review and awaiting approval.',
			created_at: '2024-07-09T11:29:46.835Z',
			completion_reason: 'done',
			ai_agent_info: {
				models: [
					{
						name: 'google__gemini_2_0_flash_001',
						provider: 'google',
					},
				],
				processor: 'basic_text',
			},
		};

		const fixture = getFixture('ai/post_ai_ask_response');
		const yamlFixture = getFixture('ai/post_ai_ask_response_yaml.txt');

		test.nock(TEST_API_ROOT, (api) =>
			api
				.post('/2.0/ai/ask', expectedRequestBody)
				.reply(200, expectedResponseBody)
		)
			.stdout()
			.command([
				'ai:ask',
				'--items=content=one,two,three,id=12345,type=file',
				'--prompt',
				'What is the status of this document?',
				'--json',
				'--token=test',
			])
			.it(
				'should send the correct request and output the response (JSON Output)',
				(context) => {
					assert.equal(context.stdout, fixture);
				}
			);

		test.nock(TEST_API_ROOT, (api) =>
			api
				.post('/2.0/ai/ask', expectedRequestBody)
				.reply(200, expectedResponseBody)
		)
			.stdout()
			.command([
				'ai:ask',
				'--items=content=one,two,three,id=12345,type=file',
				'--prompt',
				'What is the status of this document?',
				'--token=test',
			])
			.it(
				'should send the correct request and output the response (YAML Output)',
				(context) => {
					assert.equal(context.stdout, yamlFixture);
				}
			);
	});

	describe('ai:ask with ai_agent', function () {
		const expectedRequestBody = {
			items: [
				{
					id: '12345',
					type: 'file',
					content: 'one,two,three',
				},
			],
			mode: 'single_item_qa',
			prompt: 'What is the status of this document?',
			ai_agent: getAgentInRequestBody('ai_agent_ask'),
		};

		const expectedResponseBody = {
			answer: 'The document is currently in review and awaiting approval.',
			created_at: '2024-07-09T11:29:46.835Z',
			completion_reason: 'done',
			ai_agent_info: {
				models: [
					{
						name: 'google__gemini_2_0_flash_001',
						provider: 'google',
					},
				],
				processor: 'basic_text',
			},
		};

		const fixture = getFixture('ai/post_ai_ask_response');
		const yamlFixture = getFixture('ai/post_ai_ask_response_yaml.txt');

		test.nock(TEST_API_ROOT, (api) => {
			api.post('/2.0/ai/ask', expectedRequestBody).reply(
				200,
				expectedResponseBody
			);
		})
			.stdout()
			.command([
				'ai:ask',
				'--items=content=one,two,three,id=12345,type=file',
				'--prompt',
				'What is the status of this document?',
				'--ai-agent',
				'{"type":"ai_agent_ask","basicText":{"llmEndpointParams":{"type":"openai_params","frequencyPenalty": 1.5,"presencePenalty": 1.5,"stop": "<|im_end|>","temperature": 0,"topP": 1},"model": "azure__openai__gpt_4o_mini","numTokensForCompletion": 8400,"promptTemplate": "It is, consider these travel options and answer the.","systemMessage": "You are a helpful travel assistant specialized in budget travel"},"longText":{"embeddings":{ "model": "azure__openai__text_embedding_ada_002","strategy":{"id": "basic","numTokensPerChunk": 64}},"llmEndpointParams":{"type":"openai_params","frequencyPenalty": 1.5,"presencePenalty": 1.5,"stop": "<|im_end|>","temperature": 0,"topP": 1},"model":"azure__openai__gpt_4o_mini","numTokensForCompletion":8400,"promptTemplate":"It is , consider these travel options and answer the.","systemMessage":"You are a helpful travel assistant specialized in budget travel"}}',
				'--json',
				'--token=test',
			])

			.it(
				'should send the correct request and output the response (JSON Output)',
				(context) => {
					assert.equal(context.stdout, fixture);
				}
			);

		test.nock(TEST_API_ROOT, (api) => {
			api.post('/2.0/ai/ask', expectedRequestBody).reply(
				200,
				expectedResponseBody
			);
		})
			.stdout()
			.command([
				'ai:ask',
				'--items=content=one,two,three,id=12345,type=file',
				'--prompt',
				'What is the status of this document?',
				'--ai-agent',
				'{"type":"ai_agent_ask","basicText":{"llmEndpointParams":{"type":"openai_params","frequencyPenalty": 1.5,"presencePenalty": 1.5,"stop": "<|im_end|>","temperature": 0,"topP": 1},"model": "azure__openai__gpt_4o_mini","numTokensForCompletion": 8400,"promptTemplate": "It is, consider these travel options and answer the.","systemMessage": "You are a helpful travel assistant specialized in budget travel"},"longText":{"embeddings":{ "model": "azure__openai__text_embedding_ada_002","strategy":{"id": "basic","numTokensPerChunk": 64}},"llmEndpointParams":{"type":"openai_params","frequencyPenalty": 1.5,"presencePenalty": 1.5,"stop": "<|im_end|>","temperature": 0,"topP": 1},"model":"azure__openai__gpt_4o_mini","numTokensForCompletion":8400,"promptTemplate":"It is , consider these travel options and answer the.","systemMessage":"You are a helpful travel assistant specialized in budget travel"}}',
				'--token=test',
			])

			.it(
				'should send the correct request and output the response (YAML Output)',
				(context) => {
					assert.equal(context.stdout, yamlFixture);
				}
			);
	});

	describe('ai:text-gen', function () {
		const expectedRequestBody = {
			prompt: 'What is the status of this document?',
			items: [{ id: '12345', type: 'file', content: 'one,two,three' }],
			dialogue_history: [
				{
					prompt: 'What is the status of this document, signatures?',
					answer: 'It is in review, waiting for signatures.',
					created_at: '2024-07-09T11:29:46+00:00',
				},
			],
		};
		const expectedResponseBody = {
			answer: 'The document is currently in review and awaiting approval.',
			created_at: '2024-07-09T11:29:46.835Z',
			completion_reason: 'done',
		};
		const fixture = getFixture('ai/post_ai_text_gen_response');
		const yamlFixture = getFixture('ai/post_ai_text_gen_response_yaml.txt');

		test.nock(TEST_API_ROOT, (api) =>
			api
				.post('/2.0/ai/text_gen', expectedRequestBody)
				.reply(200, expectedResponseBody)
		)
			.stdout()
			.command([
				'ai:text-gen',
				'--dialogue-history',
				'prompt=What is the status of this document, signatures?,answer=It is in review, waiting for signatures.,created-at=2024-07-09T11:29:46.835Z',
				'--items=content=one,two,three,id=12345,type=file',
				'--prompt',
				'What is the status of this document?',
				'--json',
				'--token=test',
			])
			.it(
				'should send the correct request and output the response (JSON Output)',
				(context) => {
					assert.equal(context.stdout, fixture);
				}
			);

		test.nock(TEST_API_ROOT, (api) =>
			api
				.post('/2.0/ai/text_gen', expectedRequestBody)
				.reply(200, expectedResponseBody)
		)
			.stdout()
			.command([
				'ai:text-gen',
				'--dialogue-history',
				'prompt=What is the status of this document, signatures?,answer=It is in review, waiting for signatures.,created-at=2024-07-09T11:29:46.835Z',
				'--items=content=one,two,three,id=12345,type=file',
				'--prompt',
				'What is the status of this document?',
				'--token=test',
			])
			.it(
				'should send the correct request and output the response (YAML Output)',
				(context) => {
					assert.equal(context.stdout, yamlFixture);
				}
			);
	});

	describe('ai:extract', function () {
		const expectedRequestBody = {
			prompt: 'firstName, lastName, location, yearOfBirth, company',
			items: [
				{
					id: '12345',
					type: 'file',
					content: 'one,two,three',
				},
			],
		};
		const expectedResponseBody = {
			answer: '{"firstName": "John", "lastName": "Doe", "location": "San Francisco", "yearOfBirth": "1990", "company": "Box"}',
			created_at: '2025-05-02T14:51:30.567Z',
			completion_reason: 'done',
			ai_agent_info: {
				models: [
					{
						name: 'google__gemini_2_0_flash_001',
						provider: 'google',
					},
				],
				processor: 'basic_text',
			},
		};

		const fixture = getFixture('ai/post_ai_extract_response');
		const yamlFixture = getFixture('ai/post_ai_extract_response_yaml.txt');

		test.nock(TEST_API_ROOT, (api) => {
			api.post('/2.0/ai/extract', expectedRequestBody).reply(
				200,
				expectedResponseBody
			);
		})
			.stdout()
			.command([
				'ai:extract',
				'--items=content=one,two,three,id=12345,type=file',
				'--prompt',
				'firstName, lastName, location, yearOfBirth, company',
				'--json',
				'--token=test',
			])

			.it(
				'should send the correct request and output the response (JSON Output)',
				(context) => {
					assert.equal(context.stdout, fixture);
				}
			);

		test.nock(TEST_API_ROOT, (api) => {
			api.post('/2.0/ai/extract', expectedRequestBody).reply(
				200,
				expectedResponseBody
			);
		})
			.stdout()
			.command([
				'ai:extract',
				'--items=content=one,two,three,id=12345,type=file',
				'--prompt',
				'firstName, lastName, location, yearOfBirth, company',
				'--token=test',
			])

			.it(
				'should send the correct request and output the response (YAML Output)',
				(context) => {
					assert.equal(context.stdout, yamlFixture);
				}
			);
	});

	describe('ai:extract-structured', function () {
		const expectedRequestBody = {
			items: [
				{
					id: '12345',
					type: 'file',
					content: 'one,two,three',
				},
			],
			fields: [
				{
					key: 'firstName',
					type: 'string',
					description: 'Person first name',
					prompt: 'What is the first name?',
					displayName: 'First name',
					options: [{ key: 'First Name' }, { key: 'Last Name' }],
				},
			],
		};
		const expectedResponseBody = {
			answer: {
				firstName: 'John',
				lastName: 'Doe',
			},
			created_at: '2025-04-29T07:25:24.366-07:00',
			completion_reason: 'done',
			ai_agent_info: {
				models: [
					{
						name: 'google__gemini_2_0_flash_001',
						provider: 'google',
					},
				],
				processor: 'basic_text',
			},
		};

		const fixture = getFixture('ai/post_ai_extract_structured_response');
		const yamlFixture = getFixture(
			'ai/post_ai_extract_structured_response_yaml.txt'
		);

		test.nock(TEST_API_ROOT, (api) => {
			api.post('/2.0/ai/extract_structured', expectedRequestBody).reply(
				200,
				expectedResponseBody
			);
		})
			.stdout()
			.command([
				'ai:extract-structured',
				'--items=content=one,two,three,id=12345,type=file',
				'--fields=key=firstName,type=string,description=Person first name,prompt=What is the first name?,displayName=First name,options=First Name; Last Name',
				'--json',
				'--token=test',
			])

			.it(
				'should send the correct request and output the response (JSON Output)',
				(context) => {
					assert.equal(context.stdout, fixture);
				}
			);

		test.nock(TEST_API_ROOT, (api) => {
			api.post('/2.0/ai/extract_structured', expectedRequestBody).reply(
				200,
				expectedResponseBody
			);
		})
			.stdout()
			.command([
				'ai:extract-structured',
				'--items=content=one,two,three,id=12345,type=file',
				'--fields=key=firstName,type=string,description=Person first name,prompt=What is the first name?,displayName=First name,options=First Name;Last Name',
				'--token=test',
			])

			.it(
				'should send the correct request and output the response (YAML Output)',
				(context) => {
					assert.equal(context.stdout, yamlFixture);
				}
			);
	});

	describe('ai:extract-structured with ai_agent', function () {
		const expectedRequestBody = {
			items: [
				{
					id: '12345',
					type: 'file',
					content: 'one,two,three',
				},
			],
			fields: [
				{
					key: 'firstName',
					type: 'string',
					description: 'Person first name',
					prompt: 'What is the first name?',
					displayName: 'First name',
					options: [{ key: 'First Name' }],
				},
			],
			ai_agent: getAgentInRequestBody('ai_agent_extract_structured'),
		};
		const expectedResponseBody = {
			answer: {
				firstName: 'John',
				lastName: 'Doe',
			},
			created_at: '2025-04-29T07:25:24.366-07:00',
			completion_reason: 'done',
			ai_agent_info: {
				models: [
					{
						name: 'google__gemini_2_0_flash_001',
						provider: 'google',
					},
				],
				processor: 'basic_text',
			},
		};

		const fixture = getFixture('ai/post_ai_extract_structured_response');
		const yamlFixture = getFixture(
			'ai/post_ai_extract_structured_response_yaml.txt'
		);

		test.nock(TEST_API_ROOT, (api) => {
			api.post('/2.0/ai/extract_structured', expectedRequestBody).reply(
				200,
				expectedResponseBody
			);
		})
			.stdout()
			.command([
				'ai:extract-structured',
				'--items=content=one,two,three,id=12345,type=file',
				'--fields=key=firstName,type=string,description=Person first name,prompt=What is the first name?,displayName=First name,options=First Name',
				'--ai-agent',
				'{"type":"ai_agent_extract_structured","basicText":{"llmEndpointParams":{"type":"openai_params","frequencyPenalty": 1.5,"presencePenalty": 1.5,"stop": "<|im_end|>","temperature": 0,"topP": 1},"model": "azure__openai__gpt_4o_mini","numTokensForCompletion": 8400,"promptTemplate": "It is, consider these travel options and answer the.","systemMessage": "You are a helpful travel assistant specialized in budget travel"},"longText":{"embeddings":{ "model": "azure__openai__text_embedding_ada_002","strategy":{"id": "basic","numTokensPerChunk": 64}},"llmEndpointParams":{"type":"openai_params","frequencyPenalty": 1.5,"presencePenalty": 1.5,"stop": "<|im_end|>","temperature": 0,"topP": 1},"model":"azure__openai__gpt_4o_mini","numTokensForCompletion":8400,"promptTemplate":"It is , consider these travel options and answer the.","systemMessage":"You are a helpful travel assistant specialized in budget travel"}}',
				'--json',
				'--token=test',
			])

			.it(
				'should send the correct request and output the response (JSON Output)',
				(context) => {
					assert.equal(context.stdout, fixture);
				}
			);

		test.nock(TEST_API_ROOT, (api) => {
			api.post('/2.0/ai/extract_structured', expectedRequestBody).reply(
				200,
				expectedResponseBody
			);
		})
			.stdout()
			.command([
				'ai:extract-structured',
				'--items=content=one,two,three,id=12345,type=file',
				'--fields=key=firstName,type=string,description=Person first name,prompt=What is the first name?,displayName=First name,options=First Name',
				'--ai-agent',
				'{"type":"ai_agent_extract_structured","basicText":{"llmEndpointParams":{"type":"openai_params","frequencyPenalty": 1.5,"presencePenalty": 1.5,"stop": "<|im_end|>","temperature": 0,"topP": 1},"model": "azure__openai__gpt_4o_mini","numTokensForCompletion": 8400,"promptTemplate": "It is, consider these travel options and answer the.","systemMessage": "You are a helpful travel assistant specialized in budget travel"},"longText":{"embeddings":{ "model": "azure__openai__text_embedding_ada_002","strategy":{"id": "basic","numTokensPerChunk": 64}},"llmEndpointParams":{"type":"openai_params","frequencyPenalty": 1.5,"presencePenalty": 1.5,"stop": "<|im_end|>","temperature": 0,"topP": 1},"model":"azure__openai__gpt_4o_mini","numTokensForCompletion":8400,"promptTemplate":"It is , consider these travel options and answer the.","systemMessage":"You are a helpful travel assistant specialized in budget travel"}}',
				'--token=test',
			])

			.it(
				'should send the correct request and output the response (YAML Output)',
				(context) => {
					assert.equal(context.stdout, yamlFixture);
				}
			);
	});

	describe('ai:extract with ai agent', function () {
		const expectedRequestBody = {
			prompt: 'firstName, lastName, location, yearOfBirth, company',
			items: [
				{
					id: '12345',
					type: 'file',
					content: 'one,two,three',
				},
			],
			ai_agent: getAgentInRequestBody('ai_agent_extract'),
		};
		const expectedResponseBody = {
			answer: '{"firstName": "John", "lastName": "Doe", "location": "San Francisco", "yearOfBirth": "1990", "company": "Box"}',
			created_at: '2025-05-02T14:51:30.567Z',
			completion_reason: 'done',
			ai_agent_info: {
				models: [
					{
						name: 'google__gemini_2_0_flash_001',
						provider: 'google',
					},
				],
				processor: 'basic_text',
			},
		};

		const fixture = getFixture('ai/post_ai_extract_response');
		const yamlFixture = getFixture('ai/post_ai_extract_response_yaml.txt');

		test.nock(TEST_API_ROOT, (api) => {
			api.post('/2.0/ai/extract', expectedRequestBody).reply(
				200,
				expectedResponseBody
			);
		})
			.stdout()
			.command([
				'ai:extract',
				'--items=content=one,two,three,id=12345,type=file',
				'--prompt',
				'firstName, lastName, location, yearOfBirth, company',
				'--ai-agent',
				'{"type":"ai_agent_extract","basicText":{"llmEndpointParams":{"type":"openai_params","frequencyPenalty": 1.5,"presencePenalty": 1.5,"stop": "<|im_end|>","temperature": 0,"topP": 1},"model": "azure__openai__gpt_4o_mini","numTokensForCompletion": 8400,"promptTemplate": "It is, consider these travel options and answer the.","systemMessage": "You are a helpful travel assistant specialized in budget travel"},"longText":{"embeddings":{ "model": "azure__openai__text_embedding_ada_002","strategy":{"id": "basic","numTokensPerChunk": 64}},"llmEndpointParams":{"type":"openai_params","frequencyPenalty": 1.5,"presencePenalty": 1.5,"stop": "<|im_end|>","temperature": 0,"topP": 1},"model":"azure__openai__gpt_4o_mini","numTokensForCompletion":8400,"promptTemplate":"It is , consider these travel options and answer the.","systemMessage":"You are a helpful travel assistant specialized in budget travel"}}',
				'--json',
				'--token=test',
			])

			.it(
				'should send the correct request and output the response (JSON Output)',
				(context) => {
					assert.equal(context.stdout, fixture);
				}
			);

		test.nock(TEST_API_ROOT, (api) => {
			api.post('/2.0/ai/extract', expectedRequestBody).reply(
				200,
				expectedResponseBody
			);
		})
			.stdout()
			.command([
				'ai:extract',
				'--items=content=one,two,three,id=12345,type=file',
				'--prompt',
				'firstName, lastName, location, yearOfBirth, company',
				'--ai-agent',
				'{"type":"ai_agent_extract","basicText":{"llmEndpointParams":{"type":"openai_params","frequencyPenalty": 1.5,"presencePenalty": 1.5,"stop": "<|im_end|>","temperature": 0,"topP": 1},"model": "azure__openai__gpt_4o_mini","numTokensForCompletion": 8400,"promptTemplate": "It is, consider these travel options and answer the.","systemMessage": "You are a helpful travel assistant specialized in budget travel"},"longText":{"embeddings":{ "model": "azure__openai__text_embedding_ada_002","strategy":{"id": "basic","numTokensPerChunk": 64}},"llmEndpointParams":{"type":"openai_params","frequencyPenalty": 1.5,"presencePenalty": 1.5,"stop": "<|im_end|>","temperature": 0,"topP": 1},"model":"azure__openai__gpt_4o_mini","numTokensForCompletion":8400,"promptTemplate":"It is , consider these travel options and answer the.","systemMessage":"You are a helpful travel assistant specialized in budget travel"}}',
				'--token=test',
			])

			.it(
				'should send the correct request and output the response (YAML Output)',
				(context) => {
					assert.equal(context.stdout, yamlFixture);
				}
			);
	});

	describe('ai:extract-structured with metadata template', function () {
		const expectedRequestBody = {
			items: [
				{
					id: '12345',
					type: 'file',
					content: 'one,two,three',
				},
			],
			metadata_template: {
				type: 'metadata_template',
				scope: 'enterprise',
				template_key: 'test',
			},
		};
		const expectedResponseBody = {
			answer: {
				firstName: 'John',
				lastName: 'Doe',
			},
			created_at: '2025-04-29T07:25:24.366-07:00',
			completion_reason: 'done',
			ai_agent_info: {
				models: [
					{
						name: 'google__gemini_2_0_flash_001',
						provider: 'google',
					},
				],
				processor: 'basic_text',
			},
		};

		const fixture = getFixture('ai/post_ai_extract_structured_response');
		const yamlFixture = getFixture(
			'ai/post_ai_extract_structured_response_yaml.txt'
		);

		test.nock(TEST_API_ROOT, (api) => {
			api.post('/2.0/ai/extract_structured', expectedRequestBody).reply(
				200,
				expectedResponseBody
			);
		})
			.stdout()
			.command([
				'ai:extract-structured',
				'--items=content=one,two,three,id=12345,type=file',
				'--metadata-template=type=metadata_template,scope=enterprise,template_key=test',
				'--json',
				'--token=test',
			])

			.it(
				'should send the correct request and output the response (JSON Output)',
				(context) => {
					assert.equal(context.stdout, fixture);
				}
			);

		test.nock(TEST_API_ROOT, (api) => {
			api.post('/2.0/ai/extract_structured', expectedRequestBody).reply(
				200,
				expectedResponseBody
			);
		})
			.stdout()
			.command([
				'ai:extract-structured',
				'--items=content=one,two,three,id=12345,type=file',
				'--metadata-template=type=metadata_template,scope=enterprise,template_key=test',
				'--token=test',
			])

			.it(
				'should send the correct request and output the response (YAML Output)',
				(context) => {
					assert.equal(context.stdout, yamlFixture);
				}
			);
	});

	describe('ai-agents', function () {
		const listExpectedResponseBody = {
			entries: [
				{
					id: '12345',
					type: 'ai_agent',
					origin: 'enterprise',
					name: 'Test Agent',
					access_state: 'enabled',
					created_by: {
						id: '11111',
						type: 'user',
					},
					created_at: '2024-01-15T18:00:00.000Z',
					modified_by: {
						id: '11111',
						type: 'user',
					},
					modified_at: '2024-01-15T18:00:00.000Z',
				},
			],
			limit: 100,
		};
		const listFixture = getFixture('ai/get_ai_agents_response');
		const listYamlFixture = getFixture('ai/get_ai_agents_response_yaml.txt');

		test.nock(TEST_API_ROOT, (api) =>
			api.get('/2.0/ai_agents').reply(200, listExpectedResponseBody)
		)
			.stdout()
			.command(['ai-agents', '--json', '--token=test'])
			.it(
				'should list AI agents and output the response (JSON Output)',
				(context) => {
					assert.equal(context.stdout, listFixture);
				}
			);

		test.nock(TEST_API_ROOT, (api) =>
			api.get('/2.0/ai_agents').reply(200, listExpectedResponseBody)
		)
			.stdout()
			.command(['ai-agents', '--token=test'])
			.it(
				'should list AI agents and output the response (YAML Output)',
				(context) => {
					assert.equal(context.stdout, listYamlFixture);
				}
			);

		test.nock(TEST_API_ROOT, (api) =>
			api
				.get('/2.0/ai_agents')
				.query({ mode: 'ask,text_gen' })
				.reply(200, listExpectedResponseBody)
		)
			.stdout()
			.command([
				'ai-agents',
				'--mode=ask',
				'--mode=text_gen',
				'--json',
				'--token=test',
			])
			.it(
				'should list AI agents filtered by mode',
				(context) => {
					assert.equal(context.stdout, listFixture);
				}
			);
	});

	describe('ai-agents:get', function () {
		const getExpectedResponseBody = {
			id: '12345',
			type: 'ai_agent',
			origin: 'enterprise',
			name: 'Test Agent',
			access_state: 'enabled',
			created_by: {
				id: '11111',
				type: 'user',
			},
			created_at: '2024-01-15T18:00:00.000Z',
			modified_by: {
				id: '11111',
				type: 'user',
			},
			modified_at: '2024-01-15T18:00:00.000Z',
		};
		const getByIdFixture = getFixture('ai/get_ai_agent_by_id_response');
		const getByIdYamlFixture = getFixture('ai/get_ai_agent_by_id_response_yaml.txt');

		test.nock(TEST_API_ROOT, (api) =>
			api.get('/2.0/ai_agents/12345').reply(200, getExpectedResponseBody)
		)
			.stdout()
			.command(['ai-agents:get', '12345', '--json', '--token=test'])
			.it(
				'should get AI agent by ID and output the response (JSON Output)',
				(context) => {
					assert.equal(context.stdout, getByIdFixture);
				}
			);

		test.nock(TEST_API_ROOT, (api) =>
			api.get('/2.0/ai_agents/12345').reply(200, getExpectedResponseBody)
		)
			.stdout()
			.command(['ai-agents:get', '12345', '--token=test'])
			.it(
				'should get AI agent by ID and output the response (YAML Output)',
				(context) => {
					assert.equal(context.stdout, getByIdYamlFixture);
				}
			);
	});

	describe('ai-agents:create', function () {
		const createExpectedRequestBody = {
			type: 'ai_agent',
			name: 'My New Agent',
			access_state: 'enabled',
			ask: {
				access_state: 'enabled',
			},
		};

		const createExpectedResponseBody = {
			id: '12345',
			type: 'ai_agent',
			origin: 'enterprise',
			name: 'My New Agent',
			access_state: 'enabled',
			created_by: {
				id: '11111',
				type: 'user',
			},
			created_at: '2024-01-15T18:00:00.000Z',
			modified_by: {
				id: '11111',
				type: 'user',
			},
			modified_at: '2024-01-15T18:00:00.000Z',
		};
		const createFixture = getFixture('ai/post_ai_agent_response');
		const createYamlFixture = getFixture('ai/post_ai_agent_response_yaml.txt');

		test.nock(TEST_API_ROOT, (api) =>
			api
				.post('/2.0/ai_agents', createExpectedRequestBody)
				.reply(201, createExpectedResponseBody)
		)
			.stdout()
			.command([
				'ai-agents:create',
				'--name=My New Agent',
				'--access-state=enabled',
				'--ask={"accessState": "enabled"}',
				'--json',
				'--token=test',
			])
			.it(
				'should create AI agent and output the response (JSON Output)',
				(context) => {
					assert.equal(context.stdout, createFixture);
				}
			);

		test.nock(TEST_API_ROOT, (api) =>
			api
				.post('/2.0/ai_agents', createExpectedRequestBody)
				.reply(201, createExpectedResponseBody)
		)
			.stdout()
			.command([
				'ai-agents:create',
				'--name=My New Agent',
				'--access-state=enabled',
				'--ask={"accessState": "enabled"}',
				'--token=test',
			])
			.it(
				'should create AI agent and output the response (YAML Output)',
				(context) => {
					assert.equal(context.stdout, createYamlFixture);
				}
			);
	});

	describe('ai-agents:update', function () {
		const updateExpectedRequestBody = {
			type: 'ai_agent',
			name: 'Updated Agent Name',
		};

		const updateExpectedResponseBody = {
			id: '12345',
			type: 'ai_agent',
			origin: 'enterprise',
			name: 'Updated Agent Name',
			access_state: 'enabled',
			created_by: {
				id: '11111',
				type: 'user',
			},
			created_at: '2024-01-15T18:00:00.000Z',
			modified_by: {
				id: '11111',
				type: 'user',
			},
			modified_at: '2024-01-15T20:00:00.000Z',
		};
		const updateFixture = getFixture('ai/put_ai_agent_response');
		const updateYamlFixture = getFixture('ai/put_ai_agent_response_yaml.txt');

		test.nock(TEST_API_ROOT, (api) =>
			api
				.put('/2.0/ai_agents/12345', updateExpectedRequestBody)
				.reply(200, updateExpectedResponseBody)
		)
			.stdout()
			.command([
				'ai-agents:update',
				'12345',
				'--name=Updated Agent Name',
				'--json',
				'--token=test',
			])
			.it(
				'should update AI agent and output the response (JSON Output)',
				(context) => {
					assert.equal(context.stdout, updateFixture);
				}
			);

		test.nock(TEST_API_ROOT, (api) =>
			api
				.put('/2.0/ai_agents/12345', updateExpectedRequestBody)
				.reply(200, updateExpectedResponseBody)
		)
			.stdout()
			.command([
				'ai-agents:update',
				'12345',
				'--name=Updated Agent Name',
				'--token=test',
			])
			.it(
				'should update AI agent and output the response (YAML Output)',
				(context) => {
					assert.equal(context.stdout, updateYamlFixture);
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
