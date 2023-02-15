import express from 'express'
import { checkLogin } from '../../middlewares/login'
import { checkInput } from "../../middlewares/register"
import type { registerR, loginR } from './../../types'
import db from './../../database/models'
import { isLogin } from './../../middlewares/middlewares'
import bcrypt from 'bcryptjs'
import { verify } from 'crypto'
import axios from 'axios'
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
    var registerR: registerR = (await checkInput(req.body))
    if(registerR.status ){
        let responseMsg = await axios.post('http://localhost:8000/api/sendcode', { email: req.body.email, admin: process.env.adminKey, subject: 'verifyCode' })
        console.log(responseMsg.data)
        res.render('getcode.ejs',{email:req.body.email})
    }else{
        res.render('register.ejs',{msg: registerR.error})
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