let path = require('path');
let http = require('http');
let qs = require('querystring');

console.log(__filename);
console.log(__dirname + '/app.js');
console.log(__dirname + '/index.html');
console.log(path.join(__dirname + '/index.html'));

// let server = http.createServer(handleServer);

// function handleServer(req, res) {
//   let data = '';

//   req.on('data', (content) => {
//     data = data + content;
//   });

//   req.on('end', () => {
//     res.statusCode = 201;
//     res.end(JSON.stringify(data));
//   });
// }

// server.listen(3000, () => {
//   console.log('Server is Up');
// });

// let serverTwo = http.createServer(handleServerTwo);

// function handleServerTwo(req, res) {
//   let data = '';
//   req.on('data', (content) => {
//     data = data + content;
//   });

//   req.on('end', () => {
//     let parsedData = qs.parse(data);
//     res.end(parsedData.captain);
//   });
// }

// serverTwo.listen(4000, () => {
//   console.log('Server 4000 is Up');
// });

let serverThree = http.createServer(handleServerThree);

function handleServerThree(req, res) {
  let data = '';
  //   console.log(
  //     req.headers['content-type'] === 'application/x-www-form-urlencoded'
  //   );
  req.on('data', (content) => {
    data = data + content;
  });

  req.on('end', () => {
    if (req.headers['content-type'] === 'application/x-www-form-urlencoded') {
      let queryData = qs.parse(data);
      res.end(JSON.stringify(queryData));
    } else if (req.headers['content-type'] === 'application/json') {
      res.end(data);
    }
  });
}

serverThree.listen(5000, () => {
  console.log('\nServer at 5000 is up and runnning');
});
