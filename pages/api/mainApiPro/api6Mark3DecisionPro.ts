import { CustomerDecisionPro } from '../generators/pro/customerDecision';
// a bunch of states to be input into prompts of payloads

if (!process.env.OPENAI_API_KEY) {
  throw new Error('Missing env var from OpenAI');
}

export const config = {
  runtime: 'edge',
  regions: ['iad1'],
};

// TODO: Remove withApiKeyValidation for `runtime: 'edge'` case
export default async function api6Mark3DecisionPro(request) {
  return CustomerDecisionPro(await request.json());
}
