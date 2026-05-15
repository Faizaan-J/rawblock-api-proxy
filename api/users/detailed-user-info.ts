import type { VercelRequest, VercelResponse } from '@vercel/node';

const handler = async (request: VercelRequest, response: VercelResponse) => {
  const { userId } = request.query;
  const userInfo = await fetch(`https://users.roblox.com/v1/users/${userId}/`);

  response.status(200).json({
    body: userInfo.body,
    query: request.query,
    cookies: request.cookies,
  });
}

export default handler;
