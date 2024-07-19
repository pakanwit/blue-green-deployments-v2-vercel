import { jsonrepair } from 'jsonrepair';

export async function FireworksAI(payload, format = 'json') {
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

  if (format === 'json') {
    return new Response(jsonrepair(responseBody.choices[0].message.content));
  } else if (format === 'string') {
    return responseBody.choices[0].message.content;
  } else {
    throw Error('Non-support format');
  }
}
