import React, {useEffect, useState} from "react";
import {
    Box,
    Container,
    Paper,
    Snackbar,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TablePagination,
    TableRow,
    Typography,
    Alert, Avatar
} from "@mui/material";
import DeletePlace from "./deletePlace";
import NewPlace from "./newPlace";
import EditPlace from "./editPlace";
import axios from "axios";
import SchedulePlace from "./displaySchedule";
import EventPlace from "./displayEvent";

function Place() {

    document.title = 'Page des places';

    const [data, setData] = useState(null); // array of data
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null); // WIP
    const [toast, setShowToast] = useState(false);
    const [toastMessage, setToastMessage] = useState({});

    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);

    const handleChangePage = (place, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (place) => {
        setRowsPerPage(+place.target.value);
        setPage(0);
    };

    useEffect(() => {
        axios.get('http://127.0.0.1:8000/api/places').then((actualData) => {
            actualData = actualData.data;
            setLoading(true)
            setData(actualData.data);
            setError(null);
        }).catch((err) => {
            setError(err.message);
            setData(null);
        }).finally(() => {
            setLoading(false);
        });
    }, []);

    const handleDataChange = async (dataChange, message) => {
        await setData(dataChange)
        if (message && message === 'edit'){
            setToastMessage({message: "Place modifié !", severity: "success"});
            setShowToast(true);
        } else if(message && message === 'delete') {
            setToastMessage({message: "Place supprimé !", severity: "success"});
            setShowToast(true);
        }
    }

    return <Container maxWidth="xl" id="place">
        <Paper sx={{display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', py: 10}}>
            <Typography variant="h3" sx={{textAlign: "center"}} gutterBottom>Places</Typography>
            {loading ? (
                <Typography variant="h5" sx={{textAlign: "center"}} gutterBottom>Chargement des places...</Typography>
            ) : (
                <Box sx={{ maxWidth: '90%' }}>
                    <NewPlace newValue={{data}} handleDataChange={handleDataChange} />
                    <TableContainer sx={{ mt:4 }}>
                        <Table size="small">
                            <TableHead>
                                <TableRow>
                                    <TableCell key={1}>ID</TableCell>
                                    <TableCell key={2}>Nom</TableCell>
                                    <TableCell key={3}>Description</TableCell>
                                    <TableCell key={4}>image</TableCell>
                                    <TableCell key={5}>address</TableCell>
                                    <TableCell key={6}>event</TableCell>
                                    <TableCell key={7}>type</TableCell>
                                    <TableCell key={8}>schedule</TableCell>
                                    <TableCell key={9} align={'right'}>Actions</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(({id, name, description, image, event, type, schedule, address}) => {
                                    return (
                                        <TableRow hover role="checkbox" tabIndex={-1} key={name+id}>
                                            <TableCell>{id}</TableCell>
                                            <TableCell sx={{fontWeight: 'bold'}}>{name ?? '--'}</TableCell>
                                            <TableCell sx={{fontWeight: 'bold'}}>{description ?? '--'}</TableCell>
                                            <TableCell sx={{fontWeight: 'bold'}}>
                                                { image ? (
                                                    <Box component="img" src={`http://127.0.0.1:8000/storage/uploads/${image}`} alt={image} sx={{ width: "80px" }}/>
                                                ) : (
                                                    '--'
                                                ) }
                                            </TableCell>
                                            <TableCell sx={{fontWeight: 'bold'}}>{address.address ?? '--'} {address.city ?? '--'} {address.postal_code ?? '--'}</TableCell>
                                            <TableCell sx={{fontWeight: 'bold'}}>{event ? <EventPlace display={{id, name, event}} /> : '--'}</TableCell>
                                            <TableCell sx={{fontWeight: 'bold'}}>{type.name ?? '--'}</TableCell>
                                            <TableCell sx={{fontWeight: 'bold'}}>{schedule ? <SchedulePlace display={{id, name, schedule}} /> : '--'}</TableCell>
                                            <TableCell>
                                                <Box sx={{display: 'flex', justifyContent: 'right'}}>
                                                    <EditPlace updateValue={{id, name, description, image, event, type, schedule, address, data}} handleDataChange={handleDataChange} />
                                                    <DeletePlace deleteValue={{id, name, description, image, event, type, schedule, address, data}} handleDataChange={handleDataChange}/>
                                                </Box>
                                            </TableCell>
                                        </TableRow>
                                    )
                                })}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <TablePagination
                        rowsPerPageOptions={[10, 25, 100]}
                        component="div"
                        count={data.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                </Box>
            )}
        </Paper>

        <Snackbar
            open={toast}
            autoHideDuration={3000}
            onClose={() => setShowToast(false)}
            anchorOrigin={{vertical: 'bottom', horizontal: 'center'}}
        >
            <Alert onClose={() => setShowToast(false)} severity={toastMessage.severity} sx={{width: '100%'}}>
                {toastMessage.message}
            </Alert>
        </Snackbar>
    </Container>
}

export default Place;