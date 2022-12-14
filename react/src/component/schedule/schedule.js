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
    Alert
} from "@mui/material";
import DeleteSchedule from "./deleteSchedule";
import NewSchedule from "./newSchedule";
import EditSchedule from "./editSchedule";
import axios from "axios";

function Schedule() {

    document.title = 'Page des schedules';

    const [data, setData] = useState(null); // array of data
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null); // WIP
    const [toast, setShowToast] = useState(false);
    const [toastMessage, setToastMessage] = useState({});

    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    useEffect(() => {
        axios.get('http://127.0.0.1:8000/api/schedules').then((actualData) => {
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
            setToastMessage({message: "Schedule modifié !", severity: "success"});
            setShowToast(true);
        } else if(message && message === 'delete') {
            setToastMessage({message: "Schedule supprimé !", severity: "success"});
            setShowToast(true);
        }
    }

    return <Container maxWidth="xl" id="schedule">
        <Paper sx={{display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', py: 10}}>
            <Typography variant="h3" sx={{textAlign: "center"}} gutterBottom>Schedules</Typography>
            {loading ? (
                <Typography variant="h5" sx={{textAlign: "center"}} gutterBottom>Chargement des schedules...</Typography>
            ) : (
                <Box sx={{ maxWidth: '100%' }}>
                    <NewSchedule newValue={{data}} handleDataChange={handleDataChange} />
                    <TableContainer sx={{ mt:4 }}>
                        <Table size="small">
                            <TableHead>
                                <TableRow>
                                    <TableCell key={1}>ID</TableCell>
                                    <TableCell key={2}>Nom</TableCell>
                                    <TableCell key={3}>Lundi</TableCell>
                                    <TableCell key={4}>Mardi</TableCell>
                                    <TableCell key={5}>Mercredi</TableCell>
                                    <TableCell key={6}>Jeudi</TableCell>
                                    <TableCell key={7}>Vendredi</TableCell>
                                    <TableCell key={8}>Samedi</TableCell>
                                    <TableCell key={9}>Dimanche</TableCell>
                                    <TableCell key={10} align={'right'}>Actions</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(({id, name, monday_start, monday_end, tuesday_start, tuesday_end, wednesday_start, wednesday_end, thursday_start, thursday_end, friday_start, friday_end, saturday_start, saturday_end, sunday_start, sunday_end}) => {
                                    return (
                                        <TableRow hover role="checkbox" tabIndex={-1} key={name+id}>
                                            <TableCell>{id}</TableCell>
                                            <TableCell>{name}</TableCell>
                                            <TableCell>{monday_start ? monday_start.substring(5,0) : '--:--'} à {monday_end ? monday_end.substring(5,0) : '--:--'}</TableCell>
                                            <TableCell>{tuesday_start ? tuesday_start.substring(5,0) : '--:--'} à {tuesday_end ? tuesday_end.substring(5,0) : '--:--'}</TableCell>
                                            <TableCell>{wednesday_start ? wednesday_start.substring(5,0) : '--:--'} à {wednesday_end ? wednesday_end.substring(5,0) : '--:--'}</TableCell>
                                            <TableCell>{thursday_start ? thursday_start.substring(5,0) : '--:--'} à {thursday_end ? thursday_end.substring(5,0) : '--:--'}</TableCell>
                                            <TableCell>{friday_start ? friday_start.substring(5,0) : '--:--'} à {friday_end ? friday_end.substring(5,0) : '--:--'}</TableCell>
                                            <TableCell>{saturday_start ? saturday_start.substring(5,0) : '--:--'} à {saturday_end ? saturday_end.substring(5,0) : '--:--'}</TableCell>
                                            <TableCell>{sunday_start ? sunday_start.substring(5,0) : '--:--'} à {sunday_end ? sunday_end.substring(5,0) : '--:--'}</TableCell>
                                            <TableCell>
                                                <Box sx={{display: 'flex', justifyContent: 'right'}}>
                                                    <EditSchedule updateValue={{id, name, monday_start, monday_end, tuesday_start, tuesday_end, wednesday_start, wednesday_end, thursday_start, thursday_end, friday_start, friday_end, saturday_start, saturday_end, sunday_start, sunday_end, data}} handleDataChange={handleDataChange} />
                                                    <DeleteSchedule deleteValue={{id, data}} handleDataChange={handleDataChange}/>
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

export default Schedule;