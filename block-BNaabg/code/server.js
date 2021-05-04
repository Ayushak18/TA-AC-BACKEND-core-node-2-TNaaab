let http = require('http');
let fs = require('fs');
let qs = require('querystring');
let url = require('url');

let server = http.createServer(handleServer);

let usersPath = __dirname + '/users';

console.log(usersPath);

function handleServer(req, res) {
  // parsing url and querystring
  let parsedUrl = url.parse(req.url, true);

  let data = '';
  req.on('data', (content) => {
    data = data + content;
  });

  req.on('end', () => {
    //   Handling the creation of username file and adding data to it
    if (req.method === 'POST' && req.url === '/users') {
      let username = JSON.parse(data).username;
      // console.log(username);
      fs.open(`${usersPath}/${username}.json`, 'wx', (error, fd) => {
        if (error) {
          console.log(error, 'Error');
        } else {
          fs.writeFile(fd, data, (error) => {
            if (error) {
              console.log(error);
            } else {
              fs.close(fd, () => {
                res.end(`${username} is created succecfully`);
              });
            }
          });
        }
      });
      //Handling to get the data from the existing file with username
    } else if (req.method === 'GET' && parsedUrl.pathname === '/users') {
      fs.createReadStream(`${usersPath}/${parsedUrl.query.username}.json`).pipe(
        res
      );
      //   Handling updation of user file
    } else if (req.method === 'PUT' && parsedUrl.pathname === '/users') {
      let username = JSON.parse(data).username;
      fs.open(
        `${usersPath}/${parsedUrl.query.username}.json`,
        'r+',
        (error, fd) => {
          if (error) {
            console.log(error);
          } else {
            fs.truncate(fd, (error) => {
              if (error) {
                console.log(error);
              } else {
                fs.write(fd, data, (error) => {
                  if (error) {
                    console.log(error);
                  } else {
                    fs.close(fd, () => {
                      res.end(`${username} is updated succecfully`);
                    });
                  }
                });
              }
            });
          }
        }
      );
      // Handling deletion of a file
    } else if (req.method === 'DELETE' && parsedUrl.pathname === '/users') {
      fs.unlink(`${usersPath}/${parsedUrl.query.username}.json`, (error) => {
        if (error) {
          console.log(error);
        } else {
          res.end(`${parsedUrl.query.username} has been deleted`);
        }
      });
    }
  });
}

server.listen(3000, () => {
  console.log('Server is up and running at port 3000');
});
