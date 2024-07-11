import { AIStream, StreamingTextResponse } from 'ai';

export async function FireworksAIStream(payload) {
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

  const stream = AIStream(
    response,
    (data) => JSON.parse(data).choices[0].delta.content,
  );

  return new StreamingTextResponse(stream);
}
