import React, {useEffect, useRef, useState} from "react";
import {Box, Card, CardContent, CardMedia, Container, Grid, IconButton, Paper, Typography} from "@mui/material";
import maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';
import axios from "axios";
import {PlaceSharp, PlaceTwoTone} from "@mui/icons-material";

function Home() {

    document.title = 'Page d\'accueil'

    const mapContainer = useRef(null);
    const map = useRef(null);
    const [addresses, setAddresses] = useState([]);

    useEffect(() => {
        if (map.current) return; //stops map from intializing more than once
        map.current = new maplibregl.Map({
          container: mapContainer.current,
          style: `https://api.maptiler.com/maps/6a7cdf9b-726c-40d7-8eba-a30df7de2b6d/style.json?key=0uafp7rmIn8BPdz5ER79#14/45.04436/3.88652`,
        });
        map.current.addControl(new maplibregl.NavigationControl(), 'top-right');
        axios.get('http://127.0.0.1:8000/api/places').then((actualData) => {
            actualData = actualData.data;
            actualData.data.map((address) => {
                new maplibregl.Marker({color: "#5468ff"})
                    .setLngLat([address.address.longitude,address.address.latitude])
                    .setPopup(new maplibregl.Popup({ offset: 25 }).setText(
                        `${address.name} -- ${address.address.address}, ${address.address.postal_code} ${address.address.city}`
                    ))
                    .addTo(map.current)
                ;
            })
            setAddresses(actualData.data);
        }).catch((err) => {
            console.log(err)
        })
    }, [])

    return <Container maxWidth="xl" id='home' >
        <Box sx={{ mb: 20 }}>
            <Typography variant='h1' sx={{ fontSize: "45px", textAlign: "center", mb: 8 }}>Liste des évènements</Typography>
            <Grid container spacing={5}>
                {addresses ? (
                    addresses.map((address) => {
                        return <Grid item xs={4}>
                            <Card className="background-card-image" sx={{ backgroundImage: `url("http://127.0.0.1:8000/storage/uploads/${address.image}")` }}>
                                <Box className="body-card-content" sx={{ backgroundColor: 'alternative', color: 'background.paper' }}>
                                    <Typography component="div" variant="h5" sx={{ mb: 3 }}>{address.event.name}</Typography>
                                    <Typography component="div" sx={{ mb: 3 }}>
                                        <Box component="span">
                                            <Box component="span">du </Box>
                                            <Box component="span" sx={{ fontWeight: 'bold' }}>{address.event.date_start}</Box>
                                        </Box>
                                        <Box component="span">
                                            <Box component="span"> au </Box>
                                            <Box component="span" sx={{ fontWeight: 'bold' }}>{address.event.date_end}</Box>
                                        </Box>

                                    </Typography>
                                    <Typography sx={{ mb: 3 }} component="div">
                                        <Box component="span" sx={{ fontWeight: 'bold' }}>Type de lieu</Box>
                                        <Box component="span"> : {address.type.name}</Box>
                                    </Typography>
                                    <Typography variant="subtitle1" color="background.default" component="div">
                                        <Box component="span" sx={{ fontWeight: 'bold' }}>Description </Box>
                                        <Box component="span">: {address.description}</Box>
                                    </Typography>
                                    <Box sx={{ display: 'flex', align: 'center', mt: 3 }}><PlaceSharp sx={{ mr: 2 }} />{address.address.address}, {address.address.postal_code} {address.address.city}</Box>
                                </Box>
                            </Card>
                        </Grid>
                    })
                ) : (
                    <Box>Aucun résultat</Box>
                )}
            </Grid>
        </Box>
        <Paper elevation={12} sx={{ mb: 40 }}>
            <Box className="map-wrap">
                <Box ref={mapContainer} className="map" />
            </Box>
        </Paper>
    </Container>
}


export default Home;