import { Request, Response } from "express";
import { Movie } from "../entities";
import movieServices from "../services/movie.services";
import { Pagination } from "../interfaces/pagination.interfaces";

const create = async (req: Request, res: Response): Promise<Response> => {
  const movie: Movie = await movieServices.create(req.body);

  return res.status(201).json(movie);
};

const read = async (req: Request, res: Response): Promise<Response> => {
  const { paginationObject } = res.locals;
  const movies: Pagination = await movieServices.read(paginationObject);

  return res.status(200).json(movies);
};

const update = async (req: Request, res: Response): Promise<Response> => {
  const { foundMovie } = res.locals;

  const movie: Movie = await movieServices.update(foundMovie, req.body);
  return res.status(200).json(movie);
};

const deleteMovie = async (req: Request, res: Response): Promise<Response> => {
  await movieServices.deleteMovie(res.locals.foundMovie);

  return res.status(204).json();
};

export default { create, read, update, deleteMovie };
