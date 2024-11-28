import { NextFunction, Request, Response } from "express";

export const logout = (req: Request, res: Response, next: NextFunction) =>
{
    try
    {
        const { token } = req.cookies;
        console.log(token)
        res
            .cookie("token", "", {
                expires: new Date(Date.now()),
                secure: process.env.NODE_ENV === "development" ? false : true,
                httpOnly: process.env.NODE_ENV === "development" ? false : true,
                sameSite: process.env.NODE_ENV === "development" ? false : "none",
            })
            .status(200)
            .json({ success: true, message: "Logout Successful" })
    } catch (error)
    {
        console.log(error)
        next(error);
    }

}