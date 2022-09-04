import {Box, Button, Modal, Snackbar, TextField, Typography, Alert, Autocomplete} from "@mui/material";
import {Edit} from "@mui/icons-material";
import {useState} from "react";
import update from "immutability-helper";
import auth from "../../services/auth/token"
import axios from "axios";

function EditAddress(props) {
    const [id, setID] = useState("");
    const [search, setSearch] = useState('');
    const [result, setResult] = useState([]);
    const [storedSearch, setStoredSearch] = useState([]);
    const [loading, setLoading] = useState(false);
    const [oneAddress, setOneAddress] = useState("");
    const [editAddress, setShowEdit] = useState(false);
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

    let editAddressForm = async (e) => {
        e.preventDefault();
        try {
            let updatedAddress;
            console.log(storedSearch)
            console.log(search)
            storedSearch.map( async (item) => {
                if (item.id === search) {

                    updatedAddress = { id: id ? id : parseInt(oneAddress.id), address: item.address1, city: item.city, postal_code: item.postal_code, latitude: item.lat, longitude: item.lon}

                    let res = await axios.patch("http://127.0.0.1:8000/api/addresses/" + oneAddress.id, updatedAddress, {
                        "headers" : { "Authorization":"Bearer"+auth.getToken() }
                    });
                    if (res.status === 200) {
                        const foundIndex = props.updateValue.data.findIndex(x => x.id === oneAddress.id);
                        let data = update(props.updateValue.data, {[foundIndex]: {$set: updatedAddress}})
                        props.handleDataChange(data, 'edit');
                        setShowEdit(false)
                    } else {
                        setToastMessage({message: "Une erreur est survenue", severity: "error"});
                        setShowToast(true)
                    }

                }
            })
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
                <Box sx={{ my:3 }}>
                    <Box>Addresse actuelle</Box>
                    <Box>{props.updateValue.address}, {props.updateValue.postal_code} {props.updateValue.city}</Box>
                </Box>
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
                        <Button type="button" sx={{m: 3}} onClick={(e) => editAddressForm(e)} variant="contained">Envoyer</Button>
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
export default EditAddress;