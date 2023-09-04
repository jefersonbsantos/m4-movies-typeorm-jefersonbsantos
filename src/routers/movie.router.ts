import { Router } from "express";
import movieControllers from "../controllers/movie.controllers";
import { validateBody } from "../middlewares/validateBody.middleaware";
import { movieCreateSchema, movieUpdateSchema } from "../schemas/movie.schemas";
import { verifyIdExists } from "../middlewares/verifyIdExists.middleware";
import { pagination } from "../middlewares/pagination.middleware";
import { verifyNameExists } from "../middlewares/verifyNameExists.middleware";

export const movieRouter: Router = Router();

movieRouter.post(
  "",
  validateBody(movieCreateSchema),
  verifyNameExists,
  movieControllers.create
);
movieRouter.get("", pagination, movieControllers.read);

movieRouter.use("/:id", verifyIdExists);

movieRouter.patch(
  "/:id",
  validateBody(movieUpdateSchema),
  verifyNameExists,
  movieControllers.update
);
movieRouter.delete("/:id", movieControllers.deleteMovie);
