import { executiveSummary } from '../generators/executiveSummary'

if (!process.env.OPENAI_API_KEY) {
  throw new Error('Missing env var from OpenAI');
}

export const config = {
  runtime: 'edge',
  regions: ['iad1'],
};

export default async function api1Exec(request, response) {
  // TODO: Please remove then test fallback AI Model pass
  // if (request.modelName !== 'gpt-3.5-turbo') {
  //   response.status(500).json({ error: 'Internal Server Error' });
  // }
  return executiveSummary(await request.json())
}
