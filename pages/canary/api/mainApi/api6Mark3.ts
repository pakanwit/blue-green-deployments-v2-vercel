import { productStrategy } from '../generators/productStrategy'

if (!process.env.OPENAI_API_KEY) {
  throw new Error('Missing env var from OpenAI');
}

export const config = {
  runtime: 'edge',
  regions: ['iad1'],
};

export default async function api6Mark3(request, response) {
  return productStrategy(await request.json())
}
