import connectMongo from '../../../database/conn';
import {
  ITrustpilotInvitationLinksResponse,
  getRealUserModel,
} from '../../../model/Schema';
import { getTrustpilotAccessToken } from '../../../utils/getTrustpilotToken';
import { withApiKeyValidation } from '../utils/withApiKeyValidation';

async function POST(request, response) {
  await connectMongo();
  const businessUnitId = process.env.TRUSTPILOT_BUSINESS_UNIT_ID;
  const { email } = request.body;
  const name = email?.split('@')[0];
  const token = await getTrustpilotAccessToken();

  const header = new Headers();
  header.append('Authorization', `Bearer ${token.access_token}`);
  header.append('Content-Type', 'application/json');

  const body = {
    locationId: '',
    referenceId: '',
    email: email ?? '',
    name: name ?? '',
    locale: 'en-US',
    tags: [],
    redirectUri: 'http://trustpilot.com',
  };

  const requestOptions = {
    method: 'POST',
    headers: header,
    body: JSON.stringify(body),
  };

  try {
    const res = await fetch(
      `https://invitations-api.trustpilot.com/v1/private/business-units/${businessUnitId}/invitation-links`,
      requestOptions,
    );
    const data: ITrustpilotInvitationLinksResponse = await res.json();
    const Users = getRealUserModel();
    const user = await Users.findOne({ email });
    if (!user) {
      return response.status(500).json({
        error: 'User not found',
      } as ITrustpilotInvitationLinksResponse);
    }
    await Users.updateOne(
      { email },
      {
        $set: {
          trustpilotInvitationId: 'fdaa8507872ea7433b455208cb8dc019',
        },
      },
    );
    response.status(200).json(data);
  } catch (error) {
    response
      .status(500)
      .json({ error: error.message } as ITrustpilotInvitationLinksResponse);
  }
}

export default withApiKeyValidation(POST);
