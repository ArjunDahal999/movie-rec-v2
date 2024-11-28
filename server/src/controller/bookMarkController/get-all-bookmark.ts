import { NextFunction, Request, Response } from "express";
import { BookMarkModel } from "../../models/bookMarkModel/bookmark-model";
import { handleRevenueQuery } from "../../helper/getRevenue";
import { create } from "domain";

export const getAllBookMarks = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> =>
{
    try
    {
        const {
            pageno,
            revenue,
            sort,
            startDate,
            endDate,
        } = req.query as {
            pageno: string;
            revenue?: string;
            sort?: string;
            startDate?: string;
            endDate?: string;
        };
        let revenueData: any = {};
        let dateQuery: any = {};

        if (revenue)
        {
            revenueData = handleRevenueQuery(revenue);
        }

        if (startDate && endDate)
        {
            dateQuery = {
                release_date: {
                    $gte: new Date(Date.parse(startDate)),
                    $lte: new Date(Date.parse(endDate)),
                },
            };
        }

        console.log(dateQuery);
        const take: number = 8;
        const skip: number = (parseInt(pageno) - 1) * take;
        const userId: string = res.locals.user;
        const query: any = { user: userId, ...revenueData, ...dateQuery };
        console.log(query);

        let sortOptions: any = { createdAt: -1 };
        if (sort === "revenueasc")
        {
            sortOptions = { revenue: 1 };
        } else if (sort === "revenuedesc")
        {
            sortOptions = { revenue: -1 };
        }

        const allTodoCountForPagination: number = await BookMarkModel.countDocuments(
            query
        );
        const allTodo = await BookMarkModel.find(query)
            .skip(skip)
            .limit(take)
            .sort(sortOptions);

        res.json({
            success: true,
            message: "BookMark Fetched",
            data: {
                allTodo,
                count: allTodoCountForPagination,
            },
        });
    } catch (error)
    {
        next(error);
    }
};
