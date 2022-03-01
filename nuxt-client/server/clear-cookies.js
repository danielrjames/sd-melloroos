import { token } from '../utils/auth';

export default (req, res) => {
  res.setHeader('Set-Cookie', [
    `${token.ACCESS_NAME}=;path=/;expires=Thu, Jan 01 1970 00:00:00 UTC;`,
    `${token.REFRESH_NAME}=;path=/;expires=Thu, Jan 01 1970 00:00:00 UTC;`,
  ]);
  res.setHeader('Content-Type', 'text/plain');

  res.end();
};
