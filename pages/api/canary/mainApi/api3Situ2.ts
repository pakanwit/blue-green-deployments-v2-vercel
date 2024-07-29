import { situationAnalysisSwotAnalysis } from '../generators/situationAnalysis/swotAnalysis'

if (!process.env.OPENAI_API_KEY) {
  throw new Error('Missing env var from OpenAI');
}

export const config = {
  runtime: 'edge',
  regions: ['iad1'],
};

export default async function api3Situ2(request, response) {
  return situationAnalysisSwotAnalysis(await request.json())
}
