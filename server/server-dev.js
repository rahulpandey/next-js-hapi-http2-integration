const http2 = require('http2');
const {
  pathWrapper,
  defaultHandlerWrapper,
  nextHandlerWrapper,
} = require('./next-wrapper');
const { parse } = require('url');
const Hapi = require('hapi');
const fs = require('fs');
const next = require('next');
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();
const options = {
  key: fs.readFileSync('./ssl_keys/server.key'),
  cert: fs.readFileSync('./ssl_keys/server.crt'),
};

const port = parseInt(process.env.PORT, 10) || 3000;
const server = new Hapi.Server({
  listener: http2.createSecureServer(options),
  host: 'localhost',
  port,
  tls: true,
});

app.prepare().then(async () => {
  await server.route({
    method: 'GET',
    path: '/a',
    handler: pathWrapper(app, '/a'),
  });

  await server.route({
    method: 'GET',
    path: '/b',
    handler: pathWrapper(app, '/b'),
  });

  await server.route({
    method: 'GET',
    path: '/_next/{p*}' /* next specific routes */,
    handler: nextHandlerWrapper(app),
  });

  await server.route({
    method: 'GET',
    path: '/{p*}' /* catch all route */,
    handler: defaultHandlerWrapper(app),
  });

  try {
    await server.start();
    console.log(`> Ready on https://localhost:${port}`);
  } catch (error) {
    console.log('Error starting server');
    console.log(error);
  }
});
