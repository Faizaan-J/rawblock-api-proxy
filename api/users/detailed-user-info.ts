import type { VercelRequest, VercelResponse } from '@vercel/node';
import detailedUserInfoURL from '../../urls/DetailedUserInfoURL';

import { ZodError } from "zod";

const handler = async (request: VercelRequest, response: VercelResponse) => {
  const urlResult = detailedUserInfoURL.generate(request.query);
  if (!(urlResult instanceof URL)) {
    response.status(400).json({
      error: "Invalid query parameters",
      details: urlResult,
    });
    return;
  }
  const fetchResponse = await fetch(urlResult);
  const userInfo = await fetchResponse.json();

  response.status(200).json({
    body: userInfo,
    query: request.query,
    cookies: request.cookies,
  });
}

export default handler;
