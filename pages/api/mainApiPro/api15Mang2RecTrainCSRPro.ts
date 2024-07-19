import { recruitmentAndTrainingAndCSRPro } from '../generators/pro/management/recruitmentAndTrainingAndCSR';
// a bunch of states to be input into prompts of payloads

if (!process.env.OPENAI_API_KEY) {
  throw new Error('Missing env var from OpenAI');
}

export const config = {
  runtime: 'edge',
  regions: ['iad1'],
};

// TODO: Remove withApiKeyValidation for `runtime: 'edge'` case
export default async function api15Mang2RecTrainCSRPro(request) {
  return recruitmentAndTrainingAndCSRPro(await request.json());
}
