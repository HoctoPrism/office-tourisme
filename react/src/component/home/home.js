import React from "react";
import {Box, Container, Typography} from "@mui/material";


function Home() {

    document.title = 'Page d\'accueil'

    return <Container maxWidth="lg" id='home'>
        <Box>
            <Typography variant='h2'>Welcome</Typography>
            <Typography variant='h5'>REGLER LE SOUCIS DE FLASH BLANC LORS D'UN LOAD DE PAGE</Typography>
            <Typography variant='h5'>Ajout de la possibilité de créer un schedule, address... depuis place</Typography>
            <Typography variant='h5'>Gerer restaurnt_food</Typography>
            <Typography variant='h5'>Gerer image place</Typography>
            <Typography variant='h5'>Résoudre les notices MUI lors des edit/create sur le select</Typography>
        </Box>
    </Container>
}


export default Home;