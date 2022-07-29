import {Box, Button, FormControl, Modal, Snackbar, TextField, Typography, Alert} from "@mui/material";
import {useState} from "react";
import update from "immutability-helper";
import {useForm, Controller} from "react-hook-form";
import { format } from "date-fns";
import axios from "axios";

function NewEventdatetime(props) {

    const [id, setID] = useState("");
    const [date_start, setDateStart] = useState("");
    const [date_end, setDateEnd] = useState("");
    const [newEventdatetime, setShowNew] = useState(false);
    // Handle Toast event
    const [toast, setShowToast] = useState(false);
    const [toastMessage, setToastMessage] = useState({});
    const { register, control, handleSubmit, formState: { errors } } = useForm({defaultValues: {date_start: '', date_end: ''}});

    let newEventdatetimeForm = async () => {
        try {
            let res = await axios.post('http://127.0.0.1:8000/api/eventdatetimes/', {date_start, date_end})
            if (res.status === 200) {
                let tab = {};
                res.data.data.date_start = format(new Date(date_start), "yyyy-MM-dd HH:mm:ss")
                res.data.data.date_end = format(new Date(date_end), "yyyy-MM-dd HH:mm:ss")
                await Object.assign(tab, res.data.data);
                let data = update(props.newValue.data, {$push: [{id : tab.id, date_start: tab.date_start, date_end: tab.date_end}]})
                props.handleDataChange(data);
                setDateStart("");
                setDateEnd("");
                setToastMessage({message: "Date de l'event ajouté ! Vous pouvez en ajouter un autre", severity: "success"});
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
            open={newEventdatetime}
            onClose={() => setShowNew(false)}
            aria-labelledby="new-eventdatetime-title"
            aria-describedby="child-modal-description"
        >
            <Box className="modal-crud modal-crud-eventdatetime" sx={{bgcolor: 'background.default'}}>
                <Typography variant="h4" sx={{textAlign: 'center', mb: 4}} id="new-eventdatetime-title">Nouvelle date d'event</Typography>
                <form onSubmit={handleSubmit(newEventdatetimeForm)}>
                    <FormControl sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                        <Controller
                          name="date_start"
                          control={control}
                          defaultValue=""
                          render={() => (
                              <Box>
                                <Box>Date de début</Box>
                                <TextField
                                   {...register(
                                       'date_start',
                                       {
                                           required: 'Ce champ est requis'
                                       }
                                   )}
                                   type='datetime-local'
                                   onChange={(e) => setDateStart(e.target.value)}
                                   style={{height: 50}}
                                   variant="standard"
                                   value={date_start}
                                />
                            </Box>
                          )}
                        />
                        {errors.date_start ? (
                            <Alert sx={{mt:2, p:0, pl:2, width: 200}} severity="error">{errors.date_start?.message}</Alert>
                        ) : ''}

                        <Controller
                          name="date_end"
                          control={control}
                          defaultValue=""
                          render={() => (<Box>
                            <Box sx={{mt:2}}>Date de fin</Box>
                            <TextField
                               {...register(
                                   'date_end',
                                   {
                                       required: 'Ce champ est requis',
                                   }
                               )}
                               type='datetime-local'
                               onChange={(e) => setDateEnd(e.target.value)}
                               style={{height: 50}}
                               variant="standard"
                               value={date_end}
                            />
                          </Box>
                          )}
                        />
                        {errors.date_end ? (
                            <Alert sx={{mt:2, p:0, pl:2, width: 200}} severity="error">{errors.date_end?.message}</Alert>
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

export default NewEventdatetime;