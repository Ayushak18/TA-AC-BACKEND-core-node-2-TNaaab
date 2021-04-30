let http = require('http');

let server = http.createServer(handleServer);

function handleServer(req, res) {
  let data = '';
  req.on('data', (content) => {
    data = data + content;
  });

  req.on('end', () => {
    console.log(data);
  });

  res.write(data, () => {
    console.log('We are writting data in the file');
  });
}

server.listen(3456, () => {
  console.log('Server is Up');
});
