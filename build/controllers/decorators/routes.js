"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
var Methods_1 = require("./Methods");
var MetadataKeys_1 = require("./MetadataKeys");
function routerBinder(method) {
    return function (path) {
        return function (target, key, desc) {
            Reflect.defineMetadata(MetadataKeys_1.MetadataKeys.PATH, path, target, key);
            Reflect.defineMetadata(MetadataKeys_1.MetadataKeys.METHOD, method, target, key);
        };
    };
}
exports.get = routerBinder(Methods_1.MethodType.GET);
exports.post = routerBinder(Methods_1.MethodType.POST);
exports.put = routerBinder(Methods_1.MethodType.PUT);
exports.patch = routerBinder(Methods_1.MethodType.PATCH);
exports.remove = routerBinder(Methods_1.MethodType.REMOVE);
