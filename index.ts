import express from 'express';
const app = express();
const port = process.env.PORT || 3000;
import db from './database/models';
import type { User } from './types';

app.get('/', async(req, res) => {
    try {
        const users = await db.User.findAll(
            {
                include: {
                    model: db.Order
                }
            }
        ) // gets you all pictures
        // const lala : User = users[0].get()
        res.json(users)
}catch(err){

    console.log(err)
    return res.send('Server Errrrrrorrrroror');
}

})



app.listen(port, () => {
    console.log(`App listening on port ${port}`)
})
