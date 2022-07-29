import {Box, Button, FormControl, Modal, Snackbar, TextField, Typography, Alert} from "@mui/material";
import {Edit} from "@mui/icons-material";
import {useState} from "react";
import update from "immutability-helper";
import {useForm, Controller} from "react-hook-form";
import axios from "axios";

function EditAddress(props) {
    const [id, setID] = useState("");
    const [address, setAddress] = useState(props.updateValue.address);
    const [city, setCity] = useState(props.updateValue.city);
    const [postal_code, setPostalCode] = useState(props.updateValue.postal_code);
    const [latitude, setLatitude] = useState(props.updateValue.latitude);
    const [longitude, setLongitude] = useState(props.updateValue.longitude);
    const [oneAddress, setOneAddress] = useState("");
    const [editAddress, setShowEdit] = useState(false);
    const [toast, setShowToast] = useState(false);
    const [toastMessage, setToastMessage] = useState({});

    const { register, control, handleSubmit, formState: { errors } } = useForm({ defaultValues: {
            address: props.updateValue.address,
            city: props.updateValue.city,
            postal_code: props.updateValue.postal_code,
            latitude: props.updateValue.latitude,
            longitude: props.updateValue.longitude,
        }
    });

    let editAddressForm = async () => {
        try {
            let updatedAddress = {
                id: id ? id : parseInt(oneAddress.id),
                address: address,
                city: city,
                postal_code: postal_code,
                latitude: latitude,
                longitude: longitude
            }
            let res = await axios.patch("http://127.0.0.1:8000/api/addresses/" + oneAddress.id, updatedAddress)
            if (res.status === 200) {
                const foundIndex = props.updateValue.data.findIndex(x => x.id === oneAddress.id);
                let data = update(props.updateValue.data, {[foundIndex]: {$set: updatedAddress}})
                props.handleDataChange(data, 'edit');
                setShowEdit(false)
            } else {
                setToastMessage({message: "Une erreur est survenue", severity: "error"});
                setShowToast(true)
            }

        } catch (err) {
            console.log(err);
        }
    }

    return(<Box >
          <Button color='info' variant='contained' sx={{mx: 2}}
            onClick={() => {
                setShowEdit(true)
                setOneAddress({
                    id: props.updateValue.id,
                    address: props.updateValue.address,
                    city: props.updateValue.city,
                    postal_code: props.updateValue.postal_code,
                    latitude: props.updateValue.latitude,
                    longitude: props.updateValue.longitude,
                })
            }}>
              <Edit/>
          </Button>
         <Modal
            id="modal-crud-container"
            hideBackdrop
            open={editAddress}
            onClose={() => setShowEdit(false)}
            aria-labelledby="edit-address-title"
            aria-describedby="child-modal-description"
        >
            <Box className="modal-crud modal-crud-address" sx={{bgcolor: 'background.default'}}>
                <Typography variant="h4" sx={{textAlign: 'center', mb: 4}} id="edit-address-title">Editer un address</Typography>
                <form onSubmit={handleSubmit(editAddressForm)}>
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
                                defaultValue={address}
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
                                    defaultValue={city}
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
                                defaultValue={postal_code}
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
                                    defaultValue={latitude}
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
                                defaultValue={longitude}
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
                            <Button variant="outlined" onClick={() => setShowEdit(false)}>Fermer</Button>
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
export default EditAddress;