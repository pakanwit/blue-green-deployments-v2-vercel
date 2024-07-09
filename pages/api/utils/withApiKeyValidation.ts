import { API_KEY, API_KEY_HEADER } from '../constants';

export const withApiKeyValidation = (originalHandler) => {
  return async (req, res?) => {
    const providedApiKey = req.headers[API_KEY_HEADER];

    if (!providedApiKey || providedApiKey !== API_KEY) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    await originalHandler(req, res);
  };
};
