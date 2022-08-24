import React from "react";
import {Box, Container, Typography} from "@mui/material";


function Home() {

    document.title = 'Page d\'accueil'

    return <Container maxWidth="lg" id='home'>
        <Box>
            <Typography variant='h5'>Gerer restaurnt_food</Typography>
            <Typography variant='h5'>card</Typography>
            <Typography variant='h5'>carte</Typography>
            <Typography variant='h5'>ajout lieu avec long/lat </Typography>
            <Typography variant='h5'>card</Typography>
            <Typography variant='h5'>btn pour event dans le bo</Typography>
            <Typography variant='h5'>auth</Typography>
        </Box>
    </Container>
}


export default Home;