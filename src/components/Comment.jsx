import React from 'react'
import ListItem from '@mui/material/ListItem'
import ListItemText from '@mui/material/ListItemText';
import Button from '@mui/material/Button';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import FavoriteIcon from '@mui/icons-material/Favorite';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import Avatar from '@mui/material/Avatar';
import Paper from '@mui/material/Paper'
import { useState } from "react";
import axios from 'axios';


export default function Comment(props) {
  const [currentFav, setCurrentFav] = useState(props.commentFav);

  const toggleCommentFav = () => {
    const newCommentFav = currentFav ? false : true;
    setCurrentFav(newCommentFav);
    axios.get('http://localhost:8000/threads/' + props.threadId).then(response => {
      const editIndex = response.data.comments.findIndex(comment => comment.id === props.commentId);
      const newComments = response.data.comments;
      newComments[editIndex].fav = newCommentFav;
      axios.patch('http://localhost:8000/threads/' + props.threadId,
        {
          comments: newComments
        })
    })
  };

  return (
    <ListItem>
      <Paper elevation={4} sx={{
        p: 5,
        bgColor: 'primary.main',
        flexGrow: 1
      }}>
        <ListItemAvatar>
          <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
        </ListItemAvatar>
        <ListItemText primary={props.commentContent} secondary={props.commentAuthor + props.commentTimeStamp} />
        <Button
          aria-label="add to favorites"
          color={(currentFav) ? 'error' : 'primary'}
          onClick={() => {
            toggleCommentFav();
          }}>
          <FavoriteIcon />
        </Button>
        <Button
          onClick={() => {
            props.deleteComment(props.commentId);
          }}>
          <DeleteIcon />
        </Button>
        <Button
          onClick={() => {
            props.editComment(props.commentId);
          }}>
          <EditIcon />
        </Button>
      </Paper>
    </ListItem >

  )
}