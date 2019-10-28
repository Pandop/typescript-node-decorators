import { RequestHandler } from 'express';
import 'reflect-metadata';

import { MetadataKeys } from './MetadataKeys';

export function use(middleware: RequestHandler) {
	return (target: any, key: string, desc: PropertyDescriptor) => {

		// Retrieve middlewares
		const middlewares = Reflect.getMetadata(MetadataKeys.MIDDLEWARE, target, key) || [];

		// Add new middleware
		//middlewares.push(middleware);
		//Reflect.defineMetadata(MetadataKeys.MIDDLEWARE, middlewares, target, key);

		// Assign the value of middleware, target and key
		Reflect.defineMetadata(MetadataKeys.MIDDLEWARE, [...middlewares, middleware], target, key);

	};
}