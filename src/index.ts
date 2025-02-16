import express, { Request, Response } from "express";
import path from "path";
import routes from './routes/routes';  // Adjust to use ES module syntax
const app = express();
const port = 3000;

// Set view engine
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

// Middleware
app.use(express.urlencoded({ extended: true }));          // converts the request body into an object
app.use(express.json());

app.use(express.static(path.join(__dirname, "../dist/public"))); // Ensure this points to the correct folder
// Serve styles with correct MIME type
app.use(
  "/styles",
  express.static(path.join(__dirname, "../dist/public/styles"), {
    setHeaders: (res, filePath) => {
      if (filePath.endsWith(".css")) {
        res.set("Content-Type", "text/css");
      }
    },
  })
);
// the above lines should always be above the below lines cost me - 2 hrs of time
app.use('', routes);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
});

app.post('/', (req:Request, res:Response) => {
  console.log(req);
});