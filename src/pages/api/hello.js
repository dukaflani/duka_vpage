import cookie from 'cookie';

export default function handler(req, res) {
  if (req.method === 'GET') {
    const cookies = cookie.parse(req.headers.cookie ?? ' ');
    const refresh = cookies.d_rt_df ?? false

    if (refresh === false) {
      return res.status(401).json({
          error: 'User not logged in'
      });
  } else {
    res.status(200).json({ token: refresh })
  }

  } else {
    res.setHeader('Allow', ['POST']);
        return res.status(405).json({
            error: `Method ${req.method} not allowed`
        });
  }
}
