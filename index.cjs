const express = require('express');
const app = express();
const port = 3000;
const routes = require('./routes/routes.cjs');

app.use(express.static('public'));
app.use('', routes);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
app.post('/', (req, res) => {
  console.log(req);
})
