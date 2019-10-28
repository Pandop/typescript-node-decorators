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
		<div style="display: flex;max-width:30rem; background: #fefefe; margin: 2rem auto; padding: 2rem; border: 1px solid #e74c3c; ">
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
			<div style="max-width:30rem; background: #fefefe; margin: 2rem auto; padding: 2rem; border: 1px solid #e74c3c; text-align: center; ">
				<div>You're logged in</div> 
				<a href="/auth/logout" style="display: block;">Logout</a>
			</div>
		`);
            return;
        }
        res.send(`
			<div style="max-width:30rem; background: #fefefe; margin: 2rem auto; padding: 2rem; border: 1px solid #e74c3c; text-align: center; ">
				<div>You're not logged in</div>
				<a href="/auth/login" style="display: block;">Login</a>
			</div>
			`);
    };

    @get('protected')
    @use(authenticated)
    public protectedResource(req: Request, res: Response) {
        res.status(200).send('Welcome to protected route, logged in user');
    };
}