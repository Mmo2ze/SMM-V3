const port = 8000;
import express, { NextFunction } from 'express';
import { sessionMiddleware } from './database/config/session';
import indexRoute from './routes/pages'
import apiRoute from './routes/APIs/api'
import db from './database/models';
const socket = require('socket.io')
import { validateEmail } from './middlewares/register'
import axios from 'axios';
import type { User } from './types';
import { Server } from "socket.io";
import session from "express-session";
import { createServer } from "http";
const app = express();
const http = require('http').Server(app)
require("dotenv").config();
import cors from 'cors';


app.use(express.urlencoded({ extended: false }));
app.use(sessionMiddleware);
app.set('view engine', 'ejs')

app.use("/public", express.static(__dirname + "/public"));
app.use(express.static("views"));
app.use('/api', apiRoute)
app.use('/', indexRoute);
const io = new Server(http);
http.listen(port, () => {
    console.log(`App listening on port ${port}`)
})
// convert a connect middleware to a Socket.IO middleware
// convert a connect middleware to a Socket.IO middleware
const wrap = (middleware: (arg0: any, arg1: {}, arg2: any) => any) => (socket: { request: any; }, next: any) => middleware(socket.request, {}, next); io.use(wrap(sessionMiddleware));

io.use(wrap(sessionMiddleware));













io.use((socket:any, next) => {
    //? autorizeation for socket
        next()
    });
io.use((socket:any, next:any) => {
    sessionMiddleware(socket.request as Request, {} as Response, next as NextFunction);
});
io.on("connection", (socket:any) => {
    const req = socket.request;
    socket.on('validateName', async (data: any) => {
        console.log(data)
        const nameFound = await db.User.findOne({ where: { name: data } })
        if (nameFound) {
            socket.emit('error', { id: 'name', error: 'name already exists' });
        }
        else socket.emit('success', { id: 'name', msg: 'Name is validate' });
    })
    socket.on('validateEmail', async (data: any) => {
        const emailFound = await db.User.findOne({ where: { email: data } })
        if (emailFound) {
            socket.emit('error', { id: 'email', error: 'Email already exists' });
        }
        else socket.emit('success', { id: 'email', msg: 'Email is validate' });
    })
    socket.on('singUp', async (data: any) => {
    })
    socket.on('sendCode', async (email: any) => {
        const emailFound = await db.User.findOne({ where: { email: email } })
        let validateemail: any = validateEmail(email)
        if (validateemail.status == false) {
            console.log('email valid not ')
            socket.emit('error', { id: 'email', error: 'Email invalid' });
        }
        else if (emailFound) {
            socket.emit('error', { id: 'email', error: 'Email already exists' });
        } 
        if (req.session?.user?.regist?.verifyCode && req.session.user.regist.email== email){
            const rs = await axios.post('http://localhost:8000/api/resendcode', { email : req.session.user.regist.email,admin: process.env.adminKey, subject: 'verifyCode', code: req.session.user.regist.verifyCode })
            if (rs.data.status == true) {;
                let inverval_timer = setInterval(function () {
                    req.session.destroy();
                    console.log('session destroyed');
                    clearInterval(inverval_timer);
                }, 900000)
                socket.emit('sendcode', { time: 120 })
            } else {
                req.session.destroy();
                socket.emit('error', { id: 'name', error: 'Sorry Try again' });
            }
        }
        else {
            const ress = await axios.post('http://localhost:8000/api/sendcode', { email: email, admin: process.env.adminKey, subject:'verifyCode' })
            console.log(ress.data)
            if(ress.data.status == true){
                req.session.user = {};
                req.session.user.regist = { verifyCode: ress.data.code, email: email };
                req.session.save();
                let inverval_timer = setInterval( function(){
                    req.session.destroy();
                    console.log('session destroyed');
                    clearInterval(inverval_timer); 
                }, 900000)
                socket.emit('sendcode',{time:120})
            }else{
                req.session.destroy();
                socket.emit('error', { id: 'name', error: 'Sorry Try again Later' });
            }

        }
    }
    )
    socket.on('fd', async (email: any) => {
        console.log(socket.Request.session)
    })
    // ? SOCKET IO
    
    
    socket.on("disconnect", () => {
        console.log('sendcode end');
    });
});