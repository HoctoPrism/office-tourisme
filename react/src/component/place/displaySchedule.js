import {Box, Button, List, ListItem, Modal, Typography} from "@mui/material";
import {Schedule} from "@mui/icons-material";
import {useState} from "react";

function SchedulePlace(props) {

    const [schedule, setShowSchedule] = useState(false);

    return(<Box >
          <Button color='info' variant='contained' sx={{mx: 2}} onClick={() => { setShowSchedule(true) }}> Voir </Button>
         <Modal
            id="modal-crud-container"
            hideBackdrop
            open={schedule}
            onClose={() => setShowSchedule(false)}
            aria-labelledby="display-schedule-title"
            aria-describedby="child-modal-description"
        >
            <Box className="modal-crud modal-crud-schedule" sx={{bgcolor: 'background.default'}}>
                <Typography variant="h4" sx={{textAlign: 'center', mb: 4}} id="display-schedule-title">Schedule de <Box sx={{ fontWeight: 'bold'}}>{props.display.name}</Box></Typography>
                <List dense={true} sx={{ minWidth: 350 }}>
                    <ListItem key={1} sx={{ display: 'flex', justifyContent: 'space-between'}}>
                        <Box>Lundi</Box>
                        <Box>
                            <Box component='span'> de </Box>
                            <Box component='span' sx={{ fontWeight: 'bold' }}>{props.display.schedule.monday_start ? props.display.schedule.monday_start.substring(props.display.schedule.monday_start.length - 3, -3) : '--:--'}</Box>
                            <Box component='span'> à </Box>
                            <Box component='span' sx={{ fontWeight: 'bold' }}>{props.display.schedule.monday_end ? props.display.schedule.monday_end.substring(props.display.schedule.monday_end.length - 3, -3) : '--:--'}</Box>
                        </Box>
                    </ListItem>
                    <ListItem key={2} sx={{ display: 'flex', justifyContent: 'space-between'}}>
                        <Box>Mardi</Box>
                        <Box>
                            <Box component='span'> de </Box>
                            <Box component='span' sx={{ fontWeight: 'bold' }}>{props.display.schedule.tuesday_start ? props.display.schedule.tuesday_start.substring(props.display.schedule.tuesday_start.length - 3, -3) : '--:--'}</Box>
                            <Box component='span'> à </Box>
                            <Box component='span' sx={{ fontWeight: 'bold' }}>{props.display.schedule.tuesday_end ? props.display.schedule.tuesday_end.substring(props.display.schedule.tuesday_end.length - 3, -3) : '--:--'}</Box>
                        </Box>
                    </ListItem>
                    <ListItem key={3} sx={{ display: 'flex', justifyContent: 'space-between'}}>
                        <Box>Mercredi</Box>
                        <Box>
                            <Box component='span'> de </Box>
                            <Box component='span' sx={{ fontWeight: 'bold' }}>{props.display.schedule.wednesday_start ? props.display.schedule.wednesday_start.substring(props.display.schedule.wednesday_start.length - 3, -3) : '--:--'}</Box>
                            <Box component='span'> à </Box>
                            <Box component='span' sx={{ fontWeight: 'bold' }}>{props.display.schedule.wednesday_end ? props.display.schedule.wednesday_end.substring(props.display.schedule.wednesday_end.length - 3, -3) : '--:--'}</Box>
                        </Box>
                    </ListItem>
                    <ListItem key={4} sx={{ display: 'flex', justifyContent: 'space-between'}}>
                        <Box>Jeudi</Box>
                        <Box>
                            <Box component='span'> de </Box>
                            <Box component='span' sx={{ fontWeight: 'bold' }}>{props.display.schedule.thursday_start ? props.display.schedule.thursday_start.substring(props.display.schedule.thursday_start.length - 3, -3) : '--:--'}</Box>
                            <Box component='span'> à </Box>
                            <Box component='span' sx={{ fontWeight: 'bold' }}>{props.display.schedule.thursday_end ? props.display.schedule.thursday_end.substring(props.display.schedule.thursday_end.length - 3, -3) : '--:--'}</Box>
                        </Box>
                    </ListItem>
                    <ListItem key={5} sx={{ display: 'flex', justifyContent: 'space-between'}}>
                        <Box>Vendredi</Box>
                        <Box>
                            <Box component='span'> de </Box>
                            <Box component='span' sx={{ fontWeight: 'bold' }}>{props.display.schedule.friday_start ? props.display.schedule.friday_start.substring(props.display.schedule.friday_start.length - 3, -3) : '--:--'}</Box>
                            <Box component='span'> à </Box>
                            <Box component='span' sx={{ fontWeight: 'bold' }}>{props.display.schedule.friday_end ? props.display.schedule.friday_end.substring(props.display.schedule.friday_end.length - 3, -3) : '--:--'}</Box>
                        </Box>
                    </ListItem>
                    <ListItem key={6} sx={{ display: 'flex', justifyContent: 'space-between'}}>
                        <Box>Samedi</Box>
                        <Box>
                            <Box component='span'> de </Box>
                            <Box component='span' sx={{ fontWeight: 'bold' }}>{props.display.schedule.saturday_start ? props.display.schedule.saturday_start.substring(props.display.schedule.saturday_start.length - 3, -3) : '--:--'}</Box>
                            <Box component='span'> à </Box>
                            <Box component='span' sx={{ fontWeight: 'bold' }}>{props.display.schedule.saturday_end ? props.display.schedule.saturday_end.substring(props.display.schedule.saturday_end.length - 3, -3) : '--:--'}</Box>
                        </Box>
                    </ListItem>
                    <ListItem key={7} sx={{ display: 'flex', justifyContent: 'space-between'}}>
                        <Box>Dimanche</Box>
                        <Box>
                            <Box component='span'> de </Box>
                            <Box component='span' sx={{ fontWeight: 'bold' }}>
                                {props.display.schedule.sunday_start ? props.display.schedule.sunday_start.substring(props.display.schedule.sunday_start.length - 3, -3) : '--:--'}
                            </Box>
                            <Box component='span'> à </Box>
                            <Box component='span' sx={{ fontWeight: 'bold' }}>
                                {props.display.schedule.sunday_end ? props.display.schedule.sunday_end.substring(props.display.schedule.sunday_end.length - 3, -3) : '--:--'}
                            </Box>
                        </Box>
                    </ListItem>
                </List>
                <Box className="action-button">
                    <Button variant="contained" onClick={() => setShowSchedule(false)}>Fermer</Button>
                </Box>

            </Box>
        </Modal>
     </Box>
    )
}
export default SchedulePlace;