import {
    Box,
    Button,
    FormControl,
    Modal,
    Snackbar,
    TextField,
    Typography,
    Alert,
    Grid,
    MenuItem,
    Select, InputLabel
} from "@mui/material";
import {Edit} from "@mui/icons-material";
import {useEffect, useState} from "react";
import update from "immutability-helper";
import {useForm, Controller} from "react-hook-form";
import axios from "axios";

function EditPlace(props) {
    const [id, setID] = useState("");
    const [name, setName] = useState(props.updateValue.name);
    const [description, setDescription] = useState(props.updateValue.description);
    const [image, setImage] = useState(props.updateValue.image);
    // One of ...
    const [event, setEvent] = useState(props.updateValue.event);
    const [type, setType] = useState(props.updateValue.type);
    const [schedule, setSchedule] = useState(props.updateValue.schedule);
    const [address, setAddress] = useState(props.updateValue.address);
    // List All
    const [types, setTypes] = useState({});
    const [schedules, setSchedules] = useState({});
    const [events, setEvents] = useState({});
    const [addresses, setAddresses] = useState({});

    const [onePlace, setOnePlace] = useState("");
    const [editPlace, setShowEdit] = useState(false);
    const [toast, setShowToast] = useState(false);
    const [toastMessage, setToastMessage] = useState({});

    const { register, control, handleSubmit, formState: { errors } } = useForm({ defaultValues: {
        name: props.updateValue.name,
        description: props.updateValue.description,
        image: props.updateValue.image,
        type: props.updateValue.type,
        event: props.updateValue.event,
        address: props.updateValue.address,
        schedule: props.updateValue.schedule
    } });

    useEffect( () => {
        getAlls()
    }, [])

    let getAlls = async () => {
        await axios.get("http://127.0.0.1:8000/api/types/").then((actualData) => { setTypes(actualData.data.data) });
        await axios.get("http://127.0.0.1:8000/api/schedules/").then((actualData) => { setSchedules(actualData.data.data) });
        await axios.get("http://127.0.0.1:8000/api/events/").then((actualData) => { setEvents(actualData.data.data) });
        await axios.get("http://127.0.0.1:8000/api/addresses/").then((actualData) => { setAddresses(actualData.data.data) });
    }

    let editPlaceForm = async () => {
        try {
            let updatedPlace = {
                id: id ? id : parseInt(onePlace.id),
                name: name ? name : onePlace.name,
                description: description ? description : onePlace.description,
                image: image ? image : onePlace.image,
                type: type ? type : onePlace.type.id,
                event: event ? event : onePlace.event.id,
                schedule: schedule ? schedule : onePlace.schedule.id,
                address: address ? address : onePlace.address.id,
            }
            let res = await axios.patch("http://127.0.0.1:8000/api/places/" + onePlace.id, {
                name,
                description,
                image,
                type: type.name ? type.id : type,
                event: event.name ? event.id : event,
                schedule: schedule.name ? schedule.id : schedule,
                address: address.address ? address.id : address
            })
            if (res.status === 200) {
                const foundIndex = props.updateValue.data.findIndex(x => x.id === onePlace.id);
                let tab = {};
                await Object.assign(tab, res.data.data);
                let data = update(props.updateValue.data, {[foundIndex]: {$set: tab}})
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
                setOnePlace({
                    id: props.updateValue.id,
                    name: props.updateValue.name,
                    description: props.updateValue.description,
                    image: props.updateValue.image,
                    type: props.updateValue.type,
                    event: props.updateValue.event,
                    schedule: props.updateValue.schedule,
                    address: props.updateValue.address
                })
            }}>
              <Edit/>
          </Button>
         <Modal
            id="modal-crud-container"
            hideBackdrop
            open={editPlace}
            onClose={() => setShowEdit(false)}
            aria-labelledby="edit-place-title"
            aria-describedby="child-modal-description"
        >
            <Box className="modal-crud modal-crud-place" sx={{bgcolor: 'background.default'}}>
                <Typography variant="h4" sx={{textAlign: 'center', mb: 4}} id="edit-place-title">Editer un lieu</Typography>
                <form onSubmit={handleSubmit(editPlaceForm)}>
                    <Grid container spacing={8}>
                        <Grid item xs={6} sx={{ display: 'flex',flexDirection: 'column'}}>
                            <Controller
                              name="name"
                              control={control}
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
                                   defaultValue={name}
                                />
                              )}
                            />
                            {errors.name ? (
                                <Alert sx={{mt:2, p:0, pl:2}} severity="error">{errors.name?.message}</Alert>
                            ) : ''}

                            <Controller
                              name="description"
                              control={control}
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
                                   defaultValue={description}
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
                              render={() => (
                                  <TextField
                                   {...register('image')}
                                   onChange={(e) => setImage(e.target.value)}
                                   sx={{mt: 5, height: 50}}
                                   label="Image"
                                   variant="standard"
                                   defaultValue={image}
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
                              render={() => (
                                  <FormControl sx={{ m: 1, mt: 5, minWidth: 120 }} size="small">
                                      <InputLabel id="type-select">Type</InputLabel>
                                      <Select
                                        labelId="type-select"
                                        id="type-select"
                                        defaultValue={type.id}
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
                              render={() => (
                                  <FormControl sx={{ m: 1, mt: 5, minWidth: 120 }} size="small">
                                      <InputLabel id="event-select">Event</InputLabel>
                                      <Select
                                        labelId="event-select"
                                        id="event-select"
                                        defaultValue={event.id}
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
                              render={() => (
                                  <FormControl sx={{ m: 1, mt: 5, minWidth: 120 }} size="small">
                                      <InputLabel id="address-select">Adresse</InputLabel>
                                      <Select
                                        labelId="address-select"
                                        id="address-select"
                                        defaultValue={address.id}
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
                              render={() => (
                                  <FormControl sx={{ m: 1, mt: 5, minWidth: 120 }} size="small">
                                      <InputLabel id="schedule-select">Schedule</InputLabel>
                                      <Select
                                        labelId="schedule-select"
                                        id="schedule-select"
                                        defaultValue={schedule.id}
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
                            <Button variant="outlined" onClick={() => setShowEdit(false)}>Fermer</Button>
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
export default EditPlace;