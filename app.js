const express = require('express');

const fs = require('fs');
const { normalize } = require('path');
const path = require('path')
const app = express();

// getting-started.js
const mongoose = require('mongoose');

main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://localhost:27017/contactdance');
}

//define mongoose schema
const contactschema = new mongoose.Schema({
    name: String,
    Phone_no: String,
    Email: String,
    age: String,
    gender: String,
    Address: String,
    Description: String
});
const contact = mongoose.model('contact', contactschema);

const port = 80;

app.use('/static', express.static('static'))
app.use(express.urlencoded())

app.set('view engine','pug')

app.set('views',path.join(__dirname,'views'))

app.get('/',(req,res)=>{
    const params={ }
    res.status(200).render('home.pug',params)
})

app.get('/contact',(req,res)=>{
    const params={ }
    res.status(200).render('contact.pug',params)
})

app.post('/contact',(req,res)=>{
    const mydata = new contact(req.body);
    mydata.save().then(()=>{
        res.send("this item has been saved to the database");
    }).catch(()=>{
        res.status(400).send("item was not saved to the database")

    })

    // res.status(200).render('contact.pug')
})

app.listen(port, ()=>{
    console.log(`the application was successfully started on port ${port}`)
})


