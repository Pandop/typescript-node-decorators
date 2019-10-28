import { Request, Response, RequestHandler, NextFunction } from 'express';
import 'reflect-metadata';

import { AppRouter } from '../../AppRouter';
import { MethodType } from './Methods'
import { MetadataKeys } from './MetadataKeys'

//export const router = Router();

function bodyValidator(keys: string[]): RequestHandler {
	// middleware to check keys are present
	return (req: Request, res: Response, next: NextFunction) => {
		// body is not contained in request
		if (!req.body) {
			return res.status(422).send(`Invalid request`);
		}

		// keys do not exist in request body
		for (let k of keys) {
			if (!req.body[k]) {
				return res.status(422).send(`
					<div style="max-width:30rem; background: #fefefe; margin: 2rem auto; padding: 2rem; border: 1px solid #e74c3c; text-align: center; ">
						<h5 style="color: red;" >Missing Property ${k}</h5>		
						<div style="">
							<a href="/auth/login">Login</a>
						</div>			
					</div>
				`);
			}
		}
		// Keys exist, run next middleware
		next();
	}
}

export function controller(routePrefix: string = ''): ClassDecorator {
	return (target: Function) => {

		// Get router from singleton
		const router = AppRouter.getInstance();

		// Loop through keys/method of prototype
		for (let key in target.prototype) {

			// Retrieve the method
			const routeHandler = target.prototype[key];

			// Get path from metadata
			const path: string = Reflect.getMetadata(MetadataKeys.PATH, target.prototype, key);

			// Retrieve method stored in metadata
			const method: MethodType = Reflect.getMetadata(MetadataKeys.METHOD, target.prototype, key);

			// Retrieve middlewares from metadata
			const middlewares: Array<RequestHandler> = Reflect.getMetadata(MetadataKeys.MIDDLEWARE, target.prototype, key) || [];

			// Retrieve metadata keys for validator
			const requiredBodyProps = Reflect.getMetadata(MetadataKeys.VALIDATOR, target.prototype, key) || [];

			const validator = bodyValidator(requiredBodyProps);

			// If path exist, invoke get passing in path, and method
			if (path) {
				router[method](`${routePrefix}${path}`, ...middlewares, validator, routeHandler)
			}
		}
	}
}