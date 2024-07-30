import { jsonrepair } from 'jsonrepair';

export const FireworksAI = async (payload) => {
  try {
    const response = await fetch(
      'https://api.fireworks.ai/inference/v1/chat/completions',
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${process.env.FIREWORKS_API_KEY ?? ''}`,
        },
        method: 'POST',
        body: JSON.stringify({
          ...payload,
          model: 'accounts/fireworks/models/llama-v3-70b-instruct',
        }),
      },
    );

    const responseBody = await response.json();

    return new Response(jsonrepair(responseBody.choices[0].message.content));
  } catch (error) {
    console.error('Fireworks error:', error);
    return '';
  }
};
