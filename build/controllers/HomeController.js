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
function authenticated(req, res, next) {
    if (req.session && req.session.loggedIn) {
        return next();
    }
    res.status(403).send("\n\t\t<div style=\"width: 28rem; display: flex; justify-content: center\">\n\t\t\t<div style=\"color: red; background: #efefef; width: 12rem; margin-left: 10px; text-align: center;\">\n\t\t\t\t<h5>Not permitted</h5>\n\t\t\t</div>\n\t\t\t<div style=\"width: 16rem; background: #efefef;padding-top: 10px;\">\n\t\t\t\t<div>You must log in</div>\n\t\t\t\t<a href=\"/auth/login\">Login</a>\n\t\t\t</div>\n\t\t</div>\t\n\t");
}
var HomeController = /** @class */ (function () {
    function HomeController() {
    }
    HomeController.prototype.index = function (req, res) {
        if (req.session && req.session.loggedIn) {
            res.status(200).send("\n\t\t\t<div>\n\t\t\t\t<div>You're logged in</div>\n\t\t\t\t<a href=\"/auth/logout\">Logout</a>\n\t\t\t</div>\n\t\t");
            return;
        }
        res.send("\n\t\t\t<div>\n\t\t\t\t<div>You're not logged in</div>\n\t\t\t\t<a href=\"/auth/login\">Login</a>\n\t\t\t</div>\n\t\t\t");
    };
    ;
    HomeController.prototype.protectedResource = function (req, res) {
        res.status(200).send('Welcome to protected route, logged in user');
    };
    ;
    __decorate([
        decorators_1.get('/'),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object, Object]),
        __metadata("design:returntype", void 0)
    ], HomeController.prototype, "index", null);
    __decorate([
        decorators_1.get('protected'),
        decorators_1.use(authenticated),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object, Object]),
        __metadata("design:returntype", void 0)
    ], HomeController.prototype, "protectedResource", null);
    HomeController = __decorate([
        decorators_1.controller('/')
    ], HomeController);
    return HomeController;
}());
exports.HomeController = HomeController;
