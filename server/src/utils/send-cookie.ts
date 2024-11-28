import { Response } from 'express'
import jwt from 'jsonwebtoken'
import env from './validate-ENV'
export const sendUserSessionCookie = (user: any, res: Response, message: string, statuscode = 200) =>
{
    const token = jwt.sign({ _id: user._id }, env.JWT_URL)  //making the token out of user id and assiging a key to verity that token
    res.cookie('token', token, {
        secure: process.env.NODE_ENV === 'production',
        httpOnly: true,
        sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
        expires: new Date(Date.now() + 2592000000),
    }).json({
        user,
        token,
        success: true,
        message
    }).status(statuscode)

}