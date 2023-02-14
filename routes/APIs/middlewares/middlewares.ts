require('dotenv').config()
export const isAdmin = (req:any,res:any,next:any)=>{
    if (req.body.admin === process.env.adminKey){
        next()
    }
    else{res.json('Unauthorized.').status(401).end() }
}