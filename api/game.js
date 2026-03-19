const Pusher = require('pusher');

const pusher = new Pusher({
  appId: process.env.PUSHER_APP_ID,
  key: process.env.PUSHER_KEY,
  secret: process.env.PUSHER_SECRET,
  cluster: process.env.PUSHER_CLUSTER,
  useTLS: true,
});

module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { type, gameId, data } = req.body;

  if (!gameId) return res.status(400).json({ error: 'gameId required' });

  const channel = `game-${gameId}`;

  try {
    if (type === 'move') {
      await pusher.trigger(channel, 'move', data);
    } else if (type === 'join') {
      await pusher.trigger(channel, 'player-joined', data);
    } else if (type === 'resign') {
      await pusher.trigger(channel, 'resign', data);
    } else if (type === 'ping') {
      await pusher.trigger(channel, 'pong', { ts: Date.now() });
    } else {
      return res.status(400).json({ error: 'Unknown event type' });
    }
    res.status(200).json({ ok: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Pusher error', detail: err.message });
  }
};
