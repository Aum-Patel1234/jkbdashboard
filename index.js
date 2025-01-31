const express = require('express');
const app = express();
const path = require('path');
const port = 3000;
const routes = require('./src/routes/routes.js');

app.use(express.static(path.join(__dirname, 'public')));
app.use('', routes);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
app.post('/', (req, res) => {
  console.log(req);
})
