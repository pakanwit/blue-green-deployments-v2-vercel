import { advertisingStrategy } from '../generators/advertisingStrategy'

if (!process.env.OPENAI_API_KEY) {
  throw new Error('Missing env var from OpenAI');
}

export const config = {
  runtime: 'edge',
  regions: ['iad1'],
};

export default async function api7Mark4(request, response) {
  return advertisingStrategy(await request.json())
}
