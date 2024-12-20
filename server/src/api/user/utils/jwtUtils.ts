import jwt from 'jsonwebtoken';
export const createJWT = (res: any, userId: any) => {
    const token = jwt.sign({ userId }, process.env.JWT_SECRET_KEY as string, {
        expiresIn: '24h'
    })

    return res.cookie('token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV !== 'development',
        sameSite: "None",
        maxAge: 24 * 60 * 60 * 1000
    })
}