import {Box, Button, List, ListItem, Modal, Typography} from "@mui/material";
import {Event} from "@mui/icons-material";
import {useState} from "react";

function EventPlace(props) {

    const [event, setShowEvent] = useState(false);

    return(<Box >
          <Button color='info' variant='contained' sx={{mx: 2}} onClick={() => { setShowEvent(true) }}> Voir </Button>
         <Modal
            id="modal-crud-container"
            hideBackdrop
            open={event}
            onClose={() => setShowEvent(false)}
            aria-labelledby="display-event-title"
            aria-describedby="child-modal-description"
        >
            <Box className="modal-crud modal-crud-event" sx={{bgcolor: 'background.default'}}>
                <Typography variant="h4" sx={{textAlign: 'center', mb: 4}} id="display-event-title">Event de <Box sx={{ fontWeight: 'bold'}}>{props.display.name}</Box></Typography>
                <List dense={true} sx={{ minWidth: 350 }}>
                    <ListItem key={1} sx={{ display: 'flex', justifyContent: 'space-between'}}>
                        <Box>Nom</Box>
                        <Box>
                            <Box component='span'> {props.display.event.name} </Box>
                        </Box>
                    </ListItem>
                    <ListItem key={2} sx={{ display: 'flex', justifyContent: 'space-between'}}>
                        <Box>Date de début</Box>
                        <Box>
                            <Box component='span'> {props.display.event.date_start} </Box>
                        </Box>
                    </ListItem>
                    <ListItem key={3} sx={{ display: 'flex', justifyContent: 'space-between'}}>
                        <Box>Date de fin</Box>
                        <Box>
                            <Box component='span'> {props.display.event.date_end} </Box>
                        </Box>
                    </ListItem>
                </List>
                <Box className="action-button">
                    <Button variant="contained" onClick={() => setShowEvent(false)}>Fermer</Button>
                </Box>

            </Box>
        </Modal>
     </Box>
    )
}
export default EventPlace;