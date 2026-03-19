const fs = require('fs');
const path = require('path');

module.exports = async (req, res) => {
  // Only serve GET requests
  if (req.method !== 'GET') return res.status(405).end();

  const htmlPath = path.join(__dirname, '../public/index.html');
  let html = fs.readFileSync(htmlPath, 'utf8');

  // Inject public Pusher credentials (key + cluster are safe to expose client-side)
  html = html
    .replace('__PUSHER_KEY__',     process.env.PUSHER_KEY     || '')
    .replace('__PUSHER_CLUSTER__', process.env.PUSHER_CLUSTER || '');

  res.setHeader('Content-Type', 'text/html');
  res.setHeader('Cache-Control', 'no-store');
  res.status(200).send(html);
};
