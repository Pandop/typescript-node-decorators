import { Request, Response, NextFunction } from 'express';

import { get, controller, use } from './decorators';

interface RequestWithBody extends Request {
	body: { [key: string]: string | undefined };
}

function authenticated(req: Request, res: Response, next: NextFunction) {
	if (req.session && req.session.loggedIn) {
		return next();
	}
	res.status(403).send(`
		<div style="width: 28rem; display: flex; justify-content: center">
			<div style="color: red; background: #efefef; width: 12rem; margin-left: 10px; text-align: center;">
				<h5>Not permitted</h5>
			</div>
			<div style="width: 16rem; background: #efefef;padding-top: 10px;">
				<div>You must log in</div>
				<a href="/auth/login">Login</a>
			</div>
		</div>	
	`);
}


@controller('/')
export class HomeController {
	@get('/')
	public index(req: RequestWithBody, res: Response): void {
		if (req.session && req.session.loggedIn) {
			res.status(200).send(`
			<div>
				<div>You're logged in</div>
				<a href="/auth/logout">Logout</a>
			</div>
		`);
			return;
		}
		res.send(`
			<div>
				<div>You're not logged in</div>
				<a href="/auth/login">Login</a>
			</div>
			`);
	};

	@get('protected')
	@use(authenticated)
	public protectedResource(req: Request, res: Response) {
		res.status(200).send('Welcome to protected route, logged in user');
	};
}