import express, { Request, Response } from 'express'
import { checkLogin } from '../../middlewares/login'
import { checkInput } from "../../middlewares/register"
import type { registerR, loginR } from './../../types'
import db from './../../database/models'
import { isLogin } from './../../middlewares/middlewares'
import bcrypt from 'bcryptjs'
import { verify } from 'crypto'
import axios from 'axios'
import { Session } from 'express-session';
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

index.post('/register', async (req: any, res: Response) => {
    var registerR: registerR = (await checkInput(req.body))
    if (registerR.status) {
        let responseMsg = await axios.post('http://localhost:8000/api/sendcode', { email: req.body.email, admin: process.env.adminKey, subject: 'verifyCode' })
        console.log(responseMsg.data)
        if (responseMsg.data.status) {
            req.session.register = req.body;
            req.session.register.verifyCode = responseMsg.data.code;
            let x = setInterval(() => {
                console.log('done')
                if (!req.session.isLogin) {
                    req.session.destroy();
                }
                clearInterval(x)
            }, 1000 * 10) //15 min
            res.render('getcode.ejs', { email: req.body.email })
        }
        else { res.render('register.ejs', { msg: 'Please try again later ' }) }
    } else {
        res.render('register.ejs', { msg: registerR.error })
    }
})
index.post('/getcode', (req: any, res: Response) => {
    if (req.session?.register){
        if (req.session.register.verifyCode == req.body.code) {
            req.session.isLogin = true;
            delete req.session.register;
            res.redirect('/')
        }else res.render('getcode.ejs', {msg: 'sorry, this code is wrong'})
    }
    else res.render('getcode.ejs', {msg: 'sorry, this code timeout'})
})
index.use(isLogin)
index.get('/', (req: Request, res: Response) => {
    res.render('neworder')
})
index.get('/logout', (req: any, res: Response) => {
    req.session.destroy()
    console.log(req.session)
    res.redirect('/')
})

export default index