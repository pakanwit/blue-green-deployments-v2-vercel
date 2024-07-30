import { jsonrepair } from 'jsonrepair';

export async function OpenAIChat(payload, format = 'string') {
  try {
    const start = Date.now();
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.OPENAI_API_KEY ?? ''}`,
      },
      method: 'POST',
      body: JSON.stringify(payload),
    });
    const end = Date.now();

    console.log({
      message: 'OpenAIChat: API response time (ms)',
      start,
      end,
      time: end - start,
    });

    const responseBody = await response.json();

    console.log({ message: 'OpenAIChat: API response', responseBody });

    const content = responseBody.choices[0].message.content;

    if (format === 'string') {
      return content;
    } else if (format === 'json') {
      return new Response(jsonrepair(content));
    } else {
      throw Error('Non-support format');
    }
  } catch (error) {
    console.error('OpenAIChat error:', error);
    throw error;
  }
}
