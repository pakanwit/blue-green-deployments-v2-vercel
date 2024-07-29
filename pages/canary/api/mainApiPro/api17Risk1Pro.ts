import { riskAndMigrationPro } from '../generators/pro/riskAndMigration';
// a bunch of states to be input into prompts of payloads

if (!process.env.OPENAI_API_KEY) {
  throw new Error('Missing env var from OpenAI');
}

export const config = {
  runtime: 'edge',
  regions: ['iad1'],
};

// TODO: Remove withApiKeyValidation for `runtime: 'edge'` case
export default async function api17Risk1Pro(request) {
  return riskAndMigrationPro(await request.json());
}
