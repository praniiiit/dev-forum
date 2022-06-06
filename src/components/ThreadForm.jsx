import React from 'react'
import { useState } from "react";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

function ThreadForm(props) {
    const [input, setInput] = useState('');

    const handleSubmit = e => {
        e.preventDefault();
        props.addThread(input);
        setInput('');
    };

    return (
        <form className='thread-form' onSubmit={handleSubmit}>
            <TextField
                label='Add Thread Title Here'
                variant='outlined'
                value={input}
                fullWidth
                onChange={e => setInput(e.target.value)}
                autoComplete='off'
            />

            <Button
                variant="contained"
                onClick={handleSubmit}
                fullWidth
            >
                Post Thread
            </Button>

        </form>
    );
}

export default ThreadForm;