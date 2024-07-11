import { OpenAIStream } from '../../../utils/OpenAIChatStream';
// a bunch of states to be input into prompts of payloads

if (!process.env.OPENAI_API_KEY) {
  throw new Error('Missing env var from OpenAI');
}

export const config = {
  runtime: 'edge',
  regions: ['iad1'],
};

// TODO: Remove withApiKeyValidation for `runtime: 'edge'` case
export default async function editStarter(request, response) {
  const {
    existingContent,
    editInstruction,

    sectionName,
    parsedPositioning, // not using this
    planLanguage,
  } = await request.json();

  console.log('planLanguage: ', planLanguage);

  let positioningPromptEN = '';
  if (parsedPositioning)
    positioningPromptEN = `This is the additional positioning information the client wants you to consider when editing the Marketing section. Don't metion this information in the completion, but use it to inform your edits:
    ${parsedPositioning}`;

  const editPromptEN = `
    You are a professional consultant, and a client approaches you and ask you to edit the ${sectionName} of their a business plan. 
    
    This is the ${sectionName} of the client's business plan (it uses html tags):
    ${existingContent}
    
    This is what the client wants you to edit:
    ${editInstruction}
    
    everything in the edited ${sectionName} should remain the same execpt for the changes the client wants you to make. Make sure that all content is in the relevant html tags.
    This is the edited version of the ${sectionName} you came up with:
    `;

  //german lang--------------------------------------------------------------------------
  let positioningPromptDE = '';
  if (parsedPositioning)
    positioningPromptDE = `Dies sind die zusätzlichen Positionierungsinformationen, die der Kunde bei der Bearbeitung des Abschnitts „Marketing“ berücksichtigen sollte. Erwähnen Sie diese Informationen nicht im Abschluss, sondern nutzen Sie sie als Grundlage für Ihre Änderungen:
    ${parsedPositioning}`;

  const editPromptDE = `
  Sie sind ein professioneller Berater und ein Kunde kommt auf Sie zu und bittet Sie, den ${sectionName} seines Geschäftsplans zu bearbeiten.
  
    Dies ist der ${sectionName} des Geschäftsplans des Kunden (es werden HTML-Tags verwendet):
    ${existingContent}
  
    Der Kunde möchte, dass Sie Folgendes bearbeiten:
    ${editInstruction}
  
    Alles im bearbeiteten ${sectionName} sollte gleich bleiben, mit Ausnahme der Änderungen, die der Client von Ihnen verlangt. Stellen Sie sicher, dass sich alle Inhalte in den relevanten HTML-Tags befinden.
    Fertigstellung auf Deutsch generieren.
    Dies ist die bearbeitete Version von ${sectionName}, die Sie erstellt haben:
  `;

  let editPromptFinal = '';
  if (planLanguage === 'en') {
    editPromptFinal = editPromptEN;
  } else if (planLanguage === 'de') {
    editPromptFinal = editPromptDE;
  } else {
    console.log('no planLanguage detected, defaulting to english');
    editPromptFinal = editPromptEN;
  }

  console.log('editPromptFinal', editPromptFinal);

  const payload = {
    model: 'gpt-3.5-turbo',
    messages: [{ role: 'user', content: editPromptFinal }],
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
