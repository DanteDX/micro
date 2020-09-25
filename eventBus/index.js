const express = require('express');
const app = express();
app.use(express.json({extended:false}));
const cors = require('cors');
app.use(cors());
const axios = require('axios');

const events = [];

app.get('/events',(req,res)=>{
    res.send(events); // which is an array
})

app.post('/events',async (req,res)=>{
    const event = req.body;
    events.push(event);
    const config = {
        headers:{
            'Content-Type':'application/json'
        }
    }
    try{
        await axios.post('http://localhost:4000/events',event,config);
        await axios.post('http://localhost:4001/events',event,config);
        await axios.post('http://localhost:4002/events',event,config);
        await axios.post('http://localhost:4003/events',event,config);
    }catch(err){
        console.log('Error in Event Bus');
    }

    res.send({'status':'OK'});
})

app.listen(4005,()=>{
    console.log('Listening to 4005');
})