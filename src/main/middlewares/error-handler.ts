import { ApplicationError } from '@/domain';
import { NextFunction, Request, Response } from 'express';

export const errorHandler = (
  err: Error,
  request: Request,
  response: Response,
  next: NextFunction,
) => {
  if (err instanceof ApplicationError) {
    return response.status(err.statusCode).json({
      origin: 'Application',
      message: err.message,
    });
  }

  return response.status(500).json({
    origin: 'Server',
    message: `Internal server error - ${err.message}`,
  });
};
