import { managementStructurePro } from '../generators/pro/management/managementStructure';
// a bunch of states to be input into prompts of payloads

if (!process.env.OPENAI_API_KEY) {
  throw new Error('Missing env var from OpenAI');
}

export const config = {
  runtime: 'edge',
  regions: ['iad1'],
};

// TODO: Remove withApiKeyValidation for `runtime: 'edge'` case
export default async function api14Mang1StrucRolePro(request) {
  return managementStructurePro(await request.json());
}
