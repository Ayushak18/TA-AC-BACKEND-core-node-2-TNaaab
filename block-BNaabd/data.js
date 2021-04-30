let http = require('http');
let qs = require('querystring');

let server = http.createServer(handleServer);

function handleServer(req, res) {
  let data = '';

  req.on('data', (content) => {
    data = data + content;
  });

  req.on('end', () => {
    if (req.headers['content-type'] === 'application/x-www-form-urlencoded') {
      let parseData = qs.parse(data);
      console.log(parseData);
    } else if (req.headers['content-type'] === 'application/json') {
      console.log('This is json data');
    }
    res.write(data);
    res.end();
  });
}

server.listen(8000, () => {
  console.log('Server is Up');
});
