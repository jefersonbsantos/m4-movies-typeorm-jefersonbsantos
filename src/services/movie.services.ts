import { Movie } from "../entities";
import {
  MovieCreate,
  MovieRead,
  MovieUpdate,
} from "../interfaces/movie.interfaces";
import {
  Pagination,
  PaginationParams,
} from "../interfaces/pagination.interfaces";
import { movieRepo } from "../repositories";

const create = async (payload: MovieCreate): Promise<Movie> => {
  const movie: Movie = await movieRepo.save(payload);

  return movie;
};

const read = async ({
  page,
  perPage,
  order,
  sort,
  prevPage,
  nextPage,
}: PaginationParams): Promise<Pagination> => {
  const [movies, count]: Array<MovieRead | number> =
    await movieRepo.findAndCount({
      order: { [sort]: order },
      skip: page,
      take: perPage,
    });

  return {
    prevPage: page <= 1 ? null : prevPage,
    nextPage: count - page <= perPage ? null : nextPage,
    count,
    data: movies,
  };
};

const update = async (movie: Movie, payload: MovieUpdate): Promise<Movie> => {
  return await movieRepo.save({ ...movie, ...payload });
};

const deleteMovie = async (movie: Movie): Promise<void> => {
  await movieRepo.remove(movie);
};

export default { create, read, update, deleteMovie };
