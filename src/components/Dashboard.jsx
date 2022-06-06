import React from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid'
import MyThreads from './MyThreads';
import FavThreads from './FavThreads';
import MyComments from './MyComments';
import FavComments from './FavComments';

function Dashboard(props) {
    return (
        <>
            <Box
                sx={{
                    p: 5,
                    bgColor: 'primary.main',
                }}
            >
                <Typography
                    variant='h4'
                    color='primary'
                    textAlign='center'
                >
                    Welcome, {props.user}!
                </Typography>
            </Box>

            <Box
                sx={{
                    p: 1,
                    bgColor: 'primary.main',
                }}
            >
                <Grid container justifyContent='center'>

                    <Grid item s={12} md={6}>
                        <MyThreads user={props.user} />
                    </Grid>

                    <Grid item s={12} md={6}>
                        <FavThreads user={props.user} />
                    </Grid>

                    <Grid item s={12} md={6}>
                        <MyComments user={props.user} />
                    </Grid>

                    <Grid item s={12} md={6}>
                        <FavComments user={props.user} />
                    </Grid>

                </Grid>
            </Box>
        </>
    )
}

export default Dashboard