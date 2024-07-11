import { managementPlan } from '../generators/managementPlan'

if (!process.env.OPENAI_API_KEY) {
  throw new Error('Missing env var from OpenAI');
}

export const config = {
  runtime: 'edge',
  regions: ['iad1'],
};

export default async function api9Mang1(request, response) {
  return managementPlan(await request.json())
}