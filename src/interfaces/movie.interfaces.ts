import { z } from "zod";
import {
  movieCreateSchema,
  movieUpsdateSchema,
} from "../schemas/movie.schemas";
import { Movie } from "../entities";
import { Repository } from "typeorm";

type MovieCreate = z.infer<typeof movieCreateSchema>;
type MovieRead = Array<Movie>;
type MovieUpdate = z.infer<typeof movieUpsdateSchema>;

type MovieRepo = Repository<Movie>;

export { MovieCreate, MovieRead, MovieUpdate, MovieRepo };
