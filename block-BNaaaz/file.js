let http = require('http');
let fs = require('fs');

let server = http.createServer(handleServer);

function handleServer(req, res) {
  fs.createReadStream('./readme.txt').pipe(res);
  //   res.end('THis is from server');
}

server.listen(5000, () => {
  console.log('Server is Up');
});
