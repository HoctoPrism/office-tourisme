import React from "react";
import {Box, Container, Typography} from "@mui/material";


function Home() {

    document.title = 'Page d\'accueil'

    return <Container maxWidth="lg" id='home'>
        <Box>
            <Typography variant='h5'>carte des lieux</Typography>
            <Typography variant='h5'>ajout lieu avec long/lat </Typography>
            <Typography variant='h5'>card</Typography>
            <Typography variant='h5'>changer palette couleur</Typography>
        </Box>
    </Container>
}


export default Home;