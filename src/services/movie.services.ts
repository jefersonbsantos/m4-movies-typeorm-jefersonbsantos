import { Movie } from "../entities";
import {
  MovieCreate,
  MovieRead,
  MovieUpdate,
} from "../interfaces/movie.interfaces";
import { movieRepo } from "../repositories";

const create = async (payload: MovieCreate): Promise<Movie> => {
  const movie: Movie = await movieRepo.save(payload);

  return movie;
};

const read = async (): Promise<MovieRead> => {
  const movie: MovieRead = await movieRepo.find();

  return movie;
};

const update = async (movie: Movie, payload: MovieUpdate): Promise<Movie> => {
  return await movieRepo.save({ ...movie, ...payload });
};

const deleteMovie = async (movie: Movie): Promise<void> => {
  await movieRepo.remove(movie);
};

export default { create, read, update, deleteMovie };
