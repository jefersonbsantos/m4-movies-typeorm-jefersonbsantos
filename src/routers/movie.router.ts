import { Router } from "express";
import movieControllers from "../controllers/movie.controllers";
import { validateBody } from "../middlewares/validateBody.middleaware";
import {
  movieCreateSchema,
  movieUpsdateSchema,
} from "../schemas/movie.schemas";
import { verifyIdExists } from "../middlewares/verifyIdExists.middleware";

export const movieRouter: Router = Router();

movieRouter.post("", validateBody(movieCreateSchema), movieControllers.create);
movieRouter.get("", movieControllers.read);

movieRouter.use("/:id", verifyIdExists);

movieRouter.patch(
  "/:id",
  validateBody(movieUpsdateSchema),
  movieControllers.update
);
movieRouter.delete("/:id", movieControllers.deleteMovie);
