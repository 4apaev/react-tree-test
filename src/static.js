'use strict';

const Fs = require('fs');
const Path = require('path');
const Mim = new Map;

Mim
  .set('js', 'application/javascript')
  .set('map', 'application/json')
  .set('json', 'application/json')
  .set('plain', 'text/plain')
  .set('html', 'text/html')
  .set('css', 'text/css')
  .set('ico', 'image/x-icon');

module.exports = (basedir=process.cwd()) => (req, res, url=req.url) => {
  const path = Path.join(basedir, url);

  Fs.stat(path, (err, stats) => {
    if (err || !stats.isFile()) {
      const msg = '404 Not Found...';
      res.writeHead(404, {
        'Content-Type': 'text/plain',
        'Content-Length' : msg.length
      });
      res.end(msg);
    } else {
        res.writeHead(200, {
          'Content-Type': Mim.get(Path.extname(path).slice(1)) || 'text/plain',
          'Content-Length' : stats.size
        });
        Fs.createReadStream(path).pipe(res);
      }
  })
}

