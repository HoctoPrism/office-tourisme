import {useEffect, useRef, useState} from "react";
import {useForm} from "react-hook-form";
import {useLocation, useNavigate} from "react-router-dom";

function Register () {

  document.title = 'Inscription au site'

  let navigate = useNavigate();
  let location = useLocation();

  const { register, watch, handleSubmit, formState: { errors, isDirty, isValid } } = useForm({ mode: "onChange" });
  const name = watch('name', "");
  const password = watch('password', "");
  const [role, setRole] = useState("");
  const [errMessage, setErrMessage] = useState("");
  const [toastRegister, setShowToastRegister] = useState(false);
  const onSubmit = e => registerForm();

  const min = useRef()
  const max = useRef()
  const num = useRef()
  const spec = useRef()

  const minuscule = '(?=.*[a-z])'; // allow to test lowercase
  const majuscule = '(?=.*[A-Z])'; // allow to test uppercase
  const number = '(?=.*[0-9])'; // allow to test number
  const special = '(?=.*[!@#:$%^&])'; // allow to test special character

  useEffect(() => {
    // Check if password contains a lowercase
    if (password.match(minuscule)) {
      min.current.style.backgroundColor = "#4F9747"; // if yes, bg green
    } else {
      min.current.style.backgroundColor = "#ce0033"; // if not, bg red
    }

    // Check if password contains a uppercase
    if (password.match(majuscule)) {
      max.current.style.backgroundColor = "#4F9747"; // if yes, bg green
    } else {
      max.current.style.backgroundColor = "#ce0033"; // if not, bg red
    }

    // Check if password contains a number
    if (password.match(number)) {
      num.current.style.backgroundColor = "#4F9747"; // if yes, bg green
    } else {
      num.current.style.backgroundColor = "#ce0033"; // if not, bg red
    }

    // Check if password contains a special character
    if (password.match(special)) {
      spec.current.style.backgroundColor = "#4F9747"; // if yes, bg green
    } else {
      spec.current.style.backgroundColor = "#ce0033"; // if not, bg red
    }

  }, [password])

  let registerForm = async () => {
    setErrMessage('')
    try {
      let register = {
        name: name,
        password: password,
        role: role
      }
      let res = await fetch("http://127.0.0.1:8000/api/register/", {
        method: "POST",
        headers: {
          'Content-Type':'application/json'
        },
        body: JSON.stringify(register),
      });
      if (res.status === 200) {
        setErrMessage('')
        setShowToastRegister(true)
        navigate('/', { replace: true });
      } else {
        res.json().then(( errValue => setErrMessage(errValue) ));
      }
    } catch (err) {
      console.log(err);
    }
  }

  return <div className='text-center'>
    <h1 className='mb-3'>Inscription au site</h1>
    <div className='d-flex justify-content-center align-items-center'>
      <Form className='w-25 mt-4' onSubmit={handleSubmit(onSubmit)}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label className='fw-bold'>Email</Form.Label>
          <Form.Control
            className='alt-bg-sombre text-clair border-0 shadow mb-2'
            type="text"
            placeholder="name"
            {...register("name", {
              required: 'Veuillez saisir un email',
              pattern: {
                value: /^\S+@\S+$/i,
                message: "Veuillez saisir un email valide"
              }
            })}
          />
          { errMessage ? <div className='text-danger error'>{errMessage.name}</div> : null} {/* gestion d'erreur prevenant de node */}
          { errors.name ? <div className='text-danger error'>{errors.name.message}</div> : null} {/* gestion d'erreur prevenant de react */}
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label className='fw-bold'>Mot de passe</Form.Label>
          <Form.Control
            className='alt-bg-sombre text-clair border-0 shadow mb-2'
            type="password"
            placeholder="password"
            {...register("password", {
              required: 'Veuillez saisir un mot de passe',
              minLength: {
                value: 8,
                message: "Le mot de passe doit faire au minimum 8 caractères"
              },
              pattern: {
                value: /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#:$%^&])/,
                message: "Le mot de passe doit contenir une minuscule, une majuscule, un chiffre et un caractère spéciale"
              }
            })}
          />
          { errMessage ? <div className='text-danger error'>{errMessage.password}</div> : null} {/* gestion d'erreur prevenant de node */}
          { errors.password ? <div className='text-danger error'>{errors.password.message}</div> : null} {/* gestion d'erreur prevenant de react */}
        </Form.Group>

        <div className="regex">
          <div className='d-flex justify-content-start align-items-center'>
              <div ref={min} className="bubble"></div>
              <div>Le mot de passe doit contenir au moins une minuscule</div>
          </div>
          <div className='d-flex justify-content-start align-items-center'>
              <div ref={max} className="bubble"></div>
              <div>Le mot de passe doit contenir au moins une majuscule</div>
          </div>
          <div className='d-flex justify-content-start align-items-center'>
              <div ref={num} className="bubble"></div>
              <div>Le mot de passe doit contenir au moins un chiffre</div>
          </div>
          <div className='d-flex justify-content-start align-items-center'>
              <div ref={spec} className="bubble"></div>
              <div>Le mot de passe doit contenir au moins un caractère spécial</div>
          </div>
        </div>

        <Button type="submit" disabled={!isDirty || !isValid} className='bg-clair border-0 text-sombre'>VALIDER</Button>
      </Form>
    </div>

    <ToastContainer position="bottom-center">
      <Toast className="mb-3" delay={3000} autohide show={toastRegister} onClose={() => setShowToastRegister(false)}>
        <Toast.Header>
          <strong className="me-auto text-sombre">Inscription terminé ! Vous pouvez vous connecter !</strong>
        </Toast.Header>
      </Toast>
    </ToastContainer>
  </div>
}

export default {Register};