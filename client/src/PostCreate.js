import React,{useState} from 'react'
import axios from 'axios';

 const PostCreate = () => {
    const [title,setTitle] = useState('');


    const onChange  = e => setTitle(e.target.value);
    
    const onSubmit = async (e) =>{
        e.preventDefault();
        const body = {
            title
        };
        const config = {
            header:{
                'Content-Type':'application/json'
            }
        };
        await axios.post('http://localhost:4000/posts',body,config);
        setTitle('');
    }
    return (
        <div>
            <form className="form-group" onSubmit={e => onSubmit(e)}>
                <label><h1>Title</h1></label>
                <input className="form-control" value={title} onChange={e => onChange(e)} />
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}

export default PostCreate;