import React from 'react';
import styled from '@mui/material/styles/styled';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Button from '@mui/material/Button';
import ListItem from '@mui/material/ListItem'
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Paper from '@mui/material/Paper'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import List from '@mui/material/List';
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

export default function MyComments(props) {
  const [expanded, setExpanded] = React.useState(false);
  const [comments, setComments] = useState([]);

  const updateComments = () => {
    axios.get('http://localhost:8000/threads').then(response => {
      const myComments = [];
      for (let thread of response.data) {
        const eachThreadComments = thread.comments.filter(comment => comment.author === props.user);
        eachThreadComments.length && myComments.push(eachThreadComments);
      }
      // console.log(myComments);
      setComments(myComments);
    })
  }
  useEffect(() => {
    updateComments();
  }, []);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Card
      sx={{ maxWidth: 'inherit', marginBottom: '10px' }}
      raised
    >
      <CardHeader
        title='My Comments'
        subheader={'Comments having ' + props.user + ' as author'}
      />

      <CardActions disableSpacing>
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
            {comments.map((eachThreadComments) => (eachThreadComments.map((comment) =>
            (<ListItem>
              <Paper elevation={4} sx={{
                p: 5,
                bgColor: 'primary.main',
                flexGrow: 1
              }}>
                <ListItemAvatar>
                  <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
                </ListItemAvatar>
                <ListItemText primary={comment.content} secondary={comment.author + comment.timeStamp} />
              </Paper>
            </ListItem >))))}
          </List>
        </CardContent>
      </Collapse>
    </Card>
  );
}