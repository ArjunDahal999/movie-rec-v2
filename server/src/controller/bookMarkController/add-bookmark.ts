import { NextFunction, Request, Response } from "express";
import { BookMarkModel } from "../../models/bookMarkModel/bookmark-model";


export const addBookMark = async (req: Request, res: Response, next: NextFunction) =>
{
    try
    {
        const { directorcast, vote_count, imageUrl, vote_average, tagline, status, cast, director, budget, genres, keywords, homepage, original_language, original_title, overview, popularity, release_date, revenue, runtime } = req.body;
        const userId = res.locals.user
        const addTask = await BookMarkModel.create({
            directorcast,
            vote_count,
            vote_average,
            tagline,
            status,
            cast,
            director,
            budget,
            genres,
            keywords,
            homepage,
            original_language,
            original_title,
            overview,
            popularity,
            release_date: new Date(release_date).toISOString(),
            revenue,
            runtime,
            imageUrl,
            user: userId
        })
        res.json({ success: true, message: "BookMarked" })
    } catch (error)
    {
        console.log(error)
        next(error);
    }
};
