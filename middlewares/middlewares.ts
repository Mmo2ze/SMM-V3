import type { Request, Response, NextFunction } from 'express'
 import nodemailer from 'nodemailer';

export const isLogin = (req: any, res: any, next: any) => {
    if (req.session.isLogin) {
        next()
    } else {
        res.redirect('/login')
    }
}
export const heroSesstion = (req: any, res: any, next: any) => {
    if (req.session.hero) {
        next()
    } else {
        res.status(500)
    }
}


export const apiMiddlewares = (req: Request, res: Response, next: NextFunction) => {
    next()
}

export function getRandomArbitrary(min: number, max: number) { return Math.random() * (max - min) + min; }


export function sendEmail(email: string, subject: string, msg: string) {
    console.log(email, subject, msg)
    return new Promise((resolve, reject) => {
        var transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'smmzigzag@gmail.com',
                pass: 'ahpbdtfjntdsayje'
            }
        })

        const mail_config = {
            from: 'smmzigzag@gmail.com',
            to: email,
            subject: subject,
            text: msg
        }
        transporter.sendMail(mail_config, (error: any, info: any) => {
            if (error) {
                console.log(error)
                return reject({ message: 'error' })
            }
            console.log('Message sent:' + info.response)
            return resolve({ message: 'email sent' })
        })
    })

}

// Import NodeMailer (after npm install)
