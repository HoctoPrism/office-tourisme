import React, {useEffect, useState} from "react";
import {Box, Container, Typography} from "@mui/material";
import {MapContainer, Marker, Popup, TileLayer} from 'react-leaflet'
import  "leaflet/dist/leaflet.css";
import L from 'leaflet';
import axios from "axios";

function Home() {

    document.title = 'Page d\'accueil'

    const [addresses, setAddresses] = useState([]);
    L.Icon.Default.mergeOptions({
        iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
        iconUrl: require('leaflet/dist/images/marker-icon.png'),
        shadowUrl: require('leaflet/dist/images/marker-shadow.png')
    });

    useEffect(() => {
        axios.get('http://127.0.0.1:8000/api/addresses').then((actualData) => {
            actualData = actualData.data;
            setAddresses(actualData.data);
        }).catch((err) => {
            console.log(err)
            setAddresses([null]);
        })
    }, [])

    return <Container maxWidth="lg" id='home'>
        <Box>
            <Typography variant='h5'>card</Typography>
        </Box>
        <Box>
            <MapContainer className='map-container' center={[45.042768, 3.882936]} zoom={14} scrollWheelZoom={true} >
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {addresses.map((address) => (
                    <Marker key={address.id} position={[address.latitude, address.longitude]} >
                        <Popup>
                            {address.address}, {address.postal_code} {address.city}
                        </Popup>
                    </Marker>
                ))}
            </MapContainer>
        </Box>
    </Container>
}


export default Home;