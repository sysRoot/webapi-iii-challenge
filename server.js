const express = require('express');

const postRouter = require('./posts/postRouter')

const helmet = require('helmet');

const server = express();

function logger(req, res, next) {
  console.log(`${req.method} to ${req.path}`);

  next();
};

server.use(logger);
server.use(helmet());
server.use(express.json());

server.use('/api/posts', postRouter);

server.get('/', (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`)
});


module.exports = server;
