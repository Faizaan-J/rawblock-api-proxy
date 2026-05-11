import type { VercelRequest, VercelResponse } from '@vercel/node';

const handler = async (request: VercelRequest, response: VercelResponse) => {
  response.status(200).json({
    body: 'Success',
    query: request.query,
    cookies: request.cookies,
  });
}

export default handler;
