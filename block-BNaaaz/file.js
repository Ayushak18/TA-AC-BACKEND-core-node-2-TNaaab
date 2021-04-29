let http = require('http');
let fs = require('fs');

let server = http.createServer(handleServer);

function handleServer(req, res) {
  //   let ayush = fs.createReadStream('./readme.txt');
  //   console.log(ayush);
  //   res.end('THis is from server');
  //   res.end(ayush);
}

server.listen(5000, () => {
  console.log('Server is Up');
});
