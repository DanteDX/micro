const express = require('express');
const app = express();
app.use(express.json({extended:false}));
const cors = require('cors');
const axios = require('axios');
app.use(cors());

const posts = {};

const handleEvents = async (type,data) => {
    if(type === 'PostCreated'){
        const {id,title} = data;
        posts[id] = {id,title,comments:[]}
    }

    if(type === 'CommentCreated'){
        const {id,content,postId,status} = data;
        const post = posts[postId];
        post.comments.push({id,content,status,postId});

    }
    if(type === 'CommentUpdated'){
        const {id,content,postId,status} = data;
        const post = posts[postId];
        const comment = post.comments.filter(comment => comment.id === id);
        comment[0].status = status;
        comment[0].content = content;
    }
}

app.get('/posts',(req,res)=>{
    res.send(posts);
});

app.post('/events',(req,res)=>{
    const {type,data} = req.body;
    handleEvents(type,data);
    res.send({});
});

app.listen(4002,async ()=>{
    console.log('Listening to 4002');
    const res = await axios.get('http://localhost:4005/events');
    res.data.forEach(event =>{
        const {type,data} = event;
        console.log('Handling request: ',type);
        handleEvents(type,data);
    })
})