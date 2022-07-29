import {Box, Button, FormControl, Modal, Snackbar, TextField, Typography, Alert, Input} from "@mui/material";
import {useState} from "react";
import update from "immutability-helper";
import {useForm, Controller} from "react-hook-form";
import axios from "axios";

function NewSchedule(props) {

    const [id, setID] = useState("");
    const [name, setName] = useState("");
    const [monday_start, setMondayStart] = useState("");
    const [monday_end, setMondayEnd] = useState("");
    const [tuesday_start, setTuesdayStart] = useState("");
    const [tuesday_end, setTuesdayEnd] = useState("");
    const [wednesday_start, setWednesdayStart] = useState("");
    const [wednesday_end, setWednesdayEnd] = useState("");
    const [thursday_start, setThursdayStart] = useState("");
    const [thursday_end, setThursdayEnd] = useState("");
    const [friday_start, setFridayStart] = useState("");
    const [friday_end, setFridayEnd] = useState("");
    const [saturday_start, setSaturdayStart] = useState("");
    const [saturday_end, setSaturdayEnd] = useState("");
    const [sunday_start, setSundayStart] = useState("");
    const [sunday_end, setSundayEnd] = useState("");
    const [newSchedule, setShowNew] = useState(false);
    // Handle Toast schedule
    const [toast, setShowToast] = useState(false);
    const [toastMessage, setToastMessage] = useState({});
    const { register, control, handleSubmit, formState: { errors } } = useForm({});

    let reset = () => {
        setName('');
        setMondayStart('');
        setMondayEnd('');
        setTuesdayStart('');
        setTuesdayEnd('');
        setWednesdayStart('');
        setWednesdayEnd('');
        setThursdayStart('');
        setThursdayEnd('');
        setFridayStart('');
        setFridayEnd('');
        setSaturdayStart('');
        setSaturdayEnd('');
        setSundayStart('');
        setSundayEnd('');
    }

    let newScheduleForm = async () => {
        try {
            let newSchedule = {
                name: name,
                monday_start: monday_start,
                monday_end: monday_end,
                tuesday_start: tuesday_start,
                tuesday_end: tuesday_end,
                wednesday_start: wednesday_start,
                wednesday_end: wednesday_end,
                thursday_start: thursday_start,
                thursday_end: thursday_end,
                friday_start: friday_start,
                friday_end: friday_end,
                saturday_start: saturday_start,
                saturday_end: saturday_end,
                sunday_start: sunday_start,
                sunday_end: sunday_end,
            }

            let res = await axios.post('http://127.0.0.1:8000/api/schedules/', newSchedule)
            if (res.status === 200) {
                let tab = {};
                await Object.assign(tab, res.data.data);
                let data = update(props.newValue.data, {$push: [{
                    id : tab.id,
                    name: tab.name,
                    monday_start: tab.monday_start, monday_end: tab.monday_end,
                    tuesday_start: tab.tuesday_start, tuesday_end: tab.tuesday_end,
                    wednesday_start: tab.wednesday_start, wednesday_end: tab.wednesday_end,
                    thursday_start: tab.thursday_start, thursday_end: tab.thursday_end,
                    friday_start: tab.friday_start, friday_end: tab.friday_end,
                    saturday_start: tab.saturday_start, saturday_end: tab.saturday_end,
                    sunday_start: tab.sunday_start, sunday_end: tab.sunday_end,
                }]})
                props.handleDataChange(data);
                reset();
                setToastMessage({message: "Schedule ajouté ! Vous pouvez en ajouter un autre", severity: "success"});
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
            open={newSchedule}
            onClose={() => setShowNew(false)}
            aria-labelledby="new-schedule-title"
            aria-describedby="child-modal-description"
        >
            <Box className="modal-crud modal-crud-schedule" sx={{bgcolor: 'background.default'}}>
                <Typography variant="h4" sx={{textAlign: 'center', mb: 4}} id="new-schedule-title">Nouvel schedule</Typography>
                <form onSubmit={handleSubmit(newScheduleForm)}>
                    <FormControl>
                        <Box sx={{ display: 'flex', mb: 5 }}>
                        <Controller
                          name="name"
                          control={control}
                          render={() => (
                              <TextField
                               {...register('name')}
                                label="Nom"
                                defaultValue={name}
                                variant='outlined'
                                onChange={(e) => setName(e.target.value)}
                                sx={{ width: 150, mr: 5 }}
                              />
                          )}
                        />
                    </Box>
                        <Box sx={{ display: 'flex', mb: 5 }}>
                            <Controller
                              name="monday_start"
                              control={control}
                              render={() => (
                                  <TextField
                                   {...register('monday_start')}
                                    label="Lundi début"
                                    type="time"
                                    variant='outlined'
                                    onChange={(e) => setMondayStart(e.target.value)}
                                    InputLabelProps={{ shrink: true }}
                                    inputProps={{ step: 60 }}
                                    sx={{ width: 150, mr: 5 }}
                                  />
                              )}
                            />
                            <Controller
                                  name="monday_end"
                                  control={control}
                                  render={() => (
                                      <TextField
                                       {...register('monday_end')}
                                        label="Lundi Fin"
                                        type="time"
                                        variant='outlined'
                                        onChange={(e) => setMondayEnd(e.target.value)}
                                        InputLabelProps={{ shrink: true }}
                                        inputProps={{ step: 60 }}
                                        sx={{ width: 150 }}
                                      />
                                  )}
                            />
                        </Box>
                        <Box sx={{ display: 'flex', mb: 5 }}>
                            <Controller
                              name="tuesday_start"
                              control={control}
                              render={() => (
                                  <TextField
                                   {...register('tuesday_start')}
                                    label="Mardi début"
                                    type="time"
                                    variant='outlined'
                                    onChange={(e) => setTuesdayStart(e.target.value)}
                                    InputLabelProps={{ shrink: true }}
                                    inputProps={{ step: 60 }}
                                    sx={{ width: 150, mr: 5 }}
                                  />
                              )}
                            />
                            <Controller
                                  name="tuesday_end"
                                  control={control}
                                  render={() => (
                                      <TextField
                                       {...register('tuesday_end')}
                                        label="Mardi Fin"
                                        type="time"
                                        variant='outlined'
                                        onChange={(e) => setTuesdayEnd(e.target.value)}
                                        InputLabelProps={{ shrink: true }}
                                        inputProps={{ step: 60 }}
                                        sx={{ width: 150 }}
                                      />
                                  )}
                            />
                        </Box>
                        <Box sx={{ display: 'flex', mb: 5 }}>
                            <Controller
                              name="wednesday_start"
                              control={control}
                              render={() => (
                                  <TextField
                                   {...register('wednesday_start')}
                                    label="Mercredi début"
                                    type="time"
                                    variant='outlined'
                                    onChange={(e) => setWednesdayStart(e.target.value)}
                                    InputLabelProps={{ shrink: true }}
                                    inputProps={{ step: 60 }}
                                    sx={{ width: 150, mr: 5 }}
                                  />
                              )}
                            />
                            <Controller
                                  name="wednesday_end"
                                  control={control}
                                  render={() => (
                                      <TextField
                                       {...register('wednesday_end')}
                                        label="Mercredi Fin"
                                        type="time"
                                        variant='outlined'
                                        onChange={(e) => setWednesdayEnd(e.target.value)}
                                        InputLabelProps={{ shrink: true }}
                                        inputProps={{ step: 60 }}
                                        sx={{ width: 150 }}
                                      />
                                  )}
                            />
                        </Box>
                        <Box sx={{ display: 'flex', mb: 5 }}>
                            <Controller
                              name="thursday_start"
                              control={control}
                              render={() => (
                                  <TextField
                                   {...register('thursday_start')}
                                    label="Jeudi début"
                                    type="time"
                                    variant='outlined'
                                    onChange={(e) => setThursdayStart(e.target.value)}
                                    InputLabelProps={{ shrink: true }}
                                    inputProps={{ step: 60 }}
                                    sx={{ width: 150, mr: 5 }}
                                  />
                              )}
                            />
                            <Controller
                                  name="thursday_end"
                                  control={control}
                                  render={() => (
                                      <TextField
                                       {...register('thursday_end')}
                                        label="Jeudi Fin"
                                        type="time"
                                        variant='outlined'
                                        onChange={(e) => setThursdayEnd(e.target.value)}
                                        InputLabelProps={{ shrink: true }}
                                        inputProps={{ step: 60 }}
                                        sx={{ width: 150 }}
                                      />
                                  )}
                            />
                        </Box>
                        <Box sx={{ display: 'flex', mb: 5 }}>
                            <Controller
                              name="friday_start"
                              control={control}
                              render={() => (
                                  <TextField
                                   {...register('friday_start')}
                                    label="Vendredi début"
                                    type="time"
                                    variant='outlined'
                                    onChange={(e) => setFridayStart(e.target.value)}
                                    InputLabelProps={{ shrink: true }}
                                    inputProps={{ step: 60 }}
                                    sx={{ width: 150, mr: 5 }}
                                  />
                              )}
                            />
                            <Controller
                                  name="friday_end"
                                  control={control}
                                  render={() => (
                                      <TextField
                                       {...register('friday_end')}
                                        label="Vendredi Fin"
                                        type="time"
                                        variant='outlined'
                                        onChange={(e) => setFridayEnd(e.target.value)}
                                        InputLabelProps={{ shrink: true }}
                                        inputProps={{ step: 60 }}
                                        sx={{ width: 150 }}
                                      />
                                  )}
                            />
                        </Box>
                        <Box sx={{ display: 'flex', mb: 5 }}>
                            <Controller
                              name="saturday_start"
                              control={control}
                              render={() => (
                                  <TextField
                                   {...register('saturday_start')}
                                    label="Samedi début"
                                    type="time"
                                    variant='outlined'
                                    onChange={(e) => setSaturdayStart(e.target.value)}
                                    InputLabelProps={{ shrink: true }}
                                    inputProps={{ step: 60 }}
                                    sx={{ width: 150, mr: 5 }}
                                  />
                              )}
                            />
                            <Controller
                                  name="saturday_end"
                                  control={control}
                                  render={() => (
                                      <TextField
                                       {...register('saturday_end')}
                                        label="Samedi Fin"
                                        type="time"
                                        variant='outlined'
                                        onChange={(e) => setSaturdayEnd(e.target.value)}
                                        InputLabelProps={{ shrink: true }}
                                        inputProps={{ step: 60 }}
                                        sx={{ width: 150 }}
                                      />
                                  )}
                            />
                        </Box>
                        <Box sx={{ display: 'flex', mb: 5 }}>
                            <Controller
                              name="sunday_start"
                              control={control}
                              render={() => (
                                  <TextField
                                   {...register('sunday_start')}
                                    label="Dimanche début"
                                    type="time"
                                    variant='outlined'
                                    onChange={(e) => setSundayStart(e.target.value)}
                                    InputLabelProps={{ shrink: true }}
                                    inputProps={{ step: 60 }}
                                    sx={{ width: 150, mr: 5 }}
                                  />
                              )}
                            />
                            <Controller
                                  name="sunday_end"
                                  control={control}
                                  render={() => (
                                      <TextField
                                       {...register('sunday_end')}
                                        label="Dimanche Fin"
                                        type="time"
                                        variant='outlined'
                                        onChange={(e) => setSundayEnd(e.target.value)}
                                        InputLabelProps={{ shrink: true }}
                                        inputProps={{ step: 60 }}
                                        sx={{ width: 150 }}
                                      />
                                  )}
                            />
                        </Box>
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

export default NewSchedule;