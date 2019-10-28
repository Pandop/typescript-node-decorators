"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var body_parser_1 = __importDefault(require("body-parser"));
var cookie_session_1 = __importDefault(require("cookie-session"));
var morgan_1 = __importDefault(require("morgan"));
require("./controllers/LoginController");
require("./controllers/HomeController");
var AppRouter_1 = require("./AppRouter");
// Create an express app
var app = express_1.default();
// Middlewares
app.use(morgan_1.default('dev'));
app.use(body_parser_1.default.urlencoded({ extended: true }));
app.use(cookie_session_1.default({ keys: ['laskdjf'] }));
app.use(AppRouter_1.AppRouter.getInstance());
// Run server
var PORT = process.env.PORT || 3000;
app.listen(PORT, function () { return console.log("Server is running on " + PORT); })
    .on("error", function (error) { return console.log("Something went wrong! Error:", error); });
