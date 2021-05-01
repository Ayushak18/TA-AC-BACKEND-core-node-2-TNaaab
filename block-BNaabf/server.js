let http = require('http');

let server = http.createServer(handleServer);

function handleServer(req, res) {
  document.addEventListener('submit', handleSubmit);
  res.end('Data form server');
}

function handleSubmit(event) {
  event.preventDefault();
  let name = document.querySelector('#name');
  let email = document.querySelector('#email');
  let number = document.querySelector('#number');
  console.log(name.value, email.value, number.value);
}

server.listen(5000, () => {
  console.log('Server is up and running');
});
