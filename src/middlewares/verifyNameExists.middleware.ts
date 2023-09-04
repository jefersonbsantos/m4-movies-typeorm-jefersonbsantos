import { NextFunction, Request, Response } from "express";
import { Movie } from "../entities";
import { movieRepo } from "../repositories";
import AppError from "../errors/App.error";

export const verifyNameExists = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { name } = req.body;

  if (!name) {
    return next();
  }

  const foundMovie: Movie | null = await movieRepo.findOne({
    where: { name: name },
  });

  if (foundMovie) throw new AppError("Movie already exists.", 409);

  return next();
};
