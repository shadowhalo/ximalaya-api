export default async function handler(req, res) {
  const apiUrl = 'https://www.ximalaya.com/revision/album/getTracksList?albumId=338590&pageNum=1&pageSize=1';

  try {
    const response = await fetch(apiUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0'
      }
    });
    const json = await response.json();

    const latest = json?.data?.tracks?.[0];
    if (!latest) throw new Error('No track found');

    res.setHeader('Content-Type', 'application/json');
    res.status(200).json({
      title: latest.title,
      trackId: latest.trackId,
      breakSecond: latest.breakSecond,
      timestamp: new Date().toISOString()
    });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
}
