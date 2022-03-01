export default (req, res) => {
  res.setHeader('Set-Cookie', req.body);
  res.setHeader('Content-Type', 'text/plain');

  res.end();
};
