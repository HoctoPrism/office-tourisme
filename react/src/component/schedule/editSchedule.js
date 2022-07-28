import {Box, Button, FormControl, Modal, Snackbar, TextField, Typography, Alert} from "@mui/material";
import {Edit} from "@mui/icons-material";
import {useState} from "react";
import update from "immutability-helper";
import {useForm, Controller} from "react-hook-form";
import axios from "axios";

function EditSchedule(props) {
    const [id, setID] = useState("");
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
    const [oneSchedule, setOneSchedule] = useState("");
    const [editSchedule, setShowEdit] = useState(false);
    const [toast, setShowToast] = useState(false);
    const [toastMessage, setToastMessage] = useState({});

    const { register, control, handleSubmit, formState: { errors } } = useForm({
        defaultValues: {
            monday_start: props.updateValue.monday_start,
            monday_end: props.updateValue.monday_end,
            tuesday_start: props.updateValue.tuesday_start,
            tuesday_end: props.updateValue.tuesday_end,
            wednesday_start: props.updateValue.wednesday_start,
            wednesday_end: props.updateValue.wednesday_end,
            thursday_start: props.updateValue.thursday_start,
            thursday_end: props.updateValue.thursday_end,
            friday_start: props.updateValue.friday_start,
            friday_end: props.updateValue.friday_end,
            saturday_start: props.updateValue.saturday_start,
            saturday_end: props.updateValue.saturday_end,
            sunday_start: props.updateValue.sunday_start,
            sunday_end: props.updateValue.sunday_end,
        }
    });

    let editScheduleForm = async () => {
        try {
            let updatedSchedule = {
                id: id ? id : parseInt(oneSchedule.id),
                monday_start: monday_start === "" ? props.updateValue.monday_start : monday_start,
                monday_end: monday_end === "" ? oneSchedule.monday_end : monday_end,
                tuesday_start: tuesday_start === "" ? oneSchedule.tuesday_start : tuesday_start,
                tuesday_end: tuesday_end === "" ? oneSchedule.tuesday_end : tuesday_end,
                wednesday_start: wednesday_start === "" ? oneSchedule.wednesday_start : wednesday_start,
                wednesday_end: wednesday_end === "" ? oneSchedule.wednesday_end : wednesday_end,
                thursday_start: thursday_start === "" ? oneSchedule.thursday_start : thursday_start,
                thursday_end: thursday_end === "" ? oneSchedule.thursday_end : thursday_end,
                friday_start: friday_start === "" ? oneSchedule.friday_start : friday_start,
                friday_end: friday_end === "" ? oneSchedule.friday_end : friday_end,
                saturday_start: saturday_start === "" ? oneSchedule.saturday_start : saturday_start,
                saturday_end: saturday_end === "" ? oneSchedule.saturday_end : saturday_end,
                sunday_start: sunday_start === "" ? oneSchedule.sunday_start : sunday_start,
                sunday_end: sunday_end === "" ? oneSchedule.sunday_end : sunday_end,
            }
            let res = await axios.patch("http://127.0.0.1:8000/api/schedules/" + oneSchedule.id, updatedSchedule)
            if (res.status === 200) {
                const foundIndex = props.updateValue.data.findIndex(x => x.id === oneSchedule.id);
                let data = update(props.updateValue.data, {[foundIndex]: {$set: updatedSchedule}})
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
                setOneSchedule({
                    id: props.updateValue.id,
                    monday_start: props.updateValue.monday_start, monday_end: props.updateValue.monday_end,
                    tuesday_start: props.updateValue.tuesday_start, tuesday_end: props.updateValue.tuesday_end,
                    wednesday_start: props.updateValue.wednesday_start, wednesday_end: props.updateValue.wednesday_end,
                    thursday_start: props.updateValue.thursday_start, thursday_end: props.updateValue.thursday_end,
                    friday_start: props.updateValue.friday_start, friday_end: props.updateValue.friday_end,
                    saturday_start: props.updateValue.saturday_start, saturday_end: props.updateValue.saturday_end,
                    sunday_start: props.updateValue.sunday_start, sunday_end: props.updateValue.sunday_end,
                })
            }}>
              <Edit/>
          </Button>
         <Modal
            id="modal-crud-container"
            hideBackdrop
            open={editSchedule}
            onClose={() => setShowEdit(false)}
            aria-labelledby="edit-schedule-title"
            aria-describedby="child-modal-description"
        >
            <Box className="modal-crud" sx={{bgcolor: 'background.default'}}>
                <Typography variant="h4" sx={{textAlign: 'center', mb: 4}} id="edit-schedule-title">Editer un schedule</Typography>
                <form onSubmit={handleSubmit(editScheduleForm)}>
                    <Box sx={{ display: 'flex', mb: 5 }}>
                        <Controller
                          name="monday_start"
                          control={control}
                          render={() => (
                              <TextField
                               {...register('monday_start')}
                                label="Lundi début"
                                type="time"
                                defaultValue={monday_start}
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
                                    defaultValue={monday_end}
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
                                defaultValue={tuesday_start}
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
                                    defaultValue={tuesday_end}
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
                                defaultValue={wednesday_start}
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
                                    defaultValue={wednesday_end}
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
                                defaultValue={thursday_start}
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
                                    defaultValue={thursday_end}
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
                                defaultValue={friday_start}
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
                                    defaultValue={friday_end}
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
                                defaultValue={saturday_start}
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
                                    defaultValue={saturday_end}
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
                                defaultValue={sunday_start}
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
                                    defaultValue={sunday_end}
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
                        <Button variant="outlined" onClick={() => setShowEdit(false)}>Fermer</Button>
                    </Box>
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
export default EditSchedule;