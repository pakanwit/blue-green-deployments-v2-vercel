import { segmentation } from '../generators/segmentation'

if (!process.env.OPENAI_API_KEY) {
  throw new Error('Missing env var from OpenAI');
}

export const config = {
  runtime: 'edge',
  regions: ['iad1'],
};

export default async function api5Mark2(request, response) {
  return segmentation(await request.json())
}
