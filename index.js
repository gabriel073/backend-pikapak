const server = require('./src/app').default

server.listen(3001, () => {
  console.log('Server listening at 3001')
})
