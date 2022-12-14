import {AppBar, Box, Button} from "@mui/material";
import {SwitchModeButton} from "../_theme/_switchModeButton";
import {useEffect} from "react";
import LoginButton from "../../features/loginButton/LoginButton";

export function Navbar() {

    useEffect(() => {
    }, [])

    return (
        <Box sx={{flexGrow: 1}}>
            <AppBar className='header' id="navbar">
                <Box sx={{m: 5, flexGrow: 1}} component="div">{document.title}</Box>
                <Box className="navbar">
                    <Button color="secondary" href='/'>Accueil</Button>
                    <Button color="secondary" href='place'>Place</Button>
                    <Button color="secondary" href='address'>Address</Button>
                    <Button color="secondary" href='schedule'>Schedule</Button>
                    <Button color="secondary" href='type'>Type</Button>
                    <Button color="secondary" href='event'>Event</Button>
                    <LoginButton/>
                    <SwitchModeButton/>
                </Box>
            </AppBar>
        </Box>
    )
}