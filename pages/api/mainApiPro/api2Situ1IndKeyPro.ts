import { OpenAIStream } from '../../../utils/OpenAIChatStream';
import { industryOverviewProHandler } from '../generators/pro/situationAnalysis/industryOverview';
// a bunch of states to be input into prompts of payloads

if (!process.env.OPENAI_API_KEY) {
  throw new Error('Missing env var from OpenAI');
}

export const config = {
  runtime: 'edge',
  regions: ['iad1'],
};

// TODO: Remove withApiKeyValidation for `runtime: 'edge'` case
export default async function api2Situ1IndKeyPro(request) {
  return industryOverviewProHandler(await request.json());
}
