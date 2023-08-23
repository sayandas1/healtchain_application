/* import React from 'react'
import Header from './Header';
import {Container, Grid, Box} from '@mui/material'

const HomePage = () => {
  return (
    <div>
      <Header />
      <Box>
      <Container sx={{ paddingTop: '50px' }}>
      What is Lorem Ipsum?
Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
        <Grid container justifyContent="space-around">
          <Grid item style={{ padding: '10px', border: '1px solid black' }}>
            Content as per choice
          </Grid>
          <Grid item style={{ padding: '10px', border: '1px solid black' }}>
            Nothing
          </Grid>
        </Grid>
      </Container>
      </Box>
    </div>
  )
}

export default HomePage */
import React from 'react'
import Header from './Header';
import {Container, Grid, Box, Typography} from '@mui/material';
import iitLogo from '../assets/IITPatnaL.jpg';

const HomePage = () => {
  return (
    <div>
      <Header />
      <Box>
      <Container sx={{ paddingTop: '50px' }}>
      {/* What is Lorem Ipsum?
Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
        <Grid container justifyContent="space-around">
          <Grid item style={{ padding: '10px', border: '1px solid black' }}>
            Content as per choice
          </Grid>
          <Grid item style={{ padding: '10px', border: '1px solid black' }}>
            Nothing
          </Grid>
        </Grid> */}
        <Grid xs={12} justifyContent="center" spacing={3}>
          <Grid item>
            <img src={iitLogo} width="300px" height="300px" />
          </Grid>
          <Grid item>
            <Typography variant="h3">COVID Tracker</Typography>
          </Grid>
        </Grid>
      </Container>
      </Box>
    </div>
  )
}

export default HomePage