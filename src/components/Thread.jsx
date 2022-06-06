import React from 'react';
import styled from '@mui/material/styles/styled';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Button from '@mui/material/Button';
import FavoriteIcon from '@mui/icons-material/Favorite';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import List from '@mui/material/List';
import Comment from './Comment';
import CommentForm from './CommentForm'
import { useState, useEffect } from "react";
import axios from 'axios';


const ExpandMore = styled((props) => {
    const { expand, ...other } = props;
    return <Button {...other} />;
})(({ theme, expand }) => ({
    transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
    }),
}));

export default function Thread(props) {

    const [comments, setComments] = useState([]);
    const [currentFav, setCurrentFav] = useState(props.threadFav);
    const [expanded, setExpanded] = React.useState(false);

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };


    const updateComments = () => {
        axios.get('http://localhost:8000/threads/' + props.threadId).then(response => {
            //   console.log(response.data.comments);
            setComments(response.data.comments);
        })
    }
    useEffect(() => {
        updateComments();
    }, []);


    const addComment = (newCommentContent) => {
        if (newCommentContent === '') {
            alert("Comment Cannot Be Empty!");
            return;
        }

        axios.get('http://localhost:8000/threads/' + props.threadId).then(response => {
            var today = new Date();
            const oldComments = response.data.comments;
            const newComment = {
                content: newCommentContent,
                author: 'This User',
                timeStamp: ' at ' + today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds() + ' on ' + today.getFullYear() + '/' + (today.getMonth() + 1) + '/' + today.getDate(),
                id: (oldComments.length === 0) ? 1 : oldComments[oldComments.length - 1].id + 1,
                fav: false
            };
            const newComments = [...oldComments, newComment];
            axios.patch('http://localhost:8000/threads/' + props.threadId,
                {
                    comments: newComments
                }).then(() => {
                    updateComments();
                }
                )
        })
    };


    const editComment = (editId) => {
        axios.get('http://localhost:8000/threads/' + props.threadId).then(response => {
            const editIndex = response.data.comments.findIndex(comment => comment.id === editId);
            const newCommentContent = prompt("Edit Comment", response.data.comments[editIndex].content);
            if (newCommentContent === '') {
                alert("Comment Cannot Be Empty!");
                return;
            }
            var today = new Date();
            const newComments = response.data.comments;
            newComments[editIndex].content = newCommentContent;
            newComments[editIndex].author = 'This User';
            newComments[editIndex].timeStamp = ' at ' + today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds() + ' on ' + today.getDate() + '/' + (today.getMonth() + 1) + '/' + today.getFullYear();
            axios.patch('http://localhost:8000/threads/' + props.threadId,
                {
                    comments: newComments
                }).then(() => {
                    updateComments();
                }
                )
        })
    };


    const deleteComment = (deleteId) => {
        axios.get('http://localhost:8000/threads/' + props.threadId).then(response => {
            const oldComments = response.data.comments;
            const newComments = oldComments.filter((comment) => (comment.id !== deleteId));
            axios.patch('http://localhost:8000/threads/' + props.threadId,
                {
                    comments: newComments
                }).then(() => {
                    updateComments();
                }
                )
        })
    };


    const toggleThreadFav = () => {
        const newThreadFav = currentFav ? false : true;
        setCurrentFav(newThreadFav);
        axios.patch('http://localhost:8000/threads/' + props.threadId,
            {
                fav: newThreadFav
            }).then(response => {
                console.log(response);
            })
    };


    return (
        <Card
            sx={{ maxWidth: 'inherit', marginBottom: '10px' }}
            raised
        >
            <CardHeader
                title={props.threadTitle}
                subheader={props.threadAuthor + props.threadTimeStamp}
            />

            <CardActions disableSpacing>
                <Button
                    aria-label="add to favorites"
                    color={(currentFav) ? 'error' : 'primary'}
                    onClick={() => {
                        toggleThreadFav();
                    }}>
                    <FavoriteIcon />
                </Button>
                <Button
                    aria-label="delete thread"
                    onClick={() => {
                        props.deleteThread(props.threadId);
                    }}>
                    <DeleteIcon />
                </Button>
                <Button
                    aria-label="edit thread"
                    onClick={() => {
                        props.editThread(props.threadId);
                    }}>
                    <EditIcon />
                </Button>
                <ExpandMore
                    expand={expanded}
                    onClick={handleExpandClick}
                    aria-expanded={expanded}
                    aria-label="show more"
                >
                    <ExpandMoreIcon />
                </ExpandMore>
            </CardActions>
            <Collapse in={expanded} timeout="auto" unmountOnExit>
                <CardContent>

                    <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
                        {comments.map((comment) => (<Comment
                            key={comment.id}
                            threadId={props.threadId}
                            commentContent={comment.content}
                            commentAuthor={comment.author}
                            commentTimeStamp={comment.timeStamp}
                            commentId={comment.id}
                            commentFav={comment.fav}
                            deleteComment={deleteComment}
                            editComment={editComment}
                        />
                        ))}
                    </List>

                    <CommentForm addComment={addComment} />
                </CardContent>
            </Collapse>
        </Card>
    );
}