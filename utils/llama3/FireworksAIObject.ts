import { createOpenAI } from '@ai-sdk/openai';
import { generateObject } from 'ai';

const fireworks = createOpenAI({
  apiKey: process.env.FIREWORKS_API_KEY ?? '',
  baseURL: 'https://api.fireworks.ai/inference/v1',
});

export const FireworksAIObject = async (payload) => {
  try {
    const { object } = await generateObject({
      ...payload,
      model: fireworks('accounts/fireworks/models/llama-v3-70b-instruct'),
      mode: 'json',
    });
    return JSON.stringify(object, null, 2);
  } catch (error) {
    console.error('Fireworks error:', error);
    return '';
  }
};
