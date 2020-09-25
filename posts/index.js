const express = require('express');
const {randomBytes} = require('crypto');
// const bodyParser = require('body-parser');
const app = express();
// app.use(bodyParser.json());
app.use(express.json({extended:false})); // instead of bodyparser
const cors = require('cors');
app.use(cors());
const posts = {};
const axios = require('axios');

app.get('/posts',(req,res)=>{
    res.send(posts);
})

app.post('/posts',async (req,res)=>{
    const id = randomBytes(4).toString('hex');
    const {title} = req.body;
    posts[id] = {
        id,title
    }
    const body = {
        'type':'PostCreated',
        'data':{id,title}
    }
    const config = {
        headers:{
            'Content-Type':'application/json'
        }
    }
    await axios.post('http://localhost:4005/events',body,config);
    res.status(201).send(posts[id]);
});

app.post('/events',(req,res)=>{
    console.log('Received Event: ',req.body.type);
    res.send({});
})


app.listen(4000,() => console.log('Listening to port 4000'));