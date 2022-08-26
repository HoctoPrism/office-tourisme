function Logout () {
  const dispatch = useDispatch()
  dispatch(loggedFalse())
  localStorage.removeItem('access_token');
  return true
}

export default {Logout};