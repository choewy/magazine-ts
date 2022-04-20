import { Request, Response } from 'express';
import { UserSignupDto, UserSigninDto } from './users.dto';

export const UserSignup = async (
  req: Request<UserSignupDto>,
  res: Response
): Promise<Response> => {
  const userSignupDto: UserSignupDto = req.body;
  return res.status(201).send({ userSignupDto });
};

export const UserSignin = async (
  req: Request<UserSigninDto>,
  res: Response
): Promise<Response> => {
  const userSigninDto: UserSigninDto = req.body;
  return res.status(200).send({ userSigninDto });
};
