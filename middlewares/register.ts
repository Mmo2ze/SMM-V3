import type { inputR } from '../types'
import db from '../database/models';
import type { User, Service, Order, registerR } from '../types'
import bcrypt from 'bcryptjs';
const Op = require('sequelize').Op;





export const checkInput = async (input: inputR): Promise<registerR> => {
    var validate: { status: boolean, error: string } = validateUsername(input.name)
    if (validate.status == false) {
        return validate
    }
    validate = validateEmail(input.email)
    if (validate.status == false) {
        return validate
    }
    const userFound = (await db.User.findOne({ where: { name: input.name } }))
    const emailFound = (await db.User.findOne({ where: { email: input.email } }));
    if (userFound) {
        return { status: false, error: 'User already exists' };
    }
    if (emailFound) {
        return { status: false, error: 'Email already exists' };
    }
    if (input.password.length < 6) {
        return { status: false, error: 'password must be at least 6 characters' };
    }
    if (input.password !== input.rePassword) {
        return { status: false, error: 'password dose not match' };
    }
    return { status: true, error: '' };
}


export function validateUsername(name: string) {
    var error = "";
    var illegalChars = /\W/; // allow letters, numbers, and underscores
    if (name == "") {
        error = " Please enter Username";
    } else if ((name.length < 5) || (name.length > 15)) {
        error = " Username must have 5-15 characters";
    } else if (illegalChars.test(name)) {
        error = " Please enter valid Username. Use only numbers and alphabets";
    } else {
        error = "";
    }
    if (error) {
        console.log(error)
        return { status: false, error: error };
    }
    return { status: true, error: '' }
}
export function validateEmail(email: string) {
    var validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    var error = "";
    if (!email.match(validRegex)) {
         error = "Please enter valid Email";
    }
    if (error) {
        console.log(error)
        return { status: false, error: error };
    }
    return { status: true, error: '' }
}

type status = {
    isFound: boolean,
    pass: string
}


