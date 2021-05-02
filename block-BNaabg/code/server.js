let http = require('http');
let fs = require('fs');
let qs = require('querystring');

let server = http.createServer(handleServer);

function handleServer(req, res) {
  let data = '';
  req.on('data', (content) => {
    data = data + content;
  });

  req.on('end', () => {
    if (req.method === 'POST' && req.url === '/users') {
      if (req.headers['content-type'] === 'application/x-www-form-urlencoded') {
        let parsedStringData = qs.parse(data);

        creatingFile(req, res, parsedStringData);

        // console.log(parsedStringData);
      } else if (req.headers['content-type'] === 'application/json') {
        let parsedJsonData = JSON.parse(data);
        console.log(parsedJsonData.name);
      } else {
        res.end(`Data of this type is not supported`);
        // console.log(req.headers);
      }
    }
  });
}

function creatingFile(req, res, parsedStringData) {
  fs.open(`./users/${parsedStringData.name}`, 'wx', (error, fileData) => {
    if (error) {
      console.log(error);
      res.end('User already Exist');
    } else {
      fs.writeFile(
        `./users/${parsedStringData.name}`,
        JSON.stringify(parsedStringData),
        (error) => {
          if (error) {
            console.log(error, 'From file writing');
          } else {
            res.end('You data has been written');
          }
        }
      );

      fs.close(10, () => {
        console.log('File closed');
      });
    }
  });
}

server.listen(3000, () => {
  console.log('Server is up and running at port 3000');
});
