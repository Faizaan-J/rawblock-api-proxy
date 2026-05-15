import type { VercelRequest, VercelResponse } from '@vercel/node';

const handler = async (request: VercelRequest, response: VercelResponse) => {
  const { userId } = request.query;
  const fetchResponse = await fetch(`https://users.roblox.com/v1/users/${userId}/`);
  const userInfo = await fetchResponse.json();

  response.status(200).json({
    body: userInfo,
    query: request.query,
    cookies: request.cookies,
  });
}

export default handler;
