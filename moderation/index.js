const express = require('express');
const app = express();
app.use(express.json({extended:false}));

const axios = require('axios');
const cors = require('cors');

app.post('/events',async (req,res)=>{
    const {type,data} = req.body;
    if(type === 'CommentCreated'){
        let status = data.content.includes('orange') ? 'rejected' : 'approved';
        const body = {
            type:'CommentModerated',
            data:{
                ...data,
                status
            }
        }
        const config = {
            headers:{
                'Content-Type':'application/json'
            }
        }
        try{
            await axios.post('http://localhost:4005/events',body,config);
        }catch(err){
            console.log('Error in moderation');
        }
    }

    res.send({});
})

app.listen(4003,()=>{
    console.log('Listening to port 4003');
})