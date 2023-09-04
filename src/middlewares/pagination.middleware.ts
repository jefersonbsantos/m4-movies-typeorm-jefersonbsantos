import { NextFunction, Request, Response } from "express";
import { PaginationParams } from "../interfaces/pagination.interfaces";

export const pagination = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const queryPage: number = Number(req.query.page);
  const queryPerPage: number = Number(req.query.perPage);

  const page: number = queryPage && queryPage > 1 ? queryPage : 1;
  const perPage: number =
    queryPerPage && queryPerPage <= 5 && queryPerPage > 0 ? queryPerPage : 5;

  const baseUrl: string = "http://localhost:3000/movies";
  const prevPage: string = `${baseUrl}?page=${page - 1}&perPage=${perPage}`;
  const nextPage: string = `${baseUrl}?page=${page + 1}&perPage=${perPage}`;

  const queryOrder: any = req.query.order;
  const querySort: any = req.query.sort;

  const orderOpts: Array<string> = ["asc", "desc"];
  const sortOpts: Array<string> = ["price", "duration"];

  let order: string;
  let sort: string;

  if (!(querySort && sortOpts.includes(querySort))) {
    sort = "id";
  } else {
    sort = querySort;
  }

  if (!querySort || !(queryOrder && orderOpts.includes(queryOrder))) {
    order = "asc";
  } else {
    order = queryOrder;
  }

  const paginationObject: PaginationParams = {
    page: perPage * (page - 1),
    perPage,
    order,
    sort,
    prevPage,
    nextPage,
  };

  res.locals = { ...res.locals, paginationObject };

  return next();
};
