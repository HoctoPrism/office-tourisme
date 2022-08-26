import {useDispatch} from "react-redux";
import {loggedFalse} from "../../component/features/loginButton/loginButtonSlice";

function Logout () {
    const dispatch = useDispatch()
    dispatch(loggedFalse())
    localStorage.removeItem('access_token');
    return true
}

export default Logout;