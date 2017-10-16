'use strict';
const { PORT=3000 } = process.env;



const Http = require('http');
const { walk, walkSync } = require('./src/walk');
const Static = require('./src/static')();

Http.createServer((req, res) => {
  const { url, method } = req;
  if (method==='GET') {

    if (url==='/')
      Static(req, res, '/src/index.html');

    else if (url==='/dump') {

      const body = JSON.stringify(walkSync('./'));
      res.writeHead(200, {
        'Content-Type': 'application/json',
        'Content-Length': body.length
      });
      res.end(body);

      // Walk('./').then(buf => {
      //   const body = JSON.stringify(buf);
      //   res.writeHead(200, {
      //     'Content-Type': 'application/json',
      //     'Content-Length': body.length
      //   });
      //   res.end(body);
      // })
      //   .catch(err => {
      //     res.statusCode = 500;
      //     res.end(err.message);
      //   })
    }
    else
      Static(req, res)
  } else {
    res.statusCode = 405;
    res.end('Method Not Allowed')
  }
})
  .listen(PORT, () => console.log('listen on localhost:', PORT));



