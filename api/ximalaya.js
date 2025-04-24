export default async function handler(req, res) {
  const apiUrl = 'https://www.ximalaya.com/revision/album/getTracksList?albumId=338590&pageNum=1&pageSize=1';

  try {
    const response = await fetch(apiUrl, {
      headers: {
       "Cookie": "1&_token=129975056&4A3C7290240NBC74A126640F642472B960EDD92D962F08D94B552079ADAB15B85A521D9F5D88229M59FB2CD53C84906_; 1_l_flag=129975056&4A3C7290240NBC74A126640F642472B960EDD92D962F08D94B552079ADAB15B85A521D9F5D88229M59FB2CD53C84906__2025-04-1413:45:10; xm-page-viewid=ximalaya-web; Hm_lvt_4a7d8ec50cfd6af753c4f8aee3425070=1744595564; Hm_lpvt_4a7d8ec50cfd6af753c4f8aee3425070=1745394698; cmci9xde=U2FsdGVkX1/TZHw9uqc+0EzL6gnQ/2EBWPo9bf83ALYsTXSXLuhAUu/pqizFfGGrV08Ek81Wtw1Vg28mEoM5GA==; pmck9xge=U2FsdGVkX19eJfWrQMguf4DwRUTLNyYu6FLYR1y2hB0=; assva6=U2FsdGVkX19XOu4wX+pYrX2ykfct9inf8QSEE18Oshg=; assva5=U2FsdGVkX1/QWpENovpQy0Zro+XXhveEWRwR2fgw5pOPopa8R5kXGGbsAEzzNzG+kfZa2lJQ9w70LqCcqXwDhg==; vmce9xdq=U2FsdGVkX19Ciil4Lf1ekECdVUleapZJE+NunRy/aCjROMxzj4w4DK+WRHpHfd7DPfZMdAPKreDoP52BgSGUfWBwjNpImmMCxctxsc6gotp3W2FWHMAOH5RragNSJwCFApLtK0kAhAXGd0k8uQgebY11hfS8o8lt2KZ3Wbh50e4=; web_login=1745394717736",
       "User-Agent": "Mozilla/5.0" 
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
