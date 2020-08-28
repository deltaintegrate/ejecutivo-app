import React, { useState } from 'react';
import { Button, Icon, Form, Input } from "semantic-ui-react";
import { toast } from "react-toastify";
import { validateEmail } from "../../../utils/Validations";
import firebase from "../../../utils/Firebase";
import "firebase/auth";


import "./LoginForm.scss";

export default function LoginForm(props) {

    const { setSelectedForm } = props;
    const [showPassword,setshowPassword] = useState(false)
    const [FormData, setFormData] = useState(defaultValueForm)
    const [formError, setFormError] = useState({});
    const [isLoading,setIsLoading] = useState(false);
    const [userActive,setUserActive] = useState(true);
    const [user, setUser] = useState(null)


    const handlerShowPassword = () =>{
        setshowPassword(!showPassword);
    }

    const onChange = e =>{
        setFormData({
            ...FormData,
            [e.target.name]: e.target.value
        })
    }

    const onSubmit = () =>{ 
       setFormError({});
       let errors = {};
       let formOk = true;

       if (!validateEmail(FormData.email)){
            errors.email = true;
            formOk= false;
       }

       if (FormData.password.length < 6){
           errors.password = true;
           formOk = false;
       }

       setFormError(errors);

       if(formOk){
           setIsLoading(true);
           firebase.auth().signInWithEmailAndPassword(FormData.email, FormData.password
            ).then(response =>{
                setUser(response.user);
                setUserActive(response.user.emailVerified);
                if(!response.user.emailVerified){
                    toast.warning("antes debes verificar email la cuenta entrando a tu email");
                }
           })
           .catch(err =>{
               handlerErrors(err.code);
           })
           .finally(() => {
               setIsLoading(false);
           })
       }
    }

    return (
        <div className = "login-form">
            <h1>Bienvenido Ejecutivos</h1>
            <Form onSubmit= {onSubmit} onChange={onChange}>
                <Form.Field>
                    <Input 
                        type="text"
                        name="email"
                        placeholder="Correo electronico"
                        icon="mail outline"
                        error={formError.email}
                    />
                    {formError.email && (
                        <span className="error-text">
                            Correo no valido debe ser ejemplo@ejemplo.com
                        </span>
                    )}
                </Form.Field>
                <Form.Field>
                    <Input 
                        type={showPassword ? "text" : "password"}
                        error={formError.password}
                        name="password"
                        placeholder="Contraseña"
                        icon={
                            showPassword ? (
                                <Icon 
                                   name="eye slash outline"
                                    link onClick={handlerShowPassword} 
                                />
                            ): (
                                <Icon 
                                name="eye"
                                 link onClick={handlerShowPassword} 
                                />

                            )
                        }
                        
                    />
                         {formError.password && (
                        <span className="error-text">
                            Contraseña debe ser superior a 6 caracteres
                        </span>
                    )} 
                </Form.Field>
                <Button type="submit" loading = { isLoading }> Iniciar Sesion</Button>
            </Form>
            
            {!userActive && (
                <ButtonResetSendEmailVerification 
                    user = {user}
                    setIsLoading={setIsLoading}
                    setUserActive= {setUserActive}
                
                />
            )}


            <div className= "login-form__options">
                <p onClick={()=> setSelectedForm(null)}>Volver</p>
                <p>
                   ¿No tienes cuenta?{" "}
                   <span onClick={() => setSelectedForm("register")}>Registrate</span> 
                </p>

            </div>
        </div>
    )
}


function ButtonResetSendEmailVerification(props){
    const { user, setIsLoading, setUserActive} = props
    console.log("estoy en boton")
    const resendVerificationEmail = () => {
        user.sendEmailVerification().then(() => {
            toast.success("se ha enviado el email de verificacion");
        })
        .catch(err => {
            console.log(err);
            handlerErrors(err.code) 
        })
        .finally(() => {
            setIsLoading(false);
            setUserActive(true);
        })
    }

    return (
        <div className="resend-verification-email">
            <p>
                si no has recibido el email de verificacion puedes volver a enviarlo
                haciendo click <span onClick={resendVerificationEmail}>aqui</span>
            </p>
        </div>
    )
}

function handlerErrors(code){
    switch (code) {
        case "auth/wrong-password":
            toast.warning("usuario o la contraseña son incorrecto.")
            break;
        case "auth/too-many-requests":
            toast.warning("haz enviado demasiadas solicitudes de reenvio de email en poco tiempo")
            break;
        case "auth/user-not-found":
                toast.warning("usuario o la contraseña son incorrecto.")
            break;
        default:
            break;
    }
}

function defaultValueForm(){
    return {
        email:"",
        password:""
    }
}