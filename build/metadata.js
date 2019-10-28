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
require("reflect-metadata");
var Plane = /** @class */ (function () {
    function Plane() {
        // @markedFunction("color property")
        this.color = 'red';
    }
    Plane.prototype.fly = function () {
        console.log("rrrrrrrrrrrrr");
    };
    __decorate([
        get("/login"),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], Plane.prototype, "fly", null);
    Plane = __decorate([
        controller
    ], Plane);
    return Plane;
}());
function markFunction(target, key, desc) {
    Reflect.defineMetadata('secret', 123, target, key);
}
// Decorator factory
function get(path) {
    return function (target, key) {
        Reflect.defineMetadata('path', path, target, key);
    };
}
// Decorator on class to loop through all metadata
function controller(target) {
    for (var key in target.prototype) {
        var path = Reflect.getMetadata('path', target.prototype, key);
        var middleware = Reflect.getMetadata('path', target.prototype, key);
        // router.get(path, middleware, target.prototype[key]);
        console.log("secret: ", path);
    }
}
//const secret = Reflect.getMetadata('secret', Plane.prototype, 'fly');
//console.log("secret: ", secret);
// const plane = {
//     color: 'red'
// };
// // Add some metadata
// Reflect.defineMetadata('note', 'hi there', plane);
// Reflect.defineMetadata('height', 10, plane);
// // Retrieve metadata
// const note = Reflect.getMetadata('note', plane);
// const height = Reflect.getMetadata('height', plane);
// // Displane
// console.log("Note: ", note);
// console.log("Height: ", height);
// // Attach metadata info to property i.e. color
// Reflect.defineMetadata('note', 'hi there!', plane, 'color');
// const color = Reflect.getMetadata('note', plane, 'color');
// console.log("noteColor: ", color);
