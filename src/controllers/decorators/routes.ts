import { RequestHandler } from 'express';
import 'reflect-metadata';

import { MethodType } from './Methods';
import { MetadataKeys } from './MetadataKeys';

// interface
interface IRouteHandlerDescriptor extends PropertyDescriptor {
	value?: RequestHandler
}

function routerBinder(method: string) {
	return (path: string) => {
		return (target: any, key: string, desc: IRouteHandlerDescriptor) => {
			Reflect.defineMetadata(MetadataKeys.PATH, path, target, key);
			Reflect.defineMetadata(MetadataKeys.METHOD, method, target, key);
		};
	}
}

export const get = routerBinder(MethodType.GET);
export const post = routerBinder(MethodType.POST);
export const put = routerBinder(MethodType.PUT);
export const patch = routerBinder(MethodType.PATCH);
export const remove = routerBinder(MethodType.REMOVE);

