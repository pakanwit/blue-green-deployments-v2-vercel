import { marketingBusinessObjectivesPro } from '../generators/pro/marketingBusinessObjectives';
// a bunch of states to be input into prompts of payloads

if (!process.env.OPENAI_API_KEY) {
  throw new Error('Missing env var from OpenAI');
}

export const config = {
  runtime: 'edge',
  regions: ['iad1'],
};

// TODO: Remove withApiKeyValidation for `runtime: 'edge'` case
export default async function api4Mark1ObjPro(request) {
  return marketingBusinessObjectivesPro(await request.json());
}
//  Don't specify through which means the objectives will be accomplished.
