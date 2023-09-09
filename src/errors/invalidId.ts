import { Response } from 'express';

export const sendInvalidIdResponse = (res: Response, model: string) => {
  return res.status(400).json({ error: `Invalid ${model} ID` });
};
