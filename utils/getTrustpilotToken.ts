export interface TrustPilotAccessToken {
  refresh_token_expires_in: string;
  api_product_list: string;
  api_product_list_json: string;
  organization_name: string;
  'developer.email': string;
  token_type: string;
  issued_at: string;
  client_id: string;
  access_token: string;
  application_name: string;
  scope: string;
  expires_in: string;
  refresh_count: string;
  status: string;
  error: string;
}

export const getTrustpilotAccessToken = async () => {
  const clientId = process.env.TRUSTPILOT_API_KEY;
  const clientSecret = process.env.TRUSTPILOT_CLIENT_SECRET;

  const header = new Headers();
  header.append(
    'Authorization',
    `Basic ${Buffer.from(`${clientId}:${clientSecret}`).toString('base64')}`,
  );

  const body = new URLSearchParams();
  body.append('grant_type', 'client_credentials');
  body.append('client_id', clientId);
  body.append('client_secret', clientSecret);

  const requestOptions = {
    method: 'POST',
    headers: header,
    body: body,
  };

  try {
    const res = await fetch(
      `https://api.trustpilot.com/v1/oauth/oauth-business-users-for-applications/accesstoken`,
      requestOptions,
    );

    const data: TrustPilotAccessToken = await res.json();
    return data;
  } catch (error) {
    return { error: error.message } as TrustPilotAccessToken;
  }
};
