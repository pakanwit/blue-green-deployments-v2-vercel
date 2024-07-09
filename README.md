
Notes: removed variantID and experimentID from signup.ts. put it back in when running new experiment

-----------------------------------------------------------------------------------
current experimentID: -




past experiments ---------------------------------------------------------------------------------------

0001_TalkToPlan: conversion rate and RecScore doesn't seem to change but many people are using the feature so we went with the new version

0002_CTAV2:
Test files:
LastStepPlanGenVAR1: VAR2 of 0001_TalkToPlan
LastStepPlanGenVAR2: new call to action feature including new customer testimonial and new competitor comparison message
indexVAR1: original index with updated content
indexVAR2: added customer testimonial section
conclusion: increase in conversion, new feature adopted

0003_AIInputs
Test files:
Step3CustGroup VAR1 VAR2
Step4Product VAR1 VAR2
Step5KeySuccess VAR1 VAR2
Step6InitialInvestment VAR1 VAR2
VAR1 is original
VAR2 has AI input helpers
conclusion: increase in conversion, new feature adopted

## How to run Localazy

1. Add text to public/locales/en/*.json
2. Run `npm run upload` and all added text will be automatically uploaded to the Localazy server.
3. Go to [Localazy for 15minuteplan](https://localazy.com/o/15minuteplan.ai)
4. Translate into all languages.
5. Run `npm run download`, and all changed files will appear.
