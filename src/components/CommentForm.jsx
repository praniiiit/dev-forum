import React from 'react'
import { useState } from "react";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

function CommentForm(props) {
    const [input, setInput] = useState('');

    const handleSubmit = e => {
        e.preventDefault();
        props.addComment(input);
        setInput('');
    };

    return (
        <form className='comment-form' onSubmit={handleSubmit}>
            <TextField
                label='Add Comment Here'
                variant='outlined'
                value={input}
                fullWidth
                onChange={e => setInput(e.target.value)}
                autoComplete='off'
            />

            <Button
                variant="outlined"
                onClick={handleSubmit}
                fullWidth
            >
                Post Comment
            </Button>

        </form>
    );
}

export default CommentForm;