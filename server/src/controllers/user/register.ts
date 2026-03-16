import { Request, Response } from "express";
import { createUser } from "../../services/user/registerService";

export default async function registerUser(req: Request, res: Response) {
  const user = await createUser(req.body);
  res.status(201).json(user);
}
