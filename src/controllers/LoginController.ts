import { Request, Response, NextFunction } from 'express';
import { get, post, use, controller, bodyValidator } from './decorators';

function logger(req: Request, res: Response, next: NextFunction) {
	console.log("Request was made!!!");
	next();
}

@controller('/auth')
class LoginController {

	@get('/login')
	@use(logger)
	public getLogin(req: Request, res: Response): void {
		res.status(200).send(`
			<form method="POST">
				<div>
					<label>Email</label>
					<input name="email" type="email" />
				</div>
				<div>
					<label>Password</label>
					<input name="password" type="password" />
				</div>
				<button>Submit</button>
			</form>
		`);
	};

	@post('/login')
	@bodyValidator("email", "password")
	public postLogin(req: Request, res: Response): void {
		const { email, password } = req.body;
		console.log("Email>:", email, "Password>:", password);
		if (email === 'hi@hi.com' && password === 'pass') {
			req.session = { loggedIn: true };
			res.redirect('/');
			return;
		}
		res.send('Invalid email or password');
	};

	@get('/logout')
	public logout(req: Request, res: Response): void {
		req.session = undefined;
		res.redirect('/');
	};
}