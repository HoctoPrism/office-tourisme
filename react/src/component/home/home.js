import React, {useEffect, useRef, useState} from "react";
import {Box, Container, Paper, Typography} from "@mui/material";
import maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';
import axios from "axios";

function Home() {

    document.title = 'Page d\'accueil'

    const mapContainer = useRef(null);
    const map = useRef(null);

    useEffect(() => {
        if (map.current) return; //stops map from intializing more than once
        map.current = new maplibregl.Map({
          container: mapContainer.current,
          style: `https://api.maptiler.com/maps/6a7cdf9b-726c-40d7-8eba-a30df7de2b6d/style.json?key=0uafp7rmIn8BPdz5ER79#14/45.04436/3.88652`,
        });
        map.current.addControl(new maplibregl.NavigationControl(), 'top-right');
        axios.get('http://127.0.0.1:8000/api/addresses').then((actualData) => {
            actualData = actualData.data;
            actualData.data.map((address) => {
                new maplibregl.Marker({color: "#5468ff"})
                    .setLngLat([address.longitude,address.latitude])
                    .setPopup(new maplibregl.Popup({ offset: 25 }).setText(`${address.address}, ${address.postal_code} ${address.city}`))
                    .addTo(map.current)
                ;
            })
        }).catch((err) => {
            console.log(err)
        })
    }, [])

    return <Container maxWidth="lg" id='home'>
        <Box sx={{ mb: 10 }}>
            <Typography variant='h1' sx={{ fontSize: "25px" }}>Ici les cards</Typography>
        </Box>
        <Paper elevation={12}>
            <Box className="map-wrap">
                <Box ref={mapContainer} className="map" />
            </Box>
        </Paper>
    </Container>
}


export default Home;