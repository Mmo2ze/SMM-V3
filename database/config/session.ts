const session = require('express-session');
const MySQLStore = require('express-mysql-session')(session);

const options = {
    host: '127.0.0.1',
    user: 'root',
    password: '',
    database: 'smm',
  createDatabaseTable: true,
}
const sessionStore = new MySQLStore(options);

// to connect the settion
export  const sessionMiddleware = session({
  secret: 'lkjwagdliuoqwhdiouqwgodh;iopqwjhdoyuqwtpdhouqwgofitdku7,qwydhlgkuyqtrdypo;ialkjhdvjyatwhdyu;jqhu,kdgfq7kiduhgyuetwyd6up98qoiuqdFGTFDRXFAEGRETR#',
  resave:true,
  name: 'fews33artsdw4hup53',
  store:sessionStore,
  saveUninitialized: true,
  cookie: {
    httpOnly: true,
    maxAge: 1000 * 60 * 60 * 24,
    secure:false
  }
})




