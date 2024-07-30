import { AIStream, StreamingTextResponse } from 'ai';

export async function OpenAIStream(payload) {
  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${process.env.OPENAI_API_KEY ?? ''}`,
    },
    method: 'POST',
    body: JSON.stringify(payload),
  });

  const stream = AIStream(
    response,
    (data) => JSON.parse(data).choices[0].delta.content,
  );

  return new StreamingTextResponse(stream);
}
