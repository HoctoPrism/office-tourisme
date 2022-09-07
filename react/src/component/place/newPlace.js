import {
    Box,
    Button,
    FormControl,
    Modal,
    Snackbar,
    TextField,
    Typography,
    Alert,
    Input,
    Grid,
    Select, MenuItem, InputLabel
} from "@mui/material";
import {useEffect, useState} from "react";
import update from "immutability-helper";
import {useForm, Controller} from "react-hook-form";
import axios from "axios";
import auth from "../../services/auth/token"

function NewPlace(props) {

    const [id, setID] = useState("");
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [image, setImage] = useState("");
    // One of ...
    const [type, setType] = useState({});
    const [schedule, setSchedule] = useState({});
    const [event, setEvent] = useState({});
    const [address, setAddress] = useState({});

    // List All
    const [types, setTypes] = useState({});
    const [schedules, setSchedules] = useState({});
    const [events, setEvents] = useState({});
    const [addresses, setAddresses] = useState({});

    const [newPlace, setShowNew] = useState(false);

    // Handle Toast place
    const [toast, setShowToast] = useState(false);
    const [toastMessage, setToastMessage] = useState({});
    const { register, control, handleSubmit, formState: { errors } } = useForm({defaultValues: {
        name: '',
        description: '',
        image: '', type: {},
        event: {},
        address: {},
        schedule: {}
    }});

    let reset = () => {
        setName('');
        setDescription('');
        setImage('');
        setType({});
        setEvent({});
        setSchedule({});
        setAddress({});
    }

    let newPlaceForm = async () => {
        try {

            let formData = new FormData();

            formData.append("name", name);
            formData.append("description", description);
            formData.append("image", image);
            formData.append("type", `${type}`);
            formData.append("event", `${event}`);
            formData.append("schedule", `${schedule}`);
            formData.append("address", `${address}`);

            let res = await axios.post('http://127.0.0.1:8000/api/places/', formData, {
                "headers" : {
                    "Content-Type":"multipart/form-data",
                    "Authorization":"Bearer"+auth.getToken()
                }
            })
            if (res.status === 200) {
                let tab = {};
                await Object.assign(tab, res.data.data);
                let data = update(props.newValue.data, {$push: [{id : tab.id, name: tab.name, description: tab.description, image: tab.image, type: tab.type, event: tab.event, schedule: tab.schedule, address: tab.address}]})
                props.handleDataChange(data);
                reset();
                setToastMessage({message: "Place ajouté ! Vous pouvez en ajouter un autre", severity: "success"});
                setShowToast(true);
            } else {
                setToastMessage({message: "Une erreur est survenue", severity: "error"});
            }
        } catch (err) {
            console.log(err);
        }
    }
    return (<Box>
        <Button variant="contained" onClick={ async () => {
            await axios.get("http://127.0.0.1:8000/api/types/").then((actualData) => { setTypes(actualData.data.data) });
            await axios.get("http://127.0.0.1:8000/api/schedules/").then((actualData) => { setSchedules(actualData.data.data) });
            await axios.get("http://127.0.0.1:8000/api/events/").then((actualData) => { setEvents(actualData.data.data) });
            await axios.get("http://127.0.0.1:8000/api/addresses/").then((actualData) => { setAddresses(actualData.data.data) });
            setShowNew(true)
        }}>Ajouter</Button>
        <Modal
            id="modal-crud-container"
            hideBackdrop
            open={newPlace}
            onClose={() => setShowNew(false)}
            aria-labelledby="new-place-title"
            aria-describedby="child-modal-description"
        >
            <Box className="modal-crud modal-crud-place" sx={{bgcolor: 'background.default'}}>
                <Typography variant="h4" sx={{textAlign: 'center', mb: 4}} id="new-place-title">Nouveau lieu</Typography>
                <form onSubmit={handleSubmit(newPlaceForm)}>
                    <Grid container spacing={8}>
                        <Grid item xs={6} sx={{ display: 'flex',flexDirection: 'column'}}>
                            <Controller
                              name="name"
                              control={control}
                              defaultValue=""
                              render={() => (
                                  <TextField
                                   {...register(
                                       'name',
                                       {
                                           required: 'Ce champ est requis'
                                       }
                                   )}
                                   onChange={(e) => setName(e.target.value)}
                                   sx={{mt: 5, height: 50}}
                                   label="Nom"
                                   variant="standard"
                                   value={name}
                                />
                              )}
                            />
                            {errors.name ? (
                                <Alert sx={{mt:2, p:0, pl:2}} severity="error">{errors.name?.message}</Alert>
                            ) : ''}

                            <Controller
                              name="description"
                              control={control}
                              defaultValue=""
                              render={() => (
                                  <TextField
                                   {...register(
                                       'description',
                                       {
                                           required: 'Ce champ est requis',
                                           maxLength: {value: 255, message: 'Longueur maximale de 255 caractères'}
                                       }
                                   )}
                                   multiline
                                   rows={4}
                                   onChange={(e) => setDescription(e.target.value)}
                                   sx={{mt: 5, mb: 20, height: 50, width: '100%'}}
                                   label="Description"
                                   variant="outlined"
                                   value={description}
                                />
                              )}
                            />
                            <Box className='description-limit'>{description.length}/255 caractères</Box>
                            {errors.description ? (
                                <Alert sx={{mt:2, p:0, pl:2}} severity="error">{errors.description?.message}</Alert>
                            ) : ''}

                            <Controller
                              name="image"
                              control={control}
                              defaultValue=""
                              render={() => (
                                  <Input
                                   type='file'
                                   {...register('image')}
                                   onChange={(e) => setImage(e.target.files[0]) }
                                   sx={{mt: 5, height: 50}}
                                />
                              )}
                            />
                            {errors.image ? (
                                <Alert sx={{mt:2, p:0, pl:2}} severity="error">{errors.image?.message}</Alert>
                            ) : ''}
                        </Grid>
                        <Grid item xs={6} sx={{ display: 'flex',flexDirection: 'column'}}>
                            <Controller
                              name="type"
                              control={control}
                              defaultValue=""
                              render={() => (
                                  <FormControl sx={{ m: 1, mt: 5, minWidth: 120 }} size="small">
                                      <InputLabel id="type-select">Type</InputLabel>
                                      <Select
                                        labelId="type-select"
                                        id="type-select"
                                        value={type}
                                        label="Type"
                                        onChange={(e) => setType(e.target.value)}
                                        sx={{height: 50}}
                                        variant="outlined"
                                      >
                                      {types.map((type) => {
                                          return(
                                              <MenuItem key={type.id} value={type.id}>{type.name}</MenuItem>
                                          )
                                      })}
                                      </Select>
                                  </FormControl>
                              )}
                            />
                            <Controller
                              name="event"
                              control={control}
                              defaultValue=""
                              render={() => (
                                  <FormControl sx={{ m: 1, mt: 5, minWidth: 120 }} size="small">
                                      <InputLabel id="event-select">Event</InputLabel>
                                      <Select
                                        labelId="event-select"
                                        id="event-select"
                                        value={event}
                                        label="Event"
                                        onChange={(e) => setEvent(e.target.value)}
                                        sx={{height: 50}}
                                        variant="outlined"
                                      >
                                      {events.map((event) => {
                                          return(
                                              <MenuItem key={event.id} value={event.id}>{event.name}</MenuItem>
                                          )
                                      })}
                                      </Select>
                                  </FormControl>
                              )}
                            />
                            <Controller
                              name="address"
                              control={control}
                              defaultValue=""
                              render={() => (
                                  <FormControl sx={{ m: 1, mt: 5, minWidth: 120 }} size="small">
                                      <InputLabel id="address-select">Adresse</InputLabel>
                                      <Select
                                        labelId="address-select"
                                        id="address-select"
                                        value={address}
                                        label="Adresse"
                                        onChange={(e) => setAddress(e.target.value)}
                                        sx={{height: 50}}
                                        variant="outlined"
                                      >
                                      {addresses.map((address) => {
                                          return(
                                              <MenuItem key={address.id} value={address.id}>{address.address} {address.postal_code} {address.city}</MenuItem>
                                          )
                                      })}
                                      </Select>
                                  </FormControl>
                              )}
                            />
                            <Controller
                              name="schedule"
                              control={control}
                              defaultValue=""
                              render={() => (
                                  <FormControl sx={{ m: 1, mt: 5, minWidth: 120 }} size="small">
                                      <InputLabel id="schedule-select">Schedule</InputLabel>
                                      <Select
                                        labelId="schedule-select"
                                        id="schedule-select"
                                        value={schedule}
                                        label="Schedule"
                                        onChange={(e) => setSchedule(e.target.value)}
                                        sx={{height: 50}}
                                        variant="outlined"
                                      >
                                      {schedules.map((schedule) => {
                                          return(
                                              <MenuItem key={schedule.id} value={schedule.id}>{schedule.name}</MenuItem>
                                          )
                                      })}
                                      </Select>
                                  </FormControl>
                              )}
                            />
                        </Grid>
                        <Grid item xs={12} className="action-button" sx={{ minwidth: '100%' }}>
                            <Button type="submit" sx={{m: 3}} variant="contained">Envoyer</Button>
                            <Button variant="outlined" onClick={() => setShowNew(false)}>Fermer</Button>
                        </Grid>
                    </Grid>
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

export default NewPlace;