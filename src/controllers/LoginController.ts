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
            <div style="max-width:50rem; background: #fefefe; margin: 2rem auto; padding: 2rem; border: 1px solid dodgerBlue; ">
                <form method="POST">
                    <div style="width: 100%;">
                        <label style="display: block">Email</label>
                        <input name="email" type="email" style="width: 100%; margin-bottom: .5rem; padding: 10px"/>
                    </div>
                    <div>
                        <label style="display: block">Password</label>
                        <input name="password" type="password" style="width: 100%; margin-bottom: .5rem; padding: 10px"/>
                    </div>
                    <button style="background: blue; padding: 10px 20px; border: none; color: #efefef">Submit</button>
			    </form>
            </div>
			
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