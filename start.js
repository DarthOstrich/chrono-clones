// import environmental variables from our variables.env file. This is an inline require, but it works the other way too.
require('dotenv').config({ path: 'variables.env' });

// Start our app!
const app = require('./app');
app.set('port', process.env.PORT || 7777);
const server = app.listen(app.get('port'), () => {
  console.log(`Express running → PORT ${server.address().port}. Check it out: http://localhost:${server.address().port}`);
});