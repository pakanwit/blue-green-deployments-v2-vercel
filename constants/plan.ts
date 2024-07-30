export const planType = {
  STARTER: 'starter',
  PRO: 'pro',
}

export type PlanType = typeof planType[keyof typeof planType]

export const price = {
  STARTER_SPECIAL: 36,
  STARTER: 69,
  PRO_SPECIAL: 48,
  PRO: 99,
}

export const AI_MODEL = {
  GPT_3_5_TURBO: 'gpt-3.5-turbo',
  GPT_4O_MINI: 'gpt-4o-mini',
}
