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
                            <Card sx={{ display: 'flex', minHeight: 320 }}>
                                <Grid container spacing={5}>
                                    <Grid item xs={6}>
                                        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                                            <CardContent sx={{ flex: '1 0 auto' }}>
                                                <Typography component="div" variant="h5" sx={{ mb: 3 }}>
                                                    {address.event.name}
                                                </Typography>
                                                <Typography component="div" sx={{ mb: 3 }}>
                                                    <Box>du {address.event.date_start}</Box>
                                                    <Box>au {address.event.date_end}</Box>
                                                </Typography>
                                                <Typography component="div">
                                                    Type de lieu : {address.type.name}
                                                </Typography>
                                            </CardContent>
                                        </Box>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <CardMedia
                                            component="img"
                                            sx={{ width: 250, borderTopLeftRadius: 125, borderBottomLeftRadius: 125, float: 'right' }}
                                            image={`http://127.0.0.1:8000/storage/uploads/${address.image}`}
                                            alt={address.name}
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Typography sx={{ mx: 4 }} variant="subtitle1" color="text.secondary" component="div">
                                            {address.description}
                                        </Typography>
                                        <Box sx={{ display: 'flex', align: 'center', mt: 4 }}>
                                            <PlaceSharp sx={{ mx: 2 }} />{address.address.address}, {address.address.postal_code} {address.address.city}
                                        </Box>
                                    </Grid>
                                </Grid>
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