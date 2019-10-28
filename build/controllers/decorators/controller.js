"use strict";
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
var AppRouter_1 = require("../../AppRouter");
var MetadataKeys_1 = require("./MetadataKeys");
//export const router = Router();
function bodyValidator(keys) {
    // middleware to check keys are present
    return function (req, res, next) {
        // body is not contained in request
        if (!req.body) {
            return res.status(422).send("Invalid request");
        }
        // keys do not exist in request body
        for (var _i = 0, keys_1 = keys; _i < keys_1.length; _i++) {
            var k = keys_1[_i];
            if (!req.body[k]) {
                return res.status(422).send("Missing Property " + k);
            }
        }
        // Keys exist, run next middleware
        next();
    };
}
function controller(routePrefix) {
    if (routePrefix === void 0) { routePrefix = '/'; }
    return function (target) {
        // Get router from singleton
        var router = AppRouter_1.AppRouter.getInstance();
        // Loop through keys/method of prototype
        for (var key in target.prototype) {
            // Retrieve the method
            var routeHandler = target.prototype[key];
            // Get path from metadata
            var path = Reflect.getMetadata(MetadataKeys_1.MetadataKeys.PATH, target.prototype, key);
            // Retrieve method stored in metadata
            var method = Reflect.getMetadata(MetadataKeys_1.MetadataKeys.METHOD, target.prototype, key);
            // Retrieve middlewares from metadata
            var middlewares = Reflect.getMetadata(MetadataKeys_1.MetadataKeys.MIDDLEWARE, target.prototype, key) || [];
            // Retrieve metadata keys for validator
            var requiredBodyProps = Reflect.getMetadata(MetadataKeys_1.MetadataKeys.VALIDATOR, target.prototype, key) || [];
            var validator = bodyValidator(requiredBodyProps);
            // If path exist, invoke get passing in path, and method
            if (path) {
                router[method].apply(router, __spreadArrays(["" + routePrefix + path], middlewares, [validator, routeHandler]));
            }
        }
    };
}
exports.controller = controller;
