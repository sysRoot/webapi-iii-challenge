const server = require('./server');
port = process.env.PORT || 4000
server.listen(port, ()=> console.log(`listening on`, port))