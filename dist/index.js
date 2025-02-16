"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const routes_1 = __importDefault(require("./routes/routes")); // Adjust to use ES module syntax
const app = (0, express_1.default)();
const port = 3000;
// Set view engine
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');
// Middleware
app.use(express_1.default.urlencoded({ extended: true })); // converts the request body into an object
app.use(express_1.default.json());
app.use(express_1.default.static(path_1.default.join(__dirname, "public")));
// Serve styles with correct MIME type
app.use("/styles", express_1.default.static(path_1.default.join(__dirname, "../public/styles"), {
    setHeaders: (res, filePath) => {
        if (filePath.endsWith(".css")) {
            res.set("Content-Type", "text/css");
        }
    },
}));
// the above lines should always be above the below lines cost me - 2 hrs of time
app.use('', routes_1.default);
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
app.post('/', (req, res) => {
    console.log(req);
});
