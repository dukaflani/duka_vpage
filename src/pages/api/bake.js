import cookie from 'cookie';

export default function handler(req, res) {
    if (req.method === 'POST') {
        const refreshToken = req.body.refreshToken
        // const accessToken = req.body.accessToken
        res.setHeader('Set-Cookie', [
            cookie.serialize(
                'd_rt_df', refreshToken, {
                    httpOnly: true,
                    secure: process.env.NODE_ENV !== 'development',
                    maxAge: 60 * 60 * 24 * 365,
                    sameSite: 'strict',
                    path: '/',
                    domain:process.env.NODE_ENV !== 'development' && process.env.COOKIE_DOMAIN
                }
            ),

        ]);
        res.status(200).json({ message: 'Cookie Successfully Baked. Yummmy!!!' })
    }
}