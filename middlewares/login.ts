import db from '../database/models';
import type{ User, Service, Order,loginR } from '../types'
import bcrypt from 'bcryptjs';

const Op = require('sequelize').Op;
export const checkLogin = async (input: string, inputPass: string):Promise<loginR> => {
    let status: status = await isFound(input)
    if (status.isFound) {
        let passIsCorrect = await correctPass(input, inputPass, status.pass)
        return {
            isFound: true,
            passIsCorrect: passIsCorrect
        }
    }
    return {
        isFound: false,
        passIsCorrect: false,
    }
}

export const correctPass = async (input: string, pass: string, dbPass: string): Promise<boolean> => {
    if (await bcrypt.compare(pass, dbPass)) {
        return true
    }
    return false
}
type status = {
    isFound: boolean,
    pass: string
}
export const isFound = async (input: string): Promise<status> => {
    let userInfo: User = await db.User.findOne({
        where: {
            [Op.or]: {
                email: input,
                name: input
            }
        }
    })
    if (userInfo?.email) {
        return {
            isFound: true,
            pass: userInfo.password
        }
    }
    return {
        isFound: false,
        pass: ''

    }
}

