"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var decorators_1 = require("./decorators");
function logger(req, res, next) {
    console.log("Request was made!!!");
    next();
}
var LoginController = /** @class */ (function () {
    function LoginController() {
    }
    LoginController.prototype.getLogin = function (req, res) {
        res.status(200).send("\n            <div style=\"max-width:50rem; background: #fefefe; margin: 2rem auto; padding: 2rem; border: 1px solid dodgerBlue; \">\n                <form method=\"POST\">\n                    <div style=\"width: 100%;\">\n                        <label style=\"display: block\">Email</label>\n                        <input name=\"email\" type=\"email\" style=\"width: 100%; margin-bottom: .5rem; padding: 10px\"/>\n                    </div>\n                    <div>\n                        <label style=\"display: block\">Password</label>\n                        <input name=\"password\" type=\"password\" style=\"width: 100%; margin-bottom: .5rem; padding: 10px\"/>\n                    </div>\n                    <button style=\"background: blue; padding: 10px 20px; border: none; color: #efefef\">Submit</button>\n\t\t\t    </form>\n            </div>\n\t\t\t\n\t\t");
    };
    ;
    LoginController.prototype.postLogin = function (req, res) {
        var _a = req.body, email = _a.email, password = _a.password;
        console.log("Email>:", email, "Password>:", password);
        if (email === 'hi@hi.com' && password === 'pass') {
            req.session = { loggedIn: true };
            res.redirect('/');
            return;
        }
        res.send('Invalid email or password');
    };
    ;
    LoginController.prototype.logout = function (req, res) {
        req.session = undefined;
        res.redirect('/');
    };
    ;
    __decorate([
        decorators_1.get('/login'),
        decorators_1.use(logger),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object, Object]),
        __metadata("design:returntype", void 0)
    ], LoginController.prototype, "getLogin", null);
    __decorate([
        decorators_1.post('/login'),
        decorators_1.bodyValidator("email", "password"),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object, Object]),
        __metadata("design:returntype", void 0)
    ], LoginController.prototype, "postLogin", null);
    __decorate([
        decorators_1.get('/logout'),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object, Object]),
        __metadata("design:returntype", void 0)
    ], LoginController.prototype, "logout", null);
    LoginController = __decorate([
        decorators_1.controller('/auth')
    ], LoginController);
    return LoginController;
}());
