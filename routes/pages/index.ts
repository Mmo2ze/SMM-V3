import express from 'express'
import { checkLogin } from '../../middlewares/login'
import { checkInput } from "../../middlewares/register"
import type { registerR, loginR } from './../../types'
import db from './../../database/models'
import { isLogin } from './../../middlewares/middlewares'
import bcrypt from 'bcryptjs'
import { verify } from 'crypto'
const JsBarcode = require('jsbarcode');

const index = express.Router();
index.use(express.static("views"));
index.get("/login", (req: any, res: any) => {
    if (req.session.isLogin) {
        res.redirect('/');
    }
    else {
        res.render("login.ejs", { msg: "" });
    }
});
index.get("/register", (req: any, res: any) => {
    if (req.session.isLogin) {
        res.redirect('/');
    }
    else {
        res.render("register.ejs", { msg: "" });
    }
});
index.post('/login', async (req: any, res: any) => {
    console.log(req.body)
    var loginR: loginR = (await checkLogin(req.body.username, req.body.password))
    if (!loginR.isFound) {
        res.json('user not found')
    }
    if (!loginR.passIsCorrect) {
        res.json('incorrect pass')
    }
    else {
        req.session.isLogin = true;
        res.redirect('/')
    }
})

type status = {
    isFound: boolean,
    pass: string
}
index.post('/register', async (req: any, res: any) => {
    console.log(req.body)
    var registerR: registerR = (await checkInput(req.body))
    console.log(registerR)
    if (registerR.status) {
        if (req.body.code == req.session.user.regist.verifyCode) {
            req.session.isLogin = true;
            var hashedPassword: string = await bcrypt.hash(req.body.password, 10);
            db.User.create({
                name: req.body.name,
                email: req.body.email,
                password: hashedPassword
            })
            req.session.isLogin = true;
            delete req.session.user;
            req.session.user = { name: req.body.name, email: req.body.email }
            res.redirect('/')
        } else { res.render('register', { msg: 'verify code is wrong' }) }
    }
    else {
        res.render('register', { msg: registerR.error })
    }
})
index.use(isLogin)
index.get('/', (req: any, res: any) => {
    res.render('neworder')
})
index.get('/logout', (req: any, res: any) => {
    req.session.destroy();
    res.redirect('/')
})

export default index