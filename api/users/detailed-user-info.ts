import type { VercelRequest, VercelResponse } from '@vercel/node';
import detailedUserInfoURL from '../../urls/DetailedUserInfoURL';
import APIEntry from '../../classes/APIEntry';

const handler = async (request: VercelRequest, response: VercelResponse) => {
  const { userId } = request.query;
  const fetchResponse = await fetch(detailedUserInfoURL.generate(Number(userId)));
  const userInfo = await fetchResponse.json();

  response.status(200).json({
    body: userInfo,
    query: request.query,
    cookies: request.cookies,
  });
}

const entry = new APIEntry(handler);

export default entry.getGeneratedFunction();
