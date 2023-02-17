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
        res.render("register.ejs", {data:{ msg: "" }});
    }
});
index.post('/login', async (req: any, res: any) => {
    console.log(req.body)
    var loginR: loginR = (await checkLogin(req.body.username||req.body.email, req.body.password))
    if (!loginR.isFound) {
        res.json('user not found')
    }else if (!loginR.passIsCorrect) {
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
    if (req.session?.register?.verifyCode && req.session.register.email == req.body.email) {
        const responseMsg = await axios.post('http://localhost:8000/api/resendcode', { email: req.session.register.email, admin: process.env.adminKey, subject: 'verifyCode', code: req.session.register.verifyCode })
        if (responseMsg.data.status) {
            res.render('getcode.ejs', { msg: 'code sent to ', email: req.body.email, status: true })
        } else {
            res.render('redirect.ejs', { msg: 'code not sent to ', email: req.body.email, status: false })
        }
    } else {
        console.log(false)
        var registerR: registerR = (await checkInput(req.body))
        console.log(registerR)
        if (registerR.status) {
            let responseMsg = await axios.post('http://localhost:8000/api/sendcode', { email: req.body.email, admin: process.env.adminKey, subject: 'verifyCode' })
            if (responseMsg.data.status) {
                req.session.register = req.body;
                req.session.register.verifyCode = responseMsg.data.code;
                req.session.register.try = 0;
                req.session.cookie.originalMaxAge = 1000 * 60 * 15;//15 mins
                res.render('getcode.ejs', { msg: 'code sent to ', email: req.body.email })
            }
            else { res.render('redirect.ejs', { data: { msg: 'Please try again later ', redirect: 'register' } }) }
        } else {
            res.render('register.ejs', { data: { msg: registerR.error } })
        }

    }

})
index.post('/getcode', async(req: any, res: Response) => {
    if (req.session?.register) {
        if (req.session.register.try < 5) {
            if (req.session.register.verifyCode == req.body.code) {
                let hashedpass = await bcrypt.hash(req.session.register.password, 10);
                let x = await db.User.create({
                    name:req.session.register.name,
                    email:req.session.register.email,
                    password:hashedpass
                })
                console.log(x)
                req.session.isLogin = true;
                req.session.cookie.originalMaxAge = 86400000
                delete req.session.register;
                res.redirect('/')
            } else {
                req.session.register.try++;
                res.render('getcode.ejs', { msg: 'sorry, this code is wrong try again', email: req.body.email })
            }
        } else {
            req.session.destroy();
            res.render('redirect.ejs', { data: { msg: 'Sorry you have try too many times please try again', redirect: 'register' } })
        }
    }
    else {
        req.session.destroy();
        res.render('redirect.ejs', { data: { msg: 'sorry, this code timeout please try again ', redirect: 'register' } })
    }
})
index.use(isLogin)
index.get('/', (req: Request, res: Response) => {
    res.render('neworder')
})
index.get('/logout', (req: any, res: Response) => {
    console.log(req.session)
    req.session.destroy()
    res.redirect('/')
})

export default index