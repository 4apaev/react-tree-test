'use strict';

const { log } = console;
const Net = require('net');
const Server = Net.createServer();

Server.on('connection', conn => {
  const addr = `${ conn.remoteAddress }:${ conn.remotePort }`;

  log('new connection from', addr);
  conn.setEncoding('utf8');

  conn.on('data', dat => {
    log('connection', addr, 'says:', dat);
    conn.write(dat)
  })
    .on('error', err => {
      log('connection', addr, 'error:', err.message);
    })
      .once('close', () => {
        log('connection', addr, 'closed');
      });
});

Server.listen(9000, () => log('Server Listening to', Server.address()));