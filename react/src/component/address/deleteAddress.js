import {
    Box,
    Button,
    FormControl,
    Modal,
    Snackbar,
    Typography,
    Alert,
    List,
    ListItem,
    ListItemText
} from "@mui/material";
import {useEffect, useState} from "react";
import update from "immutability-helper";
import {DeleteForeverRounded} from "@mui/icons-material";
import axios from "axios";

function DeleteAddress(props) {

    const [oneAddress, setOneAddress] = useState("");
    const [delAddress, setShowDelete] = useState(false);
    const [toast, setShowToast] = useState(false);
    const [toastMessage, setToastMessage] = useState({});

    let deleteAddress = async (e) => {
        e.preventDefault();
        try {
            let res = await axios.delete('http://127.0.0.1:8000/api/addresses/' + oneAddress.id)
            if (res.status === 200) {
                const foundIndex = props.deleteValue.data.findIndex(x => x.id === oneAddress.id);
                let data = update(props.deleteValue.data, {$splice: [[foundIndex, 1]]})
                props.handleDataChange(data, 'delete');
                setShowDelete(false)
            } else {
                setToastMessage({message: "Une erreur est survenue", severity: "error"});
            }
        } catch (err) {
            console.log(err);
        }
    }

    return(<Box>
            <Button
                variant='contained'
                sx={{mx: 2}}
                onClick={ () => {
                    setShowDelete(true)
                    setOneAddress({
                        id: props.deleteValue.id,
                        address: props.deleteValue.address,
                        city: props.deleteValue.city,
                        postal_code: props.deleteValue.postal_code,
                        latitude: props.deleteValue.latitude,
                        longitude: props.deleteValue.longitude,
                    })
                } }
            >
                <DeleteForeverRounded/>
            </Button>
            <Modal
                id="modal-crud-container"
                hideBackdrop
                open={delAddress}
                onClose={() => setShowDelete(false)}
                aria-labelledby="delete-address-title"
                aria-describedby="child-modal-description"
            >
                <Box className="modal-crud modal-crud-address" sx={{bgcolor: 'background.default'}}>
                    <Typography variant="h4" sx={{textAlign: 'center', mb: 4}} id="delete-address-title">Supprimer un address</Typography>
                    <FormControl>
                        <Box>êtes vous sur de vouloir supprimer cette adresse ?</Box>
                        <List dense={true}>
                            <ListItem key={1} sx={{ display: 'flex', justifyContent: 'space-between'}}>
                                <Box>Adresse</Box><Box sx={{ fontWeight: 'bold' }}>{oneAddress.address}</Box>
                            </ListItem>
                            <ListItem key={2} sx={{ display: 'flex', justifyContent: 'space-between'}}>
                                <Box>Ville</Box><Box sx={{ fontWeight: 'bold' }}>{oneAddress.city}</Box>
                            </ListItem>
                            <ListItem key={3} sx={{ display: 'flex', justifyContent: 'space-between'}}>
                                <Box>Code Postal</Box><Box sx={{ fontWeight: 'bold' }}>{oneAddress.postal_code}</Box>
                            </ListItem>
                            <ListItem key={4} sx={{ display: 'flex', justifyContent: 'space-between'}}>
                                <Box>Latitude</Box><Box sx={{ fontWeight: 'bold' }}>{oneAddress.latitude}</Box>
                            </ListItem>
                            <ListItem key={5} sx={{ display: 'flex', justifyContent: 'space-between'}}>
                                <Box>Longitude</Box><Box sx={{ fontWeight: 'bold' }}>{oneAddress.longitude}</Box>
                            </ListItem>
                        </List>
                        <Box className="action-button">
                            <Button sx={{m: 3}} type="submit" variant="contained" onClick={deleteAddress}>Envoyer</Button>
                            <Button variant="outlined" onClick={() => setShowDelete(false)}>Fermer</Button>
                        </Box>
                    </FormControl>
                </Box>
            </Modal>

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
        </Box>
    )
}

export default DeleteAddress