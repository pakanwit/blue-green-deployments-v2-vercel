import { situationAnalysisIndustryOverview } from '../generators/situationAnalysis/industryOverview'

if (!process.env.OPENAI_API_KEY) {
  throw new Error('Missing env var from OpenAI');
}

export const config = {
  runtime: 'edge',
  regions: ['iad1'],
};

export default async function api2Situ1(request, response) {
  return situationAnalysisIndustryOverview(await request.json())
}
