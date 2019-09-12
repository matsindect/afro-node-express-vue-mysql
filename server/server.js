const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });
const server = require('./app');

// START SERVER
const port = process.env.PORT || 3000;
server.listen(port, () => {
  console.log(`Afroorig now running on port ${port}...`);
});
