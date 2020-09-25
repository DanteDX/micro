import React,{useState} from 'react';
import axios from 'axios';

const CommentCreate = ({postId}) => {
    const [content,setContent] = useState('');
    const onSubmit = async (e) =>{
        e.preventDefault();
        const body = {content};
        const config = {
            headers:{
                'Content-Type':'application/json'
            }
        };

        await axios.post(`http://localhost:4001/posts/${postId}/comments`,body,config);
        setContent('');
    }

    return (
        <div>
            <form onSubmit={e => onSubmit(e)}>
                <div className="form-group">
                    <label>New Comment</label>
                    <input value={content} onChange={e => setContent(e.target.value)} className="form-control"/>
                </div>
                <button className="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}

export default CommentCreate
