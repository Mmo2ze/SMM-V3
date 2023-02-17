import express, { Router } from 'express'
import axios from 'axios'
import { apiMiddlewares } from '../../middlewares/middlewares'
import { isLogin } from './../../middlewares/middlewares';
import { isAdmin } from './middlewares/middlewares'
import nodemailer from 'nodemailer';

const api = Router()
import { getRandomArbitrary, sendEmail } from '../../middlewares/middlewares'
var bodyParser = require('body-parser');
api.use(bodyParser.urlencoded({ extended: true }));
api.use(bodyParser.json())
api.get('/', (req: any, res) => {
    res.json(req.session)
})
require("dotenv").config();
api.get('/5', (req: any, res) => {
    req.session.userid = 5;
    res.json({
        res: true,
        data: [
            req.session.userid
        ]
    })
})

api.post('/sendcode', isAdmin, async (req: any, res: any) => {
    let code: string = getRandomArbitrary(1000, 9999).toFixed().toString();
    console.log('Verify code is : ' + code)
    const mail_config = {
        from: 'smmzigzag@gmail.com',
        to: req.body.email,
        subject: req.body.subject,
        text: code
    }
    console.log('Verify code is : ' + code)

    transporter.sendMail(mail_config, (error: any, info: any) => {
        console.log('sending mail')
        if (error) {
            console.log("error" + error)
            return res.json({ status: false, error: 'error' })
        }
        console.log('Message sent:' + info.response)
        return res.json({ message: 'email sent', status: true, code: code })
    })
    console.log('Verify code is : ' + code)


})
api.post('/resendcode', (req: any, res: any) => {
    console.log('code resended: ' + req.body.code)

    const mail_config = {
        from: 'smmzigzag@gmail.com',
        to: req.body.email,
        subject: req.body.subject,
        text: req.body.code
    }
    transporter.sendMail(mail_config, (error: any, info: any) => {
        if (error) {
            console.log("error" + error)
            return res.json({ status: false, error: 'error' })
        }
        console.log('Message sent:' + info.response)
        return res.json({ message: 'email sent', status: true, })
    })

})
api.get('/test', async (req: any, res: any) => {
    const request = await axios
        .get(`https://secsers.com/api/v2`, {
            params: { key: '', action: 'services' },
        })
    res.json(request.data)
})






api.get('/:url', (req: any, res: any) => {
    res.render(`${req.params.url}.ejs`,
        {
            msg: '', 
            email: '',
            status : false
        })
})


export default api





//dfsdfsdfsdfsdf










































/*------------      VARIBLSE     -----------*/
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.SENDER_MAIL,
        pass: process.env.SENDER_AUTH
    }
})