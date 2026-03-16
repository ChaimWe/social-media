import { Request } from 'express';

export interface UserPayload {
  id: string;
  name: string;
}

export interface AuthRequest extends Request {
  user?: UserPayload;
}