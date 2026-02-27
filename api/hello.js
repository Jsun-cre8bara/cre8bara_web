export default function handler(_req, res) {
  res.setHeader('Content-Type', 'text/plain; charset=utf-8');
  res.status(200).send('ok');
}

