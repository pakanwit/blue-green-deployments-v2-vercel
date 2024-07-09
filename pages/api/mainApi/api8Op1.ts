import { operationsKeyActivities } from '../generators/operationsKeyActivities'

if (!process.env.OPENAI_API_KEY) {
  throw new Error('Missing env var from OpenAI');
}

export const config = {
  runtime: 'edge',
  regions: ['iad1'],
};

export default async function api8Op1(request, response) {
  return operationsKeyActivities(await request.json())
}
