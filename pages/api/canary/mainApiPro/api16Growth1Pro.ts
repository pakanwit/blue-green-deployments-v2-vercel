import { growthStrategyPro } from '../generators/pro/growthStrategy';
// a bunch of states to be input into prompts of payloads

if (!process.env.OPENAI_API_KEY) {
  throw new Error('Missing env var from OpenAI');
}

export const config = {
  runtime: 'edge',
  regions: ['iad1'],
};

// TODO: Remove withApiKeyValidation for `runtime: 'edge'` case
export default async function api16Growth1Pro(request) {
  return growthStrategyPro(await request.json());
}
