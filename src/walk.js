'use strict';
const { PORT=3000 } = process.env;

const Fs = require('fs');
const Path = require('path');
const { promisify } = require('util');

const Stat = promisify(Fs.stat);
const Readdir = promisify(Fs.readdir);




async function walk(dir, buf=[ ]) {

  let arr = await Readdir(dir);

  for (let i=arr.length; i--;) {
    let name = arr[ i ],
        path = Path.join(dir, name),
        stat = await Stat(path);

    if (stat.isFile())
      buf.push(path);

    else if (stat.isDirectory())
      await walk(path, buf);

  }
  return buf
}


function walkSync(dir) {
  return Fs.readdirSync(dir).reduce((buf, name) => {
    let path = Path.join(dir, name)
    let stat = Fs.statSync(path)
    if (stat.isFile())
      buf.push(path);
    else
      buf.push(walkSync(path));
    return buf
  }, []);

}

module.exports = { walk, walkSync }