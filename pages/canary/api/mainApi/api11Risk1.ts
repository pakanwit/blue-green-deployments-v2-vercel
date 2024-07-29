import { riskAndMitigationPlan } from '../generators/riskAndMitigationPlan'

if (!process.env.OPENAI_API_KEY) {
  throw new Error('Missing env var from OpenAI');
}

export const config = {
  runtime: 'edge',
  regions: ['iad1'],
};

export default async function api11Risk1(request, response) {
  return riskAndMitigationPlan(await request.json())
}
