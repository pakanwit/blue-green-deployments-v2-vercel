import { AdvertisingStragetyPro } from '../generators/pro/advertisingStrategy';
// a bunch of states to be input into prompts of payloads

if (!process.env.OPENAI_API_KEY) {
  throw new Error('Missing env var from OpenAI');
}

export const config = {
  runtime: 'edge',
  regions: ['iad1'],
};

// TODO: Remove withApiKeyValidation for `runtime: 'edge'` case
export default async function api9Mark6AdPro(request) {
  return AdvertisingStragetyPro(await request.json());
}
