import React from 'react';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

export default function Footer() {
  return (
    <Container
      maxWidth="sm"
      sx={{ color: 'primary' }}
    >

      <Box
        sx={{
          p : 5,
          color: 'primary.main',
        }}
      >
      <Typography
        variant = 'h7'
        color = 'primary'
        textAlign = 'center'
      >
          Made with 💗 using ReactJS, Material-UI, JSON-Server & Axios
        </Typography>
      </Box>


    </Container>
  )
}