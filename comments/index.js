const express = require('express');
const app = express();
app.use(express.json({extended:false}));
const {randomBytes}  = require('crypto');
const cors = require('cors');
app.use(cors());
const axios = require('axios');

const commentsByPostId = {};

app.post('/posts/:postId/comments',async (req,res)=>{
    const commentId = randomBytes(4).toString('hex');
    const {content} = req.body;
    const comments = commentsByPostId[req.params.postId] || [];
    comments.push({id:commentId,content,status:'pending'});
    commentsByPostId[req.params.postId] = comments;
    
    const body = {
        type:'CommentCreated',
        data:{
            id:commentId,
            content,
            postId:req.params.postId,
            status:'pending'
        }
    };
    const config = {
        headers:{
            'Content-Type':'application/json'
        }
    };
    await axios.post('http://localhost:4005/events',body,config);
    res.status(201).send(comments);
});

app.get('/posts/:postId/comments',(req,res)=>{
    res.send(commentsByPostId[req.params.postId] || []);
})

app.get('/posts/comments',(req,res)=>{
    res.send(commentsByPostId);
})

app.post('/events',async(req,res)=>{
    console.log('Received Event: ',req.body.type);
    const {type,data} = req.body;
    if(type === 'CommentModerated'){
        const {postId,id,status,content} = data;
        const comments = commentsByPostId[postId];
        const comment = comments.filter(comment => comment.id === id);
        comment.status = status;
        const body = {
            type:'CommentUpdated',
            data
        }
        const config = {
            headers:{
                'Content-Type':'application/json'
            }
        }
        await axios.post('http://localhost:4005/events',body,config);
    }
    res.send({});
})






app.listen(4001,()=> console.log('Listening on port 4001'));