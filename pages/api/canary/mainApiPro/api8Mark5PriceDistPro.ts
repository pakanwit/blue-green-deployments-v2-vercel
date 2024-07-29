import { pricingStrategyPro } from '../generators/pro/pricingStrategy';
// a bunch of states to be input into prompts of payloads

if (!process.env.OPENAI_API_KEY) {
  throw new Error('Missing env var from OpenAI');
}

export const config = {
  runtime: 'edge',
  regions: ['iad1'],
};

// TODO: Remove withApiKeyValidation for `runtime: 'edge'` case
export default async function api8Mark5PriceDistPro(request) {
  return pricingStrategyPro(await request.json());
}
// For Pricing strategy topic, there are 3 major pricing strategies: value-based pricing, cost-based pricing,and competition-based pricing. Select one of these strategies and explain the reason behind why you selected that particular strategy and explain how you will implement that strategy and be very descriptive.
