import {Box, Button, FormControl, Modal, Snackbar, TextField, Typography, Alert, Input} from "@mui/material";
import {useState} from "react";
import update from "immutability-helper";
import {useForm, Controller} from "react-hook-form";
import axios from "axios";

function NewAddress(props) {

    const [id, setID] = useState("");
    const [address, setAddress] = useState("");
    const [city, setCity] = useState("");
    const [postal_code, setPostalCode] = useState("");
    const [latitude, setLatitude] = useState("");
    const [longitude, setLongitude] = useState("");
    const [newAddress, setShowNew] = useState(false);
    // Handle Toast address
    const [toast, setShowToast] = useState(false);
    const [toastMessage, setToastMessage] = useState({});
    const { register, control, handleSubmit, formState: { errors } } = useForm({});

    let reset = () => {
        setAddress('');
        setCity('');
        setPostalCode('');
        setLatitude('');
        setLongitude('');
    }

    let newAddressForm = async () => {
        try {
            let newAddress = {address: address, city: city, postal_code: postal_code, latitude: latitude, longitude: longitude}

            let res = await axios.post('http://127.0.0.1:8000/api/addresses/', newAddress)
            if (res.status === 200) {
                let tab = {};
                await Object.assign(tab, res.data.data);
                let data = update(props.newValue.data, {$push: [{
                    id : tab.id,
                    address: tab.address,
                    city: tab.city,
                    postal_code: tab.postal_code,
                    latitude: tab.latitude,
                    longitude: tab.longitude
                }]})
                props.handleDataChange(data);
                reset();
                setToastMessage({message: "Address ajouté ! Vous pouvez en ajouter un autre", severity: "success"});
                setShowToast(true);
            } else {
                setToastMessage({message: "Une erreur est survenue", severity: "error"});
            }
        } catch (err) {
            console.log(err);
        }
    }

    return (<Box>
        <Button variant="contained" onClick={() => setShowNew(true)}>Ajouter</Button>
        <Modal
            id="modal-crud-container"
            hideBackdrop
            open={newAddress}
            onClose={() => setShowNew(false)}
            aria-labelledby="new-address-title"
            aria-describedby="child-modal-description"
        >
            <Box className="modal-crud modal-crud-address" sx={{bgcolor: 'background.default'}}>
                <Typography variant="h4" sx={{textAlign: 'center', mb: 4}} id="new-address-title">Nouvel address</Typography>
                <form onSubmit={handleSubmit(newAddressForm)}>
                    <FormControl>

                        <Controller
                          name="address"
                          control={control}
                          render={() => (
                              <TextField
                               {...register('address', {
                                       required: 'Ce champ est requis'
                                   }
                               )}
                                label="Address"
                                type="text"
                                variant='standard'
                                onChange={(e) => setAddress(e.target.value)}
                                InputLabelProps={{ shrink: true }}
                                sx={{ mt: 5, width: 300 }}
                              />
                          )}
                        />
                        {errors.address ? (
                            <Alert sx={{mt:2, p:0, pl:2}} severity="error">{errors.address?.message}</Alert>
                        ) : ''}

                        <Controller
                              name="city"
                              control={control}
                              render={() => (
                                  <TextField
                                   {...register('city', {
                                           required: 'Ce champ est requis'
                                       }
                                   )}
                                    label="Ville"
                                    type="text"
                                    variant='standard'
                                    onChange={(e) => setCity(e.target.value)}
                                    InputLabelProps={{ shrink: true }}
                                    sx={{ mt: 5 }}
                                  />
                              )}
                        />
                        {errors.city ? (
                            <Alert sx={{mt:2, p:0, pl:2}} severity="error">{errors.city?.message}</Alert>
                        ) : ''}

                        <Controller
                          name="postal_code"
                          control={control}
                          render={() => (
                              <TextField
                               {...register('postal_code', {
                                       required: 'Ce champ est requis',
                                       minLength: {value: 5, message: 'Longueur minimale de 5 caractères'},
                                       maxLength: {value: 5, message: 'Longueur maximale de 5 caractères'}
                                   }
                               )}
                                label="Code Postal"
                                type="number"
                                variant='standard'
                                onChange={(e) => setPostalCode(e.target.value)}
                                InputLabelProps={{ shrink: true }}
                                sx={{ mt: 5 }}
                              />
                          )}
                        />
                        {errors.postal_code ? (
                            <Alert sx={{mt:2, p:0, pl:2}} severity="error">{errors.postal_code?.message}</Alert>
                        ) : ''}

                        <Controller
                              name="latitude"
                              control={control}
                              render={() => (
                                  <TextField
                                   {...register('latitude', {
                                           required: 'Ce champ est requis'
                                       }
                                   )}
                                    label="Latitude"
                                    type="text"
                                    variant='standard'
                                    onChange={(e) => setLatitude(e.target.value)}
                                    InputLabelProps={{ shrink: true }}
                                    sx={{ mt: 5 }}
                                  />
                              )}
                        />
                        {errors.latitude ? (
                            <Alert sx={{mt:2, p:0, pl:2}} severity="error">{errors.latitude?.message}</Alert>
                        ) : ''}

                        <Controller
                          name="longitude"
                          control={control}
                          render={() => (
                              <TextField
                               {...register('longitude', {
                                       required: 'Ce champ est requis'
                                   }
                               )}
                                label="Longitude"
                                type="text"
                                variant='standard'
                                onChange={(e) => setLongitude(e.target.value)}
                                InputLabelProps={{ shrink: true }}
                                sx={{ mt: 5 }}
                              />
                          )}
                        />
                        {errors.longitude ? (
                            <Alert sx={{mt:2, p:0, pl:2}} severity="error">{errors.longitude?.message}</Alert>
                        ) : ''}

                        <Box className="action-button">
                            <Button type="submit" sx={{m: 3}} variant="contained">Envoyer</Button>
                            <Button variant="outlined" onClick={() => setShowNew(false)}>Fermer</Button>
                        </Box>
                    </FormControl>
                </form>

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

export default NewAddress;