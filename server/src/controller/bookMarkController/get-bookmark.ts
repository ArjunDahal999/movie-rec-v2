import { NextFunction, Request, Response } from "express";
import { BookMarkModel } from "../../models/bookMarkModel/bookmark-model";
import { handleRevenueQuery } from "../../helper/getRevenue";
import { create } from "domain";

export const getBookMarks = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { movieTitle } = req.query;
    const userId: string = res.locals.user;
    const data = await BookMarkModel.findOne({
      original_title: movieTitle,
      user: userId,
    });
    if (!data) {
      res.json({ success: false, message: "BookMark not found" });
    } else {
      res.json({
        success: true,
        message: "BookMark Fetched",
        data: {
          movies: data,
        },
      });
    }
  } catch (error) {
    next(error);
  }
};
