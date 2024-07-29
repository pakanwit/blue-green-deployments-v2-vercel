import { marketingBusinessObjectives } from '../generators/marketingBusinessObjectives'
if (!process.env.OPENAI_API_KEY) {
  throw new Error('Missing env var from OpenAI');
}

export const config = {
  runtime: 'edge',
  regions: ['iad1'],
};

export default async function api4Mark1(request, response) {
  return marketingBusinessObjectives(await request.json())
}
