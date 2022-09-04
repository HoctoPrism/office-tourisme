import {
    Box,
    Button,
    Modal,
    Snackbar,
    TextField,
    Typography,
    Alert,
    Autocomplete
} from "@mui/material";
import {useState} from "react";
import update from "immutability-helper";
import axios from "axios";
import auth from "../../services/auth/token"

function NewAddress(props) {

    const [id, setID] = useState("");
    const [search, setSearch] = useState('');
    const [result, setResult] = useState([]);
    const [storedSearch, setStoredSearch] = useState([]);
    const [newAddress, setShowNew] = useState(false);
    const [loading, setLoading] = useState(false);
    // Handle Toast address
    const [toast, setShowToast] = useState(false);
    const [toastMessage, setToastMessage] = useState({});

    let resulting = async (value) => {
        if (value !== ''){
            setLoading(true)
            await axios.get(`https://api.geoapify.com/v1/geocode/search?text=${encodeURI(value)}&apiKey=e7e8b57d0e91492ab555a084abd37c4c&filter=countrycode:fr`)
                .then(response => {
                    let dirtyArray = response.data.features;
                    let outputArray = [];
                    let storedArray = [];
                    dirtyArray.map((item) => {
                        outputArray = [...outputArray, `${item.properties.address_line1}, ${item.properties.address_line2}`]
                        storedArray = [...storedArray, {
                            'address1': item.properties.address_line1,
                            'lat': item.properties.lat,
                            'lon': item.properties.lon,
                            'city': item.properties.city,
                            'postal_code': item.properties.postcode,
                            'id': `${item.properties.address_line1}, ${item.properties.address_line2}`
                        }]
                    })
                    setResult(outputArray)
                    setStoredSearch(storedArray)
                    setLoading(false)
                }
            );
        }
    }

    let newAddressForm = async (e) => {
        e.preventDefault()
        try {
            let newAddress;
            storedSearch.map( async (item) => {

                if (item.id === search){

                    newAddress = {address: item.address1, city: item.city, postal_code: item.postal_code, latitude: item.lat, longitude: item.lon}

                    let res = await axios.post('http://127.0.0.1:8000/api/addresses/', newAddress, {
                        "headers" : { "Authorization":"Bearer"+auth.getToken() }
                    });
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
                        setToastMessage({message: "Address ajouté ! Vous pouvez en ajouter un autre", severity: "success"});
                        setShowToast(true);
                    } else {
                        setToastMessage({message: "Une erreur est survenue", severity: "error"});
                    }
                }
            })

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
                <form>

                    <Autocomplete
                        name="address-input"
                        value={search}
                        onChange={(e, newValue) => {
                            setSearch(newValue)
                            resulting(newValue)
                        }}
                        inputValue={search}
                        onInputChange={(e, newInputValue) => {
                            setSearch(newInputValue)
                            resulting(newInputValue)
                        }}
                        id="address"
                        sx={{ width: 300 }}
                        loadingText="Chargement..."
                        loading={loading}
                        renderInput={(params) => <TextField {...params} label="Adresse" />}
                        options={result}
                        getOptionLabel={(option) => option}
                        isOptionEqualToValue={(option, value) => option.id === value.id}
                        noOptionsText="Aucun résultat"
                        filterOptions={(options) => options}
                        fullWidth
                    />

                    <Box className="action-button">
                        <Button type="button" onClick={(e) => newAddressForm(e)} sx={{m: 3}} variant="contained">Envoyer</Button>
                        <Button variant="outlined" onClick={() => setShowNew(false)}>Fermer</Button>
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

export default NewAddress;