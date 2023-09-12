import { Response } from 'express';

export const sendNotFoundResponse = (res: Response, message: string) => {
  return res.status(404).json({ error: message });
};

export const sendBadRequestResponse = (res: Response, message: string) => {
  return res.status(400).json({ error: message });
};

export const sendInternalServerErrorResponse = (
  res: Response,
  message: string,
) => {
  return res.status(500).json({ error: message });
};

export const sendForbiddenResponse = (res: Response, message: string) => {
  return res.status(403).json({ error: message });
};

export const sendUnauthorizedResponse = (res: Response, message: string) => {
  return res.status(401).json({ error: message });
};
