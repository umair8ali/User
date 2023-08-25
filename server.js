const http = require('http');
const app = require('./app');
const student = require('./api/routes/student');
const faculty = require('./api/routes/faculty');

const server = http.createServer(app);

server.listen(5000, console.log("App is running"));