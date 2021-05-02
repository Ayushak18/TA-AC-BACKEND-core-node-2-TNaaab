let http = require('http');
let qs = require('querystring');
let fs = require('fs');

let server = http.createServer(handleServer);

function handleServer(req, res) {
  // document.addEventListener('submit', handleSubmit);
  // res.end('Data form server');

  let store = '';
  req.on('data', (content) => {
    store = store + content;
  });

  req.on('end', () => {
    if (req.url === '/form' && req.method === 'GET') {
      res.setHeader('content-type', 'text/html');
      fs.createReadStream('./index.html').pipe(res);
    } else if (req.url === '/form' && req.method === 'POST') {
      res.setHeader('content-type', 'text/html');
      fs.createReadStream('./index.html').pipe(res);
      let parsedData = qs.parse(store);
      res.write(`<h1>${parsedData.name}</h1>`);
      res.write(`<h1>${parsedData.email}</h1>`);
      res.end(`<h1>${parsedData.number}</h1>`);
    }
  });
}

// function handleSubmit(event) {
//   event.preventDefault();
//   let name = document.querySelector('#name');
//   let email = document.querySelector('#email');
//   let number = document.querySelector('#number');
//   console.log(name.value, email.value, number.value);
// }

server.listen(5000, () => {
  console.log('Server is up and running');
});
