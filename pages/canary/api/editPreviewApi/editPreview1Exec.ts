import { FireworksAIStream } from "../../../../utils/llama3/FireworksAIStream";
import { OpenAIStream } from "../../../../utils/OpenAIChatStream";
// a bunch of states to be input into prompts of payloads

if (!process.env.OPENAI_API_KEY) {
  throw new Error("Missing env var from OpenAI");
}

export const config = {
  runtime: "edge",
  regions: ["iad1"],
};

// TODO: Remove withApiKeyValidation for `runtime: 'edge'` case
export default async function editPreview1Exec(request, response) {
  const {
    promptContentExec,
    editInputExec,

    userInput,
    variantID,
  } = await request.json();

  console.log("promptContentExec:", promptContentExec);
  console.log("editInputExec:", editInputExec);

  const editPromptExec = `
    You are a professional consultant, and a client approaches you and ask you to edit the Executive Summary of their a business plan. 
    
    This is the Executive Summary of the client's business plan (it uses html tags):
    ${promptContentExec}
    
    This is what the client wants you to edit:
    ${editInputExec}
    
    everything in the edited Executive Summary should remain the same execpt for the changes the client wants you to make. Make sure that all content is in the relevant html tags.
    This is the edited version of the Executive Summary you came up with:
    `;

  if (variantID === "2") {
    const payload = {
      messages: [{ role: "user", content: editPromptExec }],
      temperature: 0.5,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
      max_tokens: 1500,
      stream: true,
      n: 1,
    };
    return FireworksAIStream(payload);
  } else {
    const payload = {
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: editPromptExec }],
      temperature: 0.5,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
      max_tokens: 2000,
      stream: true,
      n: 1,
    };
    return OpenAIStream(payload);
  }
}
