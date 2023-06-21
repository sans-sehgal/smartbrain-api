const express = require('express')
const bcrypt = require('bcrypt');
const cors = require('cors')

const app = express()
const db = require('knex')({
    client: 'pg',
    connection: {
      host : '127.0.0.1',
      port : 5432,
      user : 'sanskarsehgal',
      password : '',
      database : 'smart-brain'
    }
  });


app.use(express.json());
app.use(cors())




app.listen(10533, ()=>{
    console.log("app is running");
})




app.post('/signin', (req, res) => {
    db.select('email', 'hash').from('login')
        .where('email', '=', req.body.email)
        .then(data => {
            const isValid = bcrypt.compareSync(req.body.password, data[0].hash);
            if(isValid){
                db.select('*').from('users')
                .where('email', '=', req.body.email)
                .then(user => {
                    res.json(user)
                })
                .catch(err => err.status(400).json('unable to get user!'))
            }
            else{
                res.status(400).json('Wrong Credentials')
            }
        })
        .catch(err => res.status(400).json('Wrong Credentials'))
})

app.post('/register', (req, res) => {
    
    const hash = bcrypt.hashSync(req.body.password, 10);
    db.transaction(trx => {
        trx.insert({
            hash: hash,
            email: req.body.email,

        })
        .into('login')
        .returning('email')
        .then(loginEmail => {
            return trx('users')
            .returning('*')
            .insert({
            email: req.body.email,
            name: req.body.name,
            joined : new Date()
            })
            .then(response => {
            res.json(response)
        })
    })
    .then(trx.commit)
    .catch(trx.rollback)
    
    }).catch(err => res.status(400).json("Unable to Join"))

})

app.get('/profile/:id', (req,res) => {
    const { id } = req.params;
    db.select('*').from('users').where({
        id: id,

    }).then(user => {
        if(user.length)
            res.json(user[0])
        else
            res.status(400).json("Not Found")
    }).catch(err => res.status(400).json("Error getting user"))


})

app.put("/image", (req, res) => {
    const { id } = req.body;

    
    db('users').where('id', '=', id)
    .increment('entries' , 1)
    .returning('entries')
    .then(entries => {
        res.json(entries[0].entries);
    }).catch(err => res.status(400).json("Unable to get entries"))


})